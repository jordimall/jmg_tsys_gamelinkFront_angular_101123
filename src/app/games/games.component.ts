import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { GameService } from '../services/game.service';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, RouterLink],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit{

  games: Game[] = [];
  
  constructor(private gameService: GameService){

  }

  ngOnInit() {
    this.gameService.allGame().subscribe(
      result => {
        this.games = result;
      },
      error => {
        
      }
    )
  }
}
