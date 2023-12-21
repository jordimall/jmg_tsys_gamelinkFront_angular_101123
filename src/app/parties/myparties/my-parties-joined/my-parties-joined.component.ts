import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../../services/party.service';
import { Party } from '../../../models/party.model';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message.model';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-my-parties-joined',
  standalone: true,
  imports: [],
  templateUrl: './my-parties-joined.component.html',
  styleUrl: './my-parties-joined.component.css'
})
export class MyPartiesJoinedComponent implements OnInit{

  joinedParties: Party[] = [];
  partyMessages: Message[] = [];
  selectedParty: Party = new Party;

  constructor(private partyService: PartyService, private messageService: MessageService, private tokenService: TokenStorageService){

  }

  ngOnInit(){
    //Apply the styles
    (<HTMLElement> document.getElementById('my_parties_nav_created')).classList.add("my_parties_nav_no_selected");
    (<HTMLElement> document.getElementById('my_parties_nav_joined')).classList.remove("my_parties_nav_no_selected");

    this.partyService.getJoinedParties().subscribe(
      result => {
        this.joinedParties = result;
      },
      error => {

      }
    );
  }

  onPartyClick = (index: number, id: number | undefined): void => {
    this.selectedParty = this.joinedParties[index];

    this.messageService.getAllMessagesByPartyId(this.selectedParty.id).subscribe(
      result => {
        this.partyMessages = result.content;
      },
      error => {

      }
    );
  }

  onSendClick = (): void => {

    let message: Message = new Message;
    message.message = (<HTMLInputElement> document.getElementById('joined_parties_messages_footer_input')).value;

    this.messageService.addMessageByPartyId(this.selectedParty.id, message).subscribe(
      result => {
        this.messageService.getAllMessagesByPartyId(this.selectedParty.id).subscribe(
          result => {
            this.partyMessages = result.content;
          },
          error => {

          }
        );
      },
      error => {

      }
    );
  }

  imTheAuthor = (message: Message): boolean => {
    let isAuthor: boolean = false;
    if(message.author?.id == this.tokenService.getDecodedToken().id){
      isAuthor = true;
    }
    return isAuthor;
  }
}
