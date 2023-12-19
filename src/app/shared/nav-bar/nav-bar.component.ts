import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  userName: string = '';
  constructor(private token: TokenStorageService) {
    this.userName = token.getDecodedToken().userName;
  }
  public isUserAdmin = (): boolean => {
    if (this.token.getDecodedToken().role === 'ADMIN') {
      return true;
    }
    return false;
  };

  public isUserEventManager = (): boolean => {
    if (this.token.getDecodedToken().role === 'EVENT_MANAGER') {
      return true;
    }
    return false;
  };

  public logout = (): void => {
    this.token.signOut();
  };
}
