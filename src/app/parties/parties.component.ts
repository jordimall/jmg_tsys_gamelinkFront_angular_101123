import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-parties',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.css'
})
export class PartiesComponent {

}
