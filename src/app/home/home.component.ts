import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RouterLink, NavBarComponent],
})
export class HomeComponent implements OnInit {
  games: Game[] = [];

  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit() {
    this.gameService.allGame().subscribe(
      (result) => {
        this.games = result;
      },
      (error) => {
        this.router.navigateByUrl('/404');
      }
    );
  }
}
