import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
@Component({
  selector: 'app-create-edit-game',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-edit-game.component.html',
  styleUrl: './create-edit-game.component.css',
})
export class CreateEditGameComponent implements OnInit {
  id: any;
  game: Game = {};
  gameForm: FormGroup = new FormGroup({
    title: new FormControl(this.game.title, Validators.required),
    thumbnailUrl: new FormControl(this.game.thumbnailUrl, Validators.required),
    url: new FormControl(this.game.url, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idGame');

    if (this.findOutId()) {
      this.gameService.gameById(this.id).subscribe(
        (data) => {
          this.game = data;
          this.gameForm.setValue({
            title: data.title,
            thumbnailUrl: data.thumbnailUrl,
            url: data.url,
          });
        },
        (err) => {
          this.router.navigateByUrl('/404');
        }
      );
    }
  }

  public findOut() {
    this.game = this.gameForm.value as Game;
    if (this.findOutId()) {
      this.gameService.editGame(this.id, this.game).subscribe(
        (data) => {
          this.location.back();
        },
        (err) => {
          this.router.navigateByUrl('/404');
        }
      );
    } else {
      this.gameService.addGame(this.game).subscribe(
        (data) => {
          this.location.back();
        },
        (err) => {
          this.router.navigateByUrl('/404');
        }
      );
    }
  }

  public findOutId = (): boolean => {
    return this.id !== null;
  };
}
