import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  numPage: number = 0;
  eventList: Event | any;
  totalPage: number = 0;
  actualPage: number = 0;
  size:number=0;
  first: boolean = false;
  last: boolean = false;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.allEventPaginate(this.numPage).subscribe(
      (res: any) => {
        console.log(res)
        const { totalPages, content, number, first, last, size } = res;
        this.eventList = content;
        this.totalPage = totalPages;
        this.actualPage = number;
        this.size = size;
        this.first = first;
        this.last = last;
      },
      (err) => {
        console.log({ estatus: err.status, message: err.message });
      }
    );
  }

  public isUserEventManager = (): boolean => {
    // Consulta al servicio de autenticación
    return true;
  };

  public decrementNumPage = (): void => {
    if (this.numPage > 0) {
      this.numPage--;
    }
    this.ngOnInit();
  };

  public incrementNumPage = (): void => {
    if (this.numPage < this.totalPage) {
      this.numPage++;
    }
    this.ngOnInit();
  };
}
