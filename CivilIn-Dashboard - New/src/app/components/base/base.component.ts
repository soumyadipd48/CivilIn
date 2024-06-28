import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(private titleService : Title) {
    this.titleService.setTitle("CivilIn-Dashboard");
   }

  ngOnInit(): void {
  }

}
