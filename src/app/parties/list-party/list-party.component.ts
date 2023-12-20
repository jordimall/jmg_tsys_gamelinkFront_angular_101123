import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { Party } from '../../models/party.model';
import { PartyService } from '../../services/party.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-list-party',
  standalone: true,
  imports: [NavBarComponent, RouterLink],
  templateUrl: './list-party.component.html',
  styleUrl: './list-party.component.css'
})
export class ListPartyComponent implements OnInit{

  parties: Party[] = [];
  game: Game = new Game;
  membersCounts: number[] =[];

  constructor(private partyService: PartyService, private gameService: GameService, private route: Router, private activeRoute: ActivatedRoute,){

  }

  ngOnInit() {
    let url = this.route.url.split("/");
    let id = this.activeRoute.snapshot.paramMap.get('idGame');
    this.gameService.gameById(id as unknown as number).subscribe(
      result => {
        this.game = result
      },
      error => {
        this.route.navigateByUrl("/404");
      }
    );
    
    //Get all parties by the id game in the path
    this.partyService.allPartiesByGame(id as unknown as number).subscribe(
      result => {
        this.parties = result.content;

        //Once getting al the parties, counting how many members every one of them has
        for(let i = 0; i < this.parties.length; i++){
          this.partyService.getMembers(this.parties[i].id).subscribe(
            result => {
              let count: number = 0;
              //Count the joined members
              for(let j = 0; j < result.length; j++){
                if(result[j].user != null){
                  count++;
                }
              }

              this.membersCounts[i] = count;
            },
            error => {
      
            }
          );
        }
      },
      error => {

      }
    );
    
  }
}
