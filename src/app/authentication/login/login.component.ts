import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  username: string;
  isValid: boolean;
  constructor(private location: Location, private router: Router) {
    this.isValid = true;
  }

  ngOK() {
    if (this.username != undefined && this.username != "") {
      localStorage.setItem("username", this.username);
      this.isValid = true;
      this.router.navigate(['home/dashboard']);
    } else {
      this.isValid = false;
    }
  }
}
