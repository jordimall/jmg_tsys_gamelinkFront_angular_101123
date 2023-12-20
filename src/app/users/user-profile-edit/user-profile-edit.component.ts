import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { UsersService } from '../../services/users.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [NavBarComponent, FormsModule],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.css'
})
export class UserProfileEditComponent {

  user:User = new User();

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(private token:TokenStorageService, private userService: UsersService, private router: Router, private authService:AuthService){}

  ngOnInit(){
    this.username = this.token.getUser().userName;
    this.email = this.token.getUser().sub;
  }

  save(){
    this.user!.id = this.token.getUser().id;
    this.user!.userName = this.username;
    this.user!.email = this.email;
    this.user!.password = this.password;
    this.userService.updateUser(this.user!)
      .subscribe(
        result => {
          this.token.signOut();
          this.authService.login(this.user.email!, this.user.password!).subscribe(
            data => {
              this.token.saveToken(data.token);
              this.token.saveUser(this.token.getDecodedToken());
              this.router.navigateByUrl("userProfile");
            },
            err => {
              console.log(err);
            }
          )
        },
        error => {
          console.log(error)
        }
      )
    
  }
}
