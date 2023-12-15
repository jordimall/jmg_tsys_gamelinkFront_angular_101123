import { Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { LoginComponent } from './login/login.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';

export const routes: Routes = [
  {
    path: 'event',
    component: EventComponent,
    children: [
      { path: '', component: EventListComponent },
      { path: 'show/:id', component: EventShowComponent },
      { path: 'new', component: EventAddComponent },
      { path: 'edit/:id', component: EventEditComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
