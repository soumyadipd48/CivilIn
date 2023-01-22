import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Assistance } from 'src/app/models/assistance';
import { AssistanceService } from 'src/app/services/assistance.service';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal'
import { Router } from '@angular/router';

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
  selectedGRP = 'HWH-GRP';
  selectedPriority = 'Critical';
  selectedRemarks = '';
  searchText = '';
  p:number = 1;
  loader = true;
  modalRef!: BsModalRef;
  modalAssistance? : String = '';
  modalAssistance_progress_unId? : String = '';
  modalAssistance_progress_status? : string = '';
  modalAssistance_progress_priority? : String = '';
  message = '';
  showViewButton : boolean = true;

  //Demo purpose only, Data might come from Api calls/service
  name = 'Progress Bar';
  public counts = ["Recieved","Assigned","In Progress","Completed"];
  orderStatus?  = "";

  key : string = 'timestamp';
  reverse : boolean = false;

  constructor(private assistanceService : AssistanceService, private titleService : Title, private modalService : BsModalService, private router: Router) { 
    this.titleService.setTitle("CivilIn-assistance-list");
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
    })

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
    this.modalAssistance = JSON.stringify(assistance.assUnId);
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
    this.orderStatus = assistance.status;
    console.log("orderStatus "+this.orderStatus);
    this.modalRef = this.modalService.show(template);
  }

  public updateAssistance(): void {
    const data = {
      status: 'Assigned',
      assignedGRP: this.selectedGRP,
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
    this.modalService.hide();
  }

  toggleTag()
  {
    this.showViewButton = !this.showViewButton;
  }

}