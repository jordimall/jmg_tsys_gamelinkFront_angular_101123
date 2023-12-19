import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import { GameRole } from '../../models/game-role.model';
import { GameRoleService } from '../../services/game-role.service';
import { MessageService } from '../../services/message.service';
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
  gameRoleForm: FormGroup = new FormGroup({
    name: new FormControl(this.gameRole.name, Validators.required),
    description: new FormControl(
      this.gameRole.description,
      Validators.required
    ),
    icon_url: new FormControl(this.gameRole.icon_url, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private gameRoleService: GameRoleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idGameRole');

    if (this.findOutId()) {
      this.gameRoleService.getGameRole(this.id).subscribe(
        (data) => {
          this.gameRoleForm.setValue({
            name: data.name,
            description: data.description,
            icon_url: data.icon_url,
          });
        },
        (err) => {
          console.log({ status: err.status, messaje: err.message });
        }
      );
    }
  }

  public findOut() {
    this.gameRole = this.gameRoleForm.value as GameRole;
    if (this.findOutId()) {
      this.gameRoleService.editGameRole(this.id, this.gameRole).subscribe(
        (data) => {
          this.messageService.setMessage('GameRole edited successfully');
          this.location.back();
        },
        (err) => {
          console.log({ status: err.status, message: err.message });
        }
      );
    } else {
      this.gameRoleService.addGameRole(this.gameRole).subscribe(
        (data) => {
          this.messageService.setMessage('GameRole created successfully');
          this.location.back();
        },
        (err) => {
          console.log({ status: err.status, message: err.message });
        }
      );
    }
  }

  public findOutId = (): boolean => {
    return this.id !== null;
  };
}
