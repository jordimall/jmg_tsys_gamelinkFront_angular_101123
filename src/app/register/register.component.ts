import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name: string = "";
  email: string = "";
  password: string = "";

  readonly regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  constructor(private router:Router){}

  validateRegister(): boolean {
    var nameError: HTMLElement | null = document.getElementById("errorName");
    var emailError: HTMLElement | null = document.getElementById("errorEmail");
    var passwordError: HTMLElement | null = document.getElementById("errorPassword");

    this.checkEmpty(this.name, nameError);
    this.checkEmpty(this.email, emailError);
    this.checkEmpty(this.password, passwordError);

    if (!nameError?.classList.contains("hidden") ||
        !emailError?.classList.contains("hidden")||
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
    if(errorField == document.getElementById("errorEmail")){
      if(this.regex_email.test(this.email) == false){
        errorField?.classList.remove("hidden");
      }
    }
  }
  
  register(){
    if(this.validateRegister()){
      this.router.navigateByUrl('/login');
    }
  }
}
