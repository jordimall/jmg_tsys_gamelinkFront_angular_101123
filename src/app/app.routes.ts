import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventShowComponent } from './event/event-show/event-show.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { PartiesComponent } from './parties/parties.component';
import { ListPartyComponent } from './parties/list-party/list-party.component';
import { PartyDetailsComponent } from './parties/party-details/party-details.component';
import { CreatePartyComponent } from './parties/create-party/create-party.component';
import { MyPartiesComponent } from './parties/myparties/my-parties/my-parties.component';
import { MyPartiesCreatedComponent } from './parties/myparties/my-parties-created/my-parties-created.component';
import { MyPartiesJoinedComponent } from './parties/myparties/my-parties-joined/my-parties-joined.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UsersComponent } from './users/users/users.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './games/game/game.component';
import { CreateEditGameComponent } from './games/create-edit-game/create-edit-game.component';
import { TagsComponent } from './tags/tags.component';
import { TagComponent } from './tags/tag/tag.component';
import { CreateEditTagComponent } from './tags/create-edit-tag/create-edit-tag.component';
import { GamerolesComponent } from './gameroles/gameroles.component';
import { GameRoleComponent } from './gameroles/game-role/game-role.component';
import { CreateEditGameRoleComponent } from './gameroles/create-edit-game-role/create-edit-game-role.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { EditPartyComponent } from './parties/edit-party/edit-party.component';
import { GameShowComponent } from './games/game-show/game-show.component';
import { isAdminGuard } from './guards/is-admin.guard';
import { canManageEventsGuard } from './guards/can-manage-events.guard';
import { UserProfileEditComponent } from './users/user-profile-edit/user-profile-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'event',
    component: EventComponent,
    canActivate: [loggedInGuard],
    children: [
      { path: '', component: EventListComponent },
      { path: 'show/:id', component: EventShowComponent },
      { path: 'new', component: EventAddComponent, canActivate: [canManageEventsGuard] },
      { path: 'edit/:id', component: EventEditComponent, canActivate: [canManageEventsGuard] },
    ],
  },
  {
    path: 'parties/:idGame',
    component: ListPartyComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'party-details/:idParty',
    component: PartyDetailsComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'create-party',
    component: CreatePartyComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'edit-party/:idParty',
    component: EditPartyComponent,
    canActivate: [loggedInGuard]
  },
  {
    path: 'my-parties',
    component: PartiesComponent,
    canActivate: [loggedInGuard],
    children: [
      { path: '', redirectTo: 'created', pathMatch: 'full' },
      { path: 'created', component: MyPartiesCreatedComponent },
      { path: 'joined', component: MyPartiesJoinedComponent },
    ],
  },
  {
    path: 'userProfile',
    canActivate: [loggedInGuard],
    children: [
      { path: '', component: UserProfileComponent },
      { path: 'edit', component: UserProfileEditComponent }
    ]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [loggedInGuard, isAdminGuard]
  },
  {
    path: 'games',
    component: GamesComponent,
    canActivate: [loggedInGuard],
    children: [
      { path: '', component: GameComponent },
      { path: 'show/:idGame', component: GameShowComponent },
      { path: 'create', component: CreateEditGameComponent },
      { path: 'edit/:idGame', component: CreateEditGameComponent },

    ],
  },
  {
    path: 'tags',
    component: TagsComponent,
    canActivate: [loggedInGuard],
    children: [
      { path: '', component: TagComponent },
      { path: 'create', component: CreateEditTagComponent, canActivate: [isAdminGuard] },
      { path: 'edit/:idTag', component: CreateEditTagComponent, canActivate: [isAdminGuard] },
    ],
  },
  {
    path: 'gameRoles',
    component: GamerolesComponent,
    canActivate: [loggedInGuard],
    children: [
      { path: '', component: GameRoleComponent },
      { path: 'create', component: CreateEditGameRoleComponent, canActivate: [isAdminGuard] },
      { path: 'edit/:idGameRole', component: CreateEditGameRoleComponent, canActivate: [isAdminGuard] }
    ],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
];
