import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Assistance } from 'src/app/models/assistance';
import { AssistanceService } from 'src/app/services/assistance.service';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal'
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.component.html',
  styleUrls: ['./assistance-list.component.css']
})
export class AssistanceListComponent implements OnInit {

  Assistance? : Assistance[];
  currentAssistance? : Assistance;
  currentIndex = -1;
  selectedHead = '';
  selectedAssistance? : Assistance[];
  selectedHWHAssistance? : Assistance[];
  selectedKGPAssistance? : Assistance[];
  selectedSGUJAssistance? : Assistance[];
  selectedSDAHAssistance? : Assistance[];
  selectedGRP = '---Select---';
  selectedGRPS = '---Select---';
  selectedPriority = '---Select---';
  selectedRemarks = '';
  selectedRemarksCompleted = '';
  searchText = '';
  p:number = 1;
  loader = true;
  modalRef!: BsModalRef;
  modalAssistance_assistanceId? : String = '';
  modalAssistance_assistanceDesc? : String = '';
  modalAssistance_progress_unId? : String = '';
  modalAssistance_progress_status? : string = '';
  modalAssistance_progress_priority? : String = '';
  modalAssistance_progress_assignedToGRP? : string = '';
  // modalAssistance_remarks_HQ? : string = '';
  modalAssistance_remarks? : string = '';
  modalAssistance_remarks_after_completion? : string = '';
  message = '';
  showViewButton : boolean = true;
  orderPriority? = '';
  assistanceStatus? = '';

  //Demo purpose only, Data might come from Api calls/service
  name = 'Progress Bar';
  public counts = ["Recieved","Assigned","In Progress","Completed"];
  orderStatus?  = "";

  key : string = 'timestamp';
  reverse : boolean = false;

  currentUser : string = '';

  today : Date = new Date();
  curHr = this.today.getHours();
  wish : string = '';

  count = 0;

  // ALL GRP names
  allGRP = [
    {
      id: 'HWH-GRP',
      name: 'Howrah'
    },
    {
      id: 'KGP-GRP',
      name: 'Kharagpur'
    },
    {
      id: 'SDAH-GRP',
      name: 'Sealdah'
    },
    {
      id: 'SGUJ-GRP',
      name: 'Siliguri'
    }
  ];

  constructor(private assistanceService : AssistanceService, private titleService : Title, private modalService : BsModalService, private router: Router) { 
    this.titleService.setTitle("CivilIn-assistance-list");

    this.isLoggedIn();
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader=false;
    }, 2000);
    this.retrieveAssistance();
  }

  refreshList(): void {
    this.currentAssistance = undefined;
    this.currentIndex = -1;
    this.retrieveAssistance();
  }

  public retrieveAssistance() : void {
    this.assistanceService.getAllAssintance().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
          ({ key : c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.Assistance = data;
      this.selectedAssistance = this.Assistance?.filter(
        item => item.status === 'Pending'
      );
      this.selectedHWHAssistance = this.Assistance?.filter(
        item => item.assignedGRP === 'HWH-GRP'
      )
      this.selectedKGPAssistance = this.Assistance?.filter(
        item => item.assignedGRP === 'KGP-GRP'
      )
      this.selectedSGUJAssistance = this.Assistance?.filter(
        item => item.assignedGRP === 'SGUJ-GRP'
      )
      this.selectedSDAHAssistance = this.Assistance?.filter(
        item => item.assignedGRP === 'SDAH-GRP'
      )
    })

    // let objectsLen = 0;
    // for (let i = 0; i < this.selectedAssistance!.length; i++) {

    //   // if entity is object, increase objectsLen by 1, which is the stores the total number of objects in array.
    //   if (this.selectedAssistance![i] instanceof Object) {
    //       objectsLen++;
    //   }
    // }

    // console.log(objectsLen);

    this.sortTimestamp(this.key);
  }

  public setActiveTutorial(assistance: Assistance, index: number): void {
    this.currentAssistance = assistance;
    this.currentIndex = index;
  }

  public valueSelected(){
    if(this.selectedHead === 'All')
    {
      this.selectedAssistance = this.Assistance;
      console.log("else" + this.selectedAssistance);
      console.log("Else selected head" + this.selectedHead);
    }
    else
    {
      this.selectedAssistance = this.Assistance?.filter(
        item => item.status === this.selectedHead
      );
      console.log("If" + this.selectedAssistance);
      console.log("If selected head" + this.selectedHead);
    }
  }

  public sort(key : string)
  {
    this.key=key;
    this.reverse = !this.reverse;
  }

  public sortTimestamp(key : string)
  {
    this.key=key;
    if(this.reverse == false){
      this.reverse = !this.reverse;
    }
    else{
      this.reverse = this.reverse;
    }
  }

  public openModal(template : TemplateRef<any>, assistance : Assistance)
  {
    sessionStorage.setItem('assistance_unId', JSON.stringify(assistance.assUnId));
    //sessionStorage.setItem('assistance_key', JSON.stringify(assistance.key));
    this.currentAssistance = assistance;
    this.modalAssistance_assistanceId = JSON.stringify(assistance.assUnId);
    // this.modalAssistance_assistanceDesc = JSON.stringify(assistance.assRemarks);
    this.modalAssistance_assistanceDesc = assistance.assRemarks;
    this.modalRef = this.modalService.show(template);
  }

  public openModal_progress(template : TemplateRef<any>, assistance : Assistance)
  {
    // sessionStorage.setItem('assistance_progress_unId', JSON.stringify(assistance.assUnId));
    // sessionStorage.setItem('assistance_progress_status', JSON.stringify(assistance.status));
    // sessionStorage.setItem('assistance_progress_priority', JSON.stringify(assistance.priority));
    this.modalAssistance_progress_unId = JSON.stringify(assistance.assUnId);
    this.modalAssistance_progress_status = JSON.stringify(assistance.status);
    this.modalAssistance_progress_priority = JSON.stringify(assistance.priority);
    this.modalAssistance_assistanceDesc = assistance.assRemarks;
    // this.modalAssistance_remarks_after_completion = assistance.remarksAfterCompletion;
    // this.modalAssistance_remarks_after_completion = assistance.modalAssistance_remarks_HQ;
    this.modalAssistance_remarks_after_completion = assistance.modalAssistance_remarks;
    this.modalAssistance_progress_assignedToGRP = assistance.assignedGRP;
    this.orderStatus = assistance.status;
    this.orderPriority = assistance.priority;
    console.log("orderStatus "+this.orderStatus);
    this.modalRef = this.modalService.show(template);
  }

  public openModal_afterAssigned(template : TemplateRef<any>, assistance : Assistance)
  {
    sessionStorage.setItem('assistance_unId', JSON.stringify(assistance.assUnId));
    this.currentAssistance = assistance;
    this.modalAssistance_progress_unId = JSON.stringify(assistance.assUnId);
    // this.modalAssistance_progress_status = JSON.stringify(assistance.status);
    this.modalAssistance_assistanceDesc = assistance.assRemarks;
    this.modalAssistance_progress_priority = JSON.stringify(assistance.priority);
    // this.modalAssistance_remarks_HQ = assistance.remarks;
    this.modalAssistance_remarks = assistance.remarks;
    this.orderStatus = assistance.status;
    this.orderPriority = assistance.priority;
    console.log("orderStatus "+this.orderStatus);
    this.modalRef = this.modalService.show(template);
  }

  public openModal_complete(template : TemplateRef<any>, assistance : Assistance)
  {
    sessionStorage.setItem('assistance_unId', JSON.stringify(assistance.assUnId));
    this.currentAssistance = assistance;
    this.modalAssistance_progress_unId = JSON.stringify(assistance.assUnId);
    this.modalAssistance_assistanceDesc = assistance.assRemarks;
    this.modalAssistance_progress_priority = JSON.stringify(assistance.priority);
    // this.modalAssistance_remarks_HQ = assistance.remarks;
    this.modalAssistance_remarks = assistance.remarks;
    this.orderStatus = assistance.status;
    this.orderPriority = assistance.priority;
    this.modalRef = this.modalService.show(template);
  }

  public updateAssistance(): void {
    const data = {
      status: 'Assigned',
      assignedGRP: this.selectedGRP,
      assignedGRPS: this.selectedGRPS,
      priority: this.selectedPriority,
      remarks: this.selectedRemarks
      //description: this.currentTutorial.description
    };

    console.log(data);

    if (this.currentAssistance!.key) {
      this.assistanceService.update(this.currentAssistance!.key, data)
        .then(() => this.message = 'The Assistance was updated successfully!')
        .catch(err => console.log(err));
    }

    sessionStorage.removeItem('assistance_unId');
    this.selectedGRP = '';
    this.selectedGRPS = '';
    this.selectedPriority = '';
    this.selectedRemarks = '';
    this.modalService.hide();
  }

  public acceptAssistance(): void {
    const data = {
      status: 'In Progress',
    };

    console.log("data after assign" + data);

    if (this.currentAssistance!.key) {
      this.assistanceService.update(this.currentAssistance!.key, data)
        .then(() => this.message = 'The Assistance was updated successfully!')
        .catch(err => console.log(err));
    }

    sessionStorage.removeItem('assistance_unId');
    this.modalService.hide();
  }

  public completeAssistance(): void {
    const data = {
      status: 'Completed',
      // remarksAfterCompletion : this.selectedRemarksCompleted
      // modalAssistance_remarks_HQ : this.selectedRemarksCompleted
      modalAssistance_remarks : this.selectedRemarksCompleted
    };

    console.log("data after assign" + data);

    if (this.currentAssistance!.key) {
      this.assistanceService.update(this.currentAssistance!.key, data)
        .then(() => this.message = 'Assistance completed successfully!')
        .catch(err => console.log(err));
    }

    sessionStorage.removeItem('assistance_unId');
    // this.selectedRemarksCompleted = '';
    this.selectedRemarksCompleted = '';
    this.modalService.hide();
  }

  toggleTag()
  {
    this.showViewButton = !this.showViewButton;
  }

  public isLoggedIn() {
    var CryptoJS = require("crypto-js");
    const secret = "xkMBON33!78kn@";
    let UserStr = sessionStorage.getItem('user')!;
    const decTempUser = CryptoJS.AES.decrypt(UserStr, secret);
    const user = JSON.parse(decTempUser.toString(CryptoJS.enc.Utf8));
    this.currentUser = user.email;
    //console.log(this.currentUser);
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

  // Code for Assign functionality for #template_new

  allGRPS: any[] = [];
  form_assign_assistance = new FormGroup({
    GRP: new FormControl(),
    GRPS: new FormControl()
  });
  
  public checkFirstDropdown($event: any){
     this.allGRPS=GRPSList.filter(c=>c.cid===$event);
      let  itm=this.allGRPS[0];
      this.form_assign_assistance.controls['GRPS'].setValue(itm.id);
     console.log($event);
  }
}

export const GRPSList = [
  {
    id: "1",
    cid: 'HWH-GRP',
    city: "Howrah",
  },
  {
    id: "2",
     cid: 'HWH-GRP',
    city: "Belur",
  
  },
  {
    id: "3",
     cid: 'HWH-GRP',
    city: "Kamarkundu",
  
  },
  {
    id: "4",
     cid: 'HWH-GRP',
    city: "Sheoraphully",
  
  },
  {
    id: "5",
     cid: 'HWH-GRP',
    city: "Bandel",
  
  },
  {
    id: "6",
     cid: 'HWH-GRP',
    city: "Burdwan",
  
  },
  {
    id: "7",
     cid: 'HWH-GRP',
    city: "Andal",
  
  },
  {
    id: "8",
     cid: 'HWH-GRP',
    city: "Asansol",
  
  },
  {
    id: "9",
     cid: 'HWH-GRP',
    city: "Kalna",
  
  },
  {
    id: "10",
     cid: 'HWH-GRP',
    city: "Katwa",
  
  },
  {
    id: "11",
     cid: 'HWH-GRP',
    city: "Sainthia",
  
  },
  {
    id: "12",
     cid: 'HWH-GRP',
    city: "Suri",
  
  },
  {
    id: "13",
     cid: 'HWH-GRP',
    city: "Azimganj",
  
  },
  {
    id: "14",
    cid: 'SDAH-GRP',
    city: "Sealdah",
  },
  {
    id: "15",
    cid: 'SDAH-GRP',
    city: "Dum_Dum",
  },
  {
    id: "16",
     cid: 'SDAH-GRP',
    city: "Chitput",
  
  },
  {
    id: "17",
     cid: 'SDAH-GRP',
    city: "Naihati",
  
  },
  {
    id: "18",
     cid: 'SDAH-GRP',
    city: "Ranaghat",
  
  },
  {
    id: "19",
     cid: 'SDAH-GRP',
    city: "Krishnanagar",
  
  },
  {
    id: "20",
     cid: 'SDAH-GRP',
    city: "Berhampore_Court",
  
  },
  {
    id: "21",
     cid: 'SDAH-GRP',
    city: "Bongoan",
  
  },
  {
    id: "22",
     cid: 'SDAH-GRP',
    city: "Barasat",
  
  },
  {
    id: "23",
     cid: 'SDAH-GRP',
    city: "Ballygunge",
  
  },
  {
    id: "24",
     cid: 'SDAH-GRP',
    city: "Jadavpur",
  
  },
  {
    id: "25",
     cid: 'SDAH-GRP',
    city: "Sonarpur",
  
  },
  {
    id: "26",
     cid: 'SDAH-GRP',
    city: "Baruipur",
  
  },
  {
    id: "27",
     cid: 'SDAH-GRP',
    city: "Diamond_Harbour",
  
  },
  {
    id: "28",
    cid: 'SGUJ-GRP',
    city: "Malda_Town",
  },
  {
    id: "29",
    cid: 'SGUJ-GRP',
    city: "Dalkhola",
  },
  {
    id: "30",
    cid: 'SGUJ-GRP',
    city: "New_Jalpaiguri ",
  },
  {
    id: "31",
    cid: 'SGUJ-GRP',
    city: "New_maynaguri",
  },
  {
    id: "32",
    cid: 'SGUJ-GRP',
    city: "New_Coochbehar",
  },
  {
    id: "33",
     cid: 'SGUJ-GRP',
    city: "Alipurduar_Jn",
  
  },
  {
    id: "34",
     cid: 'SGUJ-GRP',
    city: "Siliguri_Town",
  
  },
  {
    id: "35",
     cid: 'SGUJ-GRP',
    city: "New_Mal_Jn",
  
  },
  {
    id: "36",
     cid: 'SGUJ-GRP',
    city: "Balurghat",
  
  },
  {
    id: "37",
     cid: 'KGP-GRP',
    city: "Shalimar",
  
  },
  {
    id: "38",
     cid: 'KGP-GRP',
    city: "Uluberia",
  
  },
  {
    id: "39",
     cid: 'KGP-GRP',
    city: "Panskura",
  
  },
  {
    id: "40",
     cid: 'KGP-GRP',
    city: "Haldia",
  
  },
  {
    id: "41",
    cid: 'KGP-GRP',
    city: "Digha",
  },
  {
    id: "42",
     cid: 'KGP-GRP',
    city: "Kharagpur",
  
  },
  {
    id: "43",
    cid: 'KGP-GRP',
    city: "Jhargram",
  },
  {
    id: "44",
    cid: 'KGP-GRP',
    city: "Bankura",
  },
  {
    id: "45",
    cid: 'KGP-GRP',
    city: "Adra",
  },
  {
    id: "46",
    cid: 'KGP-GRP',
    city: "Purulia",
  },
];