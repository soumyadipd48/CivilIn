import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-complaints-list',
  templateUrl: './complaints-list.component.html',
  styleUrls: ['./complaints-list.component.css']
})
export class ComplaintsListComponent implements OnInit {

  Complaints? : Complaint[];
  currentComplaint? : Complaint;
  currentIndex = -1;
  selectedcomplaintType = '';
  selectedComplaint? : Complaint[];
  searchText = '';
  selectedGRP = 'HWH-GRP';
  selectedPriority = 'Critical';
  selectedRemarks = '';
  order: any;
  showData: any;
  p:number = 1;
  loader = true;
  modalRef!: BsModalRef;
  modalComplaint? : String = '';
  modalComplaint_progress_unId? : String = '';
  modalComplaint_progress_status? : string = '';
  modalComplaint_progress_priority? : String = '';
  message = '';

  //Demo purpose only, Data might come from Api calls/service
  name = 'Progress Bar';
  public counts = ["Recieved","Assigned","In Progress","Completed"];
  orderStatus?  = "";

  constructor(private complaintService : ComplaintService, private titleService : Title, private modalService : BsModalService) {
    this.titleService.setTitle("CivilIn-complaints-list");
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader=false;
    }, 2000);
    this.retrieveComplaint();
  }

  retrieveComplaint() : void {
    this.complaintService.getAllComplaints().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
          ({ key : c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.Complaints = data;
      this.selectedComplaint = data;
    })
  }

  public valueSelected(){
    if(this.selectedcomplaintType === 'All')
    {
      this.selectedComplaint = this.Complaints;
      console.log("else" + this.selectedComplaint);
      console.log("Else selected head" + this.selectedcomplaintType);
    }
    else
    {
      this.selectedComplaint = this.Complaints?.filter(
        item => item.status === this.selectedcomplaintType
      );
      console.log("If" + this.selectedComplaint);
      console.log("If selected head" + this.selectedcomplaintType);
    }
  }

  key : string = 'complaintUnId';
  reverse : boolean = false;

  sort(key : string)
  {
    this.key=key;
    this.reverse = !this.reverse;
  }

  public openModal(template : TemplateRef<any>, complaint : Complaint)
  {
    sessionStorage.setItem('complaint_unId', JSON.stringify(complaint.complaintUnId));
    //sessionStorage.setItem('assistance_key', JSON.stringify(assistance.key));
    this.currentComplaint = complaint;
    this.modalComplaint = JSON.stringify(complaint.complaintUnId);
    this.modalRef = this.modalService.show(template);
  }

  openModal_progress(template : TemplateRef<any>, complaint : Complaint)
  {
    // sessionStorage.setItem('assistance_progress_unId', JSON.stringify(assistance.assUnId));
    // sessionStorage.setItem('assistance_progress_status', JSON.stringify(assistance.status));
    // sessionStorage.setItem('assistance_progress_priority', JSON.stringify(assistance.priority));
    this.modalComplaint_progress_unId = JSON.stringify(complaint.complaintUnId);
    this.modalComplaint_progress_status = JSON.stringify(complaint.status);
    this.modalComplaint_progress_priority = JSON.stringify(complaint.priority);
    this.orderStatus = complaint.status;
    console.log("orderStatus "+this.orderStatus);
    this.modalRef = this.modalService.show(template);
  }

  updateComplaint(): void {
    const data = {
      status: 'Assigned',
      assignedGRP: this.selectedGRP,
      priority: this.selectedPriority,
      remarks: this.selectedRemarks
      //description: this.currentTutorial.description
    };

    console.log(data);

    if (this.currentComplaint!.key) {
      this.complaintService.update(this.currentComplaint!.key, data)
        .then(() => this.message = 'The Complaint was updated successfully!')
        .catch(err => console.log(err));
    }

    sessionStorage.removeItem('complaint_unId');
    this.modalService.hide();
  }
}
