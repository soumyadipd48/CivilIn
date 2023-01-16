import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  classList: any;

  constructor(public authService : AuthService) { }

  ngOnInit(): void {

    const hamburger = document.querySelector('.hamburger');

    hamburger?.addEventListener('click',  () => {
      this.classList.toggle('is-active');
    });

    // rotate(event){
    //   event.srcElement.classList.remove("rotate");
    //   setTimeout(()=>{
    //     event.srcElement.classList.add("rotate");
    //   },0)
    // }
  }

}
