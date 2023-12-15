import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

}
