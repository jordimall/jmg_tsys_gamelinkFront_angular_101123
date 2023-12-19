import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-event-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css',
})
export class EventEditComponent implements OnInit {
  id: any;
  event: Event = {};
  listGame: Game[] = [];
  date: Date = new Date();
  minDate: string = `${this.date.getFullYear()}-${
    this.date.getMonth() + 1
  }-${this.date.getDate()}`;
  limitLength: number = 255;

  eventForm = new FormGroup({
    name: new FormControl(this.event.name, Validators.required),
    description: new FormControl(this.event.description, [
      Validators.required,
      Validators.maxLength(this.limitLength),
    ]),
    status: new FormControl(this.event.status),
    start: new FormControl(this.event.start, Validators.required),
    end: new FormControl(
      { value: this.event.end, disabled: true },
      Validators.required
    ),
    id_game: new FormControl(this.event.idGame, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.gameService.allGame().subscribe(
        (data) => {
          this.listGame = data;
          this.getEvent(this.id);
        },
        (err) => {
          console.log({ status: err.status, messaje: err.message });
        }
      );
    }
  }

  private getEvent = (id: number): void => {
    this.eventService.getEvent(id).subscribe(
      (data) => {
        const selectedGame = this.listGame.find(
          (game) => game.id === data.idGame?.id
        );
        this.eventForm.patchValue({
          name: data.name,
          description: data.description,
          status: data.status,
          start: data.start,
          end: data.end,
          id_game: selectedGame,
        });
      },
      (err) => {
        this.router.navigateByUrl('/404');
      }
    );
  };

  onSubmit = (): void => {
    this.event = this.eventForm.value as Event;

    this.eventService.editEvent(this.id, this.event).subscribe(
      (data) => {
        this.router.navigate([`./event/show/${data.id}`]);
      },
      (err) => {
        console.log({ status: err.status, message: err.message });
      }
    );
  };
}
