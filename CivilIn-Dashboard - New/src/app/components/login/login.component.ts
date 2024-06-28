import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  visible:boolean = true;
  changeType:boolean = true;

  constructor(public authService : AuthService, private titleService : Title) {
    this.titleService.setTitle("Login");
  }

  public viewpass(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  ngOnInit(): void {
  }

}
