import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-show',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-show.component.html',
  styleUrl: './game-show.component.css',
})
export class GameShowComponent implements OnInit {
  id: number | any;
  game: Game | any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idGame');
    if (this.id !== null) {
      this.gameService.gameById(this.id).subscribe(
        (data: any) => {
          this.game = data;
        },
        (err) => {
          this.router.navigateByUrl('/404');
        }
      );
    }
  }
}
