import { Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventShowComponent } from './event/event-show/event-show.component';

export const routes: Routes = [
  {
    path: 'event',
    component: EventComponent,
    children: [
      { path: '', component: EventListComponent },
      { path: 'show/:id', component: EventShowComponent },
    ],
  },
];
