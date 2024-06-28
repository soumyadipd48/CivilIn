import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { Grps } from 'src/app/models/grps';
import { GrpsService } from 'src/app/services/grps.service';

@Component({
  selector: 'app-grps-list',
  templateUrl: './grps-list.component.html',
  styleUrls: ['./grps-list.component.css']
})
export class GrpsListComponent implements OnInit {

  loader = true;
  GRPS! : Grps[];
  currentUser : string = '';
  today : Date = new Date();
  curHr = this.today.getHours();
  wish : string = '';
  key : string = '';
  message = '';
  currentGrps? : Grps;
  lastUpdatedBy? : string = '';
  lastUpdatedTime? : Date;

  selectedGRPName? : string = '';

  form = new FormGroup({
    GRPName: new FormControl(),
  });

  // Pagination parameters.
  p: number = 1;
  count: number = 5;

  constructor(private titleService : Title, private modalService : BsModalService, private grpsService : GrpsService) {
    this.titleService.setTitle("CivilIn-GRP-list");

    this.isLoggedIn();
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader=false;
    }, 2000);
    this.retrieveGRPS();
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  public retrieveGRPS() : void {
    this.grpsService.getAllGRPs().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
          ({ key : c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.GRPS = data;
      console.log(this.GRPS);
    });
  }

  public isLoggedIn() {
    var CryptoJS = require("crypto-js");
    const secret = "xkMBON33!78kn@";
    let UserStr = sessionStorage.getItem('user')!;
    const decTempUser = CryptoJS.AES.decrypt(UserStr, secret);
    const user = JSON.parse(decTempUser.toString(CryptoJS.enc.Utf8));
    this.currentUser = user.email;
    // this.retrieveUserGRPS();
    console.log(this.currentUser);
    if(this.curHr<12)
    {
      this.wish = 'Good Morning';
    } else if(this.curHr<16)
    {
      this.wish = 'Good Afternoon';
    } else
    {
      this.wish = 'Good Evening';
    }
  }

  public openModalGRPSDetails(grps : Grps) {
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main_new');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main_new is-blurred';
    sessionStorage.setItem('GRPS_unId', JSON.stringify(grps.grpsUnId));
    this.currentGrps = grps;
    const modelDiv = document.getElementById('myModal_GRPS_Details');
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
  }

  public closeModalGRPSDetails(){
    const modelDiv = document.getElementById('myModal_GRPS_Details');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main_new');
    navigation!.className = 'navigation';
    main!.className = 'main_new';
    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
  }

  public openModalGRPSEdit(grps : Grps){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main_new');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main_new is-blurred';
    sessionStorage.setItem('GRPS_unId', JSON.stringify(grps.grpsUnId));
    this.currentGrps = grps;
    const modelDiv = document.getElementById('myModal_GRPS_Edit');
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
  }

  public closeModalGRPSEdit(){
    const modelDiv = document.getElementById('myModal_GRPS_Edit');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main_new');
    navigation!.className = 'navigation';
    main!.className = 'main_new';
    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
  }

  public submitModalGRPSEdit(){

    console.log("this.selectedGRPName : " + this.selectedGRPName);
    const data = {
      grpsName : this.selectedGRPName,
      // lastUpdatedBy : this.lastUpdatedBy,
      // lastUpdatedTime : this.lastUpdatedTime
    };

    console.log("Data " + data.grpsName);

    if (this.currentGrps!.key) {
      this.grpsService.update(this.currentGrps!.key, data)
        .then(() => this.message = 'The GRP is updated successfully!')
        .catch(err => console.log(err));
    }
    this.closeModalGRPSEdit();
  }
}
