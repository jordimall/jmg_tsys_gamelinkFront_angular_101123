import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { Party } from '../../models/party.model';
import { PartyService } from '../../services/party.service';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private partyService: PartyService, private gameService: GameService, private route: Router){

  }

  ngOnInit() {
    let url = this.route.url.split("/");
    let id = url[url.length-1];
    this.partyService.allPartiesByGame(id as unknown as number).subscribe(
      result => {
        this.parties = result;
      },
      error => {

      }
    );
    this.gameService.gameById(id as unknown as number).subscribe(
      result => {
        this.game = result
      },
      error => {
        this.route.navigateByUrl("/404");
      }
    )
  }
}
