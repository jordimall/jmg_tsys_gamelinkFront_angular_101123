import { Component } from '@angular/core';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-event',
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [NavBarComponent, RouterOutlet],
})
export class EventComponent {}
