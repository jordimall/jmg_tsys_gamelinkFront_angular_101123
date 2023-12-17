import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameRole } from '../../models/game-role.model';
import { GameRoleService } from '../../services/game-role.service';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-game-role',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-role.component.html',
  styleUrl: './game-role.component.css',
})
export class GameRoleComponent implements OnInit {
  numPage: number = 0;
  message: string = '';
  gameRoleList: GameRole[] | any;

  constructor(
    private gameRoleService: GameRoleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.message = this.messageService.getMessage();
    this.gameRoleService.allGameRolePaginate(this.numPage).subscribe(
      (data) => {
        this.gameRoleList = data;
      },
      (err) => {
        console.log({ status: err.status, message: err.message });
      }
    );
  }

  deleteGameRole = (id: number): void => {
    console.log(id);
    this.gameRoleService.deleteGameRole(id).subscribe(
      (data) => {
        this.messageService.setMessage('Tag successfully removed');
        this.ngOnInit();
      },
      (err) => {
        console.log({ status: err.status, message: err.message });
      }
    );
  };
}
