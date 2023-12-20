import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-event-show',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './event-show.component.html',
  styleUrl: './event-show.component.css',
})
export class EventShowComponent implements OnInit {
  id: any;
  event: Event | any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.eventService.getEvent(this.id).subscribe(
        (data) => {
          this.event = data;
        },
        (err) => {
          this.router.navigateByUrl('/404');
        }
      );
    }
  }

  public isUserEventManagerOrAdmin = (): boolean => {
    if (['EVENT_MANAGER', 'ADMIN'].includes(this.tokenService.getUser().role)) {
      return true;
    }
    return false;
  };
}
