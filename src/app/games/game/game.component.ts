import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterLink,MatProgressSpinnerModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  gameList: Game[] | any;
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
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('page') === null) {
        this.numPage = Number.parseInt(params.get('page') ?? '1') - 1 ?? 0;
      }
    });

    this.getAll();
  }

  private getAll = (): void => {
    this.gameService.allGamePaginate(this.numPage).subscribe(
      (data: any) => {
        const { totalPages, content, number, first, last, size } = data;

        this.gameList = content;
        this.totalPage = totalPages;
        this.actualPage = number;
        this.size = size;
        this.first = first;
        this.last = last;
        this.initialArray(this.totalPage);
      },
      (err) => {
        this.router.navigateByUrl('/404');
      }
    );
  };

  public decrementNumPage = (): void => {
    if (this.numPage > 0) {
      this.numPage--;
    }
    this.getAll();
    this.router.navigateByUrl(`/gameRoles?page=${this.numPage + 1}`);
  };

  public modifyNumPage = (num: number): void => {
    this.numPage = num;
    this.getAll();
    this.router.navigateByUrl(`/gameRoles?page=${this.numPage + 1}`);
  };

  public incrementNumPage = (): void => {
    if (this.numPage < this.totalPage) {
      this.numPage++;
    }
    this.getAll();
    this.router.navigateByUrl(`/gameRoles?page=${this.numPage + 1}`);
  };

  private initialArray = (total: number) => {
    for (let index = 0; index < total; index++) {
      this.arrayNumber[index] = index + 1;
    }
  };
}
