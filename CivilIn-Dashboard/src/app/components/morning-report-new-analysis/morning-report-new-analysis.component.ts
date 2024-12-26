import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AllDetails } from 'src/app/models/all-details';
import { DetailsCategoryMapping } from 'src/app/models/details-category-mapping';
import { FirCase } from 'src/app/models/fir-case';
import { PreventiveArrest } from 'src/app/models/preventive-arrest';
import { Seizure } from 'src/app/models/seizure';
import { SpecificArrest } from 'src/app/models/specific-arrest';
import { Strength } from 'src/app/models/strength';
import { UdCase } from 'src/app/models/ud-case';
import { HowrahService } from 'src/app/services/howrah.service';
import { KharagpurService } from 'src/app/services/kharagpur.service';
import { SealdahService } from 'src/app/services/sealdah.service';
import { SiliguriService } from 'src/app/services/siliguri.service';

@Component({
  selector: 'app-morning-report-new-analysis',
  templateUrl: './morning-report-new-analysis.component.html',
  styleUrls: ['./morning-report-new-analysis.component.css']
})
export class MorningReportNewAnalysisComponent implements OnInit {

  classToggled = false;
  loader = true;
  currentUser : string = '';
  today : Date = new Date();
  curHr = this.today.getHours();
  wish : string = '';
  selectedGRPS : string = 'Select';
  strengthObjectHowrah!: any;
  strengthObjectKharagpur!: any;
  strengthObjectSealdah!: any;
  strengthObjectSiliguri!: any;
  PreventiveArrestObject!: any;
  PreventiveArrestObjectMain : PreventiveArrest = new PreventiveArrest();
  preventiveArrestDetailsAll : PreventiveArrest = new PreventiveArrest();
  FIRCaseObject!: any;
  FIRCaseObjectMain : FirCase[] = new Array();
  SeizureObject!: any;
  SeizureObjectMain : Seizure[] = new Array();
  UDCaseObject!: any;
  UDCaseObjectMain : UdCase[] = new Array();

  trainingStrengthCommon : Strength = new Strength();
  deputationfromotherunitStrengthCommon : Strength = new Strength();
  otherdutyStrengthCommon : Strength = new Strength();
  miscdutyStrengthCommon : Strength = new Strength();
  sanctionStrengthCommon : Strength = new Strength();
  vacancyStrengthCommon : Strength = new Strength();
  actualStrengthCommon : Strength = new Strength();
  miscdutyathqrdutyStrengthCommon : Strength = new Strength();
  availableStrengthCommon : Strength = new Strength();
  campStrengthCommon : Strength = new Strength();
  deputationtootherunitStrengthCommon : Strength = new Strength();
  leaveStrengthCommon : Strength = new Strength();
  securityguardStrengthCommon : Strength = new Strength();
  miscdutyatgrpsStrengthCommon : Strength = new Strength();
  trainguardStrengthCommon : Strength = new Strength();
  staticguardStrengthCommon : Strength = new Strength();
  suspensionStrengthCommon : Strength = new Strength();
  specificArrestCountCommon = 0;
  preventiveArrestCountCommon = 0;
  UDCaseCountCommon = 0;
  SeizureCountCommon = 0;
  FirCaseCountCommon = 0;
  preventiveArrestDetailsCommon! : PreventiveArrest;
  totalArrestCountCommon = 0;

  allDetailsObject!: any;
  detailsCategoryMappingObject!: any;

  allDetailsArr : AllDetails = new AllDetails();  
  allDetailsArrHowrah : AllDetails = new AllDetails();
  allDetailsArrBelur : AllDetails = new AllDetails();
  allDetailsArrKamarkundu : AllDetails = new AllDetails();
  allDetailsArrSheoraphuli : AllDetails = new AllDetails();
  allDetailsArrBandel : AllDetails = new AllDetails();
  allDetailsArrBurdwan : AllDetails = new AllDetails();
  allDetailsArrAndal : AllDetails = new AllDetails();
  allDetailsArrAsansol : AllDetails = new AllDetails();
  allDetailsArrKalna : AllDetails = new AllDetails();
  allDetailsArrKatwa : AllDetails = new AllDetails();
  allDetailsArrSainthia : AllDetails = new AllDetails();
  allDetailsArrSuri : AllDetails = new AllDetails();
  allDetailsArrAzimganj : AllDetails = new AllDetails();
  allDetailsArrHowrahTotal : AllDetails[] = new Array(this.allDetailsArrHowrah);
  detailsCategoryPrevArrestMappingArr : DetailsCategoryMapping = new DetailsCategoryMapping();
  detailsCategoryFIRMappingArr : DetailsCategoryMapping = new DetailsCategoryMapping();
  detailsCategorySeizureMappingArr : DetailsCategoryMapping = new DetailsCategoryMapping();
  detailsCategoryUDCaseMappingArr : DetailsCategoryMapping = new DetailsCategoryMapping();

  constructor(private howrahService : HowrahService, private kharagpurService : KharagpurService, private sealdahService : SealdahService, private siliguriService : SiliguriService, private titleService : Title, private toastr: ToastrService) {
    this.titleService.setTitle("CivilIn-morning-report-analysis");

    this.isLoggedIn();
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader=false;
    }, 2000);
  }

  public isLoggedIn() {
    var CryptoJS = require("crypto-js");
    const secret = "xkMBON33!78kn@";
    let UserStr = sessionStorage.getItem('user')!;
    const decTempUser = CryptoJS.AES.decrypt(UserStr, secret);
    const user = JSON.parse(decTempUser.toString(CryptoJS.enc.Utf8));
    this.currentUser = user.email;

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

  public toggleMenu() {
    this.classToggled = !this.classToggled;
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  public valueSelected(){
    if(this.currentUser === 'grphq.control.room@gmail.com'){
      if(this.selectedGRPS === 'Howrah')
      {
        this.retrieveStrengthDetailsHowrahToday();
        this.retrieveAllDetailsHowrahToday();
        this.retrievePreventiveCasesHowrahToday();
      }
      else if(this.selectedGRPS === 'Sealdah')
      {
        this.retrieveStrengthDetailsSealdahToday();
        this.retrieveAllDetailsSealdahToday();
      }
      else if(this.selectedGRPS === 'Siliguri')
      {
        this.retrieveStrengthDetailsSiliguriToday();
        this.retrieveAllDetailsSiliguriToday();
      }
      else if(this.selectedGRPS === 'Kharagpur')
      {
        this.retrieveStrengthDetailsKharagpurToday();
        this.retrieveAllDetailsKharagpurToday();
      }
    }
  }

  //Howrah services start

  public retrieveStrengthDetailsHowrahToday() : string {
    var res : string = "";
    this.howrahService.getStrengthHowrah().subscribe((data) => {
      this.strengthObjectHowrah = data;
      console.log(this.strengthObjectHowrah);

      if(this.strengthObjectHowrah.length > 0){
        this.strengthObjectHowrah.forEach( (element : any) => {
          if(element.strengthDesc! === "Deputation from other Unit"){
            this.deputationfromotherunitStrengthCommon = element
          }
          if(element.strengthDesc! === "Other duty"){
            this.otherdutyStrengthCommon = element
          }
          if(element.strengthDesc! === "Misc.Duty"){
            this.miscdutyStrengthCommon = element
          }
          if(element.strengthDesc! === "Sanction Strength"){
            this.sanctionStrengthCommon = element
          }
          if(element.strengthDesc! === "Vacancy"){
            this.vacancyStrengthCommon = element
          }
          if(element.strengthDesc! === "Actual Strength"){
            this.actualStrengthCommon = element
          }
          if(element.strengthDesc! === "Mise. Duty at Hqr. Duty"){
            this.miscdutyathqrdutyStrengthCommon = element
          }
          if(element.strengthDesc! === "Available Strength"){
            this.availableStrengthCommon = element
          }
          if(element.strengthDesc! === "Camp"){
            this.campStrengthCommon = element
          }
          if(element.strengthDesc! === "Training"){
            this.trainingStrengthCommon = element
          }
          if(element.strengthDesc! === "Deputation to other Unit"){
            this.deputationtootherunitStrengthCommon = element
          }
          if(element.strengthDesc! === "Leave"){
            this.leaveStrengthCommon = element
          }
          if(element.strengthDesc! === "Security Guard"){
            this.securityguardStrengthCommon = element
          }
          if(element.strengthDesc! === "Misc.Duty at GRPS/GRPP"){
            this.miscdutyatgrpsStrengthCommon = element
          }
          if(element.strengthDesc! === "Train Guard"){
            this.trainguardStrengthCommon = element
          }
          if(element.strengthDesc! === "Static Guard "){
            this.staticguardStrengthCommon = element
          }
          if(element.strengthDesc! === "Suspension"){
            this.suspensionStrengthCommon = element
          }
        });
        res = "Data Found";
        console.log(res);
      }else{
        this.sanctionStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.trainingStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.deputationfromotherunitStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.otherdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.miscdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.vacancyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.actualStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.miscdutyathqrdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.availableStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.campStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.deputationtootherunitStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.leaveStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.securityguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.miscdutyatgrpsStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.trainguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.staticguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.suspensionStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        res = "No Data Found";
        console.log(res);
        this.showSuccessDataNotFound('Not Found', 'Strength data not found for Howrah today!');
      }
  })
  return res;
  }

  public retrieveAllDetailsHowrahToday() {
    var res : string = "";
    this.howrahService.getAllDetailsHowrah().subscribe((allDetails) => {
      this.allDetailsObject = allDetails;
      console.log(this.allDetailsObject);

      if(this.allDetailsObject.length > 0){
        this.allDetailsObject.forEach( (element : AllDetails) => {
          this.allDetailsArr = element
          console.log("inside this.allDetailsArr.dateofReport" + this.allDetailsArr.dateofReport);
          if(element.grps! === "Howrah"){
            this.allDetailsArrHowrah = element
          }
          if(element.grps! === "Belur"){
            this.allDetailsArrBelur = element
          }
          if(element.grps! === "Kamarkundu"){
            this.allDetailsArrKamarkundu = element
          }
          if(element.grps! === "Sheoraphuli"){
            this.allDetailsArrSheoraphuli = element
          }
          if(element.grps! === "Bandel"){
            this.allDetailsArrBandel = element
          }
          if(element.grps! === "Burdwan"){
            this.allDetailsArrBurdwan = element
          }
          if(element.grps! === "Andal"){
            this.allDetailsArrAndal = element
          }
          if(element.grps! === "Asansol"){
            this.allDetailsArrAsansol = element
          }
          if(element.grps! === "Kalna"){
            this.allDetailsArrKalna = element
          }
          if(element.grps! === "Katwa"){
            this.allDetailsArrKatwa = element
          }
          if(element.grps! === "Sainthia"){
            this.allDetailsArrSainthia = element
          }
          if(element.grps! === "Suri"){
            this.allDetailsArrSuri = element
          }
          if(element.grps! === "Azimganj"){
            this.allDetailsArrAzimganj = element
          }
        })
        res = "All Details Data Found";
        console.log(res);
        this.allDetailsArrHowrahTotal = [
           this.allDetailsArrHowrah, this.allDetailsArrBelur,
           this.allDetailsArrKamarkundu, this.allDetailsArrSheoraphuli,
           this.allDetailsArrBandel, this.allDetailsArrBurdwan, this.allDetailsArrAndal, this.allDetailsArrAsansol,
           this.allDetailsArrKalna, this.allDetailsArrKatwa, this.allDetailsArrSainthia, this.allDetailsArrSuri,
           this.allDetailsArrAzimganj
          ];
      }else{
        this.allDetailsArr = {
          grp : 'NA',
          specCountToday : '0',
          fircountToday : '0',
	        otherCasesToday : '0',
	        totalCasesCountToday : '0',
          typeOfCrime : '-',
          udcountToday : '0',
	        seizureCountToday : '0',
        };
        res = "No Data Found";
        console.log(res);
        this.showSuccessDataNotFound('Not Found', 'All Details data Not found for Howrah today!');
      }
    })
  }

  public retrievePreventiveCasesHowrahToday() {
    var res : string = "";
    this.howrahService.getPreventiveArrestHowrah().subscribe((dataPreventiveArrest) => {
      this.PreventiveArrestObject = dataPreventiveArrest;
      console.log(this.PreventiveArrestObject);

      this.PreventiveArrestObject.forEach( (elementnew : any) => {
        this.preventiveArrestDetailsAll = elementnew;
      })
    }
  )
  }

  //Howrah services end

  //Sealdah services start

  public retrieveStrengthDetailsSealdahToday() : string {
    var res : string = "";  	
    this.sealdahService.getStrengthSealdahToday().subscribe((data) => {
      this.strengthObjectSealdah = data;
      console.log(this.strengthObjectSealdah);

      if(this.strengthObjectSealdah.length > 0){
      this.strengthObjectSealdah.forEach( (element : any) => {
        if(element.strengthDesc! === "Deputation from other unit "){
          this.deputationfromotherunitStrengthCommon = element
        }
        if(element.strengthDesc! === "Other Duty"){
          this.otherdutyStrengthCommon = element
          console.log("this.otherdutyStrengthCommon.const : "+this.otherdutyStrengthCommon.const);
        }
        if(element.strengthDesc! === "Sanction Strength"){
          this.sanctionStrengthCommon = element
        }
        if(element.strengthDesc! === "Vacancy"){
          this.vacancyStrengthCommon = element
        }
        if(element.strengthDesc! === "Actual Strength"){
          this.actualStrengthCommon = element
        }
        if(element.strengthDesc! === "Misc. duty at HQr."){
          this.miscdutyathqrdutyStrengthCommon = element
        }
        if(element.strengthDesc! === "Available Strength"){
          this.availableStrengthCommon = element
        }
        if(element.strengthDesc! === "Camp"){
          this.campStrengthCommon = element
        }
        if(element.strengthDesc! === "Training"){
          this.trainingStrengthCommon = element
        }
        if(element.strengthDesc! === "Deputation to other unit"){
          this.deputationtootherunitStrengthCommon = element
        }
        if(element.strengthDesc! === "Leave"){
          this.leaveStrengthCommon = element
        }
        if(element.strengthDesc! === "Security Guard"){
          this.securityguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Misc. duty at GRPS/GRPP"){
          this.miscdutyatgrpsStrengthCommon = element
        }
        if(element.strengthDesc! === "Train Guard"){
          this.trainguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Static Guard"){
          this.staticguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Suspension"){
          this.suspensionStrengthCommon = element
        }
      });
      res = "Data Found";
        console.log(res);
    }else{
        this.sanctionStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.trainingStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.deputationfromotherunitStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.otherdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.miscdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.vacancyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.actualStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.miscdutyathqrdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.availableStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.campStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.deputationtootherunitStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.leaveStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.securityguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.miscdutyatgrpsStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.trainguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.staticguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        this.suspensionStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
        };
        res = "No Data Found";
        console.log(res);
        this.showSuccessDataNotFound('Not Found', 'Strength data not found for Sealdah today!');
    }
  })
  return res;
  }

  public retrieveAllDetailsSealdahToday() {
    var res : string = "";
    this.sealdahService.getAllDetailsSealdah().subscribe((allDetails) => {
      this.allDetailsObject = allDetails;
      console.log(this.allDetailsObject);

    if(this.allDetailsObject.length > 0){
      this.allDetailsObject.forEach( (element : any) => {
        this.allDetailsArr = element
        console.log("inside this.allDetailsArr.dateofReport" + this.allDetailsArr.dateofReport);
        this.allDetailsArr.typeOfCrime = "Sealdah : Theft : Aadhar Card, Pan Card"
      })
      res = "All Details Data Found";
        console.log(res);
      }else{
        this.allDetailsArr = {
          grp : 'NA',
          specCountToday : '0',
	        prevCountToday : '0',
	        totalArrestCountToday : '0',
          fircountToday : '0',
	        otherCasesToday : '0',
	        totalCasesCountToday : '0',
          udcountToday : '0',
	        seizureCountToday : '0',
          grps : 'NA'
        };
        res = "No Data Found";
        console.log(res);
        this.showSuccessDataNotFound('Not Found', 'All Details data Not found for Sealdah today!');
      }
    })
  }

  //Sealdah services end

  //Siliguri services start

  public retrieveStrengthDetailsSiliguriToday() : string {
    var res : string = ""; 
    this.siliguriService.getStrengthSiliguriToday().subscribe((data) => {
      this.strengthObjectSiliguri = data;
      console.log(this.strengthObjectSiliguri);

      if(this.strengthObjectSiliguri.length > 0){
      this.strengthObjectSiliguri.forEach( (element : any) => {
        if(element.strengthDesc! === "Deputaiton from other Unit"){
          this.deputationfromotherunitStrengthCommon = element
        }
        if(element.strengthDesc! === "Other duty "){
          this.otherdutyStrengthCommon = element
          console.log("this.otherdutyStrengthCommon.const : "+this.otherdutyStrengthCommon.const);
        }
        // if(element.strengthDesc! === "Misc.Duty"){
        //   this.miscdutyStrengthCommon = element
        // }
        if(element.strengthDesc! === "Sanctioned Strength"){
          this.sanctionStrengthCommon = element
        }
        if(element.strengthDesc! === "Vacancy"){
          this.vacancyStrengthCommon = element
        }
        if(element.strengthDesc! === "Actual Strength"){
          this.actualStrengthCommon = element
        }
        if(element.strengthDesc! === "Misc. duty at Hqr."){
          this.miscdutyathqrdutyStrengthCommon = element
        }
        if(element.strengthDesc! === "Available Strength"){
          this.availableStrengthCommon = element
        }
        if(element.strengthDesc! === "Camp"){
          this.campStrengthCommon = element
        }
        if(element.strengthDesc! === "Training"){
          this.trainingStrengthCommon = element
        }
        if(element.strengthDesc! === "Deputation to other Unit"){
          this.deputationtootherunitStrengthCommon = element
        }
        if(element.strengthDesc! === "Leave "){
          this.leaveStrengthCommon = element
        }
        if(element.strengthDesc! === "Security guard"){
          this.securityguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Misc. duty at GRPS/GRPP"){
          this.miscdutyatgrpsStrengthCommon = element
        }
        if(element.strengthDesc! === "Train Guard"){
          this.trainguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Static Guard"){
          this.staticguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Suspension"){
          this.suspensionStrengthCommon = element
        }
      });
      res = "Data Found";
        console.log(res);
    } else{
      this.sanctionStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.trainingStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.deputationfromotherunitStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.otherdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.miscdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.vacancyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.actualStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.miscdutyathqrdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.availableStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.campStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.deputationtootherunitStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.leaveStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.securityguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.miscdutyatgrpsStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.trainguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.staticguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.suspensionStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      res = "No Data Found";
      console.log(res);
      this.showSuccessDataNotFound('Not Found', 'Strength data not found for Siliguri today!');
    }
  })
  return res;
  }

  public retrieveAllDetailsSiliguriToday() {
    var res : string = "";
    this.siliguriService.getAllDetailsSiliguri().subscribe((allDetails) => {
      this.allDetailsObject = allDetails;
      console.log(this.allDetailsObject);

      if(this.allDetailsObject.length > 0){
      this.allDetailsObject.forEach( (element : any) => {
        this.allDetailsArr = element
        console.log("inside this.allDetailsArr.dateofReport" + this.allDetailsArr.dateofReport);
        this.allDetailsArr.typeOfCrime = "NA"
      })
      res = "All Details Data Found";
        console.log(res);
      }else{
        this.allDetailsArr = {
          grp : 'NA',
          specCountToday : '0',
	        prevCountToday : '0',
	        totalArrestCountToday : '0',
          fircountToday : '0',
	        otherCasesToday : '0',
	        totalCasesCountToday : '0',
          udcountToday : '0',
	        seizureCountToday : '0',
          grps : 'NA'
        };
        res = "No Data Found";
        console.log(res);
        this.showSuccessDataNotFound('Not Found', 'All Details data Not found for Siliguri today!');
      }
    })
  }

  //Siliguri services end

  //Kharagpur services start

  public retrieveStrengthDetailsKharagpurToday() : string {
    var res : string = ""; 
    this.kharagpurService.getStrengthKharagpurToday().subscribe((data) => {
      this.strengthObjectKharagpur = data;
      console.log(this.strengthObjectKharagpur);

      if(this.strengthObjectKharagpur.length > 0){
      this.strengthObjectKharagpur.forEach( (element : any) => {
        if(element.strengthDesc! === "Deputation from other Unit"){
          this.deputationfromotherunitStrengthCommon = element
        }
        if(element.strengthDesc! === "Other duty"){
          this.otherdutyStrengthCommon = element
          console.log("this.otherdutyStrengthCommon.const : "+this.otherdutyStrengthCommon.const);
        }
        // if(element.strengthDesc! === "Misc.Duty"){
        //   this.miscdutyStrengthCommon = element
        // }
        if(element.strengthDesc! === "Sanction Strength"){
          this.sanctionStrengthCommon = element
        }
        if(element.strengthDesc! === "Vacancy"){
          this.vacancyStrengthCommon = element
        }
        if(element.strengthDesc! === "Actual Strength"){
          this.actualStrengthCommon = element
        }
        if(element.strengthDesc! === "Misc. duty at Hqr"){
          this.miscdutyathqrdutyStrengthCommon = element
        }
        if(element.strengthDesc! === "Available Strength"){
          this.availableStrengthCommon = element
        }
        if(element.strengthDesc! === "Camp"){
          this.campStrengthCommon = element
        }
        if(element.strengthDesc! === "Training"){
          this.trainingStrengthCommon = element
        }
        if(element.strengthDesc! === "Deputation to other Unit"){
          this.deputationtootherunitStrengthCommon = element
        }
        if(element.strengthDesc! === "Leave"){
          this.leaveStrengthCommon = element
        }
        if(element.strengthDesc! === "Security Guard"){
          this.securityguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Misc duty at GRPS/GRPP"){
          this.miscdutyatgrpsStrengthCommon = element
        }
        if(element.strengthDesc! === "Train Guard"){
          this.trainguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Static Guard"){
          this.staticguardStrengthCommon = element
        }
        if(element.strengthDesc! === "Suspension"){
          this.suspensionStrengthCommon = element
        }
      });
      res = "Data Found";
        console.log(res);
    }else{
      this.sanctionStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.trainingStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.deputationfromotherunitStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.otherdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.miscdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.vacancyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.actualStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.miscdutyathqrdutyStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.availableStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.campStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.deputationtootherunitStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.leaveStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.securityguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.miscdutyatgrpsStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.trainguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.staticguardStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      this.suspensionStrengthCommon = {
          inspr : '0',
          silsi : '0',
          asilasi : '0',
          const : '0',
          lc : '0',
          nvf : '0',
          hg : '0',
          civic  : '0'
      };
      res = "No Data Found";
      console.log(res);
      this.showSuccessDataNotFound('Not Found', 'Strength data not found for Kharagpur today!');
    }
  })
  return res;
  }

  public retrieveAllDetailsKharagpurToday() {
    var res : string = "";
    this.kharagpurService.getAllDetailsKharagpur().subscribe((allDetails) => {
      this.allDetailsObject = allDetails;
      console.log(this.allDetailsObject);

      if(this.allDetailsObject.length > 0){
      this.allDetailsObject.forEach( (element : any) => {
        this.allDetailsArr = element
        console.log("inside this.allDetailsArr.dateofReport" + this.allDetailsArr.dateofReport);
        this.allDetailsArr.typeOfCrime = "Kharagpur : Seizer or Recovery after theft : 4 mobile phone"
      })
      res = "All Details Data Found";
        console.log(res);
      }else{
        this.allDetailsArr = {
          grp : 'NA',
          specCountToday : '0',
	        prevCountToday : '0',
	        totalArrestCountToday : '0',
          fircountToday : '0',
	        otherCasesToday : '0',
	        totalCasesCountToday : '0',
          udcountToday : '0',
	        seizureCountToday : '0',
          grps : 'NA'
        };
        res = "No Data Found";
        console.log(res);
        this.showSuccessDataNotFound('Not Found', 'All Details data Not found for Kharagpur today!');
      }
    })
  }

  //Kharagpur services end

  showSuccessDataNotFound(a: string, b : string) {
    this.toastr.error(a,b);
  }

  //Get function for Preventive Arrest Howrah start
  public getPreventiveCasesAnaDetailsHowrah(){
    this.howrahService.getDetailsCategoryMappingHowrah().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "Preventive Arrest"){
          this.detailsCategoryPrevArrestMappingArr = element
          console.log("inside this.detailsCategoryPrevArrestMappingArr.unique_id" + this.detailsCategoryPrevArrestMappingArr.unique_id);
  
          this.howrahService.getPreventiveArrestHowrah().subscribe((elementPrevAll) => {
            this.PreventiveArrestObject = elementPrevAll;

            this.PreventiveArrestObject.forEach((element : PreventiveArrest) => {
              if(element.unique_id === this.detailsCategoryPrevArrestMappingArr.categoryunId){
                this.PreventiveArrestObjectMain = element
              }
            })
          })  
        }
      })
    })
  }
  //Get function for Preventive Arrest Howrah end

  //Get function for Preventive Arrest Sealdah start
  public getPreventiveCasesAnaDetailsSealdah(){
    const date = new Date();
    this.sealdahService.getDetailsCategoryMappingSealdah().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "Preventive Arrest" && element.grpname === "SLD"){
          this.detailsCategoryPrevArrestMappingArr = element
          console.log("inside this.detailsCategoryPrevArrestMappingArr.unique_id" + this.detailsCategoryPrevArrestMappingArr.unique_id);
  
          this.sealdahService.getPreventiveArrestSealdahToday().subscribe((elementPrevAll) => {
            this.PreventiveArrestObject = elementPrevAll;

            this.PreventiveArrestObject.forEach((element : PreventiveArrest) => {
              if(element.unique_id === this.detailsCategoryPrevArrestMappingArr.categoryunId){
                this.PreventiveArrestObjectMain = element
              }
            })
          })  
        }
      })
    })
  }
  //Get function for Preventive Arrest Sealdah end

  //Get function for Preventive Arrest Siliguri start
  public getPreventiveCasesAnaDetailsSiliguri(){
    this.siliguriService.getDetailsCategoryMappingSiliguri().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "Preventive Arrest"){
          this.detailsCategoryPrevArrestMappingArr = element
          console.log("inside this.detailsCategoryPrevArrestMappingArr.unique_id" + this.detailsCategoryPrevArrestMappingArr.unique_id);
  
          this.siliguriService.getPreventiveArrestSiliguriToday().subscribe((elementPrevAll) => {
            this.PreventiveArrestObject = elementPrevAll;

            this.PreventiveArrestObject.forEach((element : PreventiveArrest) => {
              if(element.unique_id === this.detailsCategoryPrevArrestMappingArr.categoryunId){
                this.PreventiveArrestObjectMain = element
              }
            })
          })  
        }
      })
    })
  }
  //Get function for Preventive Arrest Siliguri end

  //Get function for Preventive Arrest Kharagpur start
  public getPreventiveCasesAnaDetailsKharagpur(){
    this.kharagpurService.getDetailsCategoryMappingKharagpur().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "Preventive Arrest"){
          this.detailsCategoryPrevArrestMappingArr = element
          console.log("inside this.detailsCategoryPrevArrestMappingArr.unique_id" + this.detailsCategoryPrevArrestMappingArr.unique_id);
  
          this.kharagpurService.getPreventiveArrestKharagpurToday().subscribe((elementPrevAll) => {
            this.PreventiveArrestObject = elementPrevAll;

            this.PreventiveArrestObject.forEach((element : PreventiveArrest) => {
              if(element.unique_id === this.detailsCategoryPrevArrestMappingArr.categoryunId){
                this.PreventiveArrestObjectMain = element
              }
            })
          })  
        }
      })
    })
  }
  //Get function for Preventive Arrest Kharagpur end

  //Preview Modal open function for Preventive Arrest Howrah start
  public openPreviewModalPreventiveCasesAnaDetails(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDivHowrah = document.getElementById('myModalPrevArrest');
    const modelDivSealdah = document.getElementById('myModalPrevArrestSealdah');
    const modelDivSiliguri = document.getElementById('myModalPrevArrestSiliguri');
    const modelDivKharagpur = document.getElementById('myModalPrevArrestKharagpur');
    // if(modelDivHowrah != null){
    //   modelDivHowrah.style.display = 'block';
    // }

    if(this.selectedGRPS === 'Howrah'){
      this.getPreventiveCasesAnaDetailsHowrah();
      if(modelDivHowrah != null){
        modelDivHowrah.style.display = 'block';
      }
    }
    if(this.selectedGRPS === 'Sealdah'){
      this.getPreventiveCasesAnaDetailsSealdah();
      if(modelDivSealdah != null){
        modelDivSealdah.style.display = 'block';
      }
    }
    if(this.selectedGRPS === 'Siliguri'){
      this.getPreventiveCasesAnaDetailsSiliguri();
      if(modelDivSiliguri != null){
        modelDivSiliguri.style.display = 'block';
      }
    }
    if(this.selectedGRPS === 'Kharagpur'){
      this.getPreventiveCasesAnaDetailsKharagpur();
      if(modelDivKharagpur != null){
        modelDivKharagpur.style.display = 'block';
      }
    }
  }

  //Preview Modal open function for Preventive Arrest Howrah end

  //Preview Modal close function for Preventive Arrest Howrah start
  public closeModalPrevArrest(){
    const modelDivHowrah = document.getElementById('myModalPrevArrest');
    const modelDivSealdah = document.getElementById('myModalPrevArrestSealdah');
    const modelDivSiliguri = document.getElementById('myModalPrevArrestSiliguri');
    const modelDivKharagpur = document.getElementById('myModalPrevArrestKharagpur');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation';
    main!.className = 'main';
    // if(modelDiv != null){
    //   modelDiv.style.display = 'none';
    // }
    if(this.selectedGRPS === 'Howrah'){
      if(modelDivHowrah != null){
        modelDivHowrah.style.display = 'none';
      }
    }
    if(this.selectedGRPS === 'Sealdah'){
      if(modelDivSealdah != null){
        modelDivSealdah.style.display = 'none';
      }
    }
    if(this.selectedGRPS === 'Siliguri'){
      if(modelDivSiliguri != null){
        modelDivSiliguri.style.display = 'none';
      }
    }
    if(this.selectedGRPS === 'Kharagpur'){
      if(modelDivKharagpur != null){
        modelDivKharagpur.style.display = 'none';
      }
    }
  }
  //Preview Modal close function for Preventive Arrest Howrah end

  //Get function for FIR Cases Howrah start
  public getFIRCasesAnaDetails(){

    this.howrahService.getFirCaseHowrah().subscribe((elementSpecAll) => {
      this.FIRCaseObject = elementSpecAll;
    })
    var count = 0;
    this.howrahService.getDetailsCategoryMappingHowrah().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "FIR Case"){
          this.detailsCategoryFIRMappingArr = element
          console.log("inside this.detailsCategoryFIRMappingArr.unique_id" + this.detailsCategoryFIRMappingArr.unique_id);
          this.FIRCaseObject.forEach((element : FirCase) => {
            if(element.unique_id === this.detailsCategoryFIRMappingArr.categoryunId){
              this.FIRCaseObjectMain[count] = element;
              count = count+1;
            }
          console.log(this.FIRCaseObjectMain.length);
          for(var i=0;i<this.FIRCaseObjectMain.length;i++){
            console.log(this.FIRCaseObjectMain[i]);
          }
          })
        }
      })
    })
    
  }
  //Get function for FIR Cases Howrah end

  //Get function for FIR Cases Sealdah start
  public getFIRCasesAnaDetailsSealdah(){

    this.sealdahService.getFirCaseSealdahToday().subscribe((elementSpecAll) => {
      this.FIRCaseObject = elementSpecAll;
    })
    var count = 0;
    this.sealdahService.getDetailsCategoryMappingSealdah().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "FIR Case"){
          this.detailsCategoryFIRMappingArr = element
          console.log("inside this.detailsCategoryFIRMappingArr.unique_id" + this.detailsCategoryFIRMappingArr.unique_id);
          this.FIRCaseObject.forEach((element : FirCase) => {
            if(element.unique_id === this.detailsCategoryFIRMappingArr.categoryunId){
              this.FIRCaseObjectMain[count] = element;
              count = count+1;
            }
          console.log(this.FIRCaseObjectMain.length);
          for(var i=0;i<this.FIRCaseObjectMain.length;i++){
            console.log(this.FIRCaseObjectMain[i]);
          }
          })
        }
      })
    })
    
  }
  //Get function for FIR Cases Sealdah end

  //Get function for FIR Cases Siliguri start
  public getFIRCasesAnaDetailsSiliguri(){

    this.siliguriService.getFirCaseSiliguriToday().subscribe((elementSpecAll) => {
      this.FIRCaseObject = elementSpecAll;
    })
    var count = 0;
    this.siliguriService.getDetailsCategoryMappingSiliguri().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "FIR Case"){
          this.detailsCategoryFIRMappingArr = element
          console.log("inside this.detailsCategoryFIRMappingArr.unique_id" + this.detailsCategoryFIRMappingArr.unique_id);
          this.FIRCaseObject.forEach((element : FirCase) => {
            if(element.unique_id === this.detailsCategoryFIRMappingArr.categoryunId){
              this.FIRCaseObjectMain[count] = element;
              count = count+1;
            }
          console.log(this.FIRCaseObjectMain.length);
          for(var i=0;i<this.FIRCaseObjectMain.length;i++){
            console.log(this.FIRCaseObjectMain[i]);
          }
          })
        }
      })
    })
    
  }
  //Get function for FIR Cases Siliguri end

  //Get function for FIR Cases Kharagpur start
  public getFIRCasesAnaDetailsKharagpur(){

    this.kharagpurService.getFirCaseKharagpurToday().subscribe((elementSpecAll) => {
      this.FIRCaseObject = elementSpecAll;
    })
    var count = 0;
    this.kharagpurService.getDetailsCategoryMappingKharagpur().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "FIR Case"){
          this.detailsCategoryFIRMappingArr = element
          console.log("inside this.detailsCategoryFIRMappingArr.unique_id" + this.detailsCategoryFIRMappingArr.unique_id);
          this.FIRCaseObject.forEach((element : FirCase) => {
            if(element.unique_id === this.detailsCategoryFIRMappingArr.categoryunId){
              this.FIRCaseObjectMain[count] = element;
              count = count+1;
            }
          console.log(this.FIRCaseObjectMain.length);
          for(var i=0;i<this.FIRCaseObjectMain.length;i++){
            console.log(this.FIRCaseObjectMain[i]);
          }
          })
        }
      })
    })
    
  }
  //Get function for FIR Cases Kharagpur end

  //Preview Modal open function for FIR Cases Howrah start
  public openPreviewModalFIRCasesAnaDetails(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalFIR');
    const modelDivSealdah = document.getElementById('myModalFIRSealdah');
    const modelDivSiliguri = document.getElementById('myModalFIRSiliguri');
    const modelDivKharagpur = document.getElementById('myModalFIRKharagpur');
    // if(modelDiv != null){
    //   modelDiv.style.display = 'block';
    // }
    // this.getFIRCasesAnaDetails();
    if(this.selectedGRPS === 'Howrah'){
      this.getFIRCasesAnaDetails();
      if(modelDiv != null){
        modelDiv.style.display = 'block';
      }
    }
    if(this.selectedGRPS === 'Sealdah'){
      this.getFIRCasesAnaDetailsSealdah();
      if(modelDivSealdah != null){
        modelDivSealdah.style.display = 'block';
      }
    }
    if(this.selectedGRPS === 'Siliguri'){
      this.getFIRCasesAnaDetailsSiliguri();
      if(modelDivSiliguri != null){
        modelDivSiliguri.style.display = 'block';
      }
    }
    if(this.selectedGRPS === 'Kharagpur'){
      this.getFIRCasesAnaDetailsKharagpur();
      if(modelDivKharagpur != null){
        modelDivKharagpur.style.display = 'block';
      }
    }
  }

  //Preview Modal open function for FIR Cases Howrah end

  //Preview Modal close function for FIR Cases Howrah start
  public closePreviewModalFIRCasesAnaDetails(){
    const modelDiv = document.getElementById('myModalFIR');
    const modelDivSealdah = document.getElementById('myModalFIRSealdah');
    const modelDivSiliguri = document.getElementById('myModalFIRSiliguri');
    const modelDivKharagpur = document.getElementById('myModalFIRKharagpur');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation';
    main!.className = 'main';

    if(this.selectedGRPS === 'Howrah'){
      if(modelDiv != null){
        modelDiv.style.display = 'none';
      }
    }
    if(this.selectedGRPS === 'Sealdah'){
      if(modelDivSealdah != null){
        modelDivSealdah.style.display = 'none';
      }
    }
    if(this.selectedGRPS === 'Siliguri'){
      if(modelDivSiliguri != null){
        modelDivSiliguri.style.display = 'none';
      }
    }
    if(this.selectedGRPS === 'Kharagpur'){
      if(modelDivKharagpur != null){
        modelDivKharagpur.style.display = 'none';
      }
    }
  }
  //Preview Modal close function for FIR Cases Howrah end

  //Get function for Seizure Howrah start
  public getSeizureAnaDetails(){

    this.howrahService.getSeizureHowrah().subscribe((elementSeizureAll) => {
      this.SeizureObject = elementSeizureAll;
    })
    var count = 0;
    this.howrahService.getDetailsCategoryMappingHowrah().subscribe((detailsCategoryMapping) => {
      this.detailsCategoryMappingObject = detailsCategoryMapping;
      console.log(this.detailsCategoryMappingObject);

      this.detailsCategoryMappingObject.forEach( (element : any) => {
        if(element.category === "Seizure"){
          this.detailsCategorySeizureMappingArr = element
          console.log("inside this.detailsCategorySeizureMappingArr.unique_id" + this.detailsCategorySeizureMappingArr.unique_id);
          this.SeizureObject.forEach((element : Seizure) => {
            if(element.unique_id === this.detailsCategorySeizureMappingArr.categoryunId){
              this.SeizureObjectMain[count] = element;
              count = count+1;
            }
          console.log(this.SeizureObjectMain.length);
          for(var i=0;i<this.SeizureObjectMain.length;i++){
            console.log(this.SeizureObjectMain[i]);
          }
          })
        }
      })
    })
    
  }
//Get function for Seizure Howrah end

//Get function for Seizure Sealdah start
public getSeizureAnaDetailsSealdah(){

  this.sealdahService.getSeizureSealdahToday().subscribe((elementSeizureAll) => {
    this.SeizureObject = elementSeizureAll;
    console.log("this.SeizureObject");
    console.log(this.SeizureObject);
  })
  var count = 0;
  this.sealdahService.getDetailsCategoryMappingSealdah().subscribe((detailsCategoryMapping) => {
    this.detailsCategoryMappingObject = detailsCategoryMapping;
    console.log("this.detailsCategoryMappingObject");
    console.log(this.detailsCategoryMappingObject);

    this.detailsCategoryMappingObject.forEach( (element : any) => {
      if(element.category === "Seizure"){
        this.detailsCategorySeizureMappingArr = element
        console.log("inside this.detailsCategorySeizureMappingArr.unique_id" + this.detailsCategorySeizureMappingArr.unique_id);
        this.SeizureObject.forEach((element : Seizure) => {
          console.log("Element.unique_id : "+element.unique_id);
          if(element.unique_id === this.detailsCategorySeizureMappingArr.categoryunId){
            this.SeizureObjectMain[count] = element;
            count = count+1;
            console.log("Element inserted!");
          }
          console.log(this.SeizureObjectMain.length);
          for(var i=0;i<this.SeizureObjectMain.length;i++){
            console.log("this.SeizureObjectMain[i]" + this.SeizureObjectMain[i]);
          }
        })
      }
      else{
        console.log("Skipping as not seizure!");
      }
    })
  })
  
}
//Get function for Seizure Sealdah end

//Get function for Seizure Siliguri start
public getSeizureAnaDetailsSiliguri(){

  this.siliguriService.getSeizureSiliguriToday().subscribe((elementSeizureAll) => {
    this.SeizureObject = elementSeizureAll;
  })
  var count = 0;
  this.siliguriService.getDetailsCategoryMappingSiliguri().subscribe((detailsCategoryMapping) => {
    this.detailsCategoryMappingObject = detailsCategoryMapping;
    console.log(this.detailsCategoryMappingObject);

    this.detailsCategoryMappingObject.forEach( (element : any) => {
      if(element.category === "Seizure"){
        this.detailsCategorySeizureMappingArr = element
        console.log("inside this.detailsCategorySeizureMappingArr.unique_id" + this.detailsCategorySeizureMappingArr.unique_id);
        this.SeizureObject.forEach((element : Seizure) => {
          if(element.unique_id === this.detailsCategorySeizureMappingArr.categoryunId){
            this.SeizureObjectMain[count] = element;
            count = count+1;
          }
        console.log(this.SeizureObjectMain.length);
        for(var i=0;i<this.SeizureObjectMain.length;i++){
          console.log(this.SeizureObjectMain[i]);
        }
        })
      }
    })
  })
  
}
//Get function for Seizure Siliguri end

//Get function for Seizure Kharagpur start
public getSeizureAnaDetailsKharagpur(){

  this.kharagpurService.getSeizureKharagpurToday().subscribe((elementSeizureAll) => {
    this.SeizureObject = elementSeizureAll;
  })
  var count = 0;
  this.kharagpurService.getDetailsCategoryMappingKharagpur().subscribe((detailsCategoryMapping) => {
    this.detailsCategoryMappingObject = detailsCategoryMapping;
    console.log(this.detailsCategoryMappingObject);

    this.detailsCategoryMappingObject.forEach( (element : any) => {
      if(element.category === "Seizure"){
        this.detailsCategorySeizureMappingArr = element
        console.log("inside this.detailsCategorySeizureMappingArr.unique_id" + this.detailsCategorySeizureMappingArr.unique_id);
        this.SeizureObject.forEach((element : Seizure) => {
          if(element.unique_id === this.detailsCategorySeizureMappingArr.categoryunId){
            this.SeizureObjectMain[count] = element;
            count = count+1;
          }
        console.log(this.SeizureObjectMain.length);
        for(var i=0;i<this.SeizureObjectMain.length;i++){
          console.log(this.SeizureObjectMain[i]);
        }
        })
      }
    })
  })
  
}
//Get function for Seizure Kharagpur end

//Preview Modal open function for Seizure start
public openPreviewModalSeizureAnaDetails(){
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  navigation!.className = 'navigation is-blurred';
  main!.className = 'main is-blurred';
  const modelDiv = document.getElementById('myModalSeizure');
  const modelDivSealdah = document.getElementById('myModalSeizureSealdah');
  const modelDivSiliguri = document.getElementById('myModalSeizureSiliguri');
  const modelDivKharagpur = document.getElementById('myModalSeizureKharagpur');
  
  if(this.selectedGRPS === 'Howrah'){
    this.getSeizureAnaDetails();
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
  }
  if(this.selectedGRPS === 'Sealdah'){
    this.getSeizureAnaDetailsSealdah();
    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'block';
    }
  }
  if(this.selectedGRPS === 'Siliguri'){
    this.getSeizureAnaDetailsSiliguri();
    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'block';
    }
  }
  if(this.selectedGRPS === 'Kharagpur'){
    this.getSeizureAnaDetailsKharagpur();
    if(modelDivKharagpur != null){
      modelDivKharagpur.style.display = 'block';
    }
  }
}

//Preview Modal open function for Seizure end

//Preview Modal close function for Seizure start
public closePreviewModalSeizureAnaDetails(){
  const modelDiv = document.getElementById('myModalSeizure');
  const modelDivSealdah = document.getElementById('myModalSeizureSealdah');
  const modelDivSiliguri = document.getElementById('myModalSeizureSiliguri');
  const modelDivKharagpur = document.getElementById('myModalSeizureKharagpur');
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  navigation!.className = 'navigation';
  main!.className = 'main';

  if(this.selectedGRPS === 'Howrah'){
    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
  }
  if(this.selectedGRPS === 'Sealdah'){
    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'none';
    }
  }
  if(this.selectedGRPS === 'Siliguri'){
    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'none';
    }
  }
  if(this.selectedGRPS === 'Kharagpur'){
    if(modelDivKharagpur != null){
      modelDivKharagpur.style.display = 'none';
    }
  }
}
//Preview Modal close function for Seizure end

//Get function for UD Howrah start
public getUDCaseAnaDetailsHowrah(){

  this.howrahService.getUDCaseHowrah().subscribe((elementUDCaseAll) => {
    this.UDCaseObject = elementUDCaseAll;
  })
  var count = 0;
  this.howrahService.getDetailsCategoryMappingHowrah().subscribe((detailsCategoryMapping) => {
    this.detailsCategoryMappingObject = detailsCategoryMapping;
    console.log(this.detailsCategoryMappingObject);

    this.detailsCategoryMappingObject.forEach( (element : any) => {
      if(element.category === "UD Case"){
        this.detailsCategoryUDCaseMappingArr = element
        console.log("inside this.detailsCategoryUDCaseMappingArr.unique_id" + this.detailsCategoryUDCaseMappingArr.unique_id);
        this.UDCaseObject.forEach((element : UdCase) => {
          if(element.unique_id === this.detailsCategoryUDCaseMappingArr.categoryunId){
            this.UDCaseObjectMain[count] = element;
            count = count+1;
          }
        console.log(this.UDCaseObjectMain.length);
        for(var i=0;i<this.UDCaseObjectMain.length;i++){
          console.log(this.UDCaseObjectMain[i]);
        }
        })
      }
    })
  })
  
}
//Get function for UD Howrah end

//Get function for UD Sealdah start
public getUDCaseAnaDetailsSealdah(){

  this.sealdahService.getUDCaseSealdahToday().subscribe((elementUDCaseAll) => {
    this.UDCaseObject = elementUDCaseAll;
  })
  var count = 0;
  this.sealdahService.getDetailsCategoryMappingSealdah().subscribe((detailsCategoryMapping) => {
    this.detailsCategoryMappingObject = detailsCategoryMapping;
    console.log(this.detailsCategoryMappingObject);

    this.detailsCategoryMappingObject.forEach( (element : any) => {
      if(element.category === "UD Case"){
        this.detailsCategoryUDCaseMappingArr = element
        console.log("inside this.detailsCategoryUDCaseMappingArr.unique_id" + this.detailsCategoryUDCaseMappingArr.unique_id);
        this.UDCaseObject.forEach((element : UdCase) => {
          if(element.unique_id === this.detailsCategoryUDCaseMappingArr.categoryunId){
            this.UDCaseObjectMain[count] = element;
            count = count+1;
          }
        console.log(this.UDCaseObjectMain.length);
        for(var i=0;i<this.UDCaseObjectMain.length;i++){
          console.log(this.UDCaseObjectMain[i]);
        }
        })
      }
    })
  })
  
}
//Get function for UD Sealdah end

//Get function for UD Siliguri start
public getUDCaseAnaDetailsSiliguri(){

  this.siliguriService.getUDCaseSiliguriToday().subscribe((elementUDCaseAll) => {
    this.UDCaseObject = elementUDCaseAll;
  })
  var count = 0;
  this.siliguriService.getDetailsCategoryMappingSiliguri().subscribe((detailsCategoryMapping) => {
    this.detailsCategoryMappingObject = detailsCategoryMapping;
    console.log(this.detailsCategoryMappingObject);

    this.detailsCategoryMappingObject.forEach( (element : any) => {
      if(element.category === "UD Case"){
        this.detailsCategoryUDCaseMappingArr = element
        console.log("inside this.detailsCategoryUDCaseMappingArr.unique_id" + this.detailsCategoryUDCaseMappingArr.unique_id);
        this.UDCaseObject.forEach((element : UdCase) => {
          if(element.unique_id === this.detailsCategoryUDCaseMappingArr.categoryunId){
            this.UDCaseObjectMain[count] = element;
            count = count+1;
          }
        console.log(this.UDCaseObjectMain.length);
        for(var i=0;i<this.UDCaseObjectMain.length;i++){
          console.log(this.UDCaseObjectMain[i]);
        }
        })
      }
    })
  })
  
}
//Get function for UD Siliguri end

//Get function for UD Kharagpur start
public getUDCaseAnaDetailsKharagpur(){

  this.kharagpurService.getUDCaseKharagpurToday().subscribe((elementUDCaseAll) => {
    this.UDCaseObject = elementUDCaseAll;
  })
  var count = 0;
  this.kharagpurService.getDetailsCategoryMappingKharagpur().subscribe((detailsCategoryMapping) => {
    this.detailsCategoryMappingObject = detailsCategoryMapping;
    console.log(this.detailsCategoryMappingObject);

    this.detailsCategoryMappingObject.forEach( (element : any) => {
      if(element.category === "UD Case"){
        this.detailsCategoryUDCaseMappingArr = element
        console.log("inside this.detailsCategoryUDCaseMappingArr.unique_id" + this.detailsCategoryUDCaseMappingArr.unique_id);
        this.UDCaseObject.forEach((element : UdCase) => {
          if(element.unique_id === this.detailsCategoryUDCaseMappingArr.categoryunId){
            this.UDCaseObjectMain[count] = element;
            count = count+1;
          }
        console.log(this.UDCaseObjectMain.length);
        for(var i=0;i<this.UDCaseObjectMain.length;i++){
          console.log(this.UDCaseObjectMain[i]);
        }
        })
      }
    })
  })
  
}
//Get function for UD Kharagpur end

//Preview Modal open function for UD Howrah start
public openPreviewModalUDAnaDetailsHowrah(){
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  navigation!.className = 'navigation is-blurred';
  main!.className = 'main is-blurred';
  const modelDiv = document.getElementById('myModalUDHowrah');
  const modelDivSealdah = document.getElementById('myModalUDSealdah');
  const modelDivSiliguri = document.getElementById('myModalUDSiliguri');
  const modelDivKharagpur = document.getElementById('myModalUDKharagpur');
  // if(modelDiv != null){
  //   modelDiv.style.display = 'block';
  // }
  // this.getUDCaseAnaDetailsHowrah();
  if(this.selectedGRPS === 'Howrah'){
    this.getUDCaseAnaDetailsHowrah();
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
  }
  if(this.selectedGRPS === 'Sealdah'){
    this.getUDCaseAnaDetailsSealdah();
    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'block';
    }
  }
  if(this.selectedGRPS === 'Siliguri'){
    this.getUDCaseAnaDetailsSiliguri();
    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'block';
    }
  }
  if(this.selectedGRPS === 'Kharagpur'){
    this.getUDCaseAnaDetailsKharagpur();
    if(modelDivKharagpur != null){
      modelDivKharagpur.style.display = 'block';
    }
  }
}

//Preview Modal open function for UD Howrah end

//Preview Modal close function for UD Howrah start
public closePreviewModalUDAnaDetailsHowrah(){
  const modelDivHowrah = document.getElementById('myModalUDHowrah');
  const modelDivSealdah = document.getElementById('myModalUDSealdah');
  const modelDivSiliguri = document.getElementById('myModalUDSiliguri');
  const modelDivKharagpur = document.getElementById('myModalUDKharagpur');
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  navigation!.className = 'navigation';
  main!.className = 'main';
  // if(modelDivHowrah != null){
  //   modelDivHowrah.style.display = 'none';
  // }
  if(this.selectedGRPS === 'Howrah'){
    if(modelDivHowrah != null){
      modelDivHowrah.style.display = 'none';
    }
  }
  if(this.selectedGRPS === 'Sealdah'){
    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'none';
    }
  }
  if(this.selectedGRPS === 'Siliguri'){
    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'none';
    }
  }
  if(this.selectedGRPS === 'Kharagpur'){
    if(modelDivKharagpur != null){
      modelDivKharagpur.style.display = 'none';
    }
  }
}
//Preview Modal close function for UD Howrah end
}
