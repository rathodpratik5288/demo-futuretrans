import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { notification } from '../../models/notification';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  currentUser: user;
  notificationList: notification[];
  defaultSearchValue: string;
  constructor(private router: Router){
    this.currentUser = {
      id: 1,
      name: '',
      imagePath: "./assets/images/user1.png"
    };
    this.defaultSearchValue = 'Cat';
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined'){
      this.currentUser.name = localStorage.getItem("username") || '';
    }
    
    this.notificationList = [
      {
        id: 1,
        message: "John invited you"
      },
      {
        id: 2,
        message: "You have message from Peter"
      }
    ]
  }

  logout(){
    localStorage.setItem("username",'');
    this.router.navigate(['home/dashboard']);
  }

}
