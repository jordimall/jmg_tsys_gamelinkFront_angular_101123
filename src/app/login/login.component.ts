import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: any;

  userName: string = "";
  password: string = "";

  constructor(private router:Router, private authService: AuthService, private tokenStorage: TokenStorageService){}

  ngOnInit(): void{
    if(this.tokenStorage.getToken()){
      this.router.navigateByUrl('/home');
    }
  }

  login(): void{
    document.getElementById("errorLogin")?.classList.add("hidden");
    if(this.validateLogin()){
      this.authService.login(this.userName, this.password).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.router.navigateByUrl('/home');
        },
        err => {
          console.log(err);
          document.getElementById("errorLogin")?.classList.remove("hidden");
        }
      )
    }
  }

  validateLogin(): boolean {
    var userName: HTMLElement | null = document.getElementById("errorEmail");
    var passwordError: HTMLElement | null = document.getElementById("errorPassword");

    this.checkEmpty(this.userName, userName);
    this.checkEmpty(this.password, passwordError);

    if (!userName?.classList.contains("hidden") ||
        !passwordError?.classList.contains("hidden")) {
        return false;
    }

    return true;
  }

  checkEmpty(field: string | undefined, errorField: HTMLElement | null): void{
    if(field === "") {
        errorField?.classList.remove("hidden");
    } 
    else {
        errorField?.classList.add("hidden");
    }
  }
}
