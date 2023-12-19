import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
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
  message: string = '';
  gameRoleList: GameRole[] | any;
  numPage: number = 0;
  totalPage: number = 0;
  actualPage: number = 0;
  size: number = 7;
  first: boolean = true;
  last: boolean = true;
  arrayNumber: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameRoleService: GameRoleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('page') === null) {
        this.numPage = Number.parseInt(params.get('page') ?? '1') - 1 ?? 0;
      }
    });

    this.getAll();
  }

  private getAll=():void=>{
    this.message = this.messageService.getMessage();

    this.gameRoleService.allGameRolePaginate(this.numPage, this.size).subscribe(
      (data:any) => {
        const { totalPages, content, number, first, last, size } = data;

        this.gameRoleList = content;
        this.totalPage = totalPages;
        this.actualPage = number;
        this.size = size;
        this.first = first;
        this.last = last;
        this.initialArray(this.totalPage);
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

  public decrementNumPage = (): void => {
    if (this.numPage > 0) {
      this.numPage--;
    }
    this.getAll()
    this.router.navigateByUrl(`/gameRoles?page=${this.numPage + 1}`);
  };

  public modifyNumPage = (num: number): void => {
    this.numPage = num;
    this.getAll()
    this.router.navigateByUrl(`/gameRoles?page=${this.numPage + 1}`);
  };

  public incrementNumPage = (): void => {
    if (this.numPage < this.totalPage) {
      this.numPage++;
    }
    this.getAll()
    this.router.navigateByUrl(`/gameRoles?page=${this.numPage + 1}`);
  };

  private initialArray = (total: number) => {
    for (let index = 0; index < total; index++) {
      this.arrayNumber[index] = index + 1;
    }
  };
}
