import { Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';

export const routes: Routes = [
  {
    path: 'event',
    component: EventComponent,
    children: [
      { path: '', component: EventListComponent }
    ],
  },
];
