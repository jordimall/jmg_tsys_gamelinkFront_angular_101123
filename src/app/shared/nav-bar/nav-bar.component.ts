import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor() {}
  public isUserAdmin = (): boolean => {
    // Consulta al servicio de autenticación
    return true;
  };

  public isUserEventManager = (): boolean => {
    // Consulta al servicio de autenticación
    return true;
  };
}
