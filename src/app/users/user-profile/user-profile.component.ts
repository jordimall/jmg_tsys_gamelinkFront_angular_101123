import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { UsersService } from '../../services/users.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavBarComponent, RouterLink, RouterOutlet],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user: any;

  constructor(private userService: UsersService, private token:TokenStorageService){}

  ngOnInit(){
    this.userService.getUserProfile()
    .subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      error => {
        console.log(error);
      }
    )
  }
}
