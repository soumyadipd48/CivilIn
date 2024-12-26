import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PreventiveArrest } from 'src/app/models/preventive-arrest';
import { Strength, StrengthObject } from 'src/app/models/strength';
import { UdCase } from 'src/app/models/ud-case';
import { HowrahService } from 'src/app/services/howrah.service';
import { KharagpurService } from 'src/app/services/kharagpur.service';
import { SealdahService } from 'src/app/services/sealdah.service';
import { SiliguriService } from 'src/app/services/siliguri.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { AllDetails } from 'src/app/models/all-details';
import { BusyService } from 'src/app/core/busy.service';

@Component({
  selector: 'app-morning-report-new',
  templateUrl: './morning-report-new.component.html',
  styleUrls: ['./morning-report-new.component.css']
})
export class MorningReportNewComponent implements OnInit {

  classToggled = false;
  loader = true;
  currentUser : string = '';
  today : Date = new Date();
  curHr = this.today.getHours();
  curMin = this.today.getMinutes();
  curSec = this.today.getSeconds();
  currentDateTime: string = '';
  wish : string = '';
  strengthObjectHowrah!: any;
  strengthObjectKharagpur!: any;
  strengthObjectSealdah!: any;
  strengthObjectSiliguri!: any;
  allDetailsObjectHowrah!: any;
  allDetailsObjectKharagpur!: any;
  allDetailsObjectSealdah!: any;
  allDetailsObjectSiliguri!: any;
  SpecificArrestObject!: any;
  PreventiveArrestObject!: any;
  UDCaseObject!: any;
  SeizureObject!: any;
  FirCaseObject!: any;
  AllDetailsObject!: any;
  strength!: Strength[];
  successAllCompile = "Success : All files successfully compiled!";
  errors! : any;
  logs: string[] = [];  // Array to hold the logs

  selectedStrengthHead = "";
  selectedInspr = "";
  selectedsilsi = "";
  selectedasilasi = "";
  selectedConst = "";
  selectedLc = "";
  selectedNvf = "";
  selectedHg = "";
  selectedCivic = "";
  selectedPrevCountToday = "";
  selectedSpecCountToday = "";
  selectedTotalArrestCountToday = "";
  selectedFircountToday = "";
  selectedOtherCasesToday = "";
  selectedTotalCasesCountToday = "";
  selectedTypeOfCrime = "";
  selectedSeizureCountToday = "";
  selectedUDcountToday = "";
  selectedGRPS = "";

  selectedAct1 = "";
  selectedAct2 = "";
  selectedAct3 = "";
  selectedAct4 = "";
  selectedPoliceAct = "";
  selectedAct5 = "";
  selectedBclaact = "";
  selectedIract = "";
  selectedOther = "";
  selectedTotal = "";


  AllDetailsObjectTempHowrah : AllDetails = new AllDetails();
  AllDetailsObjectTempSealdah : AllDetails = new AllDetails();
  AllDetailsObjectTempSiliguri : AllDetails = new AllDetails();
  AllDetailsObjectTempKharagpur : AllDetails = new AllDetails();

  AllDetailsObjectTempHowrahGRPS : AllDetails = new AllDetails();
  AllDetailsObjectTempBelur : AllDetails = new AllDetails();
  AllDetailsObjectTempKamarkundu : AllDetails = new AllDetails();
  AllDetailsObjectTempSheoraphuli : AllDetails = new AllDetails();
  AllDetailsObjectTempBandel : AllDetails = new AllDetails();
  AllDetailsObjectTempBurdwan : AllDetails = new AllDetails();
  AllDetailsObjectTempAndal : AllDetails = new AllDetails();
  AllDetailsObjectTempAsansol : AllDetails = new AllDetails();
  AllDetailsObjectTempKalna : AllDetails = new AllDetails();
  AllDetailsObjectTempKatwa : AllDetails = new AllDetails();
  AllDetailsObjectTempSainthia : AllDetails = new AllDetails();
  AllDetailsObjectTempSuri : AllDetails = new AllDetails();
  AllDetailsObjectTempAzimganj : AllDetails = new AllDetails();

  AllDetailsObjectTempSealdahGRPS : AllDetails = new AllDetails();
  AllDetailsObjectTempDumdum : AllDetails = new AllDetails();
  AllDetailsObjectTempChitpur : AllDetails = new AllDetails();
  AllDetailsObjectTempNaihati : AllDetails = new AllDetails();
  AllDetailsObjectTempRanaghat : AllDetails = new AllDetails();
  AllDetailsObjectTempKrishnanagar : AllDetails = new AllDetails();
  AllDetailsObjectTempBerhampore : AllDetails = new AllDetails();
  AllDetailsObjectTempBongaon : AllDetails = new AllDetails();
  AllDetailsObjectTempBarasat : AllDetails = new AllDetails();
  AllDetailsObjectTempBallygunge : AllDetails = new AllDetails();
  AllDetailsObjectTempJadavpur : AllDetails = new AllDetails();
  AllDetailsObjectTempSonarpur : AllDetails = new AllDetails();
  AllDetailsObjectTempBaruipur : AllDetails = new AllDetails();
  AllDetailsObjectTempDiamondHarbour : AllDetails = new AllDetails();

  AllDetailsObjectTempSiliguriGRPS : AllDetails = new AllDetails();
  AllDetailsObjectTempNewJalpaiguri : AllDetails = new AllDetails();
  AllDetailsObjectTempMaldaT : AllDetails = new AllDetails();
  AllDetailsObjectTempNewCoochbehar : AllDetails = new AllDetails();
  AllDetailsObjectTempAlipurduarJN : AllDetails = new AllDetails();
  AllDetailsObjectTempDalkhola : AllDetails = new AllDetails();
  AllDetailsObjectTempNewMaynaguri : AllDetails = new AllDetails();
  AllDetailsObjectTempNewMalJN : AllDetails = new AllDetails();
  AllDetailsObjectTempBalurghat : AllDetails = new AllDetails();

  AllDetailsObjectTempKharagpurGRPS : AllDetails = new AllDetails();
  AllDetailsObjectTempBankura : AllDetails = new AllDetails();
  AllDetailsObjectTempAdra : AllDetails = new AllDetails();
  AllDetailsObjectTempPurulia : AllDetails = new AllDetails();
  AllDetailsObjectTempPanskura : AllDetails = new AllDetails();
  AllDetailsObjectTempDigha : AllDetails = new AllDetails();
  AllDetailsObjectTempHaldia : AllDetails = new AllDetails();
  AllDetailsObjectTempJhargram : AllDetails = new AllDetails();
  AllDetailsObjectTempUluberia : AllDetails = new AllDetails();
  AllDetailsObjectTempShalimar : AllDetails = new AllDetails();

  form = new FormGroup({
    inspr: new FormControl(),
    silsi: new FormControl(),
    asilasi: new FormControl(),
    const: new FormControl(),
    lc: new FormControl(),
    nvf: new FormControl(),
    hg: new FormControl(),
    civic: new FormControl()
  });

  formAllDetails = new FormGroup({
    prevCountToday: new FormControl(),
    specCountToday: new FormControl(),    
    totalArrestCountToday: new FormControl(),
    fircountToday: new FormControl(),
    otherCasesToday: new FormControl(),
    totalCasesCountToday: new FormControl(),
    typeOfCrime: new FormControl(),
    seizureCountToday: new FormControl(),
    udcountToday: new FormControl(),
    grps: new FormControl()
  });

  formPrevArrestHowrah = new FormGroup({
    act1: new FormControl(),
    act2: new FormControl(),    
    act3: new FormControl(),
    act4: new FormControl(),
    policeAct: new FormControl(),
    act5: new FormControl(),
    bclaact: new FormControl(),
    iract: new FormControl(),
    other: new FormControl(),
    total: new FormControl()
  });

  formPrevArrestSealdah = new FormGroup({
    act1: new FormControl(),
    act2: new FormControl(),    
    act3: new FormControl(),
    act4: new FormControl(),
    policeAct: new FormControl(),
    act5: new FormControl(),
    bclaact: new FormControl(),
    iract: new FormControl(),
    other: new FormControl(),
    total: new FormControl()
  });

  formPrevArrestSiliguri = new FormGroup({
    act1: new FormControl(),
    act2: new FormControl(),    
    act3: new FormControl(),
    act4: new FormControl(),
    policeAct: new FormControl(),
    act5: new FormControl(),
    bclaact: new FormControl(),
    iract: new FormControl(),
    other: new FormControl(),
    total: new FormControl()
  });

  formPrevArrestKharagpur = new FormGroup({
    act1: new FormControl(),
    act2: new FormControl(),    
    act3: new FormControl(),
    policeAct: new FormControl(),
    act5: new FormControl(),
    bclaact: new FormControl(),
    iract: new FormControl(),
    other: new FormControl(),
    total: new FormControl()
  });

  // Howrah variable start

  trainingStrengthHowrah : Strength = new Strength();
  deputationfromotherunitStrengthHowrah : Strength = new Strength();
  otherdutyStrengthHowrah : Strength = new Strength();
  miscdutyStrengthHowrah : Strength = new Strength();
  sanctionStrengthHowrah: Strength = new Strength();
  vacancyStrengthHowrah : Strength = new Strength();
  actualStrengthHowrah : Strength = new Strength();
  miscdutyathqrdutyStrengthHowrah : Strength = new Strength();
  availableStrengthHowrah : Strength = new Strength();
  campStrengthHowrah : Strength = new Strength();
  deputationtootherunitStrengthHowrah : Strength = new Strength();
  leaveStrengthHowrah : Strength = new Strength();
  securityguardStrengthHowrah : Strength = new Strength();
  miscdutyatgrpsStrengthHowrah : Strength = new Strength();
  trainguardStrengthHowrah : Strength = new Strength();
  staticguardStrengthHowrah : Strength = new Strength();
  suspensionStrengthHowrah : Strength = new Strength();
  specificArrestCountHowrah = 0;
  preventiveArrestCountHowrah = 0;
  UDCaseCountHowrah = 0;
  SeizureCountHowrah = 0;
  FirCaseCountHowrah = 0;
  preventiveArrestDetailsHowrah : PreventiveArrest = new PreventiveArrest();
  UDCaseDetailsHowrah : UdCase = new UdCase();
  totalArrestCountHowrah = 0;
  UDCaseGRPSDetailsHowrah = 'NA';
  fileUploadHowrahFlag = 0;
  sameDayDataHowrahFlag = 0;
  warningHWH = "Warning : This is not the file for Howrah. Please select correct file for howrah and try again!";
  warningCurrDataHWH = "Warning : Current Day Data Found for Howrah! Data will overwrite!";
  warningCurrDataStrengthHWH = "Warning : Current Day Strength Data Found for Howrah! Data will overwrite!";
  selectedStrengthHowrah : Strength = new Strength();
  editStrengthHowrah : Strength = new Strength();
  selectedAllDetailsHowrah : AllDetails = new AllDetails();
  editAllDetailsHowrah : AllDetails = new AllDetails();
  newTestVarHowrah : any[] = [];

  totalSanctionStrengthHowrah : String = "";
  totalActualStrengthHowrah : String = "";
  totalVacancyHowrah : String = "";
  totalDeputationtootherunitHowrah : String = "";
  totaldeputationfromotherunitHowrah : String = "";
  totalAvailableStrengthHowrah : String = "";
  totalLeaveHowrah : String = "";
  totalStaticGuardHowrah : String = "";
  totalMiscDutyHowrah : String = "";
  totalTrainingHowrah : String = "";
  totalSecurityGuardHowrah : String = "";
  totalCampHowrah : String = "";
  totalTrainGuardHowrah : String = "";
  totalMiscDutyatHQRHowrah : String = "";
  totalMiscDutyatGRPSGRPPHowrah : String = "";
  totalSuspensionHowrah : String = "";
  totalOtherDutyHowrah : String = "";

  // Howrah variable end

  // Kharagpur variable start

  trainingStrengthKharagpur : Strength = new Strength();
  deputationfromotherunitStrengthKharagpur : Strength = new Strength();
  otherdutyStrengthKharagpur : Strength = new Strength();
  miscdutyStrengthKharagpur : Strength = new Strength();
  sanctionStrengthKharagpur : Strength = new Strength();
  vacancyStrengthKharagpur : Strength = new Strength();
  actualStrengthKharagpur : Strength = new Strength();
  miscdutyathqrdutyStrengthKharagpur : Strength = new Strength();
  availableStrengthKharagpur : Strength = new Strength();
  campStrengthKharagpur : Strength = new Strength();
  deputationtootherunitStrengthKharagpur : Strength = new Strength();
  leaveStrengthKharagpur : Strength = new Strength();
  securityguardStrengthKharagpur : Strength = new Strength();
  miscdutyatgrpsStrengthKharagpur : Strength = new Strength();
  trainguardStrengthKharagpur : Strength = new Strength();
  staticguardStrengthKharagpur : Strength = new Strength();
  suspensionStrengthKharagpur : Strength = new Strength();
  specificArrestCountKharagpur = 0;
  preventiveArrestCountKharagpur = 0;
  UDCaseCountKharagpur = 0;
  SeizureCountKharagpur = 0;
  FirCaseCountKharagpur = 0;
  preventiveArrestDetailsKharagpur : PreventiveArrest = new PreventiveArrest();
  UDCaseDetailsKharagpur : UdCase = new UdCase();
  totalArrestCountKharagpur = 0;
  UDCaseGRPSDetailsKharagpur = 'NA';
  fileUploadKharagpurFlag = 0;
  sameDayDataKharagpurFlag = 0;
  warningKGP = "Warning : This is not the file for Kharagpur. Please select correct file for kharagpur and try again!";
  warningCurrDataKGP = "Warning : Current Day Data Found for kharagpur! Data will overwrite!";
  warningCurrDataStrengthKGP = "Warning : Current Day Strength Data Found for Kharagpur! Data will overwrite!";
  selectedStrengthKharagpur : Strength = new Strength();
  editStrengthKharagpur : Strength = new Strength();
  selectedAllDetailsKharagpur : AllDetails = new AllDetails();
  editAllDetailsKharagpur : AllDetails = new AllDetails();
  newTestVarKharagpur : any[] = [];

  totalSanctionStrengthKharagpur : String = "";
  totalActualStrengthKharagpur : String = "";
  totalVacancyKharagpur : String = "";
  totalDeputationtootherunitKharagpur : String = "";
  totaldeputationfromotherunitKharagpur : String = "";
  totalAvailableStrengthKharagpur : String = "";
  totalLeaveKharagpur : String = "";
  totalStaticGuardKharagpur : String = "";
  totalMiscDutyKharagpur : String = "";
  totalTrainingKharagpur : String = "";
  totalSecurityGuardKharagpur : String = "";
  totalCampKharagpur : String = "";
  totalTrainGuardKharagpur : String = "";
  totalMiscDutyatHQRKharagpur : String = "";
  totalMiscDutyatGRPSGRPPKharagpur : String = "";
  totalSuspensionKharagpur : String = "";
  totalOtherDutyKharagpur : String = "";

  // Kharagpur variable end

  // Sealdah variable start

  trainingStrengthSealdah : Strength = new Strength();
  deputationfromotherunitStrengthSealdah : Strength = new Strength();
  otherdutyStrengthSealdah : Strength = new Strength();
  miscdutyStrengthSealdah : Strength = new Strength();
  sanctionStrengthSealdah : Strength = new Strength();
  vacancyStrengthSealdah : Strength = new Strength();
  actualStrengthSealdah : Strength = new Strength();
  miscdutyathqrdutyStrengthSealdah : Strength = new Strength();
  availableStrengthSealdah : Strength = new Strength();
  campStrengthSealdah : Strength = new Strength();
  deputationtootherunitStrengthSealdah : Strength = new Strength();
  leaveStrengthSealdah : Strength = new Strength();
  securityguardStrengthSealdah : Strength = new Strength();
  miscdutyatgrpsStrengthSealdah : Strength = new Strength();
  trainguardStrengthSealdah : Strength = new Strength();
  staticguardStrengthSealdah : Strength = new Strength();
  suspensionStrengthSealdah : Strength = new Strength();
  specificArrestCountSealdah = 0;
  preventiveArrestCountSealdah = 0;
  UDCaseCountSealdah = 0;
  SeizureCountSealdah = 0;
  FirCaseCountSealdah = 0;
  preventiveArrestDetailsSealdah : PreventiveArrest = new PreventiveArrest();
  UDCaseDetailsSealdah : UdCase = new UdCase();
  totalArrestCountSealdah = 0;
  UDCaseGRPSDetailsSealdah = 'NA';
  fileUploadSealdahFlag = 0;
  sameDayDataSealdahFlag = 0;
  warningSLD = "Warning : This is not the file for Sealdah. Please select correct file for sealdah and try again!";
  warningCurrDataSLD = "Warning : Current Day Data Found for Sealdah! Data will overwrite!";
  warningCurrDataStrengthSLD = "Warning : Current Day Strength Data Found for Sealdah! Data will overwrite!";
  selectedStrengthSealdah : Strength = new Strength();
  editStrengthSealdah : Strength = new Strength();
  selectedAllDetailsSealdah : AllDetails = new AllDetails();
  editAllDetailsSealdah : AllDetails = new AllDetails();
  newTestVarSealdah : any[] = [];

  totalSanctionStrengthSealdah : String = "";
  totalActualStrengthSealdah : String = "";
  totalVacancySealdah : String = "";
  totalDeputationtootherunitSealdah : String = "";
  totaldeputationfromotherunitSealdah : String = "";
  totalAvailableStrengthSealdah : String = "";
  totalLeaveSealdah : String = "";
  totalStaticGuardSealdah : String = "";
  totalMiscDutySealdah : String = "";
  totalTrainingSealdah : String = "";
  totalSecurityGuardSealdah : String = "";
  totalCampSealdah : String = "";
  totalTrainGuardSealdah : String = "";
  totalMiscDutyatHQRSealdah : String = "";
  totalMiscDutyatGRPSGRPPSealdah : String = "";
  totalSuspensionSealdah : String = "";
  totalOtherDutySealdah : String = "";

  // Sealdah variable end

  // Siliguri variable start

  trainingStrengthSiliguri : Strength = new Strength();
  deputationfromotherunitStrengthSiliguri : Strength = new Strength();
  otherdutyStrengthSiliguri : Strength = new Strength();
  lineORStrengthSiliguri : Strength = new Strength();
  sanctionStrengthSiliguri : Strength = new Strength();
  vacancyStrengthSiliguri : Strength = new Strength();
  actualStrengthSiliguri : Strength = new Strength();
  miscdutyathqrdutyStrengthSiliguri : Strength = new Strength();
  availableStrengthSiliguri : Strength = new Strength();
  campStrengthSiliguri : Strength = new Strength();
  deputationtootherunitStrengthSiliguri : Strength = new Strength();
  leaveStrengthSiliguri : Strength = new Strength();
  securityguardStrengthSiliguri : Strength = new Strength();
  miscdutyatgrpsStrengthSiliguri : Strength = new Strength();
  trainguardStrengthSiliguri : Strength = new Strength();
  staticguardStrengthSiliguri : Strength = new Strength();
  suspensionStrengthSiliguri : Strength = new Strength();
  specificArrestCountSiliguri = 0;
  preventiveArrestCountSiliguri = 0;
  UDCaseCountSiliguri = 0;
  SeizureCountSiliguri = 0;
  FirCaseCountSiliguri = 0;
  preventiveArrestDetailsSiliguri : PreventiveArrest = new PreventiveArrest();
  UDCaseDetailsSiliguri : UdCase = new UdCase();
  totalArrestCountSiliguri = 0;
  UDCaseGRPSDetailsSiliguri = 'NA';
  fileUploadSiliguriFlag = 0;
  sameDayDataSiliguriFlag = 0;
  warningSLG = "Warning : This is not the file for Siliguri. Please select correct file for siliguri and try again!";
  warningCurrDataSLG = "Warning : Current Day Data Found for Siliguri! Data will overwrite!";
  warningCurrDataStrengthSLG = "Warning : Current Day Strength Data Found for Siliguri! Data will overwrite!";
  selectedStrengthSiliguri : Strength = new Strength();
  editStrengthSiliguri : Strength = new Strength();
  selectedAllDetailsSiliguri : AllDetails = new AllDetails();
  editAllDetailsSiliguri : AllDetails = new AllDetails();
  newTestVarSiliguri : any[] = [];

  totalSanctionStrengthSiliguri : String = "";
  totalActualStrengthSiliguri : String = "";
  totalVacancySiliguri : String = "";
  totalDeputationtootherunitSiliguri : String = "";
  totaldeputationfromotherunitSiliguri : String = "";
  totalAvailableStrengthSiliguri : String = "";
  totalLeaveSiliguri : String = "";
  totalStaticGuardSiliguri : String = "";
  totalLineORSiliguri : String = "";
  totalTrainingSiliguri : String = "";
  totalSecurityGuardSiliguri : String = "";
  totalCampSiliguri : String = "";
  totalTrainGuardSiliguri : String = "";
  totalMiscDutyatHQRSiliguri : String = "";
  totalMiscDutyatGRPSGRPPSiliguri : String = "";
  totalSuspensionSiliguri : String = "";
  totalOtherDutySiliguri : String = "";

  // Siliguri variable end

  constructor(private howrahService : HowrahService, private kharagpurService : KharagpurService, private sealdahService : SealdahService, private siliguriService : SiliguriService, private titleService : Title, private router: Router, private modalService : BsModalService, private datePipe : DatePipe, private http : HttpClient, private toastr: ToastrService, public busyService: BusyService) {
    this.titleService.setTitle("CivilIn-morning-report-upload");

    this.isLoggedIn();
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader=false;
    }, 2000);
  }

  // Method to format the current date and time as 'yyyy-MM-dd HH:mm:ss'
  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

//Howrah services start

  //File upload services start for Howrah

  async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  public async onChangeHowrah(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file.type : " + file.type);
      console.log("file.name : " + file.name);
      if(file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.currentDateTime = this.getCurrentDateTime();
        this.howrahService.getAllDetailsTempHowrah().subscribe((allDetailsTemp) => {
          this.AllDetailsObject = allDetailsTemp;
          console.log(this.AllDetailsObject);
          if(this.AllDetailsObject.length > 0){
            this.myAlertCurrDataAllDetailsTempFuncHWH();
          }
          const formData = new FormData();
          formData.append('file',file);
          this.http.post('http://localhost:8080/uploadHowrahFile',formData,{responseType: 'text'}).subscribe((res : any) => {
            if(res === 'Uploaded Howrah docx file'){
              console.log("res" + res);
              this.fetchErrorLogs(this.currentDateTime);
              this.fileUploadHowrahFlag = 1;
              console.log("this.fileUploadHowrahFlag : "+this.fileUploadHowrahFlag);
              console.log('File uploaded successfully for Howrah');
              this.showSuccessFileUpload();
              setTimeout(function(){
                event.target.value = "";
              }, 4000);
            }
            if(res === 'Not Howrah file'){
              this.myAlertFuncHWH();
              event.target.value = "";
            }
          })
        })
      } else if(file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.howrahService.getStrengthHowrah().subscribe((strengthTemp) => {
          this.strengthObjectHowrah = strengthTemp;
          console.log(this.strengthObjectHowrah);
          if(this.strengthObjectHowrah.length > 0){
            this.myAlertCurrDataStrengthFuncHWH();
            event.target.value = "";
          }
          const formData = new FormData();
          formData.append('file',file);
          this.http.post('http://localhost:8080/uploadHowrahFile',formData,{responseType: 'text'}).subscribe((res : any) => {
            //debugger;
            if(res === 'Uploaded Howrah excel file'){
              console.log("res" + res);
              this.fileUploadHowrahFlag = 1;
              console.log("this.fileUploadHowrahFlag : "+this.fileUploadHowrahFlag);
              console.log('File uploaded successfully for Howrah');
              this.showSuccessFileUpload();
              setTimeout(function(){
                event.target.value = "";
              }, 8000);
            }
            if(res === 'Not Howrah file'){
              this.myAlertFuncHWH();
              event.target.value = "";
            }
          })
        })
      }
    }
  }

  //File upload services end for Howrah

  public retrieveStrengthDetailsHowrahToday() {
    this.howrahService.getStrengthHowrah().subscribe((data) => {
      this.strengthObjectHowrah = data;
      console.log(this.strengthObjectHowrah);

      if(this.strengthObjectHowrah.length > 0){
        this.strengthObjectHowrah.forEach( (element : any) => {
          if(element.strengthDesc! === "Deputation from other Unit"){
            this.deputationfromotherunitStrengthHowrah = element;
            this.totaldeputationfromotherunitHowrah = this.calculateTotalSelectedHeadHowrah(this.deputationfromotherunitStrengthHowrah.inspr!,
              this.deputationfromotherunitStrengthHowrah.silsi!,this.deputationfromotherunitStrengthHowrah.asilasi!,this.deputationfromotherunitStrengthHowrah.const!,
              this.deputationfromotherunitStrengthHowrah.lc!,this.deputationfromotherunitStrengthHowrah.nvf!,this.deputationfromotherunitStrengthHowrah.hg!,
              this.deputationfromotherunitStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Other duty"){
            this.otherdutyStrengthHowrah = element;
            this.totalOtherDutyHowrah = this.calculateTotalSelectedHeadHowrah(this.otherdutyStrengthHowrah.inspr!,
              this.otherdutyStrengthHowrah.silsi!,this.otherdutyStrengthHowrah.asilasi!,this.otherdutyStrengthHowrah.const!,
              this.otherdutyStrengthHowrah.lc!,this.otherdutyStrengthHowrah.nvf!,this.otherdutyStrengthHowrah.hg!,
              this.otherdutyStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Misc.Duty"){
            this.miscdutyStrengthHowrah = element;
            this.totalMiscDutyHowrah = this.calculateTotalSelectedHeadHowrah(this.miscdutyStrengthHowrah.inspr!,
              this.miscdutyStrengthHowrah.silsi!,this.miscdutyStrengthHowrah.asilasi!,this.miscdutyStrengthHowrah.const!,
              this.miscdutyStrengthHowrah.lc!,this.miscdutyStrengthHowrah.nvf!,this.miscdutyStrengthHowrah.hg!,
              this.miscdutyStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Sanction Strength"){
            this.sanctionStrengthHowrah = element;
            this.totalSanctionStrengthHowrah = this.calculateTotalSelectedHeadHowrah(this.sanctionStrengthHowrah.inspr!,
              this.sanctionStrengthHowrah.silsi!,this.sanctionStrengthHowrah.asilasi!,this.sanctionStrengthHowrah.const!,
              this.sanctionStrengthHowrah.lc!,this.sanctionStrengthHowrah.nvf!,this.sanctionStrengthHowrah.hg!,
              this.sanctionStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Vacancy"){
            this.vacancyStrengthHowrah = element;
            this.totalVacancyHowrah = this.calculateTotalSelectedHeadHowrah(this.vacancyStrengthHowrah.inspr!,
              this.vacancyStrengthHowrah.silsi!,this.vacancyStrengthHowrah.asilasi!,this.vacancyStrengthHowrah.const!,
              this.vacancyStrengthHowrah.lc!,this.vacancyStrengthHowrah.nvf!,this.vacancyStrengthHowrah.hg!,
              this.vacancyStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Actual Strength"){
            this.actualStrengthHowrah = element;
            this.totalActualStrengthHowrah = this.calculateTotalSelectedHeadHowrah(this.actualStrengthHowrah.inspr!,
              this.actualStrengthHowrah.silsi!,this.actualStrengthHowrah.asilasi!,this.actualStrengthHowrah.const!,
              this.actualStrengthHowrah.lc!,this.actualStrengthHowrah.nvf!,this.actualStrengthHowrah.hg!,
              this.actualStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Mise. Duty at Hqr. Duty"){
            this.miscdutyathqrdutyStrengthHowrah = element;
            this.totalMiscDutyatHQRHowrah = this.calculateTotalSelectedHeadHowrah(this.miscdutyathqrdutyStrengthHowrah.inspr!,
              this.miscdutyathqrdutyStrengthHowrah.silsi!,this.miscdutyathqrdutyStrengthHowrah.asilasi!,this.miscdutyathqrdutyStrengthHowrah.const!,
              this.miscdutyathqrdutyStrengthHowrah.lc!,this.miscdutyathqrdutyStrengthHowrah.nvf!,this.miscdutyathqrdutyStrengthHowrah.hg!,
              this.miscdutyathqrdutyStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Available Strength"){
            this.availableStrengthHowrah = element;
            this.totalAvailableStrengthHowrah = this.calculateTotalSelectedHeadHowrah(this.availableStrengthHowrah.inspr!,
              this.availableStrengthHowrah.silsi!,this.availableStrengthHowrah.asilasi!,this.availableStrengthHowrah.const!,
              this.availableStrengthHowrah.lc!,this.availableStrengthHowrah.nvf!,this.availableStrengthHowrah.hg!,
              this.availableStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Camp"){
            this.campStrengthHowrah = element;
            this.totalCampHowrah = this.calculateTotalSelectedHeadHowrah(this.campStrengthHowrah.inspr!,
              this.campStrengthHowrah.silsi!,this.campStrengthHowrah.asilasi!,this.campStrengthHowrah.const!,
              this.campStrengthHowrah.lc!,this.campStrengthHowrah.nvf!,this.campStrengthHowrah.hg!,
              this.campStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Training"){
            this.trainingStrengthHowrah = element;
            this.totalTrainingHowrah = this.calculateTotalSelectedHeadHowrah(this.trainingStrengthHowrah.inspr!,
              this.trainingStrengthHowrah.silsi!,this.trainingStrengthHowrah.asilasi!,this.trainingStrengthHowrah.const!,
              this.trainingStrengthHowrah.lc!,this.trainingStrengthHowrah.nvf!,this.trainingStrengthHowrah.hg!,
              this.trainingStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Deputation to other Unit"){
            this.deputationtootherunitStrengthHowrah = element;
            this.totalDeputationtootherunitHowrah = this.calculateTotalSelectedHeadHowrah(this.deputationtootherunitStrengthHowrah.inspr!,
              this.deputationtootherunitStrengthHowrah.silsi!,this.deputationtootherunitStrengthHowrah.asilasi!,this.deputationtootherunitStrengthHowrah.const!,
              this.deputationtootherunitStrengthHowrah.lc!,this.deputationtootherunitStrengthHowrah.nvf!,this.deputationtootherunitStrengthHowrah.hg!,
              this.deputationtootherunitStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Leave"){
            this.leaveStrengthHowrah = element;
            this.totalLeaveHowrah = this.calculateTotalSelectedHeadHowrah(this.leaveStrengthHowrah.inspr!,
              this.leaveStrengthHowrah.silsi!,this.leaveStrengthHowrah.asilasi!,this.leaveStrengthHowrah.const!,
              this.leaveStrengthHowrah.lc!,this.leaveStrengthHowrah.nvf!,this.leaveStrengthHowrah.hg!,
              this.leaveStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Security Guard"){
            this.securityguardStrengthHowrah = element;
            this.totalSecurityGuardHowrah = this.calculateTotalSelectedHeadHowrah(this.securityguardStrengthHowrah.inspr!,
              this.securityguardStrengthHowrah.silsi!,this.securityguardStrengthHowrah.asilasi!,this.securityguardStrengthHowrah.const!,
              this.securityguardStrengthHowrah.lc!,this.securityguardStrengthHowrah.nvf!,this.securityguardStrengthHowrah.hg!,
              this.securityguardStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Misc.Duty at GRPS/GRPP"){
            this.miscdutyatgrpsStrengthHowrah = element;
            this.totalMiscDutyatGRPSGRPPHowrah = this.calculateTotalSelectedHeadHowrah(this.miscdutyatgrpsStrengthHowrah.inspr!,
              this.miscdutyatgrpsStrengthHowrah.silsi!,this.miscdutyatgrpsStrengthHowrah.asilasi!,this.miscdutyatgrpsStrengthHowrah.const!,
              this.miscdutyatgrpsStrengthHowrah.lc!,this.miscdutyatgrpsStrengthHowrah.nvf!,this.miscdutyatgrpsStrengthHowrah.hg!,
              this.miscdutyatgrpsStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Train Guard"){
            this.trainguardStrengthHowrah = element;
            this.totalTrainGuardHowrah = this.calculateTotalSelectedHeadHowrah(this.trainguardStrengthHowrah.inspr!,
              this.trainguardStrengthHowrah.silsi!,this.trainguardStrengthHowrah.asilasi!,this.trainguardStrengthHowrah.const!,
              this.trainguardStrengthHowrah.lc!,this.trainguardStrengthHowrah.nvf!,this.trainguardStrengthHowrah.hg!,
              this.trainguardStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Static Guard"){
            this.staticguardStrengthHowrah = element;
            this.totalStaticGuardHowrah = this.calculateTotalSelectedHeadHowrah(this.staticguardStrengthHowrah.inspr!,
              this.staticguardStrengthHowrah.silsi!,this.staticguardStrengthHowrah.asilasi!,this.staticguardStrengthHowrah.const!,
              this.staticguardStrengthHowrah.lc!,this.staticguardStrengthHowrah.nvf!,this.staticguardStrengthHowrah.hg!,
              this.staticguardStrengthHowrah.civic!);
          }
          if(element.strengthDesc! === "Suspension"){
            this.suspensionStrengthHowrah = element;
            this.totalSuspensionHowrah = this.calculateTotalSelectedHeadHowrah(this.suspensionStrengthHowrah.inspr!,
              this.suspensionStrengthHowrah.silsi!,this.suspensionStrengthHowrah.asilasi!,this.suspensionStrengthHowrah.const!,
              this.suspensionStrengthHowrah.lc!,this.suspensionStrengthHowrah.nvf!,this.suspensionStrengthHowrah.hg!,
              this.suspensionStrengthHowrah.civic!);
          }
        })
      } else {
        this.showSuccessDataNotFound('Not Found', 'Strength data not found for Howrah today!');
      }      
  })
  }

  public retrieveSpecificArrestDetailsHowrahToday() {
    this.howrahService.getSpecificArrestHowrah().subscribe((dataSpecificArrest) => {
      this.SpecificArrestObject = dataSpecificArrest;
      console.log(this.SpecificArrestObject);

      this.SpecificArrestObject.forEach( (element : any) => {
        this.specificArrestCountHowrah = this.specificArrestCountHowrah+1;
        console.log("inside this.specificArrestCountHowrah" + this.specificArrestCountHowrah);
      })

    })
    console.log("this.specificArrestCountHowrah last" + this.specificArrestCountHowrah);
  }

  public retrievePreventiveArrestDetailsHowrahToday() {
    this.howrahService.getPreventiveArrestHowrah().subscribe((dataPreventiveArrest) => {
      this.PreventiveArrestObject = dataPreventiveArrest;
      console.log(this.PreventiveArrestObject);

      if(this.PreventiveArrestObject.length > 0){
        this.PreventiveArrestObject.forEach( (elementnew : any) => {
          this.preventiveArrestDetailsHowrah = elementnew;
          this.preventiveArrestCountHowrah = parseInt(this.preventiveArrestDetailsHowrah.total!);
        })
      } else {
        this.showSuccessDataNotFound('Not Found', 'Preventive Arrest data not found for Howrah today!');
      }      
  })
  console.log("this.preventiveArrestCountHowrah" + this.preventiveArrestCountHowrah);
  }

  public retrieveUDCaseDetailsHowrahToday() {
    this.howrahService.getUDCaseHowrah().subscribe((dataUDCase) => {
      this.UDCaseObject = dataUDCase;
      console.log(this.UDCaseObject);

      this.UDCaseObject.forEach( (element : any) => {
        this.UDCaseCountHowrah = this.UDCaseCountHowrah+1;
        this.UDCaseDetailsHowrah = element;
        this.UDCaseGRPSDetailsHowrah = '';
        this.UDCaseGRPSDetailsHowrah = this.UDCaseGRPSDetailsHowrah.concat(this.UDCaseDetailsHowrah.grpsname! + "-1");
        console.log("inside this.UDCaseCountHowrah" + this.UDCaseCountHowrah);
        console.log("inside this.UDCaseGRPSDetailsHowrah" + this.UDCaseGRPSDetailsHowrah);
      })

    })
    console.log("this.UDCaseCountHowrah last" + this.UDCaseCountHowrah);
  }

  public retrieveSeizureDetailsHowrahToday() {
    this.howrahService.getSeizureHowrah().subscribe((dataSeizure) => {
      this.SeizureObject = dataSeizure;
      console.log(this.SeizureObject);

      this.SeizureObject.forEach( (element : any) => {
        this.SeizureCountHowrah = this.SeizureCountHowrah+1;
        console.log("inside this.SeizureCountHowrah" + this.SeizureCountHowrah);
      })

    })
    console.log("this.SeizureCountHowrah last" + this.SeizureCountHowrah);
  }

  public retrieveFirCaseDetailsHowrahToday() {
    this.howrahService.getFirCaseHowrah().subscribe((firCase) => {
      this.FirCaseObject = firCase;
      console.log(this.FirCaseObject);

      this.FirCaseObject.forEach( (element : any) => {
        this.FirCaseCountHowrah = this.FirCaseCountHowrah+1;
        console.log("inside this.FirCaseCount" + this.FirCaseCountHowrah);
      })

    })
    console.log("this.FirCaseCountHowrah last" + this.FirCaseCountHowrah);
  }

  public retrieveAllDetailsHowrahToday() {
    this.howrahService.getAllDetailsHowrah().subscribe((allDetails) => {
      this.AllDetailsObject = allDetails;
      console.log(this.AllDetailsObject);
    })
  }

  public retrieveAllDetailsTempHowrahToday(){
    var res : string = "";
    this.howrahService.getAllDetailsTempHowrah().subscribe((allDetailsTemp) => {
      this.AllDetailsObject = allDetailsTemp;
      console.log(this.AllDetailsObject);
      if(this.AllDetailsObject.length > 0){
        this.AllDetailsObject.forEach( (element : any) => {
          //this.AllDetailsObjectTempHowrah = element
          if(element.grps! === "Howrah"){
            this.AllDetailsObjectTempHowrahGRPS = element
          }
          if(element.grps! === "Belur"){
            this.AllDetailsObjectTempBelur = element
          }
          if(element.grps! === "Kamarkundu"){
            this.AllDetailsObjectTempKamarkundu = element
          }
          if(element.grps! === "Sheoraphuli"){
            this.AllDetailsObjectTempSheoraphuli = element
          }
          if(element.grps! === "Bandel"){
            this.AllDetailsObjectTempBandel = element
          }
          if(element.grps! === "Burdwan"){
            this.AllDetailsObjectTempBurdwan = element
          }
          if(element.grps! === "Andal"){
            this.AllDetailsObjectTempAndal = element
          }
          if(element.grps! === "Asansol"){
            this.AllDetailsObjectTempAsansol = element
          }
          if(element.grps! === "Kalna"){
            this.AllDetailsObjectTempKalna = element
          }
          if(element.grps! === "Katwa"){
            this.AllDetailsObjectTempKatwa = element
          }
          if(element.grps! === "Sainthia"){
            this.AllDetailsObjectTempSainthia = element
          }
          if(element.grps! === "Suri"){
            this.AllDetailsObjectTempSuri = element
          }
          if(element.grps! === "Azimganj"){
            this.AllDetailsObjectTempAzimganj = element
          }
        })
        this.newTestVarHowrah = this.AllDetailsObjectTempHowrah.typeOfCrime!.split(",\n");
        console.log("this.newTestVar : "+this.newTestVarHowrah);
      }
      else{
        this.AllDetailsObject = {
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
    //return this.AllDetailsObject;
  }

  // Fetch error logs from the backend
  fetchErrorLogs(a : string): void {
    this.howrahService.getErrorLogs(a).subscribe(
      (logs) => {
        console.log("inside fetch logs...");
        this.logs = logs.map(log => this.cleanLogString(log));
        console.log(this.logs);
      },
      (err) => {
        // this.error = 'Error fetching logs. Please try again later.';
        console.error(err);
      }
    );
  }

  // Method to clean up the log message by removing timestamp and metadata
  public cleanLogString(input: string): string {
    // Regular expression to remove the timestamp, log level, thread, and other metadata
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} - \[[^\]]*\] [^\[]* \[[^\]]*\] - /;
    
    // Replace the matched portion with an empty string to remove the metadata
    return input.replace(regex, '').trim();
}

  public deleteAllDataHowrahToday() {
    this.howrahService.deleteAllDataHowrahToday();
    this.sameDayDataHowrahFlag = 0;
    this.fileUploadHowrahFlag = 0;
    //this.showSuccessDataDelete();
  }

  public uploadAllDetailstoMainTableHowrahOld(){
    const formData = new FormData();
    this.http.post('http://localhost:8080/uploadAllDetailsTestHowrah',formData,{responseType: 'text'}).subscribe((res : any) => {
      //debugger
      if(res === 'Howrah GRP all data uploaded into main table!'){
        console.log('Howrah GRP all data uploaded into main table!')
        this.myAlertFuncAllCompile('Howrah GRP all data uploaded!');
      } 
    })
    this.closeModalHowrah();
  }

  public uploadAllDetailstoMainTableHowrah(){
    const formData = new FormData();
    const modelDiv = document.getElementById('myModalHowrah');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    this.http.post('http://localhost:8080/uploadAllDetailsTestHowrah',formData,{responseType: 'text'}).subscribe(res => {
      //debugger
      if(res === 'Howrah GRP all data uploaded into main table!'){
        console.log('Howrah GRP all data uploaded into main table!')
        this.myAlertFuncAllCompile('Howrah GRP all data uploaded!');
        //this.howrahService.deleteAllDetailsTempHowrahToday();
        if(modelDiv != null){
          console.log("inside uploadAllDetailstoMainTableHowrah")
          modelDiv.style.display = 'none';
        }
        navigation!.className = 'navigation';
        main!.className = 'main';
      }},
      error => {
        this.errors = error;
        this.errorReceived('Error', 'Error while uploading!');
      }
    )
    this.fileUploadHowrahFlag = 0;
    this.sameDayDataHowrahFlag = 0;
    // this.closeModalHowrah();
    this.closeModalconfHowrah();
  }

  // ---------Edit function for Strength Howrah start--------------
  
  public updateHowrahSelectedStrength(doc_id : any){
    const modelDivHowrah = document.getElementById('myModalStrengthHowrah');
    var myModalHowrah = document.getElementById('myModalHowrah');
    console.log("edit data start Howrah");
    console.log("doc_id : " + doc_id);

    const selectedStrengthHowrahTemp : Strength = {
      inspr : this.selectedInspr,
      silsi : this.selectedsilsi,
      asilasi : this.selectedasilasi,
      const : this.selectedConst,
      lc : this.selectedLc,
      nvf : this.selectedNvf,
      hg : this.selectedHg,
      civic : this.selectedCivic,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      date : this.selectedStrengthHowrah.date,
      grpname : this.selectedStrengthHowrah.grpname,
      strengthDesc : this.selectedStrengthHowrah.strengthDesc,
      unique_id : this.selectedStrengthHowrah.unique_id
    }

    this.howrahService.UpdateSelectedHeadStrengthDataToday(selectedStrengthHowrahTemp);

    this.showDataUpdate();

    if(modelDivHowrah != null){
      modelDivHowrah.style.display = 'none';
    }
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'block';
    }

    this.retrieveStrengthDetailsHowrahToday();
  }

  // ------------Edit function for Strength Howrah end---------------

  // ---------Edit function for All Details Howrah start--------------
  
  public updateAllDetailsTodayHowrah(doc_id : any){
    const modelDivHowrah = document.getElementById('myModalAllDetailsHowrah');
    var myModalHowrah = document.getElementById('myModalHowrah');
    console.log("edit data All Details start Howrah");
    console.log("doc_id : " + doc_id);

    const selectedAllDetailsHowrahTemp : AllDetails = {
      prevCountToday : this.selectedPrevCountToday,
      specCountToday : this.selectedSpecCountToday,
      totalArrestCountToday : this.selectedTotalArrestCountToday,
      //totalArrestCountToday : (parseInt(this.selectedPrevCountToday) + parseInt(this.selectedSpecCountToday)).toString(),
      fircountToday : this.selectedFircountToday,
      otherCasesToday : this.selectedOtherCasesToday,
      totalCasesCountToday : this.selectedTotalCasesCountToday,
      //totalCasesCountToday : (parseInt(this.selectedFircountToday) + parseInt(this.selectedOtherCasesToday)).toString(),
      typeOfCrime : this.selectedTypeOfCrime,
      seizureCountToday : this.selectedSeizureCountToday,
      udcountToday : this.selectedUDcountToday,
      grps : this.selectedGRPS,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      dateofReport : this.selectedAllDetailsHowrah.dateofReport,
      grp : this.selectedAllDetailsHowrah.grp,
      unique_id : this.selectedAllDetailsHowrah.unique_id
    }

    this.howrahService.UpdateAllDetailsDataTodayHowrah(selectedAllDetailsHowrahTemp);

    this.showDataUpdate();

    if(modelDivHowrah != null){
      modelDivHowrah.style.display = 'none';
    }
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'block';
    }

    this.retrieveAllDetailsTempHowrahToday();
  }

  // ------------Edit function for All Details Howrah end---------------

  // ---------Edit function for Preventive Arrest Howrah start--------------
  
  public updatePreventiveArrestTodayHowrah(doc_id : any){
    const modelDivHowrah = document.getElementById('myModalPrevArrestHowrah');
    var myModalHowrah = document.getElementById('myModalHowrah');
    console.log("edit data preventive Arrest start Howrah");
    console.log("doc_id : " + doc_id);

    const selectedPreventiveArrestHowrahTemp : PreventiveArrest = {
      act1 : this.selectedAct1,
      act2 : this.selectedAct2,
      act3 : this.selectedAct3,
      act4 : this.selectedAct4,
      policeAct : this.selectedPoliceAct,
      act5 : this.selectedAct5,
      bclaact : this.selectedBclaact,
      iract : this.selectedIract,
      other : this.selectedOther,
      total : this.selectedTotal,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      dateofReport : this.preventiveArrestDetailsHowrah.dateofReport,
      grpname : this.preventiveArrestDetailsHowrah.grpname,
      unique_id : this.preventiveArrestDetailsHowrah.unique_id
    }

    this.howrahService.UpdatePreventiveArrestDataTodayHowrah(selectedPreventiveArrestHowrahTemp);

    this.showDataUpdate();

    if(modelDivHowrah != null){
      modelDivHowrah.style.display = 'none';
    }
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'block';
    }

    this.retrievePreventiveArrestDetailsHowrahToday();
  }

  // ------------Edit function for Preventive Arrest Howrah end---------------

// UI Functions for Howrah start

  //First Preview Modal open function for Howrah start
  public openPreviewModalHowrah(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalHowrah');
    console.log("modelDiv.style.display : "+modelDiv!.style.display);
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal opened openPreviewModalHowrah");

    this.retrieveStrengthDetailsHowrahToday();
    this.retrievePreventiveArrestDetailsHowrahToday();
    this.retrieveAllDetailsTempHowrahToday();
  }

  //First Preview Modal open function for Howrah end

  //First Preview Modal close function for Howrah start
  public closeModalHowrah(){
    const modelDiv = document.getElementById('myModalHowrah');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation';
    main!.className = 'main';
    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    this.specificArrestCountHowrah = 0;
    this.totalArrestCountHowrah = 0;
    this.FirCaseCountHowrah = 0;
    this.SeizureCountHowrah = 0;
    this.UDCaseCountHowrah = 0;
  }

  //First Preview Modal close function for Howrah end

  //Open modal function for edit Strength start for howrah
  public openEditModalStrengthHowrah(selectedStrengthHead : string){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalHowrah = document.getElementById('myModalHowrah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalStrengthHowrah');
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'none';
    }
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal opened edit");
    this.howrahService.getStrengthHowrah().subscribe((data) => {
      this.strengthObjectHowrah = data;
      console.log(this.strengthObjectHowrah);

      this.strengthObjectHowrah.forEach( (element : any) => {
        if(element.strengthDesc! === selectedStrengthHead){
          this.selectedStrengthHowrah = element

          this.selectedInspr = this.selectedStrengthHowrah.inspr!;
          this.selectedsilsi = this.selectedStrengthHowrah.silsi!;
          this.selectedasilasi = this.selectedStrengthHowrah.asilasi!;
          this.selectedConst = this.selectedStrengthHowrah.const!;
          this.selectedLc = this.selectedStrengthHowrah.lc!;
          this.selectedNvf = this.selectedStrengthHowrah.nvf!;
          this.selectedHg = this.selectedStrengthHowrah.hg!;
          this.selectedCivic = this.selectedStrengthHowrah.civic!;
        }
      })
    })
  }
  //Open modal function for edit Strength end for howrah

  //Close modal function for edit Strength start for howrah
  public closeEditModalStrengthHowrah(){
    const modelDiv = document.getElementById('myModalStrengthHowrah');
    var myModalHowrah = document.getElementById('myModalHowrah');

    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'block';
    }
  }
  //Close modal function for edit Strength end for howrah

  //Open modal function for confirmation before save data start for howrah
  public openModalconfHowrah(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalHowrah = document.getElementById('myModalHowrah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalConfHowrah');
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'none';
    }
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
  }
  //Open modal function for confirmation before save data end for howrah

  //Close modal function for confirmation before save data start for howrah
  public closeModalconfHowrah(){
    const modelDiv = document.getElementById('myModalConfHowrah');
    var myModalHowrah = document.getElementById('myModalHowrah');

    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'block';
    }
    //(document.getElementById('button-save-howrah') as HTMLInputElement).disabled = true;
    var button_save_howrah = document.getElementById('button-save-howrah');
    //button_save_howrah!.className = 'btn btn-primary button-36 footer-button2 is-disabled';
  }
  //Close modal function for confirmation before save data end for howrah

  //Open modal function for edit all details start for howrah
  public openEditModalAllDetailsHowrah(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalHowrah = document.getElementById('myModalHowrah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalAllDetailsHowrah');
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'none';
    }
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal edit all details opened");
    this.howrahService.getAllDetailsTempHowrah().subscribe((data) => {
      this.allDetailsObjectHowrah = data;
      console.log(this.allDetailsObjectHowrah);

      this.allDetailsObjectHowrah.forEach( (element : any) => {
        //if(element.strengthDesc! === selectedStrengthHead){
          this.selectedAllDetailsHowrah = element

          this.selectedPrevCountToday = this.selectedAllDetailsHowrah.prevCountToday!;
          this.selectedSpecCountToday = this.selectedAllDetailsHowrah.specCountToday!;
          this.selectedTotalArrestCountToday = this.selectedAllDetailsHowrah.totalArrestCountToday!;
          this.selectedFircountToday = this.selectedAllDetailsHowrah.fircountToday!;
          this.selectedOtherCasesToday = this.selectedAllDetailsHowrah.otherCasesToday!;
          this.selectedTotalCasesCountToday = this.selectedAllDetailsHowrah.totalCasesCountToday!;
          this.selectedTypeOfCrime = this.selectedAllDetailsHowrah.typeOfCrime!;
          this.selectedSeizureCountToday = this.selectedAllDetailsHowrah.seizureCountToday!;
          this.selectedUDcountToday = this.selectedAllDetailsHowrah.udcountToday!;
          this.selectedGRPS = this.selectedAllDetailsHowrah.grps!;
        //}
      })
    })
  }
  //Open modal function for edit all details end for howrah

  //Close modal function for edit all details start for howrah
  public closeEditModalAllDetailsHowrah(){
    const modelDiv = document.getElementById('myModalAllDetailsHowrah');
    var myModalHowrah = document.getElementById('myModalHowrah');

    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'block';
    }
  }
  //Close modal function for edit all details end for howrah

  //Open modal function for edit Preventive Arrest start for howrah
  public openEditModalPreventiveArrestHowrah(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalHowrah = document.getElementById('myModalHowrah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalPrevArrestHowrah');
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'none';
    }
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal edit preventive arrest opened");
    this.howrahService.getPreventiveArrestHowrah().subscribe((data) => {
      this.PreventiveArrestObject = data;
      console.log(this.PreventiveArrestObject);

      this.PreventiveArrestObject.forEach( (element : any) => {
        //if(element.strengthDesc! === selectedStrengthHead){
          this.preventiveArrestDetailsHowrah = element

          this.selectedAct1 = this.preventiveArrestDetailsHowrah.act1!;
          this.selectedAct2 = this.preventiveArrestDetailsHowrah.act2!;
          this.selectedAct3 = this.preventiveArrestDetailsHowrah.act3!;
          this.selectedAct4 = this.preventiveArrestDetailsHowrah.act4!;
          this.selectedPoliceAct = this.preventiveArrestDetailsHowrah.policeAct!;
          this.selectedAct5 = this.preventiveArrestDetailsHowrah.act5!;
          this.selectedBclaact = this.preventiveArrestDetailsHowrah.bclaact!;
          this.selectedIract = this.preventiveArrestDetailsHowrah.iract!;
          this.selectedOther = this.preventiveArrestDetailsHowrah.other!;
          this.selectedTotal = this.preventiveArrestDetailsHowrah.total!;
        //}
      })
    })
  }
  //Open modal function for edit Preventive Arrest end for howrah

  //Close modal function for edit Preventive Arrest start for howrah
  public closeEditModalPreventiveArrestHowrah(){
    const modelDiv = document.getElementById('myModalPrevArrestHowrah');
    var myModalHowrah = document.getElementById('myModalHowrah');

    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    if(myModalHowrah != null){
      myModalHowrah.style.display = 'block';
    }
  }
  //Close modal function for edit Preventive Arrest end for howrah

  public calculateTotalArrestHowrah(){
    this.selectedTotalArrestCountToday = (parseInt(this.selectedPrevCountToday) + parseInt(this.selectedSpecCountToday)).toString()
  }

  public calculateTotalCasesHowrah(){
    this.selectedTotalCasesCountToday = (parseInt(this.selectedFircountToday) + parseInt(this.selectedOtherCasesToday)).toString()
  }

  public calculateTotalSelectedHeadHowrah(a:string,b:string,c:string,d:string,e:string,f:string,g:string,h:string) : string{
    console.log("parseInt(a) : "+parseInt(a));
    console.log("parseInt(b) : "+parseInt(b));
    console.log("parseInt(c) : "+parseInt(c));
    console.log("parseInt(d) : "+parseInt(d));
    console.log("parseInt(e) : "+parseInt(e));
    console.log("parseInt(f) : "+parseInt(f));
    console.log("parseInt(g) : "+parseInt(g));
    console.log("parseInt(h) : "+parseInt(h));
    a = this.checkNan(a);
    b = this.checkNan(b);
    c = this.checkNan(c);
    d = this.checkNan(d);
    e = this.checkNan(e);
    f = this.checkNan(f);
    g = this.checkNan(g);
    h = this.checkNan(h);
    console.log("after parseInt(a) : "+parseInt(a));
    console.log("parseInt(b) : "+parseInt(b));
    console.log("parseInt(c) : "+parseInt(c));
    console.log("parseInt(d) : "+parseInt(d));
    console.log("parseInt(e) : "+parseInt(e));
    console.log("parseInt(f) : "+parseInt(f));
    console.log("after parseInt(g) : "+parseInt(g));
    console.log("parseInt(h) : "+parseInt(h));
    var total = (parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d) + parseInt(e) + parseInt(f) + parseInt(g) + parseInt(h)).toString();
    return total;
  }

// UI Functions for Howrah end

//Howrah services end

//Kharagpur services start

//File upload services start for Kharagpur
  
public onChangeKharagpur(event: any) {
  if(event.target.files.length > 0) {
    const file = event.target.files[0];
    console.log("file.type : " + file.type);
    console.log("file.name : " + file.name);
    if(file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    this.currentDateTime = this.getCurrentDateTime();
      this.kharagpurService.getAllDetailsTempKharagpur().subscribe((allDetailsTemp) => {
        this.AllDetailsObject = allDetailsTemp;
        console.log(this.AllDetailsObject);
        if(this.AllDetailsObject.length > 0){
          this.myAlertCurrDataAllDetailsTempFuncHWH();
        }
        const formData = new FormData();
        formData.append('file',file);
        this.http.post('http://localhost:8080/uploadKharagpurFile',formData,{responseType: 'text'}).subscribe((res : any) => {
          if(res === 'Uploaded Kharagpur docx file'){
            console.log("res" + res);
            this.fetchErrorLogsKharagpur(this.currentDateTime);
            this.fileUploadKharagpurFlag = 1;
            console.log("this.fileUploadKharagpurFlag : "+this.fileUploadKharagpurFlag);
            console.log('File uploaded successfully for Kharagpur');
            this.showSuccessFileUpload();
            setTimeout(function(){
              event.target.value = "";
            }, 4000);
          }
          if(res === 'Not Kharagpur file'){
            this.myAlertFuncKGP();
            event.target.value = "";
          }
        })
      })
    } else if(file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.kharagpurService.getStrengthKharagpurToday().subscribe((strengthTemp) => {
        this.strengthObjectKharagpur = strengthTemp;
        console.log(this.strengthObjectKharagpur);
        if(this.strengthObjectKharagpur.length > 0){
          this.myAlertCurrDataStrengthFuncKGP();
          event.target.value = "";
        }
        const formData = new FormData();
        formData.append('file',file);
        this.http.post('http://localhost:8080/uploadKharagpurFile',formData,{responseType: 'text'}).subscribe((res : any) => {
          //debugger;
          if(res === 'Uploaded Kharagpur excel file'){
            console.log("res" + res);
            this.fileUploadKharagpurFlag = 1;
            console.log("this.fileUploadKharagpurFlag : "+this.fileUploadKharagpurFlag);
            console.log('File uploaded successfully for Kharagpur');
            this.showSuccessFileUpload();
            setTimeout(function(){
              event.target.value = "";
            }, 8000);
          }
          if(res === 'Not Kharagpur file'){
            this.myAlertFuncKGP();
            event.target.value = "";
          }
        })
      })
    }
  }
}
//File upload services end for Kharagpur

public retrieveStrengthDetailsKharagpurToday() {
  this.kharagpurService.getStrengthKharagpurToday().subscribe((data) => {
    this.strengthObjectKharagpur = data;
    console.log(this.strengthObjectKharagpur);

    this.strengthObjectKharagpur.forEach( (element : any) => {
      if(element.strengthDesc! === "Deputation from other Unit"){
        this.deputationfromotherunitStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Other duty"){
        this.otherdutyStrengthKharagpur = element
        console.log("this.otherdutyStrengthKharagpur.const : "+this.otherdutyStrengthKharagpur.const);
      }
      // if(element.strengthDesc! === "Misc.Duty"){
      //   this.miscdutyStrengthKharagpur = element
      // }
      if(element.strengthDesc! === "Sanction Strength"){
        this.sanctionStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Vacancy"){
        this.vacancyStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Actual Strength"){
        this.actualStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Misc. duty at Hqr"){
        this.miscdutyathqrdutyStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Available Strength"){
        this.availableStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Camp"){
        this.campStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Training"){
        this.trainingStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Deputation to other Unit"){
        this.deputationtootherunitStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Leave"){
        this.leaveStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Security Guard"){
        this.securityguardStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Misc duty at GRPS/GRPP"){
        this.miscdutyatgrpsStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Train Guard"){
        this.trainguardStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Static Guard"){
        this.staticguardStrengthKharagpur = element
      }
      if(element.strengthDesc! === "Suspension"){
        this.suspensionStrengthKharagpur = element
      }
    });
})
}

public retrieveSpecificArrestDetailsKharagpurToday() {
  this.kharagpurService.getSpecificArrestKharagpurToday().subscribe((dataSpecificArrest) => {
    this.SpecificArrestObject = dataSpecificArrest;
    console.log(this.SpecificArrestObject);

    this.SpecificArrestObject.forEach( (element : any) => {
      this.specificArrestCountKharagpur = this.specificArrestCountKharagpur+1;
      console.log("inside this.specificArrestCountKharagpur" + this.specificArrestCountKharagpur);
    })

  })
  console.log("this.specificArrestCountKharagpur last" + this.specificArrestCountKharagpur);
}

public retrievePreventiveArrestDetailsKharagpurToday() {
  this.kharagpurService.getPreventiveArrestKharagpurToday().subscribe((dataPreventiveArrest) => {
    this.PreventiveArrestObject = dataPreventiveArrest;
    console.log(this.PreventiveArrestObject);

    this.PreventiveArrestObject.forEach( (elementnew : any) => {
      this.preventiveArrestDetailsKharagpur = elementnew;
      this.preventiveArrestCountKharagpur = parseInt(this.preventiveArrestDetailsKharagpur.total!);
    })
})
console.log("this.preventiveArrestCountKharagpur" + this.preventiveArrestCountKharagpur);
}

public retrieveUDCaseDetailsKharagpurToday() {
  this.kharagpurService.getUDCaseKharagpurToday().subscribe((dataUDCase) => {
    this.UDCaseObject = dataUDCase;
    console.log(this.UDCaseObject);

    this.UDCaseObject.forEach( (element : any) => {
      this.UDCaseCountKharagpur = this.UDCaseCountKharagpur+1;
      this.UDCaseDetailsKharagpur = element;
      this.UDCaseGRPSDetailsKharagpur = '';
      this.UDCaseGRPSDetailsKharagpur = this.UDCaseGRPSDetailsKharagpur.concat(this.UDCaseDetailsKharagpur.grpsname! + "-1");
      console.log("inside this.UDCaseCountKharagpur" + this.UDCaseCountKharagpur);
      console.log("inside this.UDCaseGRPSDetailsKharagpur" + this.UDCaseGRPSDetailsKharagpur);
    })

  })
  console.log("this.UDCaseCountKharagpur last" + this.UDCaseCountKharagpur);
}

public retrieveSeizureDetailsKharagpurToday() {
  this.kharagpurService.getSeizureKharagpurToday().subscribe((dataSeizure) => {
    this.SeizureObject = dataSeizure;
    console.log(this.SeizureObject);

    this.SeizureObject.forEach( (element : any) => {
      this.SeizureCountKharagpur = this.SeizureCountKharagpur+1;
      console.log("inside this.SeizureCountKharagpur" + this.SeizureCountKharagpur);
    })

  })
  console.log("this.SeizureCountKharagpur last" + this.SeizureCountKharagpur);
}

public retrieveFirCaseDetailsKharagpurToday() {
  this.kharagpurService.getFirCaseKharagpurToday().subscribe((firCase) => {
    this.FirCaseObject = firCase;
    console.log(this.FirCaseObject);

    this.FirCaseObject.forEach( (element : any) => {
      this.FirCaseCountKharagpur = this.FirCaseCountKharagpur+1;
      console.log("inside this.FirCaseCount" + this.FirCaseCountKharagpur);
    })

  })
  console.log("this.FirCaseCountKharagpur last" + this.FirCaseCountKharagpur);
}

public retrieveAllDetailsKharagpurToday() {
  this.kharagpurService.getAllDetailsKharagpur().subscribe((allDetails) => {
    this.AllDetailsObject = allDetails;
    console.log(this.AllDetailsObject);
  })
}

public retrieveAllDetailsTempKharagpurToday() {
  this.kharagpurService.getAllDetailsTempKharagpur().subscribe((allDetailsTemp) => {
    this.AllDetailsObject = allDetailsTemp;
    console.log(this.AllDetailsObject);
    this.AllDetailsObject.forEach( (element : any) => {
      this.AllDetailsObjectTempKharagpur = element
    })
    this.newTestVarKharagpur = this.AllDetailsObjectTempKharagpur.typeOfCrime!.split(",\n");
  })
}

// Fetch error logs from the backend
fetchErrorLogsKharagpur(a : string): void {
  this.kharagpurService.getErrorLogs(a).subscribe(
    (logs) => {
      console.log("inside fetch logs...");
      this.logs = logs.map(log => this.cleanLogString(log));
      console.log(this.logs);
    },
    (err) => {
      // this.error = 'Error fetching logs. Please try again later.';
      console.error(err);
    }
  );
}

public deleteAllDataKharagpurToday() {
  this.kharagpurService.deleteAllDataKharagpurToday();
  this.sameDayDataKharagpurFlag = 0;
  this.fileUploadKharagpurFlag = 0;
  this.showSuccessDataDelete();
}

public uploadAllDetailstoMainTableKharagpurOld(){
  const formData = new FormData();
  this.http.post('http://localhost:8080/uploadAllDetailsTestKharagpur',formData,{responseType: 'text'}).subscribe((res : any) => {
    //debugger
    if(res === 'Kharagpur GRP all data uploaded into main table!'){
      console.log('Kharagpur GRP all data uploaded into main table!')
      this.myAlertFuncAllCompile('Kharagpur GRP all data uploaded!');
    } 
  })
  this.closeModalKharagpur();
}

public uploadAllDetailstoMainTableKharagpur(){
  const formData = new FormData();
  const modelDivKharagpur = document.getElementById('myModalKharagpur');
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  this.http.post('http://localhost:8080/uploadAllDetailsTestKharagpur',formData,{responseType: 'text'}).subscribe(res => {
    //debugger
    if(res === 'Kharagpur GRP all data uploaded into main table!'){
      console.log('Kharagpur GRP all data uploaded into main table!')
      this.myAlertFuncAllCompile('Kharagpur GRP all data uploaded!');
      //this.kharagpurService.deleteAllDetailsTempKharagpurToday();
      if(modelDivKharagpur != null){
        console.log("inside uploadAllDetailstoMainTableKharagpur")
        modelDivKharagpur.style.display = 'none';
      }
      navigation!.className = 'navigation';
      main!.className = 'main';
    }},
    error => {
      this.errors = error;
      this.errorReceived('Error', 'Error while uploading Kharagpur Data!');
    }
  )
  this.fileUploadKharagpurFlag = 0;
  this.sameDayDataKharagpurFlag = 0;
  // this.closeModalHowrah();
  this.closeModalconfKharagpur();
}

// ---------Edit function for Strength Kharagpur start--------------

public updateKharagpurSelectedStrength(doc_id : any){
  const modelDivKharagpur = document.getElementById('myModalStrengthKharagpur');
  var myModalKharagpur = document.getElementById('myModalKharagpur');
  console.log("edit data start Kharagpur");
  console.log("doc_id : " + doc_id);

  const selectedStrengthKharagpurTemp : Strength = {
    inspr : this.selectedInspr,
    silsi : this.selectedsilsi,
    asilasi : this.selectedasilasi,
    const : this.selectedConst,
    lc : this.selectedLc,
    nvf : this.selectedNvf,
    hg : this.selectedHg,
    civic : this.selectedCivic,
    document_id : doc_id,
    lstUpdatedBy : this.currentUser,
    date : this.selectedStrengthKharagpur.date,
    grpname : this.selectedStrengthKharagpur.grpname,
    strengthDesc : this.selectedStrengthKharagpur.strengthDesc,
    unique_id : this.selectedStrengthKharagpur.unique_id
  }

  this.kharagpurService.UpdateSelectedHeadStrengthDataTodayKharagpur(selectedStrengthKharagpurTemp);

  this.showDataUpdate();

  if(modelDivKharagpur != null){
    modelDivKharagpur.style.display = 'none';
  }
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'block';
  }

  this.retrieveStrengthDetailsKharagpurToday();
}

// ------------Edit function for Strength Kharagpur end---------------

// ---------Edit function for All Details Kharagpur start--------------

public updateAllDetailsTodayKharagpur(doc_id : any){
  const modelDivKharagpur = document.getElementById('myModalAllDetailsKharagpur');
  var myModalKharagpur = document.getElementById('myModalKharagpur');
  console.log("edit data All Details start Kharagpur");
  console.log("doc_id : " + doc_id);

  const selectedAllDetailsKharagpurTemp : AllDetails = {
    prevCountToday : this.selectedPrevCountToday,
    specCountToday : this.selectedSpecCountToday,
    totalArrestCountToday : this.selectedTotalArrestCountToday,
    //totalArrestCountToday : (parseInt(this.selectedPrevCountToday) + parseInt(this.selectedSpecCountToday)).toString(),
    fircountToday : this.selectedFircountToday,
    otherCasesToday : this.selectedOtherCasesToday,
    totalCasesCountToday : this.selectedTotalCasesCountToday,
    //totalCasesCountToday : (parseInt(this.selectedFircountToday) + parseInt(this.selectedOtherCasesToday)).toString(),
    typeOfCrime : this.selectedTypeOfCrime,
    seizureCountToday : this.selectedSeizureCountToday,
    udcountToday : this.selectedUDcountToday,
    grps : this.selectedGRPS,
    document_id : doc_id,
    lstUpdatedBy : this.currentUser,
    dateofReport : this.selectedAllDetailsKharagpur.dateofReport,
    grp : this.selectedAllDetailsKharagpur.grp,
    unique_id : this.selectedAllDetailsKharagpur.unique_id
  }

  this.kharagpurService.UpdateAllDetailsDataTodayKharagpur(selectedAllDetailsKharagpurTemp);

  this.showDataUpdate();

  if(modelDivKharagpur != null){
    modelDivKharagpur.style.display = 'none';
  }
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'block';
  }

  this.retrieveAllDetailsTempKharagpurToday();
}

// ------------Edit function for All Details Kharagpur end---------------

// ---------Edit function for Preventive Arrest Kharagpur start--------------

public updatePreventiveArrestTodayKharagpur(doc_id : any){
  const modelDivKharagpur = document.getElementById('myModalPrevArrestKharagpur');
  var myModalKharagpur = document.getElementById('myModalKharagpur');
  console.log("edit data preventive Arrest start Kharagpur");
  console.log("doc_id : " + doc_id);

  const selectedPreventiveArrestKharagpurTemp : PreventiveArrest = {
    act1 : this.selectedAct1,
    act2 : this.selectedAct2,
    act3 : this.selectedAct3,
    act4 : this.selectedAct4,
    policeAct : this.selectedPoliceAct,
    act5 : this.selectedAct5,
    bclaact : this.selectedBclaact,
    iract : this.selectedIract,
    other : this.selectedOther,
    total : this.selectedTotal,
    document_id : doc_id,
    lstUpdatedBy : this.currentUser,
    dateofReport : this.preventiveArrestDetailsKharagpur.dateofReport,
    grpname : this.preventiveArrestDetailsKharagpur.grpname,
    unique_id : this.preventiveArrestDetailsKharagpur.unique_id
  }

  this.kharagpurService.UpdatePreventiveArrestDataTodayKharagpur(selectedPreventiveArrestKharagpurTemp);

  this.showDataUpdate();

  if(modelDivKharagpur != null){
    modelDivKharagpur.style.display = 'none';
  }
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'block';
  }

  this.retrievePreventiveArrestDetailsKharagpurToday();
}

// ------------Edit function for Preventive Arrest Kharagpur end---------------

//UI functions for Kharagpur start

//First Preview Modal open function for Kharagpur
public openPreviewModalKharagpur(){
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  navigation!.className = 'navigation is-blurred';
  main!.className = 'main is-blurred';
  const modelDiv = document.getElementById('myModalKharagpur');
  console.log("modelDiv.style.display : "+modelDiv!.style.display);
  if(modelDiv != null){
    modelDiv.style.display = 'block';
  }
  console.log("modal opened openPreviewModalKharagpur");
  this.retrieveStrengthDetailsKharagpurToday();
  this.retrievePreventiveArrestDetailsKharagpurToday();
  this.retrieveAllDetailsTempKharagpurToday();
}
//First Preview Modal open function for Kharagpur end

//First Preview Modal close function for Kharagpur start
public closeModalKharagpur(){
  const modelDiv = document.getElementById('myModalKharagpur');
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  navigation!.className = 'navigation';
  main!.className = 'main';
  if(modelDiv != null){
    modelDiv.style.display = 'none';
  }
  this.specificArrestCountKharagpur = 0;
  this.totalArrestCountKharagpur = 0;
  this.FirCaseCountKharagpur = 0;
  this.SeizureCountKharagpur = 0;
  this.UDCaseCountKharagpur = 0;
}
//First Preview Modal close function for Kharagpur end

// open modal function for edit Strength start for Kharagpur
public openEditModalStrengthKharagpur(selectedStrengthHead : string){
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  var myModalKharagpur = document.getElementById('myModalKharagpur');
  navigation!.className = 'navigation is-blurred';
  main!.className = 'main is-blurred';
  const modelDiv = document.getElementById('myModalStrengthKharagpur');
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'none';
  }
  if(modelDiv != null){
    modelDiv.style.display = 'block';
  }
  console.log("modal opened edit");
  this.kharagpurService.getStrengthKharagpurToday().subscribe((data) => {
    this.strengthObjectKharagpur = data;
    console.log(this.strengthObjectKharagpur);

    this.strengthObjectKharagpur.forEach( (element : any) => {
      if(element.strengthDesc! === selectedStrengthHead){
        this.selectedStrengthKharagpur = element

        this.selectedInspr = this.selectedStrengthKharagpur.inspr!;
        this.selectedsilsi = this.selectedStrengthKharagpur.silsi!;
        this.selectedasilasi = this.selectedStrengthKharagpur.asilasi!;
        this.selectedConst = this.selectedStrengthKharagpur.const!;
        this.selectedLc = this.selectedStrengthKharagpur.lc!;
        this.selectedNvf = this.selectedStrengthKharagpur.nvf!;
        this.selectedHg = this.selectedStrengthKharagpur.hg!;
        this.selectedCivic = this.selectedStrengthKharagpur.civic!;
      }
    })
  })
}
// open modal function for edit Strength end for Kharagpur

// close modal function for edit Strength start for Kharagpur
public closeEditModalStrengthKharagpur(){
  const modelDivKharagpur = document.getElementById('myModalStrengthKharagpur');
  var myModalKharagpur = document.getElementById('myModalKharagpur');

  if(modelDivKharagpur != null){
    modelDivKharagpur.style.display = 'none';
  }
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'block';
  }
}
// close modal function for edit Strength end for Kharagpur

// open modal function for confirmation before save data start for Kharagpur
public openModalconfKharagpur(){
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  var myModalKharagpur = document.getElementById('myModalKharagpur');
  navigation!.className = 'navigation is-blurred';
  main!.className = 'main is-blurred';
  const modelDivKharagpur = document.getElementById('myModalConfKharagpur');
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'none';
  }
  if(modelDivKharagpur != null){
    modelDivKharagpur.style.display = 'block';
  }
}
// open modal function for confirmation before save data end for Kharagpur

// close modal function for confirmation before save data start for Kharagpur
public closeModalconfKharagpur(){
  const modelDiv = document.getElementById('myModalConfKharagpur');
  var myModalKharagpur = document.getElementById('myModalKharagpur');

  if(modelDiv != null){
    modelDiv.style.display = 'none';
  }
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'block';
  }
  //(document.getElementById('button-save-kharagpur') as HTMLInputElement).disabled = true;
  var button_save_kharagpur = document.getElementById('button-save-kharagpur');
  //button_save_howrah!.className = 'btn btn-primary button-36 footer-button2 is-disabled';
}
// close modal function for confirmation before save data end for Kharagpur

// open modal function for edit all details start for Kharagpur
public openEditModalAllDetailsKharagpur(){
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  var myModalKharagpur = document.getElementById('myModalKharagpur');
  navigation!.className = 'navigation is-blurred';
  main!.className = 'main is-blurred';
  const modelDiv = document.getElementById('myModalAllDetailsKharagpur');
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'none';
  }
  if(modelDiv != null){
    modelDiv.style.display = 'block';
  }
  console.log("modal edit all details opened for Kharagpur");
  this.kharagpurService.getAllDetailsTempKharagpur().subscribe((data) => {
    this.allDetailsObjectKharagpur = data;
    console.log(this.allDetailsObjectKharagpur);

    this.allDetailsObjectKharagpur.forEach( (element : any) => {
      //if(element.strengthDesc! === selectedStrengthHead){
        this.selectedAllDetailsKharagpur = element

        this.selectedPrevCountToday = this.selectedAllDetailsKharagpur.prevCountToday!;
        this.selectedSpecCountToday = this.selectedAllDetailsKharagpur.specCountToday!;
        this.selectedTotalArrestCountToday = this.selectedAllDetailsKharagpur.totalArrestCountToday!;
        this.selectedFircountToday = this.selectedAllDetailsKharagpur.fircountToday!;
        this.selectedOtherCasesToday = this.selectedAllDetailsKharagpur.otherCasesToday!;
        this.selectedTotalCasesCountToday = this.selectedAllDetailsKharagpur.totalCasesCountToday!;
        this.selectedTypeOfCrime = this.selectedAllDetailsKharagpur.typeOfCrime!;
        this.selectedSeizureCountToday = this.selectedAllDetailsKharagpur.seizureCountToday!;
        this.selectedUDcountToday = this.selectedAllDetailsKharagpur.udcountToday!;
        this.selectedGRPS = this.selectedAllDetailsKharagpur.grps!;
      //}
    })
  })
}
// open modal function for edit all details end for Kharagpur

// close modal function for edit all details start for Kharagpur
public closeEditModalAllDetailsKharagpur(){
  const modelDiv = document.getElementById('myModalAllDetailsKharagpur');
  var myModalKharagpur = document.getElementById('myModalKharagpur');

  if(modelDiv != null){
    modelDiv.style.display = 'none';
  }
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'block';
  }
}
// close modal function for edit Strength end for Kharagpur

// open modal function for edit Preventive Arrest start for kharagpur
public openEditModalPreventiveArrestKharagpur(){
  var navigation = document.getElementById('navigation');
  var main = document.getElementById('main');
  var myModalKharagpur = document.getElementById('myModalKharagpur');
  navigation!.className = 'navigation is-blurred';
  main!.className = 'main is-blurred';
  const modelDiv = document.getElementById('myModalPrevArrestKharagpur');
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'none';
  }
  if(modelDiv != null){
    modelDiv.style.display = 'block';
  }
  console.log("modal edit preventive arrest opened");
  this.kharagpurService.getPreventiveArrestKharagpurToday().subscribe((data) => {
    this.PreventiveArrestObject = data;
    console.log(this.PreventiveArrestObject);

    this.PreventiveArrestObject.forEach( (element : any) => {
      //if(element.strengthDesc! === selectedStrengthHead){
        this.preventiveArrestDetailsKharagpur = element

        this.selectedAct1 = this.preventiveArrestDetailsKharagpur.act1!;
        this.selectedAct2 = this.preventiveArrestDetailsKharagpur.act2!;
        this.selectedAct3 = this.preventiveArrestDetailsKharagpur.act3!;
        this.selectedPoliceAct = this.preventiveArrestDetailsKharagpur.policeAct!;
        this.selectedAct5 = this.preventiveArrestDetailsKharagpur.act5!;
        this.selectedBclaact = this.preventiveArrestDetailsKharagpur.bclaact!;
        this.selectedIract = this.preventiveArrestDetailsKharagpur.iract!;
        this.selectedOther = this.preventiveArrestDetailsKharagpur.other!;
        this.selectedTotal = this.preventiveArrestDetailsKharagpur.total!;
      //}
    })
  })
}
// open modal function for edit Preventive Arrest end for kharagpur

// close modal function for edit Preventive Arrest start for howrah
public closeEditModalPreventiveArrestKharagpur(){
  const modelDiv = document.getElementById('myModalPrevArrestKharagpur');
  var myModalKharagpur = document.getElementById('myModalKharagpur');

  if(modelDiv != null){
    modelDiv.style.display = 'none';
  }
  if(myModalKharagpur != null){
    myModalKharagpur.style.display = 'block';
  }
}
// close modal function for edit Preventive Arrest end for Kharagpur

public calculateTotalArrestKharagpur(){
  this.selectedTotalArrestCountToday = (parseInt(this.selectedPrevCountToday) + parseInt(this.selectedSpecCountToday)).toString()
}

public calculateTotalCasesKharagpur(){
  this.selectedTotalCasesCountToday = (parseInt(this.selectedFircountToday) + parseInt(this.selectedOtherCasesToday)).toString()
}

public calculateTotalSelectedHeadKharagpur(a:string,b:string,c:string,d:string,e:string,f:string,g:string,h:string,i:string) : string{
  console.log("parseInt(a) : "+parseInt(a));
  console.log("parseInt(b) : "+parseInt(b));
  console.log("parseInt(c) : "+parseInt(c));
  console.log("parseInt(d) : "+parseInt(d));
  console.log("parseInt(e) : "+parseInt(e));
  console.log("parseInt(f) : "+parseInt(f));
  console.log("parseInt(g) : "+parseInt(g));
  console.log("parseInt(h) : "+parseInt(h));
  console.log("parseInt(i) : "+parseInt(i));
  a = this.checkNan(a);
  b = this.checkNan(b);
  c = this.checkNan(c);
  d = this.checkNan(d);
  e = this.checkNan(e);
  f = this.checkNan(f);
  g = this.checkNan(g);
  h = this.checkNan(h);
  i = this.checkNan(i);
  console.log("after parseInt(a) : "+parseInt(a));
  console.log("parseInt(b) : "+parseInt(b));
  console.log("parseInt(c) : "+parseInt(c));
  console.log("parseInt(d) : "+parseInt(d));
  console.log("parseInt(e) : "+parseInt(e));
  console.log("parseInt(f) : "+parseInt(f));
  console.log("after parseInt(g) : "+parseInt(g));
  console.log("parseInt(h) : "+parseInt(h));
  console.log("parseInt(i) : "+parseInt(i));
  var total = (parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d) + parseInt(e) + parseInt(f) + parseInt(g) + parseInt(h) + parseInt(i)).toString();
  return total;
}

//UI related functions for Kharagpur end

//Kharagpur services end

//Sealdah services start

  //File upload services start for Sealdah

  public async onChangeSealdah(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file.type : " + file.type);
      console.log("file.name : " + file.name);
      if(file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.currentDateTime = this.getCurrentDateTime();
        this.sealdahService.getAllDetailsTempSealdah().subscribe((allDetailsTemp) => {
          this.AllDetailsObject = allDetailsTemp;
          console.log(this.AllDetailsObject);
          if(this.AllDetailsObject.length > 0){
            this.myAlertCurrDataAllDetailsTempFuncSLD();
          }
        const formData = new FormData();
        formData.append('file',file);
        this.http.post('http://localhost:8080/uploadSealdahFile',formData,{responseType: 'text'}).subscribe((res : any) => {
          if(res === 'Uploaded Sealdah docx file'){
            console.log("res" + res);
      this.fetchErrorLogs(this.currentDateTime);
            this.fileUploadSealdahFlag = 1;
            console.log("this.fileUploadSealdahFlag : "+this.fileUploadSealdahFlag);
            console.log('File uploaded successfully for Sealdah');
            this.showSuccessFileUpload();
            setTimeout(function(){
              event.target.value = "";
            }, 4000);
          }
          if(res === 'Not Sealdah file'){
            this.myAlertFuncSLD();
            event.target.value = "";
          }
  })
      })
  } else if(file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.sealdahService.getStrengthSealdahToday().subscribe((strengthTemp) => {
          this.strengthObjectSealdah = strengthTemp;
          console.log(this.strengthObjectSealdah);
          if(this.strengthObjectSealdah.length > 0){
            this.myAlertCurrDataStrengthFuncSLD();
            event.target.value = "";
          }
          const formData = new FormData();
          formData.append('file',file);
          this.http.post('http://localhost:8080/uploadSealdahFile',formData,{responseType: 'text'}).subscribe((res : any) => {
            //debugger;
            if(res === 'Uploaded Sealdah excel file'){
              console.log("res" + res);
              this.fileUploadSealdahFlag = 1;
              console.log("this.fileUploadSealdahFlag : "+this.fileUploadSealdahFlag);
              console.log('File uploaded successfully for Sealdah');
              this.showSuccessFileUpload();
              setTimeout(function(){
                event.target.value = "";
              }, 8000);
            }
            if(res === 'Not Sealdah file'){
              this.myAlertFuncSLD();
              event.target.value = "";
            }
          })
          //alert('Please select docx format only');
        })
      }
    }
  }
  //File upload services end for Sealdah

  public retrieveStrengthDetailsSealdahToday() {
    this.sealdahService.getStrengthSealdahToday().subscribe((data) => {
      this.strengthObjectSealdah = data;
      console.log(this.strengthObjectSealdah!);

      if(this.strengthObjectSealdah.length > 0){
      this.strengthObjectSealdah.forEach( (element : any) => {
        if(element.strengthDesc!.toLowerCase().trim().includes('deputation from other unit')){
          this.deputationfromotherunitStrengthSealdah = element;
          this.totaldeputationfromotherunitSealdah = this.calculateTotalSelectedHeadSealdah(this.deputationfromotherunitStrengthSealdah.inspr!,
            this.deputationfromotherunitStrengthSealdah.silsi!,this.deputationfromotherunitStrengthSealdah.asilasi!,this.deputationfromotherunitStrengthSealdah.asimt!,this.deputationfromotherunitStrengthSealdah.const!,
            this.deputationfromotherunitStrengthSealdah.lc!,this.deputationfromotherunitStrengthSealdah.nvf!,this.deputationfromotherunitStrengthSealdah.hg!,
            this.deputationfromotherunitStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Other Duty"){
          this.otherdutyStrengthSealdah = element
          console.log("this.otherdutyStrengthSealdah.const : "+this.otherdutyStrengthSealdah.const);
          this.totalOtherDutySealdah = this.calculateTotalSelectedHeadSealdah(this.otherdutyStrengthSealdah.inspr!,
            this.otherdutyStrengthSealdah.silsi!,this.otherdutyStrengthSealdah.asilasi!,this.otherdutyStrengthSealdah.asimt!,this.otherdutyStrengthSealdah.const!,
            this.otherdutyStrengthSealdah.lc!,this.otherdutyStrengthSealdah.nvf!,this.otherdutyStrengthSealdah.hg!,
            this.otherdutyStrengthSealdah.civic!);
        }
	if(element.strengthDesc!.toLowerCase().trim().includes('misc. duty')){
          this.miscdutyStrengthSealdah = element;
          this.totalMiscDutySealdah = this.calculateTotalSelectedHeadSealdah(this.miscdutyStrengthSealdah.inspr!,
            this.miscdutyStrengthSealdah.silsi!,this.miscdutyStrengthSealdah.asilasi!,this.miscdutyStrengthSealdah.asimt!,this.miscdutyStrengthSealdah.const!,
            this.miscdutyStrengthSealdah.lc!,this.miscdutyStrengthSealdah.nvf!,this.miscdutyStrengthSealdah.hg!,
            this.miscdutyStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Sanction Strength"){
          this.sanctionStrengthSealdah = element;
          this.totalSanctionStrengthSealdah = this.calculateTotalSelectedHeadSealdah(this.sanctionStrengthSealdah.inspr!,
            this.sanctionStrengthSealdah.silsi!,this.sanctionStrengthSealdah.asilasi!,this.sanctionStrengthSealdah.asimt!,this.sanctionStrengthSealdah.const!,
            this.sanctionStrengthSealdah.lc!,this.sanctionStrengthSealdah.nvf!,this.sanctionStrengthSealdah.hg!,
            this.sanctionStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Vacancy"){
          this.vacancyStrengthSealdah = element;
          this.vacancyStrengthSealdah = element;
            this.totalVacancySealdah = this.calculateTotalSelectedHeadSealdah(this.vacancyStrengthSealdah.inspr!,
              this.vacancyStrengthSealdah.silsi!,this.vacancyStrengthSealdah.asilasi!,this.vacancyStrengthSealdah.asimt!,this.vacancyStrengthSealdah.const!,
              this.vacancyStrengthSealdah.lc!,this.vacancyStrengthSealdah.nvf!,this.vacancyStrengthSealdah.hg!,
              this.vacancyStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Actual Strength"){
          this.actualStrengthSealdah = element;
          this.totalActualStrengthSealdah = this.calculateTotalSelectedHeadSealdah(this.actualStrengthSealdah.inspr!,
            this.actualStrengthSealdah.silsi!,this.actualStrengthSealdah.asilasi!,this.actualStrengthSealdah.asimt!,this.actualStrengthSealdah.const!,
            this.actualStrengthSealdah.lc!,this.actualStrengthSealdah.nvf!,this.actualStrengthSealdah.hg!,
            this.actualStrengthSealdah.civic!);
        }
        if(element.strengthDesc!.toLowerCase().trim().includes('misc. duty at hqr.')){
          this.miscdutyathqrdutyStrengthSealdah = element;
          this.totalMiscDutyatHQRSealdah = this.calculateTotalSelectedHeadSealdah(this.miscdutyathqrdutyStrengthSealdah.inspr!,
            this.miscdutyathqrdutyStrengthSealdah.silsi!,this.miscdutyathqrdutyStrengthSealdah.asilasi!,this.miscdutyathqrdutyStrengthSealdah.asimt!,this.miscdutyathqrdutyStrengthSealdah.const!,
            this.miscdutyathqrdutyStrengthSealdah.lc!,this.miscdutyathqrdutyStrengthSealdah.nvf!,this.miscdutyathqrdutyStrengthSealdah.hg!,
            this.miscdutyathqrdutyStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Available Strength"){
          this.availableStrengthSealdah = element;
          this.totalAvailableStrengthSealdah = this.calculateTotalSelectedHeadSealdah(this.availableStrengthSealdah.inspr!,
            this.availableStrengthSealdah.silsi!,this.availableStrengthSealdah.asilasi!,this.availableStrengthSealdah.asimt!,this.availableStrengthSealdah.const!,
            this.availableStrengthSealdah.lc!,this.availableStrengthSealdah.nvf!,this.availableStrengthSealdah.hg!,
            this.availableStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Camp"){
          this.campStrengthSealdah = element;
          this.totalCampSealdah = this.calculateTotalSelectedHeadSealdah(this.campStrengthSealdah.inspr!,
            this.campStrengthSealdah.silsi!,this.campStrengthSealdah.asilasi!,this.campStrengthSealdah.asimt!,this.campStrengthSealdah.const!,
            this.campStrengthSealdah.lc!,this.campStrengthSealdah.nvf!,this.campStrengthSealdah.hg!,
            this.campStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Training"){
          this.trainingStrengthSealdah = element;
          this.totalTrainingSealdah = this.calculateTotalSelectedHeadSealdah(this.trainingStrengthSealdah.inspr!,
            this.trainingStrengthSealdah.silsi!,this.trainingStrengthSealdah.asilasi!,this.trainingStrengthSealdah.asimt!,this.trainingStrengthSealdah.const!,
            this.trainingStrengthSealdah.lc!,this.trainingStrengthSealdah.nvf!,this.trainingStrengthSealdah.hg!,
            this.trainingStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Deputation to other unit"){
          this.deputationtootherunitStrengthSealdah = element;
          this.totalDeputationtootherunitSealdah = this.calculateTotalSelectedHeadSealdah(this.deputationtootherunitStrengthSealdah.inspr!,
            this.deputationtootherunitStrengthSealdah.silsi!,this.deputationtootherunitStrengthSealdah.asilasi!,this.deputationtootherunitStrengthSealdah.asimt!,this.deputationtootherunitStrengthSealdah.const!,
            this.deputationtootherunitStrengthSealdah.lc!,this.deputationtootherunitStrengthSealdah.nvf!,this.deputationtootherunitStrengthSealdah.hg!,
            this.deputationtootherunitStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Leave"){
          this.leaveStrengthSealdah = element;
          this.totalLeaveSealdah = this.calculateTotalSelectedHeadSealdah(this.leaveStrengthSealdah.inspr!,
            this.leaveStrengthSealdah.silsi!,this.leaveStrengthSealdah.asilasi!,this.leaveStrengthSealdah.asimt!,this.leaveStrengthSealdah.const!,
            this.leaveStrengthSealdah.lc!,this.leaveStrengthSealdah.nvf!,this.leaveStrengthSealdah.hg!,
            this.leaveStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Security Guard"){
          this.securityguardStrengthSealdah = element;
          this.totalSecurityGuardSealdah = this.calculateTotalSelectedHeadSealdah(this.securityguardStrengthSealdah.inspr!,
            this.securityguardStrengthSealdah.silsi!,this.securityguardStrengthSealdah.asilasi!,this.securityguardStrengthSealdah.asimt!,this.securityguardStrengthSealdah.const!,
            this.securityguardStrengthSealdah.lc!,this.securityguardStrengthSealdah.nvf!,this.securityguardStrengthSealdah.hg!,
            this.securityguardStrengthSealdah.civic!);
        }
        if(element.strengthDesc!.toLowerCase().trim().includes('misc. duty at grps/grpp')){
          this.miscdutyatgrpsStrengthSealdah = element;
          this.totalMiscDutyatGRPSGRPPSealdah = this.calculateTotalSelectedHeadSealdah(this.miscdutyatgrpsStrengthSealdah.inspr!,
            this.miscdutyatgrpsStrengthSealdah.silsi!,this.miscdutyatgrpsStrengthSealdah.asilasi!,this.miscdutyatgrpsStrengthSealdah.asimt!,this.miscdutyatgrpsStrengthSealdah.const!,
            this.miscdutyatgrpsStrengthSealdah.lc!,this.miscdutyatgrpsStrengthSealdah.nvf!,this.miscdutyatgrpsStrengthSealdah.hg!,
            this.miscdutyatgrpsStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Train Guard"){
          this.trainguardStrengthSealdah = element;
          this.totalTrainGuardSealdah = this.calculateTotalSelectedHeadSealdah(this.trainguardStrengthSealdah.inspr!,
            this.trainguardStrengthSealdah.silsi!,this.trainguardStrengthSealdah.asilasi!,this.trainguardStrengthSealdah.asimt!,this.trainguardStrengthSealdah.const!,
            this.trainguardStrengthSealdah.lc!,this.trainguardStrengthSealdah.nvf!,this.trainguardStrengthSealdah.hg!,
            this.trainguardStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Static Guard"){
          this.staticguardStrengthSealdah = element;
          this.totalStaticGuardSealdah = this.calculateTotalSelectedHeadSealdah(this.staticguardStrengthSealdah.inspr!,
            this.staticguardStrengthSealdah.silsi!,this.staticguardStrengthSealdah.asilasi!,this.staticguardStrengthSealdah.asimt!,this.staticguardStrengthSealdah.const!,
            this.staticguardStrengthSealdah.lc!,this.staticguardStrengthSealdah.nvf!,this.staticguardStrengthSealdah.hg!,
            this.staticguardStrengthSealdah.civic!);
        }
        if(element.strengthDesc! === "Suspension"){
          this.suspensionStrengthSealdah = element;
          this.totalSuspensionSealdah = this.calculateTotalSelectedHeadSealdah(this.suspensionStrengthSealdah.inspr!,
            this.suspensionStrengthSealdah.silsi!,this.suspensionStrengthSealdah.asilasi!,this.suspensionStrengthSealdah.asimt!,this.suspensionStrengthSealdah.const!,
            this.suspensionStrengthSealdah.lc!,this.suspensionStrengthSealdah.nvf!,this.suspensionStrengthSealdah.hg!,
            this.suspensionStrengthSealdah.civic!);
        }
      })
      } else {
        this.showSuccessDataNotFound('Not Found', 'Strength data not found for Sealdah today!');
      }
  })
  }

  public retrieveSpecificArrestDetailsSealdahToday() {
    let specificArrestCountSealdahPrev = 0;
    let specificArrestCountSealdahCurr = 0;
    this.sealdahService.getSpecificArrestSealdahToday().subscribe((dataSpecificArrest) => {
      this.SpecificArrestObject = dataSpecificArrest;
      console.log(this.SpecificArrestObject);

      this.SpecificArrestObject.forEach( (element : any) => {
        console.log("element.shortDetails : " + element.shortDetails);
        if(element.shortDetails.includes("Previous case")){
          if(element.count !== "Nil"){
            specificArrestCountSealdahPrev = specificArrestCountSealdahPrev+1;
            console.log("inside previous specific arrest not null this.specificArrestCountSealdahPrev" + specificArrestCountSealdahPrev);
          }else{
            specificArrestCountSealdahPrev = 0;
            console.log("inside previous specific arrest null this.specificArrestCountSealdahPrev" + specificArrestCountSealdahPrev);
          }
        }
        if(element.shortDetails.includes("Current case")){
          if(element.count !== "Nil"){
            specificArrestCountSealdahCurr = specificArrestCountSealdahCurr+1;
            console.log("inside current specific arrest not null this.specificArrestCountSealdahCurr" + this.specificArrestCountSealdah);
          }else{
            specificArrestCountSealdahCurr = 0;
            console.log("inside current specific arrest null this.specificArrestCountSealdahCurr" + specificArrestCountSealdahCurr);
          }
        }
      })
      this.specificArrestCountSealdah = specificArrestCountSealdahPrev + specificArrestCountSealdahCurr;
      console.log("this.specificArrestCountSealdah last" + this.specificArrestCountSealdah);
    })
    //console.log("this.specificArrestCountSealdah last" + this.specificArrestCountSealdah);
  }

  public retrievePreventiveArrestDetailsSealdahToday() {
    this.sealdahService.getPreventiveArrestSealdahToday().subscribe((dataPreventiveArrest) => {
      this.PreventiveArrestObject = dataPreventiveArrest;
      console.log(this.PreventiveArrestObject);

    if(this.PreventiveArrestObject.length > 0){
      this.PreventiveArrestObject.forEach( (elementnew : any) => {
        this.preventiveArrestDetailsSealdah = elementnew;
        this.preventiveArrestCountSealdah = parseInt(this.preventiveArrestDetailsSealdah.total!);
      })
  } else {
        this.showSuccessDataNotFound('Not Found', 'Preventive Arrest data not found for Howrah today!');
      }      
  })
  console.log("this.preventiveArrestCountSealdah" + this.preventiveArrestCountSealdah);
  }

  public retrieveUDCaseDetailsSealdahToday() {
    this.sealdahService.getUDCaseSealdahToday().subscribe((dataUDCase) => {
      this.UDCaseObject = dataUDCase;
      console.log(this.UDCaseObject);

      this.UDCaseObject.forEach( (element : any) => {
        this.UDCaseCountSealdah = this.UDCaseCountSealdah+1;
        console.log("inside this.UDCaseCountSealdah" + this.UDCaseCountSealdah);
      })

    })
    console.log("this.UDCaseCountSealdah last" + this.UDCaseCountSealdah);
  }

  public retrieveSeizureDetailsSealdahToday() {
    this.sealdahService.getSeizureSealdahToday().subscribe((dataSeizure) => {
      this.SeizureObject = dataSeizure;
      console.log(this.SeizureObject);

      this.SeizureObject.forEach( (element : any) => {
        this.SeizureCountSealdah = this.SeizureCountSealdah+1;
        console.log("inside this.SeizureCountSealdah" + this.SeizureCountSealdah);
      })

    })
    console.log("this.SeizureCountSealdah last" + this.SeizureCountSealdah);
  }

  public retrieveFirCaseDetailsSealdahToday() {
    this.sealdahService.getFirCaseSealdahToday().subscribe((firCase) => {
      this.FirCaseObject = firCase;
      console.log(this.FirCaseObject);

      this.FirCaseObject.forEach( (element : any) => {
        this.FirCaseCountSealdah = this.FirCaseCountSealdah+1;
        console.log("inside this.FirCaseCount" + this.FirCaseCountSealdah);
      })

    })
    console.log("this.FirCaseCountSealdah last" + this.FirCaseCountSealdah);
  }

  public retrieveAllDetailsSealdahToday() {
    this.sealdahService.getAllDetailsSealdah().subscribe((allDetails) => {
      this.AllDetailsObject = allDetails;
      console.log(this.AllDetailsObject);
    })
  }

  public retrieveAllDetailsTempSealdahToday() {
    var res : string = "";
    this.sealdahService.getAllDetailsTempSealdah().subscribe((allDetailsTemp) => {
      this.AllDetailsObject = allDetailsTemp;
      console.log(this.AllDetailsObject);
      if(this.AllDetailsObject.length > 0){
      	this.AllDetailsObject.forEach( (element : any) => {
	        //this.AllDetailsObjectTempSealdah = element
          if(element.grps!.toLowerCase() === "sealdah"){
            this.AllDetailsObjectTempSealdahGRPS = element
          }
          if(element.grps! === "Dum Dum"){
            this.AllDetailsObjectTempDumdum = element;
            console.log("Dum Dum details : ");
            console.log(this.AllDetailsObjectTempDumdum.udcountToday);
          }
          if(element.grps!.toLowerCase() === "chitpur"){
            this.AllDetailsObjectTempChitpur = element
          }
          if(element.grps!.toLowerCase() === "naihati"){
            this.AllDetailsObjectTempNaihati = element
          }
          if(element.grps!.toLowerCase() === "ranaghat"){
            this.AllDetailsObjectTempRanaghat = element
          }
          if(element.grps!.toLowerCase() === "krishnanagar"){
            this.AllDetailsObjectTempKrishnanagar = element
          }
          if(element.grps!.toLowerCase() === "berhampore"){
            this.AllDetailsObjectTempBerhampore = element
          }
          if(element.grps!.toLowerCase() === "bongaon"){
            this.AllDetailsObjectTempBongaon = element
          }
          if(element.grps!.toLowerCase() === "barasat"){
            this.AllDetailsObjectTempBarasat = element
          }
          if(element.grps!.toLowerCase() === "ballygunge"){
            this.AllDetailsObjectTempBallygunge = element
          }
          if(element.grps!.toLowerCase() === "jadavpur"){
            this.AllDetailsObjectTempJadavpur = element
          }
          if(element.grps!.toLowerCase() === "sonarpur"){
            this.AllDetailsObjectTempSonarpur = element
          }
          if(element.grps!.toLowerCase() === "baruipur"){
            this.AllDetailsObjectTempBaruipur = element
          }
	        if(element.grps!.toLowerCase() === "diamond harbour"){
            this.AllDetailsObjectTempDiamondHarbour = element
          }

      })
      this.newTestVarSealdah = this.AllDetailsObjectTempSealdah.typeOfCrime!.split(",\n");
      console.log("this.newTestVarSealdah : "+this.newTestVarSealdah);
      }
      else{
        this.AllDetailsObject = {
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
        this.showSuccessDataNotFound('Not Found', 'All Details data Not found for Sealdah today!');
      }
    })
  }

  // Fetch error logs from the backend
  fetchErrorLogsSealdah(a : string): void {
    this.sealdahService.getErrorLogs(a).subscribe(
      (logs) => {
        console.log("inside fetch logs...");
        this.logs = logs.map(log => this.cleanLogString(log));
        console.log(this.logs);
      },
      (err) => {
        // this.error = 'Error fetching logs. Please try again later.';
        console.error(err);
      }
    );
  }
  public deleteAllDataSealdahToday() {
    this.sealdahService.deleteAllDataSealdahToday();
    this.sameDayDataSealdahFlag = 0;
    this.fileUploadSealdahFlag = 0;
    this.showSuccessDataDelete();
  }

  public uploadAllDetailstoMainTableSealdahOld(){
    const formData = new FormData();
    this.http.post('http://localhost:8080/uploadAllDetailsTestSealdah',formData,{responseType: 'text'}).subscribe((res : any) => {
      //debugger
      if(res === 'Sealdah GRP all data uploaded into main table!'){
        console.log('Sealdah GRP all data uploaded into main table!')
        this.myAlertFuncAllCompile('Sealdah GRP all data uploaded!');
      } 
    })
    this.closeModalSealdah();
  }

  public uploadAllDetailstoMainTableSealdah(){
    const formData = new FormData();
    const modelDivSealdah = document.getElementById('myModalSealdah');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    this.http.post('http://localhost:8080/uploadAllDetailsTestSealdah',formData,{responseType: 'text'}).subscribe(res => {
      //debugger
      if(res === 'Sealdah GRP all data uploaded into main table!'){
        console.log('Sealdah GRP all data uploaded into main table!')
        this.myAlertFuncAllCompile('Sealdah GRP all data uploaded!');
        //this.sealdahService.deleteAllDetailsTempSealdahToday();
        if(modelDivSealdah != null){
          console.log("inside uploadAllDetailstoMainTableSealdah")
          modelDivSealdah.style.display = 'none';
        }
        navigation!.className = 'navigation';
        main!.className = 'main';
      }},
      error => {
        this.errors = error;
        this.errorReceived('Error', 'Error while uploading!');
      }
    )
    this.fileUploadSealdahFlag = 0;
    this.sameDayDataSealdahFlag = 0;
    // this.closeModalSealdah();
    this.closeModalconfSealdah();
  }

  // ---------Edit function for Strength Sealdah start--------------
  
  public updateSealdahSelectedStrength(doc_id : any){
    const modelDivSealdah = document.getElementById('myModalStrengthSealdah');
    var myModalSealdah = document.getElementById('myModalSealdah');
    console.log("edit data start Sealdah");
    console.log("doc_id : " + doc_id);

    const selectedStrengthSealdahTemp : Strength = {
      inspr : this.selectedInspr,
      silsi : this.selectedsilsi,
      asilasi : this.selectedasilasi,
      const : this.selectedConst,
      lc : this.selectedLc,
      nvf : this.selectedNvf,
      hg : this.selectedHg,
      civic : this.selectedCivic,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      date : this.selectedStrengthSealdah.date,
      grpname : this.selectedStrengthSealdah.grpname,
      strengthDesc : this.selectedStrengthSealdah.strengthDesc,
      unique_id : this.selectedStrengthSealdah.unique_id
    }

    this.sealdahService.UpdateSelectedHeadStrengthDataTodaySealdah(selectedStrengthSealdahTemp);

    this.showDataUpdate();

    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'none';
    }
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'block';
    }

    this.retrieveStrengthDetailsSealdahToday();
  }

  // ------------Edit function for Strength Sealdah end---------------

  // ---------Edit function for All Details Sealdah start--------------
  
  public updateAllDetailsTodaySealdah(doc_id : any){
    const modelDivSealdah = document.getElementById('myModalAllDetailsSealdah');
    var myModalSealdah = document.getElementById('myModalSealdah');
    console.log("edit data All Details start Sealdah");
    console.log("doc_id : " + doc_id);

    const selectedAllDetailsSealdahTemp : AllDetails = {
      prevCountToday : this.selectedPrevCountToday,
      specCountToday : this.selectedSpecCountToday,
      totalArrestCountToday : this.selectedTotalArrestCountToday,
      //totalArrestCountToday : (parseInt(this.selectedPrevCountToday) + parseInt(this.selectedSpecCountToday)).toString(),
      fircountToday : this.selectedFircountToday,
      otherCasesToday : this.selectedOtherCasesToday,
      totalCasesCountToday : this.selectedTotalCasesCountToday,
      //totalCasesCountToday : (parseInt(this.selectedFircountToday) + parseInt(this.selectedOtherCasesToday)).toString(),
      typeOfCrime : this.selectedTypeOfCrime,
      seizureCountToday : this.selectedSeizureCountToday,
      udcountToday : this.selectedUDcountToday,
      grps : this.selectedGRPS,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      dateofReport : this.selectedAllDetailsSealdah.dateofReport,
      grp : this.selectedAllDetailsSealdah.grp,
      unique_id : this.selectedAllDetailsSealdah.unique_id
    }

    this.sealdahService.UpdateAllDetailsDataTodaySealdah(selectedAllDetailsSealdahTemp);

    this.showDataUpdate();

    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'none';
    }
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'block';
    }

    this.retrieveAllDetailsTempSealdahToday();
  }

  // ------------Edit function for All Details Sealdah end---------------

  // ---------Edit function for Preventive Arrest Sealdah start--------------
  
  public updatePreventiveArrestTodaySealdah(doc_id : any){
    const modelDivSealdah = document.getElementById('myModalPrevArrestSealdah');
    var myModalSealdah = document.getElementById('myModalSealdah');
    console.log("edit data preventive Arrest start Sealdah");
    console.log("doc_id : " + doc_id);

    const selectedPreventiveArrestSealdahTemp : PreventiveArrest = {
      act1 : this.selectedAct1,
      act2 : this.selectedAct2,
      act3 : this.selectedAct3,
      act4 : this.selectedAct4,
      policeAct : this.selectedPoliceAct,
      act5 : this.selectedAct5,
      bclaact : this.selectedBclaact,
      iract : this.selectedIract,
      other : this.selectedOther,
      total : this.selectedTotal,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      dateofReport : this.preventiveArrestDetailsSealdah.dateofReport,
      grpname : this.preventiveArrestDetailsSealdah.grpname,
      unique_id : this.preventiveArrestDetailsSealdah.unique_id
    }

    this.sealdahService.UpdatePreventiveArrestDataTodaySealdah(selectedPreventiveArrestSealdahTemp);

    this.showDataUpdate();

    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'none';
    }
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'block';
    }

    this.retrievePreventiveArrestDetailsSealdahToday();
  }

  // ------------Edit function for Preventive Arrest Sealdah end---------------

// UI Functions for Sealdah start

  //First Preview Modal open function for Sealdah start
  public openPreviewModalSealdah(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var button_save_sealdah = document.getElementById('button-save-sealdah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalSealdah');
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal opened openPreviewModalSealdah");
    this.retrieveStrengthDetailsSealdahToday();
    this.retrievePreventiveArrestDetailsSealdahToday();

    this.retrieveAllDetailsTempSealdahToday();
  }
  //First Preview Modal open function for Sealdah end

  //First Preview Modal close function for Sealdah start
  public closeModalSealdah(){
    const modelDiv = document.getElementById('myModalSealdah');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation';
    main!.className = 'main';
    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    this.specificArrestCountSealdah = 0;
    this.totalArrestCountSealdah = 0;
    this.FirCaseCountSealdah = 0;
    this.SeizureCountSealdah = 0;
    this.UDCaseCountSealdah = 0;
  }
  //First Preview Modal close function for Sealdah end

  // open modal function for edit Strength start for Sealdah
  public openEditModalStrengthSealdah(selectedStrengthHead : string){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalSealdah = document.getElementById('myModalSealdah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDivSealdah = document.getElementById('myModalStrengthSealdah');
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'none';
    }
    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'block';
    }
    console.log("modal opened edit");
    this.sealdahService.getStrengthSealdahToday().subscribe((data) => {
      this.strengthObjectSealdah = data;
      console.log(this.strengthObjectSealdah);

      this.strengthObjectSealdah.forEach( (element : any) => {
        if(element.strengthDesc! === selectedStrengthHead){
          this.selectedStrengthSealdah = element

          this.selectedInspr = this.selectedStrengthSealdah.inspr!;
          this.selectedsilsi = this.selectedStrengthSealdah.silsi!;
          this.selectedasilasi = this.selectedStrengthSealdah.asilasi!;
          this.selectedConst = this.selectedStrengthSealdah.const!;
          this.selectedLc = this.selectedStrengthSealdah.lc!;
          this.selectedNvf = this.selectedStrengthSealdah.nvf!;
          this.selectedHg = this.selectedStrengthSealdah.hg!;
          this.selectedCivic = this.selectedStrengthSealdah.civic!;
        }
      })
    })
  }
  // open modal function for edit Strength end for Sealdah

  // close modal function for edit Strength start for Sealdah
  public closeEditModalStrengthSealdah(){
    const modelDivSealdah = document.getElementById('myModalStrengthSealdah');
    var myModalSealdah = document.getElementById('myModalSealdah');

    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'none';
    }
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'block';
    }
  }
  // close modal function for edit Strength end for Sealdah

  // open modal function for confirmation before save data start for Sealdah
  public openModalconfSealdah(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalSealdah = document.getElementById('myModalSealdah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDivSealdah = document.getElementById('myModalConfSealdah');
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'none';
    }
    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'block';
    }
  }
  // open modal function for confirmation before save data end for Sealdah

  // close modal function for confirmation before save data start for Sealdah
  public closeModalconfSealdah(){
    const modelDivSealdah = document.getElementById('myModalConfSealdah');
    var myModalSealdah = document.getElementById('myModalSealdah');

    if(modelDivSealdah != null){
      modelDivSealdah.style.display = 'none';
    }
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'block';
    }
    //(document.getElementById('button-save-Sealdah') as HTMLInputElement).disabled = true;
    var button_save_Sealdah = document.getElementById('button-save-Sealdah');
    //button_save_Sealdah!.className = 'btn btn-primary button-36 footer-button2 is-disabled';
  }
  // close modal function for confirmation before save data end for Sealdah

  // open modal function for edit all details start for Sealdah
  public openEditModalAllDetailsSealdah(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalSealdah = document.getElementById('myModalSealdah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalAllDetailsSealdah');
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'none';
    }
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal edit all details opened for Sealdah");
    this.sealdahService.getAllDetailsTempSealdah().subscribe((data) => {
      this.allDetailsObjectSealdah = data;
      console.log(this.allDetailsObjectSealdah);

      this.allDetailsObjectSealdah.forEach( (element : any) => {
        //if(element.strengthDesc! === selectedStrengthHead){
          this.selectedAllDetailsSealdah = element

          this.selectedPrevCountToday = this.selectedAllDetailsSealdah.prevCountToday!;
          this.selectedSpecCountToday = this.selectedAllDetailsSealdah.specCountToday!;
          this.selectedTotalArrestCountToday = this.selectedAllDetailsSealdah.totalArrestCountToday!;
          this.selectedFircountToday = this.selectedAllDetailsSealdah.fircountToday!;
          this.selectedOtherCasesToday = this.selectedAllDetailsSealdah.otherCasesToday!;
          this.selectedTotalCasesCountToday = this.selectedAllDetailsSealdah.totalCasesCountToday!;
          this.selectedTypeOfCrime = this.selectedAllDetailsSealdah.typeOfCrime!;
          this.selectedSeizureCountToday = this.selectedAllDetailsSealdah.seizureCountToday!;
          this.selectedUDcountToday = this.selectedAllDetailsSealdah.udcountToday!;
          this.selectedGRPS = this.selectedAllDetailsSealdah.grps!;
        //}
      })
    })
  }
  // open modal function for edit all details end for Sealdah

  // close modal function for edit all details start for Sealdah
  public closeEditModalAllDetailsSealdah(){
    const modelDiv = document.getElementById('myModalAllDetailsSealdah');
    var myModalSealdah = document.getElementById('myModalSealdah');

    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'block';
    }
  }
  // close modal function for edit Strength end for Sealdah

  // open modal function for edit Preventive Arrest start for Sealdah
  public openEditModalPreventiveArrestSealdah(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalSealdah = document.getElementById('myModalSealdah');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalPrevArrestSealdah');
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'none';
    }
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal edit preventive arrest opened");
    this.sealdahService.getPreventiveArrestSealdahToday().subscribe((data) => {
      this.PreventiveArrestObject = data;
      console.log(this.PreventiveArrestObject);

      this.PreventiveArrestObject.forEach( (element : any) => {
        //if(element.strengthDesc! === selectedStrengthHead){
          this.preventiveArrestDetailsSealdah = element

          this.selectedAct1 = this.preventiveArrestDetailsSealdah.act1!;
          this.selectedAct2 = this.preventiveArrestDetailsSealdah.act2!;
          this.selectedAct3 = this.preventiveArrestDetailsSealdah.act3!;
          // this.selectedAct4 = this.preventiveArrestDetailsSealdah.act4!;
          this.selectedPoliceAct = this.preventiveArrestDetailsSealdah.policeAct!;
          this.selectedAct4 = this.preventiveArrestDetailsSealdah.act4!;
          this.selectedBclaact = this.preventiveArrestDetailsSealdah.bclaact!;
          this.selectedIract = this.preventiveArrestDetailsSealdah.iract!;
          this.selectedOther = this.preventiveArrestDetailsSealdah.other!;
          this.selectedTotal = this.preventiveArrestDetailsSealdah.total!;
        //}
      })
    })
  }
  // open modal function for edit Preventive Arrest end for Sealdah

  // close modal function for edit Preventive Arrest start for Sealdah
  public closeEditModalPreventiveArrestSealdah(){
    const modelDiv = document.getElementById('myModalPrevArrestSealdah');
    var myModalSealdah = document.getElementById('myModalSealdah');

    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    if(myModalSealdah != null){
      myModalSealdah.style.display = 'block';
    }
  }
  // close modal function for edit Preventive Arrest end for Sealdah

  public calculateTotalArrestSealdah(){
    this.selectedTotalArrestCountToday = (parseInt(this.selectedPrevCountToday) + parseInt(this.selectedSpecCountToday)).toString()
  }

  public calculateTotalCasesSealdah(){
    this.selectedTotalCasesCountToday = (parseInt(this.selectedFircountToday) + parseInt(this.selectedOtherCasesToday)).toString()
  }

  public calculateTotalSelectedHeadSealdah(a:string,b:string,c:string,d:string,e:string,f:string,g:string,h:string,i:string) : string{
    console.log("parseInt(a) : "+parseInt(a));
    console.log("parseInt(b) : "+parseInt(b));
    console.log("parseInt(c) : "+parseInt(c));
    console.log("parseInt(d) : "+parseInt(d));
    console.log("parseInt(e) : "+parseInt(e));
    console.log("parseInt(f) : "+parseInt(f));
    console.log("parseInt(g) : "+parseInt(g));
    console.log("parseInt(h) : "+parseInt(h));
    console.log("parseInt(i) : "+parseInt(i));
    a = this.checkNan(a);
    b = this.checkNan(b);
    c = this.checkNan(c);
    d = this.checkNan(d);
    e = this.checkNan(e);
    f = this.checkNan(f);
    g = this.checkNan(g);
    h = this.checkNan(h);
    i = this.checkNan(i);
    console.log("after parseInt(a) : "+parseInt(a));
    console.log("parseInt(b) : "+parseInt(b));
    console.log("parseInt(c) : "+parseInt(c));
    console.log("parseInt(d) : "+parseInt(d));
    console.log("parseInt(e) : "+parseInt(e));
    console.log("parseInt(f) : "+parseInt(f));
    console.log("after parseInt(g) : "+parseInt(g));
    console.log("parseInt(h) : "+parseInt(h));
    console.log("parseInt(i) : "+parseInt(i));
    var total = (parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d) + parseInt(e) + parseInt(f) + parseInt(g) + parseInt(h) + parseInt(i)).toString();
    return total;
  }

// UI Functions for Sealdah end

//Sealdah services end

//Siliguri services start

  //File upload services start for Siliguri

  public async onChangeSiliguri(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file.type : " + file.type);
      console.log("file.name : " + file.name);
      if(file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.currentDateTime = this.getCurrentDateTime();
        this.siliguriService.getAllDetailsTempSiliguri().subscribe((allDetailsTemp) => {
          this.AllDetailsObject = allDetailsTemp;
          console.log(this.AllDetailsObject);
          if(this.AllDetailsObject.length > 0){
            this.myAlertCurrDataAllDetailsTempFuncSLG();
          }
        const formData = new FormData();
        formData.append('file',file);
        this.http.post('http://localhost:8080/uploadSiliguriFile',formData,{responseType: 'text'}).subscribe((res : any) => {
          if(res === 'Uploaded Siliguri docx file'){
            console.log("res" + res);
            this.fetchErrorLogs(this.currentDateTime);
            this.fileUploadSiliguriFlag = 1;
            console.log("this.fileUploadSiliguriFlag : "+this.fileUploadSiliguriFlag);
            console.log('File uploaded successfully for Siliguri');
            this.showSuccessFileUpload();
            setTimeout(function(){
              event.target.value = "";
            }, 4000);
          }
          if(res === 'Not Siliguri file'){
            this.myAlertFuncSLG();
            event.target.value = "";
          }
  })
      })
  } else if(file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.siliguriService.getStrengthSiliguriToday().subscribe((strengthTemp) => {
          this.strengthObjectSiliguri = strengthTemp;
          console.log(this.strengthObjectSiliguri);
          if(this.strengthObjectSiliguri.length > 0){
            this.myAlertCurrDataStrengthFuncSLG();
            event.target.value = "";
          }
          const formData = new FormData();
          formData.append('file',file);
          this.http.post('http://localhost:8080/uploadSiliguriFile',formData,{responseType: 'text'}).subscribe((res : any) => {
            //debugger;
            if(res === 'Uploaded Siliguri excel file'){
              console.log("res" + res);
              this.fileUploadSiliguriFlag = 1;
              console.log("this.fileUploadSiliguriFlag : "+this.fileUploadSiliguriFlag);
              console.log('File uploaded successfully for Siliguri');
              this.showSuccessFileUpload();
              setTimeout(function(){
                event.target.value = "";
              }, 8000);
            }
            if(res === 'Not Siliguri file'){
              this.myAlertFuncSLG();
              event.target.value = "";
            }
          })
        })
      }
    }
  }

  //File upload services end for Siliguri

  public retrieveStrengthDetailsSiliguriToday() {
    this.siliguriService.getStrengthSiliguriToday().subscribe((data) => {
      this.strengthObjectSiliguri = data;
      console.log(this.strengthObjectSiliguri);

      if(this.strengthObjectSiliguri.length > 0){
      this.strengthObjectSiliguri.forEach( (element : any) => {
        if(element.strengthDesc!.toLowerCase().trim().includes('deputation from other unit')){
          this.deputationfromotherunitStrengthSiliguri = element;
          this.totaldeputationfromotherunitSiliguri = this.calculateTotalSelectedHeadSiliguri(this.deputationfromotherunitStrengthSiliguri.inspr!,
            this.deputationfromotherunitStrengthSiliguri.silsi!,this.deputationfromotherunitStrengthSiliguri.asilasi!,this.deputationfromotherunitStrengthSiliguri.asimt!,this.deputationfromotherunitStrengthSiliguri.const!,
            this.deputationfromotherunitStrengthSiliguri.lc!,this.deputationfromotherunitStrengthSiliguri.nvf!,this.deputationfromotherunitStrengthSiliguri.hg!,
            this.deputationfromotherunitStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Other Duty"){
          this.otherdutyStrengthSiliguri = element
          console.log("this.otherdutyStrengthSiliguri.const : "+this.otherdutyStrengthSiliguri.const);
          this.totalOtherDutySiliguri = this.calculateTotalSelectedHeadSiliguri(this.otherdutyStrengthSiliguri.inspr!,
            this.otherdutyStrengthSiliguri.silsi!,this.otherdutyStrengthSiliguri.asilasi!,this.otherdutyStrengthSiliguri.asimt!,this.otherdutyStrengthSiliguri.const!,
            this.otherdutyStrengthSiliguri.lc!,this.otherdutyStrengthSiliguri.nvf!,this.otherdutyStrengthSiliguri.hg!,
            this.otherdutyStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Sanction Strength"){
          this.sanctionStrengthSiliguri = element;
          this.totalSanctionStrengthSiliguri = this.calculateTotalSelectedHeadSiliguri(this.sanctionStrengthSiliguri.inspr!,
            this.sanctionStrengthSiliguri.silsi!,this.sanctionStrengthSiliguri.asilasi!,this.sanctionStrengthSiliguri.asimt!,this.sanctionStrengthSiliguri.const!,
            this.sanctionStrengthSiliguri.lc!,this.sanctionStrengthSiliguri.nvf!,this.sanctionStrengthSiliguri.hg!,
            this.sanctionStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Vacancy"){
          this.vacancyStrengthSiliguri = element;
          this.vacancyStrengthSiliguri = element;
            this.totalVacancySiliguri = this.calculateTotalSelectedHeadSiliguri(this.vacancyStrengthSiliguri.inspr!,
              this.vacancyStrengthSiliguri.silsi!,this.vacancyStrengthSiliguri.asilasi!,this.vacancyStrengthSiliguri.asimt!,this.vacancyStrengthSiliguri.const!,
              this.vacancyStrengthSiliguri.lc!,this.vacancyStrengthSiliguri.nvf!,this.vacancyStrengthSiliguri.hg!,
              this.vacancyStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Actual Strength"){
          this.actualStrengthSiliguri = element;
          this.totalActualStrengthSiliguri = this.calculateTotalSelectedHeadSiliguri(this.actualStrengthSiliguri.inspr!,
            this.actualStrengthSiliguri.silsi!,this.actualStrengthSiliguri.asilasi!,this.actualStrengthSiliguri.asimt!,this.actualStrengthSiliguri.const!,
            this.actualStrengthSiliguri.lc!,this.actualStrengthSiliguri.nvf!,this.actualStrengthSiliguri.hg!,
            this.actualStrengthSiliguri.civic!);
        }
        if(element.strengthDesc!.toLowerCase().trim().includes('misc. duty at hqr.')){
          this.miscdutyathqrdutyStrengthSiliguri = element;
          this.totalMiscDutyatHQRSiliguri = this.calculateTotalSelectedHeadSiliguri(this.miscdutyathqrdutyStrengthSiliguri.inspr!,
            this.miscdutyathqrdutyStrengthSiliguri.silsi!,this.miscdutyathqrdutyStrengthSiliguri.asilasi!,this.miscdutyathqrdutyStrengthSiliguri.asimt!,this.miscdutyathqrdutyStrengthSiliguri.const!,
            this.miscdutyathqrdutyStrengthSiliguri.lc!,this.miscdutyathqrdutyStrengthSiliguri.nvf!,this.miscdutyathqrdutyStrengthSiliguri.hg!,
            this.miscdutyathqrdutyStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Available Strength"){
          this.availableStrengthSiliguri = element;
          this.totalAvailableStrengthSiliguri = this.calculateTotalSelectedHeadSiliguri(this.availableStrengthSiliguri.inspr!,
            this.availableStrengthSiliguri.silsi!,this.availableStrengthSiliguri.asilasi!,this.availableStrengthSiliguri.asimt!,this.availableStrengthSiliguri.const!,
            this.availableStrengthSiliguri.lc!,this.availableStrengthSiliguri.nvf!,this.availableStrengthSiliguri.hg!,
            this.availableStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Camp"){
          this.campStrengthSiliguri = element;
          this.totalCampSiliguri = this.calculateTotalSelectedHeadSiliguri(this.campStrengthSiliguri.inspr!,
            this.campStrengthSiliguri.silsi!,this.campStrengthSiliguri.asilasi!,this.campStrengthSiliguri.asimt!,this.campStrengthSiliguri.const!,
            this.campStrengthSiliguri.lc!,this.campStrengthSiliguri.nvf!,this.campStrengthSiliguri.hg!,
            this.campStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Training"){
          this.trainingStrengthSiliguri = element;
          this.totalTrainingSiliguri = this.calculateTotalSelectedHeadSiliguri(this.trainingStrengthSiliguri.inspr!,
            this.trainingStrengthSiliguri.silsi!,this.trainingStrengthSiliguri.asilasi!,this.trainingStrengthSiliguri.asimt!,this.trainingStrengthSiliguri.const!,
            this.trainingStrengthSiliguri.lc!,this.trainingStrengthSiliguri.nvf!,this.trainingStrengthSiliguri.hg!,
            this.trainingStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Deputation to other unit"){
          this.deputationtootherunitStrengthSiliguri = element;
          this.totalDeputationtootherunitSiliguri = this.calculateTotalSelectedHeadSiliguri(this.deputationtootherunitStrengthSiliguri.inspr!,
            this.deputationtootherunitStrengthSiliguri.silsi!,this.deputationtootherunitStrengthSiliguri.asilasi!,this.deputationtootherunitStrengthSiliguri.asimt!,this.deputationtootherunitStrengthSiliguri.const!,
            this.deputationtootherunitStrengthSiliguri.lc!,this.deputationtootherunitStrengthSiliguri.nvf!,this.deputationtootherunitStrengthSiliguri.hg!,
            this.deputationtootherunitStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Leave"){
          this.leaveStrengthSiliguri = element;
          this.totalLeaveSiliguri = this.calculateTotalSelectedHeadSiliguri(this.leaveStrengthSiliguri.inspr!,
            this.leaveStrengthSiliguri.silsi!,this.leaveStrengthSiliguri.asilasi!,this.leaveStrengthSiliguri.asimt!,this.leaveStrengthSiliguri.const!,
            this.leaveStrengthSiliguri.lc!,this.leaveStrengthSiliguri.nvf!,this.leaveStrengthSiliguri.hg!,
            this.leaveStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Security Guard"){
          this.securityguardStrengthSiliguri = element;
          this.totalSecurityGuardSiliguri = this.calculateTotalSelectedHeadSiliguri(this.securityguardStrengthSiliguri.inspr!,
            this.securityguardStrengthSiliguri.silsi!,this.securityguardStrengthSiliguri.asilasi!,this.securityguardStrengthSiliguri.asimt!,this.securityguardStrengthSiliguri.const!,
            this.securityguardStrengthSiliguri.lc!,this.securityguardStrengthSiliguri.nvf!,this.securityguardStrengthSiliguri.hg!,
            this.securityguardStrengthSiliguri.civic!);
        }
        if(element.strengthDesc!.toLowerCase().trim().includes('misc. duty at grps/grpp')){
          this.miscdutyatgrpsStrengthSiliguri = element;
          this.totalMiscDutyatGRPSGRPPSiliguri = this.calculateTotalSelectedHeadSiliguri(this.miscdutyatgrpsStrengthSiliguri.inspr!,
            this.miscdutyatgrpsStrengthSiliguri.silsi!,this.miscdutyatgrpsStrengthSiliguri.asilasi!,this.miscdutyatgrpsStrengthSiliguri.asimt!,this.miscdutyatgrpsStrengthSiliguri.const!,
            this.miscdutyatgrpsStrengthSiliguri.lc!,this.miscdutyatgrpsStrengthSiliguri.nvf!,this.miscdutyatgrpsStrengthSiliguri.hg!,
            this.miscdutyatgrpsStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Train Guard"){
          this.trainguardStrengthSiliguri = element;
          this.totalTrainGuardSiliguri = this.calculateTotalSelectedHeadSiliguri(this.trainguardStrengthSiliguri.inspr!,
            this.trainguardStrengthSiliguri.silsi!,this.trainguardStrengthSiliguri.asilasi!,this.trainguardStrengthSiliguri.asimt!,this.trainguardStrengthSiliguri.const!,
            this.trainguardStrengthSiliguri.lc!,this.trainguardStrengthSiliguri.nvf!,this.trainguardStrengthSiliguri.hg!,
            this.trainguardStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Static Guard"){
          this.staticguardStrengthSiliguri = element;
          this.totalStaticGuardSiliguri = this.calculateTotalSelectedHeadSiliguri(this.staticguardStrengthSiliguri.inspr!,
            this.staticguardStrengthSiliguri.silsi!,this.staticguardStrengthSiliguri.asilasi!,this.staticguardStrengthSiliguri.asimt!,this.staticguardStrengthSiliguri.const!,
            this.staticguardStrengthSiliguri.lc!,this.staticguardStrengthSiliguri.nvf!,this.staticguardStrengthSiliguri.hg!,
            this.staticguardStrengthSiliguri.civic!);
        }
        if(element.strengthDesc! === "Suspension"){
          this.suspensionStrengthSiliguri = element;
          this.totalSuspensionSiliguri = this.calculateTotalSelectedHeadSiliguri(this.suspensionStrengthSiliguri.inspr!,
            this.suspensionStrengthSiliguri.silsi!,this.suspensionStrengthSiliguri.asilasi!,this.suspensionStrengthSiliguri.asimt!,this.suspensionStrengthSiliguri.const!,
            this.suspensionStrengthSiliguri.lc!,this.suspensionStrengthSiliguri.nvf!,this.suspensionStrengthSiliguri.hg!,
            this.suspensionStrengthSiliguri.civic!);
        }
        if(element.strengthDesc!.toLowerCase().trim().includes('line or')){
          this.lineORStrengthSiliguri = element;
          this.totalLineORSiliguri = this.calculateTotalSelectedHeadSiliguri(this.lineORStrengthSiliguri.inspr!,
            this.lineORStrengthSiliguri.silsi!,this.lineORStrengthSiliguri.asilasi!,this.lineORStrengthSiliguri.asimt!,this.lineORStrengthSiliguri.const!,
            this.lineORStrengthSiliguri.lc!,this.lineORStrengthSiliguri.nvf!,this.lineORStrengthSiliguri.hg!,
            this.lineORStrengthSiliguri.civic!);
        }
      })
      } else {
        this.showSuccessDataNotFound('Not Found', 'Strength data not found for Siliguri today!');
      }
  })
  }

  public retrieveSpecificArrestDetailsSiliguriToday() {
    let specificArrestCountSiliguriPrev = 0;
    let specificArrestCountSiliguriCurr = 0;
    this.siliguriService.getSpecificArrestSiliguriToday().subscribe((dataSpecificArrest) => {
      this.SpecificArrestObject = dataSpecificArrest;
      console.log(this.SpecificArrestObject);

      this.SpecificArrestObject.forEach( (element : any) => {
        console.log("element.shortDetails : " + element.shortDetails);
        if(element.shortDetails.includes("Previous case")){
          if(element.count !== "Nil"){
          specificArrestCountSiliguriPrev = specificArrestCountSiliguriPrev+1;
          console.log("inside previous specific arrest not null specificArrestCountSiliguriPrev" + specificArrestCountSiliguriPrev);
          }else{
            specificArrestCountSiliguriPrev = 0;
            console.log("inside previous specific arrest null specificArrestCountSiliguriPrev" + specificArrestCountSiliguriPrev);
          }
        }
        if(element.shortDetails.includes("Current case")){
          if(element.count !== "Nil"){
          specificArrestCountSiliguriCurr = specificArrestCountSiliguriCurr+1;
          console.log("inside current specific arrest not null specificArrestCountSiliguriCurr" + specificArrestCountSiliguriCurr);
          }else{
            this.specificArrestCountSiliguri = 0;
            console.log("inside current specific arrest null this.specificArrestCountSiliguriCurr" + specificArrestCountSiliguriCurr);
          }
        }
      })
      this.specificArrestCountSiliguri = specificArrestCountSiliguriPrev + specificArrestCountSiliguriCurr;
      console.log("this.specificArrestCountSiliguri last" + this.specificArrestCountSiliguri);
    })
    console.log("this.specificArrestCountSiliguri last" + this.specificArrestCountSiliguri);
  }

  public retrievePreventiveArrestDetailsSiliguriToday() {
    this.siliguriService.getPreventiveArrestSiliguriToday().subscribe((dataPreventiveArrest) => {
      this.PreventiveArrestObject = dataPreventiveArrest;
      console.log("this.PreventiveArrestObject : " + this.PreventiveArrestObject);

      this.PreventiveArrestObject.forEach( (elementnew : any) => {
        if(elementnew.total !== 0){
          this.preventiveArrestDetailsSiliguri = elementnew;
          this.preventiveArrestCountSiliguri = parseInt(this.preventiveArrestDetailsSiliguri.total!);
        }else{
          this.preventiveArrestDetailsSiliguri = elementnew;
          this.preventiveArrestCountSiliguri = 0;
        }
      })
      console.log("this.preventiveArrestCountSiliguri inside : " + this.preventiveArrestCountSiliguri);
    })

  }

  public calculateTotalArrestSiliguriToday() {
    console.log("this.preventiveArrestCount" + this.preventiveArrestCountSiliguri);
    console.log("this.specificArrestCount" + this.specificArrestCountSiliguri);

    this.totalArrestCountSiliguri = this.specificArrestCountSiliguri + this.preventiveArrestCountSiliguri;
    console.log("this.totalArrestCountSiliguri" + this.totalArrestCountSiliguri);
  }

  public viewSiliguriDataToday() {
    // this.retrieveSpecificArrestDetailsSiliguriToday();
    // this.retrievePreventiveArrestDetailsSiliguriToday();
    this.calculateTotalArrestSiliguriToday();
  }

  public retrieveUDCaseDetailsSiliguriToday() {
    this.siliguriService.getUDCaseSiliguriToday().subscribe((dataUDCase) => {
      this.UDCaseObject = dataUDCase;
      console.log(this.UDCaseObject);

      this.UDCaseObject.forEach( (element : any) => {
        this.UDCaseCountSiliguri = this.UDCaseCountSiliguri+1;
        console.log("inside this.UDCaseCountSiliguri" + this.UDCaseCountSiliguri);
      })

    })
    console.log("this.UDCaseCountSiliguri last" + this.UDCaseCountSiliguri);
  }

  public retrieveSeizureDetailsSiliguriToday() {
    this.siliguriService.getSeizureSiliguriToday().subscribe((dataSeizure) => {
      this.SeizureObject = dataSeizure;
      console.log(this.SeizureObject);

      this.SeizureObject.forEach( (element : any) => {
        this.SeizureCountSiliguri = this.SeizureCountSiliguri+1;
        console.log("inside this.SeizureCountSiliguri" + this.SeizureCountSiliguri);
      })

    })
    console.log("this.SeizureCountSiliguri last" + this.SeizureCountSiliguri);
  }

  public retrieveFirCaseDetailsSiliguriToday() {
    this.siliguriService.getFirCaseSiliguriToday().subscribe((firCase) => {
      this.FirCaseObject = firCase;
      console.log("this.FirCaseObject : " + this.FirCaseObject);

      this.FirCaseObject.forEach( (element : any) => {
        if(element.count !== "Nil"){
          this.FirCaseCountSiliguri = this.FirCaseCountSiliguri+1;
          console.log("inside this.FirCaseCount if : " + this.FirCaseCountSiliguri);
        }else{
          this.FirCaseCountSiliguri = 0
          console.log("inside this.FirCaseCount else : " + this.FirCaseCountSiliguri);
        }

      })

    })
    console.log("this.FirCaseCountSiliguri last" + this.FirCaseCountSiliguri);    
  }

  public retrieveAllDetailsSiliguriToday() {
    this.siliguriService.getAllDetailsSiliguri().subscribe((allDetails) => {
      this.AllDetailsObject = allDetails;
      console.log(this.AllDetailsObject);
    })
  }

  public retrieveAllDetailsTempSiliguriToday() {
    var res : string = "";
    this.siliguriService.getAllDetailsTempSiliguri().subscribe((allDetailsTemp) => {
      this.AllDetailsObject = allDetailsTemp;
      console.log(this.AllDetailsObject);
      if(this.AllDetailsObject.length > 0){
      	this.AllDetailsObject.forEach( (element : any) => {
	        //this.AllDetailsObjectTempSiliguri = element
          if(element.grps!.toLowerCase() === "siliguri"){
            this.AllDetailsObjectTempSiliguriGRPS = element
          }
          if(element.grps! === "New Jalpaiguri"){
            this.AllDetailsObjectTempNewJalpaiguri = element;
            console.log("New Jalpaiguri details : ");
            console.log(this.AllDetailsObjectTempNewJalpaiguri.udcountToday);
          }
          if(element.grps!.toLowerCase() === "malda (t)"){
            this.AllDetailsObjectTempMaldaT = element
          }
          if(element.grps!.toLowerCase() === "new coochbehar"){
            this.AllDetailsObjectTempNewCoochbehar = element
          }
          if(element.grps!.toLowerCase() === "alipurduar jn"){
            this.AllDetailsObjectTempAlipurduarJN = element
          }
          if(element.grps!.toLowerCase() === "dalkhola"){
            this.AllDetailsObjectTempDalkhola = element
          }
          if(element.grps!.toLowerCase() === "new maynaguri"){
            this.AllDetailsObjectTempNewMaynaguri = element
          }
          if(element.grps!.toLowerCase() === "new mal jn"){
            this.AllDetailsObjectTempNewMalJN = element
          }
          if(element.grps!.toLowerCase() === "balurghat"){
            this.AllDetailsObjectTempBalurghat = element
          }

      })
      this.newTestVarSiliguri = this.AllDetailsObjectTempSiliguri.typeOfCrime!.split(",\n");
      console.log("this.newTestVar : "+this.newTestVarSiliguri);
      }
      else{
        this.AllDetailsObject = {
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
        this.showSuccessDataNotFound('Not Found', 'All Details data Not found for Siliguri today!');
      }
    })
  }

  // Fetch error logs from the backend
  fetchErrorLogsSiliguri(a : string): void {
    this.siliguriService.getErrorLogs(a).subscribe(
      (logs) => {
        console.log("inside fetch logs...");
        this.logs = logs.map(log => this.cleanLogString(log));
        console.log(this.logs);
      },
      (err) => {
        // this.error = 'Error fetching logs. Please try again later.';
        console.error(err);
      }
    );
  }
  public deleteAllDataSiliguriToday() {
    this.siliguriService.deleteAllDataSiliguriToday();
    this.sameDayDataSiliguriFlag = 0;
    this.fileUploadSiliguriFlag = 0;
    this.showSuccessDataDelete();
  }

  public uploadAllDetailstoMainTableSiliguriOld(){
    const formData = new FormData();
    this.http.post('http://localhost:8080/uploadAllDetailsTestSiliguri',formData,{responseType: 'text'}).subscribe((res : any) => {
      //debugger
      if(res === 'Siliguri GRP all data uploaded into main table!'){
        console.log('Siliguri GRP all data uploaded into main table!')
        this.myAlertFuncAllCompile('Siliguri GRP all data uploaded!');
      } 
    })
    this.closeModalSiliguri();
  }

  public uploadAllDetailstoMainTableSiliguri(){
    const formData = new FormData();
    const modelDivSiliguri = document.getElementById('myModalSiliguri');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    this.http.post('http://localhost:8080/uploadAllDetailsTestSiliguri',formData,{responseType: 'text'}).subscribe(res => {
      //debugger
      if(res === 'Siliguri GRP all data uploaded into main table!'){
        console.log('Siliguri GRP all data uploaded into main table!')
        this.myAlertFuncAllCompile('Siliguri GRP all data uploaded!');
        //this.siliguriService.deleteAllDetailsTempSiliguriToday();
        if(modelDivSiliguri != null){
          console.log("inside uploadAllDetailstoMainTableSiliguri")
          modelDivSiliguri.style.display = 'none';
        }
        navigation!.className = 'navigation';
        main!.className = 'main';
      }},
      error => {
        this.errors = error;
        this.errorReceived('Error', 'Error while uploading!');
      }
    )
    this.fileUploadSiliguriFlag = 0;
    this.sameDayDataSiliguriFlag = 0;
    // this.closeModalSiliguri();
    this.closeModalconfSiliguri();
  }

  // ---------Edit function for Strength Siliguri start--------------
  
  public updateSiliguriSelectedStrength(doc_id : any){
    const modelDivSiliguri = document.getElementById('myModalStrengthSiliguri');
    var myModalSiliguri = document.getElementById('myModalSiliguri');
    console.log("edit data start Siliguri");
    console.log("doc_id : " + doc_id);

    const selectedStrengthSiliguriTemp : Strength = {
      inspr : this.selectedInspr,
      silsi : this.selectedsilsi,
      asilasi : this.selectedasilasi,
      const : this.selectedConst,
      lc : this.selectedLc,
      nvf : this.selectedNvf,
      hg : this.selectedHg,
      civic : this.selectedCivic,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      date : this.selectedStrengthSiliguri.date,
      grpname : this.selectedStrengthSiliguri.grpname,
      strengthDesc : this.selectedStrengthSiliguri.strengthDesc,
      unique_id : this.selectedStrengthSiliguri.unique_id
    }

    this.siliguriService.UpdateSelectedHeadStrengthDataTodaySiliguri(selectedStrengthSiliguriTemp);

    this.showDataUpdate();

    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'none';
    }
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'block';
    }

    this.retrieveStrengthDetailsSiliguriToday();
  }

  // ------------Edit function for Strength Siliguri end---------------

  // ---------Edit function for All Details Siliguri start--------------
  
  public updateAllDetailsTodaySiliguri(doc_id : any){
    const modelDivSiliguri = document.getElementById('myModalAllDetailsSiliguri');
    var myModalSiliguri = document.getElementById('myModalSiliguri');
    console.log("edit data All Details start Siliguri");
    console.log("doc_id : " + doc_id);

    const selectedAllDetailsSiliguriTemp : AllDetails = {
      prevCountToday : this.selectedPrevCountToday,
      specCountToday : this.selectedSpecCountToday,
      totalArrestCountToday : this.selectedTotalArrestCountToday,
      //totalArrestCountToday : (parseInt(this.selectedPrevCountToday) + parseInt(this.selectedSpecCountToday)).toString(),
      fircountToday : this.selectedFircountToday,
      otherCasesToday : this.selectedOtherCasesToday,
      totalCasesCountToday : this.selectedTotalCasesCountToday,
      //totalCasesCountToday : (parseInt(this.selectedFircountToday) + parseInt(this.selectedOtherCasesToday)).toString(),
      typeOfCrime : this.selectedTypeOfCrime,
      seizureCountToday : this.selectedSeizureCountToday,
      udcountToday : this.selectedUDcountToday,
      grps : this.selectedGRPS,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      dateofReport : this.selectedAllDetailsSiliguri.dateofReport,
      grp : this.selectedAllDetailsSiliguri.grp,
      unique_id : this.selectedAllDetailsSiliguri.unique_id
    }

    this.siliguriService.UpdateAllDetailsDataTodaySiliguri(selectedAllDetailsSiliguriTemp);

    this.showDataUpdate();

    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'none';
    }
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'block';
    }

    this.retrieveAllDetailsTempSiliguriToday();
  }

  // ------------Edit function for All Details Siliguri end---------------

  // ---------Edit function for Preventive Arrest Siliguri start--------------
  
  public updatePreventiveArrestTodaySiliguri(doc_id : any){
    const modelDivSiliguri = document.getElementById('myModalPrevArrestSiliguri');
    var myModalSiliguri = document.getElementById('myModalSiliguri');
    console.log("edit data preventive Arrest start Siliguri");
    console.log("doc_id : " + doc_id);

    const selectedPreventiveArrestSiliguriTemp : PreventiveArrest = {
      act1 : this.selectedAct1,
      act2 : this.selectedAct2,
      act3 : this.selectedAct3,
      act4 : this.selectedAct4,
      policeAct : this.selectedPoliceAct,
      act5 : this.selectedAct5,
      bclaact : this.selectedBclaact,
      iract : this.selectedIract,
      other : this.selectedOther,
      total : this.selectedTotal,
      document_id : doc_id,
      lstUpdatedBy : this.currentUser,
      dateofReport : this.preventiveArrestDetailsSiliguri.dateofReport,
      grpname : this.preventiveArrestDetailsSiliguri.grpname,
      unique_id : this.preventiveArrestDetailsSiliguri.unique_id
    }

    this.siliguriService.UpdatePreventiveArrestDataTodaySiliguri(selectedPreventiveArrestSiliguriTemp);

    this.showDataUpdate();

    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'none';
    }
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'block';
    }

    this.retrievePreventiveArrestDetailsSiliguriToday();
  }

  // ------------Edit function for Preventive Arrest Siliguri end---------------

// UI Functions for Siliguri start
  //First Preview Modal open function for Siliguri
  public openPreviewModalSiliguri(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var button_save_siliguri = document.getElementById('button-save-siliguri');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalSiliguri');
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal opened openPreviewModalSiliguri");
    this.retrieveStrengthDetailsSiliguriToday();
    this.retrievePreventiveArrestDetailsSiliguriToday();
    this.retrieveAllDetailsTempSiliguriToday();
  }

  //First Preview Modal open function for Siliguri end

  //First Preview Modal close function for Siliguri start
  public closeModalSiliguri(){
    const modelDiv = document.getElementById('myModalSiliguri');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation';
    main!.className = 'main';
    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    this.specificArrestCountSiliguri = 0;
    this.totalArrestCountSiliguri = 0;
    this.FirCaseCountSiliguri = 0;
    this.SeizureCountSiliguri = 0;
    this.UDCaseCountSiliguri = 0;
  }
  //First Preview Modal close function for Siliguri end

  // open modal function for edit Strength start for Siliguri
  public openEditModalStrengthSiliguri(selectedStrengthHead : string){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalSiliguri = document.getElementById('myModalSiliguri');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDivSiliguri = document.getElementById('myModalStrengthSiliguri');
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'none';
    }
    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'block';
    }
    console.log("modal opened edit for siliguri");
    this.siliguriService.getStrengthSiliguriToday().subscribe((data) => {
      this.strengthObjectSiliguri = data;
      console.log(this.strengthObjectSiliguri);

      this.strengthObjectSiliguri.forEach( (element : any) => {
        if(element.strengthDesc! === selectedStrengthHead){
          this.selectedStrengthSiliguri = element

          this.selectedInspr = this.selectedStrengthSiliguri.inspr!;
          this.selectedsilsi = this.selectedStrengthSiliguri.silsi!;
          this.selectedasilasi = this.selectedStrengthSiliguri.asilasi!;
          this.selectedConst = this.selectedStrengthSiliguri.const!;
          this.selectedLc = this.selectedStrengthSiliguri.lc!;
          this.selectedNvf = this.selectedStrengthSiliguri.nvf!;
          this.selectedHg = this.selectedStrengthSiliguri.hg!;
          this.selectedCivic = this.selectedStrengthSiliguri.civic!;
        }
      })
    })
  }
  // open modal function for edit Strength end for Siliguri

  // close modal function for edit Strength start for Siliguri
  public closeEditModalStrengthSiliguri(){
    const modelDivSiliguri = document.getElementById('myModalStrengthSiliguri');
    var myModalSiliguri = document.getElementById('myModalSiliguri');

    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'none';
    }
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'block';
    }
  }
  // close modal function for edit Strength end for Siliguri

  

  // open modal function for confirmation before save data start for Siliguri
  public openModalconfSiliguri(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalSiliguri = document.getElementById('myModalSiliguri');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDivSiliguri = document.getElementById('myModalConfSiliguri');
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'none';
    }
    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'block';
    }
  }
  // open modal function for confirmation before save data end for Siliguri

  // close modal function for confirmation before save data start for Siliguri
  public closeModalconfSiliguri(){
    const modelDivSiliguri = document.getElementById('myModalConfSiliguri');
    var myModalSiliguri = document.getElementById('myModalSiliguri');

    if(modelDivSiliguri != null){
      modelDivSiliguri.style.display = 'none';
    }
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'block';
    }
    //(document.getElementById('button-save-siliguri') as HTMLInputElement).disabled = true;
    var button_save_siliguri = document.getElementById('button-save-siliguri');
    //button_save_siliguri!.className = 'btn btn-primary button-36 footer-button2 is-disabled';
  }
  // close modal function for confirmation before save data end for Siliguri

  // open modal function for edit all details start for Siliguri
  public openEditModalAllDetailsSiliguri(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalSiliguri = document.getElementById('myModalSiliguri');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalAllDetailsSiliguri');
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'none';
    }
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal edit all details opened for Siliguri");
    this.siliguriService.getAllDetailsTempSiliguri().subscribe((data) => {
      this.allDetailsObjectSiliguri = data;
      console.log(this.allDetailsObjectSiliguri);

      this.allDetailsObjectSiliguri.forEach( (element : any) => {
        //if(element.strengthDesc! === selectedStrengthHead){
          this.selectedAllDetailsSiliguri = element

          this.selectedPrevCountToday = this.selectedAllDetailsSiliguri.prevCountToday!;
          this.selectedSpecCountToday = this.selectedAllDetailsSiliguri.specCountToday!;
          this.selectedTotalArrestCountToday = this.selectedAllDetailsSiliguri.totalArrestCountToday!;
          this.selectedFircountToday = this.selectedAllDetailsSiliguri.fircountToday!;
          this.selectedOtherCasesToday = this.selectedAllDetailsSiliguri.otherCasesToday!;
          this.selectedTotalCasesCountToday = this.selectedAllDetailsSiliguri.totalCasesCountToday!;
          this.selectedTypeOfCrime = this.selectedAllDetailsSiliguri.typeOfCrime!;
          this.selectedSeizureCountToday = this.selectedAllDetailsSiliguri.seizureCountToday!;
          this.selectedUDcountToday = this.selectedAllDetailsSiliguri.udcountToday!;
          this.selectedGRPS = this.selectedAllDetailsSiliguri.grps!;
        //}
      })
    })
  }
  // open modal function for edit all details end for Siliguri

  // close modal function for edit all details start for Siliguri
  public closeEditModalAllDetailsSiliguri(){
    const modelDiv = document.getElementById('myModalAllDetailsSiliguri');
    var myModalSiliguri = document.getElementById('myModalSiliguri');

    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'block';
    }
  }
  // close modal function for edit all details end for Siliguri
  
  // open modal function for edit Preventive Arrest start for Siliguri
  public openEditModalPreventiveArrestSiliguri(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    var myModalSiliguri = document.getElementById('myModalSiliguri');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModalPrevArrestSiliguri');
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'none';
    }
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    console.log("modal edit preventive arrest opened");
    this.siliguriService.getPreventiveArrestSiliguriToday().subscribe((data) => {
      this.PreventiveArrestObject = data;
      console.log(this.PreventiveArrestObject);

      this.PreventiveArrestObject.forEach( (element : any) => {
        //if(element.strengthDesc! === selectedStrengthHead){
          this.preventiveArrestDetailsSiliguri = element

          this.selectedAct1 = this.preventiveArrestDetailsSiliguri.act1!;
          this.selectedAct2 = this.preventiveArrestDetailsSiliguri.act2!;
          this.selectedAct3 = this.preventiveArrestDetailsSiliguri.act3!;
          // this.selectedAct4 = this.preventiveArrestDetailsSiliguri.act4!;
          this.selectedPoliceAct = this.preventiveArrestDetailsSiliguri.policeAct!;
          this.selectedAct4 = this.preventiveArrestDetailsSiliguri.act4!;
          this.selectedBclaact = this.preventiveArrestDetailsSiliguri.bclaact!;
          this.selectedIract = this.preventiveArrestDetailsSiliguri.iract!;
          this.selectedOther = this.preventiveArrestDetailsSiliguri.other!;
          this.selectedTotal = this.preventiveArrestDetailsSiliguri.total!;
        //}
      })
    })
  }
  // open modal function for edit Preventive Arrest end for Siliguri

  //Close modal function for edit Preventive Arrest start for Siliguri
  public closeEditModalPreventiveArrestSiliguri(){
    const modelDiv = document.getElementById('myModalPrevArrestSiliguri');
    var myModalSiliguri = document.getElementById('myModalSiliguri');

    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
    if(myModalSiliguri != null){
      myModalSiliguri.style.display = 'block';
    }
  }
  //Close modal function for edit Preventive Arrest end for Siliguri
  public calculateTotalArrestSiliguri(){
    this.selectedTotalArrestCountToday = (parseInt(this.selectedPrevCountToday) + parseInt(this.selectedSpecCountToday)).toString()
  }

  public calculateTotalCasesSiliguri(){
    this.selectedTotalCasesCountToday = (parseInt(this.selectedFircountToday) + parseInt(this.selectedOtherCasesToday)).toString()
  }

  public calculateTotalSelectedHeadSiliguri(a:string,b:string,c:string,d:string,e:string,f:string,g:string,h:string,i:string) : string{
    console.log("parseInt(a) : "+parseInt(a));
    console.log("parseInt(b) : "+parseInt(b));
    console.log("parseInt(c) : "+parseInt(c));
    console.log("parseInt(d) : "+parseInt(d));
    console.log("parseInt(e) : "+parseInt(e));
    console.log("parseInt(f) : "+parseInt(f));
    console.log("parseInt(g) : "+parseInt(g));
    console.log("parseInt(h) : "+parseInt(h));
    console.log("parseInt(i) : "+parseInt(i));
    a = this.checkNan(a);
    b = this.checkNan(b);
    c = this.checkNan(c);
    d = this.checkNan(d);
    e = this.checkNan(e);
    f = this.checkNan(f);
    g = this.checkNan(g);
    h = this.checkNan(h);
    i = this.checkNan(i);
    console.log("after parseInt(a) : "+parseInt(a));
    console.log("parseInt(b) : "+parseInt(b));
    console.log("parseInt(c) : "+parseInt(c));
    console.log("parseInt(d) : "+parseInt(d));
    console.log("parseInt(e) : "+parseInt(e));
    console.log("parseInt(f) : "+parseInt(f));
    console.log("after parseInt(g) : "+parseInt(g));
    console.log("parseInt(h) : "+parseInt(h));
    console.log("parseInt(i) : "+parseInt(i));
    var total = (parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d) + parseInt(e) + parseInt(f) + parseInt(g) + parseInt(h) + parseInt(i)).toString();
    return total;
  }

// UI Functions for Siliguri end

//Siliguri services end

  public navigateAnly(){
    this.router.navigate(['morning-report-view']);
  }

  public navigateCompile(){
    const formData = new FormData();
    this.http.post('http://localhost:8080/uploadAllDetails',formData,{responseType: 'text'}).subscribe((res : any) => {
      //debugger
      if(res === 'All GRP files uploaded'){
        console.log('All files uploaded successfully')
        this.myAlertFuncAllCompile('All files uploaded successfully');
      } 
    })
  }  

  //Alerts start

  public myAlertFuncHWH() {
    alert(this.warningHWH);
  }
  public myAlertCurrDataAllDetailsTempFuncHWH() {
    alert(this.warningCurrDataHWH);
  }
  public myAlertCurrDataStrengthFuncHWH() {
    alert(this.warningCurrDataStrengthHWH);
  }
  public myAlertFuncKGP() {
    alert(this.warningKGP);
  }
  public myAlertCurrDataAllDetailsTempFuncKGP() {
    alert(this.warningCurrDataKGP);
  }
  public myAlertCurrDataStrengthFuncKGP() {
    alert(this.warningCurrDataStrengthKGP);
  }
  public myAlertFuncSLD() {
    alert(this.warningSLD);
  }
  public myAlertCurrDataAllDetailsTempFuncSLD() {
    alert(this.warningCurrDataSLD);
  }
  public myAlertCurrDataStrengthFuncSLD() {
    alert(this.warningCurrDataStrengthSLD);
  }
  public myAlertFuncSLG() {
    alert(this.warningSLG);
  }
  public myAlertCurrDataAllDetailsTempFuncSLG() {
    alert(this.warningCurrDataSLG);
  }
  public myAlertCurrDataStrengthFuncSLG() {
    alert(this.warningCurrDataStrengthSLG);
  }
  public myAlertFuncAllCompile(a : string) {
    alert(a);
  }

  //Alerts end

  //Toasts start

  public showSuccessFileUpload() {
    this.toastr.success('Success', 'File Uploaded!');
  }

  public showSuccessDataDelete() {
    this.toastr.success('Success', 'Data Deleted!');
  }

  public showDataUpdate() {
    this.toastr.success('Success', 'Data Updated!');
  }

  public errorReceived(a: string, b : string) {
    this.toastr.error(a,b);
  }

  //Toasts end

  public checkNan(a : string){
    if(isNaN(parseInt(a))){
      return '0';
      console.log(a);
    }
    return a;
  }

  showSuccessDataNotFound(a: string, b : string) {
    this.toastr.error(a,b);
  }

  public clearAllRecentLogs(){
    this.logs = [];
    console.log("All recent logs cleared!")
  }

}




