import { Component } from '@angular/core';
import { Party } from '../../models/party.model';
import { Game } from '../../models/game.model';
import { PartyService } from '../../services/party.service';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { UserPartyGameRole } from '../../models/user-party-game-role.model';
import { User } from '../../models/user.model';

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
  membersCount: number = 0;

  constructor(private partyService: PartyService, private gameService: GameService, private route: Router){

  }

  ngOnInit() {
    let url = this.route.url.split("/");
    let partyId = (url[url.length-1] as unknown as number);
    this.partyService.getOnePartyById(partyId).subscribe(
      result => {
        this.party = result;
        console.log(this.party);
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
        for(let i = 0; i < this.members.length; i++){
          if(this.members[i].user != null){
            this.membersCount++;
          }
        }
      },
      error => {
        this.route.navigateByUrl("/404");
      }
    );
  }
}
