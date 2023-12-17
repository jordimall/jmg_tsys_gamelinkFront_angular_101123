import { Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { LoginComponent } from './login/login.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { RegisterComponent } from './register/register.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { HomeComponent } from './home/home.component';
import { ListPartyComponent } from './parties/list-party/list-party.component';
import { PartyDetailsComponent } from './parties/party-details/party-details.component';
import { CreatePartyComponent } from './parties/create-party/create-party.component';
import { MyPartiesComponent } from './parties/myparties/my-parties/my-parties.component';
import { MyPartiesCreatedComponent } from './parties/myparties/my-parties-created/my-parties-created.component';
import { MyPartiesJoinedComponent } from './parties/myparties/my-parties-joined/my-parties-joined.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UsersComponent } from './users/users/users.component';
import { GameComponent } from './games/game/game.component';
import { CreateEditGameComponent } from './games/create-edit-game/create-edit-game.component';
import { TagComponent } from './tags/tag/tag.component';
import { CreateEditTagComponent } from './tags/create-edit-tag/create-edit-tag.component';
import { GameRoleComponent } from './gameroles/game-role/game-role.component';
import { CreateEditGameRoleComponent } from './gameroles/create-edit-game-role/create-edit-game-role.component';
import { GamerolesComponent } from './gameroles/gameroles.component';
import { TagsComponent } from './tags/tags.component';
import { GamesComponent } from './games/games.component';
import { PartiesComponent } from './parties/parties.component';
import { loggedInGuard } from './guards/logged-in.guard';

export const routes: Routes = [
  {
    path:'',
    component: LoginComponent 
  },
  {
    path: 'event',
    component: EventComponent,
    canActivate: [loggedInGuard],
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
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [loggedInGuard]
  },
  { path:'parties/:idGame', 
    component: ListPartyComponent,
    canActivate: [loggedInGuard]
  },
  {
    path:'partyDetails/:idParty',
    component: PartyDetailsComponent,
    canActivate: [loggedInGuard]
  },
  {
    path:'createParty',
    component: CreatePartyComponent,
    canActivate: [loggedInGuard]
  },
  {
    path:'myParties',
    component: PartiesComponent,
    canActivate: [loggedInGuard],
    children: [
      {path:'', component: MyPartiesComponent},
      {path:'created', component: MyPartiesCreatedComponent},
      {path:'joined', component: MyPartiesJoinedComponent}
    ],
  },
  {
    path:'userProfile/:idUser',
    component: UserProfileComponent,
    canActivate: [loggedInGuard]
  },
  {
    path:'users',
    component: UsersComponent,
    canActivate: [loggedInGuard]
  },
  { 
    path:'game',
    component: GamesComponent,
    canActivate: [loggedInGuard],
    children:[
      { path:'', component: CreateEditGameComponent},
      { path:':idGame', component: GameComponent},
      { path:'create', component: CreateEditGameComponent},
      { path:'edit/:idGame', component: CreateEditGameComponent}
    ],
  },
  {
    path:'tags',
    component: TagsComponent,
    canActivate: [loggedInGuard],
    children:[
      { path:'', component: TagComponent},
      { path:'create', component: CreateEditTagComponent},
      { path:'edit/:idTag', component: CreateEditTagComponent}
    ],
  },
  {
    path:'gameRoles',
    component: GamerolesComponent,
    canActivate: [loggedInGuard],
    children:[
      { path:'', component: GameRoleComponent},
      { path:'create', component: CreateEditGameRoleComponent},
      { path:'edit/:idTag', component: CreateEditGameRoleComponent}
    ],
  }
];
