import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-gameroles',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './gameroles.component.html',
  styleUrl: './gameroles.component.css'
})
export class GamerolesComponent {

}
