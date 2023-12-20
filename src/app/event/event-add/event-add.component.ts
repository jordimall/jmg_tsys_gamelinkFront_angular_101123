import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Event } from '../../models/event.model';
import { Game } from '../../models/game.model';
import { EventService } from '../../services/event.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-event-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './event-add.component.html',
  styleUrl: './event-add.component.css',
})
export class EventAddComponent implements OnInit {
  event: Event = {};
  listGame: Game[] | any;
  date: Date = new Date();
  minDate: string = `${this.date.getFullYear()}-${ this.date.getMonth() + 1 }-${this.date.getDate()}`;
  limitLength: number = 255;

  eventForm = new FormGroup({
    name: new FormControl(this.event.name, Validators.required),
    description: new FormControl(this.event.description, [
      Validators.required,
      Validators.maxLength(this.limitLength),
    ]),
    status: new FormControl((this.event.status = 'Activo')),
    start: new FormControl(this.event.start, Validators.required),
    end: new FormControl(
      { value: this.event.end, disabled: true },
      Validators.required
    ),
    idGame: new FormControl('' ?? this.event.idGame, Validators.required),
  });

  constructor(
    private router: Router,
    private eventService: EventService,
    private gameService: GameService
  ) {
    this.eventForm.get('start')?.valueChanges.subscribe((val) => {
      if (val !== '') {
        this.eventForm.get('end')?.enable();
      } else {
        this.eventForm.get('end')?.disable();
      }
    });
  }

  ngOnInit(): void {
    this.gameService.allGame().subscribe(
      (data) => {
        this.listGame = data;
      },
      (err) => {
        this.router.navigateByUrl('/404');
      }
    );
  }

  onSubmit = (): void => {
    this.event = this.eventForm.value as Event;
    this.eventService.addEvent(this.event).subscribe(
      (data) => {
        this.router.navigate([`./event/show/${data.id}`]);
      },
      (err) => {
        this.router.navigateByUrl('/404');
      }
    );
  };
}
