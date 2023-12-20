import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Event } from '../../models/event.model';
import { Game } from '../../models/game.model';
import { EventService } from '../../services/event.service';
import { GameService } from '../../services/game.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  eventList: Event[] | any;
  gameList: Game[] | any;
  idGame: string = '';
  numPage: number = 0;
  totalPage: number = 0;
  actualPage: number = 0;
  size: number = 0;
  first: boolean = true;
  last: boolean = true;
  arrayNumber: number[] = [];
  gameForm = new FormGroup({
    idGame: new FormControl(this.idGame),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private gameService: GameService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('page') === null) {
        this.numPage = Number.parseInt(params.get('page') ?? '1') - 1 ?? 0;
      }
    });

    this.getAll();

    this.gameService.allGame().subscribe(
      (data) => {
        this.gameList = data;
      },
      (err) => {
        this.router.navigateByUrl('/404');
      }
    );
  }

  public getAll = () => {
    this.idGame = this.gameForm.value.idGame as string;
    if (this.idGame === '') {
      this.eventService.allEventPaginate(this.numPage).subscribe(
        (res: any) => {
          const { totalPages, content, number, first, last, size } = res;
          this.eventList = content;
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
    } else {
      this.eventService
        .allEventPaginateByGame(this.numPage, this.idGame)
        .subscribe(
          (res: any) => {
            const { totalPages, content, number, first, last, size } = res;
            this.eventList = content;
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
    }
  };

  public isEventManagerOrAdmin = (): boolean => {
    if (
      ['EVENT_MANAGER', 'ADMIN'].includes(
        this.tokenService.getDecodedToken().role
      )
    ) {
      return true;
    }
    return false;
  };

  public decrementNumPage = (): void => {
    if (this.numPage > 0) {
      this.numPage--;
    }
    this.getAll();
    this.router.navigateByUrl(`/event?page=${this.numPage + 1}`);
  };

  public modifyNumPage = (num: number): void => {
    this.numPage = num;
    this.getAll();
    this.router.navigateByUrl(`/event?page=${this.numPage + 1}`);
  };

  public incrementNumPage = (): void => {
    if (this.numPage < this.totalPage) {
      this.numPage++;
    }
    this.getAll();
    this.router.navigateByUrl(`/event?page=${this.numPage + 1}`);
  };

  private initialArray = (total: number) => {
    for (let index = 0; index < total; index++) {
      this.arrayNumber[index] = index + 1;
    }
  };
}
