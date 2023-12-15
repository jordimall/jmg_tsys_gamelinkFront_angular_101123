import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

}
