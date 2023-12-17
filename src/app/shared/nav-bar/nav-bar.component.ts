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
  constructor(private token:TokenStorageService) {}
  public isUserAdmin = (): boolean => {
    // Consulta al servicio de autenticación
    return true;
  };

  public isUserEventManager = (): boolean => {
    // Consulta al servicio de autenticación
    return true;
  };

  public logout = (): void => {
    this.token.signOut();
  };
}
