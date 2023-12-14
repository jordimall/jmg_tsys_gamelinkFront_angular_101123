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
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.allEventPaginate(this.numPage).subscribe(
      (res) => {
        this.eventList = res;
      },
      (err) => {
        console.log({ estatus: err.status, message: err.message });
      }
    );
  }
}
