import { Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { LoginComponent } from './login/login.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { RegisterComponent } from './register/register.component';
export const routes: Routes = [
  {
    path: 'event',
    component: EventComponent,
    children: [
      { path: '', component: EventListComponent },
      { path: 'show/:id', component: EventShowComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }
];
