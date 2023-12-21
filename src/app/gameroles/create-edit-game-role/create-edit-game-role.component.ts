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
import { GameRole } from '../../models/game-role.model';
import { Game } from '../../models/game.model';
import { GameRoleService } from '../../services/game-role.service';
import { InfoMessageService } from '../../services/info-message.service';
import { GameService } from '../../services/game.service';
import { MessageService } from '../../services/message.service';
import arrayNotEmpty2 from './validator-form-control';
import { GameGameRole } from '../../models/game-game-role.model';
import { GameGameRoleService } from '../../services/game-game-role.service';

@Component({
  selector: 'app-create-edit-game-role',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-edit-game-role.component.html',
  styleUrl: './create-edit-game-role.component.css',
})
export class CreateEditGameRoleComponent implements OnInit {
  id: any;
  gameRole: GameRole = {};
  games: Game[] = [];
  selectedGames: Game[] = [];
  gameGameRole: GameGameRole[] = [];
  control: FormControl = new FormControl();
  gameRoleForm: FormGroup = new FormGroup({
    name: new FormControl(this.gameRole.name, Validators.required),
    description: new FormControl(
      this.gameRole.description,
      Validators.required
    ),
    icon_url: new FormControl(this.gameRole.icon_url, Validators.required),
    games: new FormControl('',),
    gameGameRole: new FormControl(
      this.selectedGames || [],
    ),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private gameRoleService: GameRoleService,
    private messageService: InfoMessageService,
    private gameService: GameService,
    private gameGameRoleService: GameGameRoleService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idGameRole');

    if (this.findOutId()) {
      this.gameRoleService.getGameRole(this.id).subscribe(
        (data) => {
          this.gameRole = data;
          this.gameRoleForm.patchValue({
            name: data.name,
            description: data.description,
            icon_url: data.icon_url,
          });
        },
        (err) => {
          this.router.navigateByUrl('/404');
        }
      );

      this.gameGameRoleService.gameByGameRole(this.id).subscribe((data) => {
        this.gameGameRole = data;
        this.gameGameRole.forEach((element) => {
          let game: any = element.idGame;
          if (game !== undefined) {
            this.selectedGames.push(game);
          }
        });

        this.gameRoleForm.patchValue({
          gameGameRole: this.selectedGames,
        });
      });
    }

    this.gameService.allGame().subscribe(
      (data) => {
        this.games = data;
      },
      (err) => {
        this.router.navigateByUrl('/404');
      }
    );
  }

  public findOut() {
    this.gameRole = this.gameRoleForm.value as GameRole;
    const newGameRole: GameRole = {};
    newGameRole.name = this.gameRole.name;
    newGameRole.description = this.gameRole.description;
    newGameRole.icon_url = this.gameRole.icon_url;
    newGameRole.gameGameRole = [];
    for (let index = 0; index < this.selectedGames.length; index++) {
      const gameGameRole: GameGameRole = {};
      gameGameRole.idGame = this.selectedGames[index];
      newGameRole.gameGameRole.push(gameGameRole);
    }
    if (this.findOutId()) {
      this.gameRoleService.editGameRole(this.id, newGameRole).subscribe(
        (data) => {
          this.messageService.setMessage('GameRole edited successfully');
          this.location.back();
        },
        (err) => {
          this.router.navigateByUrl('/404');
        }
      );
    } else {
      this.gameRoleService.addGameRole(newGameRole).subscribe(
        (data) => {
          this.messageService.setMessage('GameRole created successfully');
          this.location.back();
        },
        (err) => {
          this.router.navigateByUrl('/404');
        }
      );
    }
  }

  public onGameSelect = () => {
    const gameId = this.gameRoleForm.value.games[0];
    if (gameId) {
      const game = this.games.find((game) => game.id === gameId);
      const gameIndex = this.selectedGames.findIndex(
        (game) => game.id === gameId
      );
      if (game && gameIndex === -1) {
        this.gameRole.gameGameRole?.push({ idGame: game });
        this.selectedGames.push(game);
      }
    }
  };

  public onGameDeselect = () => {
    const gameId = this.gameRoleForm.value.gameGameRole[0];
    if (gameId) {
      const gameIndex = this.selectedGames.findIndex(
        (game) => game.id === gameId
      );

      if (gameIndex > -1) {
        this.gameRole.gameGameRole?.splice(gameIndex, 1);

        this.selectedGames.splice(gameIndex, 1);
      }
    }
  };

  public findOutId = (): boolean => {
    return this.id !== null;
  };
}
