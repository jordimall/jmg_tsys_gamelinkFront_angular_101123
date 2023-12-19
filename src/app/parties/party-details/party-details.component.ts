import { Component } from '@angular/core';
import { Party } from '../../models/party.model';
import { Game } from '../../models/game.model';
import { PartyService } from '../../services/party.service';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { UserPartyGameRole } from '../../models/user-party-game-role.model';
import { User } from '../../models/user.model';
import { GameRole } from '../../models/game-role.model';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-party-details',
  standalone: true,
  imports: [NavBarComponent, RouterLink],
  templateUrl: './party-details.component.html',
  styleUrl: './party-details.component.css'
})
export class PartyDetailsComponent {

  party: Party = new Party;
  game: Game = new Game;
  members: UserPartyGameRole[] = [];
  emptyRoles: GameRole[] = [];
  membersCount: number = 0;
  isInParty: boolean = false;

  constructor(private partyService: PartyService, 
              private gameService: GameService, 
              private tokenService: TokenStorageService,
              private route: Router){

  }

  ngOnInit() {
    let url = this.route.url.split("/");
    let partyId = (url[url.length-1] as unknown as number);
    this.partyService.getOnePartyById(partyId).subscribe(
      result => {
        this.party = result;
        this.gameService.gameById(this.party.game?.id as unknown as number).subscribe(
          result => {
            this.game = result
          },
          error => {
            this.route.navigateByUrl("/404");
          }
          
        );
      },
      error => {

      }
    );
    this.partyService.getMembers(partyId).subscribe(
      result => {
        this.members = result;

        /*Count how many userParyGameRoles have user and counte them, otherwise 
          adds the role in emptyRoles array*/
        for(let i = 0; i < this.members.length; i++){
          if(this.members[i].user != null){
            this.membersCount++;
          } else if (this.emptyRoles.length > 0){
            //Variable to check that the GameRoles is only added once in the array
            let alreadyAdded: boolean = false;

            for(let j = 0; j < this.emptyRoles.length; j++){
              if(this.members[i].gameRole?.id == this.emptyRoles[j].id){
                alreadyAdded = true;
              }
            }

            //If the role is not already in the array then add it
            if(!alreadyAdded) {
              this.emptyRoles.push(this.members[i].gameRole as GameRole);
            }
          } else {
            //Introduce the first emptry role
            this.emptyRoles.push(this.members[i].gameRole as GameRole);
          }
        }

        //Check if logged user is already in the party
        this.isInParty = this.alreadyInParty();
        console.log(this.isInParty)
      },
      error => {
        this.route.navigateByUrl("/404");
      }
    );


  }

  onJoinClick = (e: Event) => {
    let clickIndex: number = ((<HTMLInputElement>document.getElementById('party_details_select_role')).value as unknown as number)
    let emptyRoleFound: boolean = false;
    let index: number = 0;

    while(!emptyRoleFound){
      if(this.members[index].gameRole?.id == this.emptyRoles[clickIndex].id && this.members[index].user == null){
        emptyRoleFound = true;
      } else {
        index++;
      }
    } 
    console.log(this.members[index])
    this.partyService.joinParty(this.party.id, this.members[index].id).subscribe(
      result => {
        this.members = result;
        this.isInParty = this.alreadyInParty();
      },
      error => {

      }
    );
  }

  alreadyInParty = () : boolean => {
    let isInParty = false;
    let i: number =  0;
    while(!isInParty && i < this.members.length){
      console.log(this.members[i].user?.id + "  " + this.tokenService.getDecodedToken().id);
      if(this.members[i].user?.id == this.tokenService.getDecodedToken().id){
        isInParty = true;
      } else {
        i++;
      }
    }
    return isInParty;
  }
}
