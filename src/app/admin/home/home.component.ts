import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
