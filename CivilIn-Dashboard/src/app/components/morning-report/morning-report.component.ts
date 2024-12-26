import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-morning-report',
  templateUrl: './morning-report.component.html',
  styleUrls: ['./morning-report.component.css']
})

export class MorningReportComponent implements OnInit {

  fileContent: any = 'You will see the content of the file when the file is uploaded...';
  disableButton  : boolean = true;
  fileContentString: String = '';
  finding : any = '';
  indexNo : any;
  indexNoTemp : any;
  indexNo1 : any;
  indexNo2 : number = 0;
  noOfCasesHowrah : string = '0';
  noOfPreventiveCasesHowrah : string = '0';
  noOfSpecificCasesHowrah : string = '0';
  noOfFIRHowrah : string = '0';
  noOfSeizureArmsHowrah : string = '0';
  noOfSeizureothersHowrah : string = '0';
  noOfSeizureDrugHowrah : string = '0';
  noOfSeizureLiquorHowrah : string = '0';
  noOfSeizureTotalHowrah : string = '0';
  noOfUDHowrah : string = '0';
  detailsFIRHowrah : string = '';
  noOfCasesSealdah : string = '0';
  noOfPreventiveCasesSealdah : string = '0';
  noOfSpecificCasesSealdah : string = '0';
  noOfFIRSealdah : string = '0';
  noOfSeizureSealdah : string = '0';
  noOfUDSealdah : string = '0';
  detailsFIRSealdah : string = '';
  noOfCasesSiliguri : string = '0';
  noOfPreventiveCasesSiliguri : string = '0';
  noOfSpecificCasesSiliguri : string = '0';
  noOfFIRSiliguri : string = '0';
  noOfSeizureSiliguri : string = '0';
  noOfUDSiliguri : string = '0';
  detailsFIRSiliguri : string = '';
  noOfCasesKharagpur : string = '0';
  noOfPreventiveCasesKharagpur : string = '0';
  noOfSpecificCasesKharagpur: string = '0';
  noOfFIRKharagpur : string = '0';
  noOfSeizureArmsKharagpur : string = '0';
  noOfSeizureothersKharagpur : string = '0';
  noOfSeizureTotalKharagpur : string = '0';
  noOfUDKharagpur : string = '0';
  detailsFIRKharagpur : string = '';
  totalSpecificCases: string = '0';
  totalSpecificCasesTemp: number = 0;
  totalPreventiveCases: string = '0';
  totalPreventiveCasesTemp: number = 0;
  totalFIRCases: string = '0';
  totalFIRCasesTemp: number = 0;
  totalCases: string = '0';
  totalCasesTemp: number = 0;
  totalSeizureCases: string = '0';
  totalSeizureCasesTemp: number = 0;
  totalUDCases: string = '0';
  totalUDCasesTemp: number = 0;
  fileContentStringTemp : string = '';

  @ViewChild("myFileInput", {static: false})
   
  // this InputVar is a reference to our input.
 
  InputVar: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  changeListener($event: { target: any; }) : void {
    this.onChange($event.target);
  }

  public onChange(fileList: any): void {
    let file:File = fileList.files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    if(self.fileContent){
      self.fileContent = '';
    }
    fileReader.onloadend = function(x : any) {
      self.fileContent = fileReader.result!;
      self.fileContentString = String(self.fileContent);
      //console.log("outside self.fileContentString : "+self.fileContentString);
      self.getHowrahDetails(self.fileContentString);
      self.getSealdahDetails(self.fileContentString);
      self.getSiliguriDetails(self.fileContentString);
      self.getKharagpurDetails(self.fileContentString);
      self.calculatePreventiveCasesTotal(self.noOfPreventiveCasesHowrah, self.noOfPreventiveCasesSealdah, self.noOfPreventiveCasesSiliguri, self.noOfPreventiveCasesKharagpur);
      self.calculateSpecificCasesTotal(self.noOfSpecificCasesHowrah, self.noOfSpecificCasesSealdah, self.noOfSpecificCasesSiliguri, self.noOfSpecificCasesKharagpur);
      self.calculateFIRCasesTotal(self.noOfFIRHowrah, self.noOfFIRSealdah, self.noOfFIRSiliguri, self.noOfFIRKharagpur);
      self.calculateSeizureTotal(self.noOfSeizureTotalHowrah, self.noOfSeizureSealdah, self.noOfSeizureSiliguri, self.noOfSeizureTotalKharagpur);
      self.calculateCasesTotal(self.totalPreventiveCases, self.totalSpecificCases);
      self.calculateUDTotal(self.noOfUDHowrah, self.noOfUDSealdah, self.noOfUDSiliguri, self.noOfUDKharagpur);
      self.disableButton = false;
      // console.log("self.noOfPreventiveCasesHowrah : "+self.noOfPreventiveCasesHowrah);
      // console.log("self.noOfSpecificCasesHowrah : "+self.noOfSpecificCasesHowrah);
      // if(self.fileContentString.includes('GIST OF FIR')){
      //   self.finding = self.fileContentString.match('GIST OF FIR')!;
      //   self.indexNo = self.fileContentString.indexOf('GIST OF FIR')!;
      //   self.indexNoTemp = self.indexNo;
      //   console.log("finding : " + self.finding);
      //   console.log("indexOf : " + self.indexNo);
        
      //   for(self.indexNo;self.indexNo<=self.fileContentString.length;self.indexNo++)
      //   {
      //     console.log("self.indexNo : "+self.indexNo);
      //     if(self.fileContentString.charAt(self.indexNo) === 'NIL' || !isNaN(parseInt(self.fileContentString.charAt(self.indexNo))))
      //     {
      //       console.log("self.fileContentString.charAt(self.indexNo) : "+self.fileContentString.charAt(self.indexNo));
      //       console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo))) : "+!isNaN(parseInt(self.fileContentString.charAt(self.indexNo))));
      //       self.indexNo2 = self.indexNo;
      //       console.log("self.indexNo2 : "+self.indexNo2);
      //       self.noOfCases = self.fileContentString.charAt(self.indexNo);
      //       console.log("before break");
      //       break;
      //     }
      //   }

      //   console.log("outside for");
      //   for(let i=self.indexNoTemp;i<=self.indexNo2;i++)
      //   {
      //     console.log("inside second for");
      //     console.log("self.fileContentString[i] : "+self.fileContentString[i]);
      //     self.newString = self.newString.concat(self.fileContentString[i]);
      //     console.log("self.newString : "+self.newString);
      //   }
      //   console.log("self.newString : "+self.newString);
      // }
    }.bind(this);
    fileReader.readAsText(file);
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  //Print page function
  public printThisPage(){
    window.print();
  }

  //Open preview Modal open function
  public openPreviewModal(){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    const modelDiv = document.getElementById('myModal');
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
    this.fileContent = '';
    this.InputVar!.nativeElement.value = "";
  }

  //Open preview Modal open function
  public closeModalNew(){
    const modelDiv = document.getElementById('myModal');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation';
    main!.className = 'main';
    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
  }

  public getHowrahDetails(fileContentString : any) : void{
    if(fileContentString.includes('HOWRAH GRP')){
      this.detailsFIRHowrah = '';
      if(fileContentString.includes('Preventive arrest')){
        let finding = fileContentString.match('Preventive arrest')!;
        let indexNo = fileContentString.indexOf('Preventive arrest')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfPreventiveCasesHowrah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfPreventiveCasesHowrah = this.fileContentStringTemp;
            this.noOfPreventiveCasesHowrah = this.noOfPreventiveCasesHowrah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfPreventiveCasesHowrah : "+this.noOfPreventiveCasesHowrah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfPreventiveCasesHowrah" + this.noOfPreventiveCasesHowrah);
        console.log("outside for");
      }

      if(fileContentString.includes('Arrest in Specific Case')){
        let finding = fileContentString.match('Arrest in Specific Case')!;
        let indexNo = fileContentString.indexOf('Arrest in Specific Case')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfSpecificCasesHowrah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSpecificCasesHowrah = this.fileContentStringTemp;
            this.noOfSpecificCasesHowrah = this.noOfSpecificCasesHowrah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSpecificCasesHowrah : "+this.noOfSpecificCasesHowrah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfSpecificCasesHowrah" + this.noOfSpecificCasesHowrah);
        console.log("outside for");
      }

      if(fileContentString.includes('Seizure of Arms & Ammunition /Explosives etc.')){
        let finding = fileContentString.match('Seizure of Arms & Ammunition /Explosives etc.')!;
        let indexNo = fileContentString.indexOf('Seizure of Arms & Ammunition /Explosives etc.')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfSeizureArmsHowrah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSeizureArmsHowrah = this.fileContentStringTemp;
            this.noOfSeizureArmsHowrah = this.noOfSeizureArmsHowrah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSeizureArmsHowrah : "+this.noOfSeizureArmsHowrah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfSeizureArmsHowrah" + this.noOfSeizureArmsHowrah);
        console.log("outside for");
      }

      if(fileContentString.includes('Seizure/Recovered of other')){
        let finding = fileContentString.match('Seizure/Recovered of other')!;
        let indexNo = fileContentString.indexOf('Seizure/Recovered of other')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfSeizureothersHowrah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSeizureothersHowrah = this.fileContentStringTemp;
            this.noOfSeizureothersHowrah = this.noOfSeizureothersHowrah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSeizureothersHowrah : "+this.noOfSeizureothersHowrah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfSeizureothersHowrah" + this.noOfSeizureothersHowrah);
        console.log("outside for");
      }

      if(fileContentString.includes('Drug')){
        let finding = fileContentString.match('Drug')!;
        let indexNo = fileContentString.indexOf('Drug')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfSeizureDrugHowrah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSeizureDrugHowrah = this.fileContentStringTemp;
            this.noOfSeizureDrugHowrah = this.noOfSeizureDrugHowrah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSeizureDrugHowrah : "+this.noOfSeizureDrugHowrah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfSeizureDrugHowrah" + this.noOfSeizureDrugHowrah);
        console.log("outside for");
      }

      if(fileContentString.includes('I.D Liquor')){
        let finding = fileContentString.match('I.D Liquor')!;
        let indexNo = fileContentString.indexOf('I.D Liquor')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfSeizureLiquorHowrah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSeizureLiquorHowrah = this.fileContentStringTemp;
            this.noOfSeizureLiquorHowrah = this.noOfSeizureLiquorHowrah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSeizureLiquorHowrah : "+this.noOfSeizureLiquorHowrah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfSeizureLiquorHowrah" + this.noOfSeizureLiquorHowrah);
        console.log("outside for");
      }

      if(fileContentString.includes('Miscellaneous Case')){
        let finding = fileContentString.match('Miscellaneous Case')!;
        let indexNo = fileContentString.indexOf('Miscellaneous Case')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfUDHowrah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfUDHowrah = this.fileContentStringTemp;
            this.noOfUDHowrah = this.noOfUDHowrah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfUDHowrah : "+this.noOfUDHowrah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfUDHowrah" + this.noOfUDHowrah);
        console.log("outside for");
      }

      if(fileContentString.includes('Specific Case (Gist of FIR)')){
        let finding = fileContentString.match('Specific Case (Gist of FIR)')!;
        let indexNo = fileContentString.indexOf('Specific Case (Gist of FIR)')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfFIRHowrah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfFIRHowrah = this.fileContentStringTemp;
            this.noOfFIRHowrah = this.noOfFIRHowrah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfFIRHowrah : "+this.noOfFIRHowrah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfFIRHowrah" + this.noOfFIRHowrah);
        console.log("outside for");

        let finding_misc = fileContentString.match('Miscellaneous Case')!;
        let indexNo_misc = fileContentString.indexOf('Miscellaneous Case')!;
        let indexNoTemp_misc;
        
        console.log("finding_misc : " + finding_misc);
        console.log("indexNo_misc : " + indexNo_misc);

        for(indexNo;indexNo<indexNo_misc-5;indexNo++)
          {
            let i = 0;
            this.detailsFIRHowrah += fileContentString.charAt(indexNo);
          }

          console.log("this.detailsFIRHowrah : " + this.detailsFIRHowrah);
      }

      this.noOfSeizureTotalHowrah = (parseInt(this.noOfSeizureArmsHowrah) + parseInt(this.noOfSeizureothersHowrah) + parseInt(this.noOfSeizureDrugHowrah) + parseInt(this.noOfSeizureLiquorHowrah)).toString();

      this.noOfCasesHowrah = (parseInt(this.noOfSpecificCasesHowrah) + parseInt(this.noOfPreventiveCasesHowrah)).toString();
    }
  }

  public getSealdahDetails(fileContentString : any) : void{
    if(fileContentString.includes('SEALDAH GRP')){
      this.detailsFIRSealdah = '';
      if(fileContentString.includes('Arrest in Preventive Section')){
        let finding = fileContentString.match('Arrest in Preventive Section')!;
        let indexNo = fileContentString.indexOf('Arrest in Preventive Section')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            this.noOfPreventiveCasesSealdah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfPreventiveCasesSealdah = this.fileContentStringTemp;
            this.noOfPreventiveCasesSealdah = this.noOfPreventiveCasesSealdah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfPreventiveCasesSealdah : "+this.noOfPreventiveCasesSealdah);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('Arrest in Current Specific Case')){
        let finding = fileContentString.match('Arrest in Current Specific Case')!;
        let indexNo = fileContentString.indexOf('Arrest in Current Specific Case')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            this.noOfSpecificCasesSealdah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSpecificCasesSealdah = this.fileContentStringTemp;
            this.noOfSpecificCasesSealdah = this.noOfSpecificCasesSealdah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSpecificCasesSealdah : "+this.noOfSpecificCasesSealdah);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('Gist of FIR')){
        let finding = fileContentString.match('Gist of FIR')!;
        let indexNo = fileContentString.indexOf('Gist of FIR')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            this.noOfFIRSealdah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfFIRSealdah = this.fileContentStringTemp;
            this.noOfFIRSealdah = this.noOfFIRSealdah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfFIRSealdah : "+this.noOfFIRSealdah);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('Seizure')){
        let finding = fileContentString.match('Seizure')!;
        let indexNo = fileContentString.indexOf('Seizure')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfFIRSealdah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSeizureSealdah = this.fileContentStringTemp;
            this.noOfSeizureSealdah = this.noOfSeizureSealdah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSeizureSealdah : "+this.noOfSeizureSealdah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfSeizureSealdah" + this.noOfSeizureSealdah);
        console.log("outside for");
      }

      if(fileContentString.includes('U/D Case Statement')){
        let finding = fileContentString.match('U/D Case Statement')!;
        let indexNo = fileContentString.indexOf('U/D Case Statement')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfUDSealdah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfUDSealdah = this.fileContentStringTemp;
            this.noOfUDSealdah = this.noOfUDSealdah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfUDSealdah : "+this.noOfUDSealdah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfUDSealdah" + this.noOfUDSealdah);
        console.log("outside for");
      }

      if(fileContentString.includes('Gist of FIR')){
        let finding = fileContentString.match('Gist of FIR')!;
        let indexNo = fileContentString.indexOf('Gist of FIR')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfFIRSealdah = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfFIRSealdah = this.fileContentStringTemp;
            this.noOfFIRSealdah = this.noOfFIRSealdah.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfFIRSealdah : "+this.noOfFIRSealdah);
            console.log("before break");
            break;
          }
        }
        console.log("noOfFIRSealdah" + this.noOfFIRSealdah);
        console.log("outside for");

        let finding_misc = fileContentString.match('U/D Case Statement')!;
        let indexNo_misc = fileContentString.indexOf('U/D Case Statement')!;
        let indexNoTemp_misc;
        
        console.log("finding_misc : " + finding_misc);
        console.log("indexNo_misc : " + indexNo_misc);

        for(indexNo;indexNo<indexNo_misc-5;indexNo++)
          {
            let i = 0;
            this.detailsFIRSealdah += fileContentString.charAt(indexNo);
          }

          console.log("this.detailsFIRSealdah : " + this.detailsFIRSealdah);
      }

      this.noOfSeizureSealdah = (parseInt(this.noOfSeizureSealdah)).toString();

      this.noOfCasesSealdah = (parseInt(this.noOfSpecificCasesSealdah) + parseInt(this.noOfPreventiveCasesSealdah)).toString();
    }
  }

  public getSiliguriDetails(fileContentString : any) : void{
    if(fileContentString.includes('SILIGURI GRP')){
      this.detailsFIRSiliguri = '';
      if(fileContentString.includes('ARREST IN PREVENTIVE SECTION')){
        let finding = fileContentString.match('ARREST IN PREVENTIVE SECTION')!;
        let indexNo = fileContentString.indexOf('ARREST IN PREVENTIVE SECTION')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            this.noOfPreventiveCasesSiliguri = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfPreventiveCasesSiliguri = this.fileContentStringTemp;
            this.noOfPreventiveCasesSiliguri = this.noOfPreventiveCasesSiliguri.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfPreventiveCasesSiliguri : "+this.noOfPreventiveCasesSiliguri);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('ARREST IN CURRENT SPECIFIC CASE')){
        let finding = fileContentString.match('ARREST IN CURRENT SPECIFIC CASE')!;
        let indexNo = fileContentString.indexOf('ARREST IN CURRENT SPECIFIC CASE')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            this.noOfSpecificCasesSiliguri = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSpecificCasesSiliguri = this.fileContentStringTemp;
            this.noOfSpecificCasesSiliguri = this.noOfSpecificCasesSiliguri.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSpecificCasesSiliguri : "+this.noOfSpecificCasesSiliguri);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('GIST OF FIR CASE')){
        let finding = fileContentString.match('GIST OF FIR CASE')!;
        let indexNo = fileContentString.indexOf('GIST OF FIR CASE')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            this.noOfFIRSiliguri = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfFIRSiliguri = this.fileContentStringTemp;
            this.noOfFIRSiliguri = this.noOfFIRSiliguri.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfFIRSiliguri : "+this.noOfFIRSiliguri);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('SEIZURE')){
        let finding = fileContentString.match('SEIZURE')!;
        let indexNo = fileContentString.indexOf('SEIZURE')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfFIRSiliguri = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSeizureSiliguri = this.fileContentStringTemp;
            this.noOfSeizureSiliguri = this.noOfSeizureSiliguri.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSeizureSiliguri : "+this.noOfSeizureSiliguri);
            console.log("before break");
            break;
          }
        }
        console.log("noOfSeizureSiliguri" + this.noOfSeizureSiliguri);
        console.log("outside for");
      }

      if(fileContentString.includes('STATEMENT OF U.D. CASES OF SILIGURI GRP DIST')){
        let finding = fileContentString.match('STATEMENT OF U.D. CASES OF SILIGURI GRP DIST')!;
        let indexNo = fileContentString.indexOf('STATEMENT OF U.D. CASES OF SILIGURI GRP DIST')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfUDSiliguri = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfUDSiliguri = this.fileContentStringTemp;
            this.noOfUDSiliguri = this.noOfUDSiliguri.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfUDSiliguri : "+this.noOfUDSiliguri);
            console.log("before break");
            break;
          }
        }
        console.log("noOfUDSiliguri" + this.noOfUDSiliguri);
        console.log("outside for");
      }

      if(fileContentString.includes('GIST OF FIR CASE')){
        let finding = fileContentString.match('GIST OF FIR CASE')!;
        let indexNo = fileContentString.indexOf('GIST OF FIR CASE')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfFIRSiliguri = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfFIRSiliguri = this.fileContentStringTemp;
            this.noOfFIRSiliguri = this.noOfFIRSiliguri.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfFIRSiliguri : "+this.noOfFIRSiliguri);
            console.log("before break");
            break;
          }
        }
        console.log("noOfFIRSiliguri" + this.noOfFIRSiliguri);
        console.log("outside for");

        let finding_misc = fileContentString.match('STATEMENT OF U.D. CASES OF SILIGURI GRP DIST')!;
        let indexNo_misc = fileContentString.indexOf('STATEMENT OF U.D. CASES OF SILIGURI GRP DIST')!;
        let indexNoTemp_misc;
        
        console.log("finding_misc : " + finding_misc);
        console.log("indexNo_misc : " + indexNo_misc);

        for(indexNo;indexNo<indexNo_misc-5;indexNo++)
          {
            let i = 0;
            this.detailsFIRSiliguri += fileContentString.charAt(indexNo);
          }

          console.log("this.detailsFIRSiliguri : " + this.detailsFIRSiliguri);
      }

      this.noOfSeizureSiliguri = (parseInt(this.noOfSeizureSiliguri)).toString();

      this.noOfCasesSiliguri = (parseInt(this.noOfSpecificCasesSiliguri) + parseInt(this.noOfPreventiveCasesSiliguri)).toString();
    }
  }

  public getKharagpurDetails(fileContentString : any) : void{
    if(fileContentString.includes('KHARAGPUR GRP')){
      this.detailsFIRKharagpur = '';
      if(fileContentString.includes('PREVENTIVE CASES')){
        let finding = fileContentString.match('PREVENTIVE CASES')!;
        let indexNo = fileContentString.indexOf('PREVENTIVE CASES')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            this.noOfPreventiveCasesKharagpur = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfPreventiveCasesKharagpur = this.fileContentStringTemp;
            this.noOfPreventiveCasesKharagpur = this.noOfPreventiveCasesKharagpur.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfPreventiveCasesKharagpur : "+this.noOfPreventiveCasesKharagpur);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('SPECIFIC CASES')){
        let finding = fileContentString.match('SPECIFIC CASES')!;
        let indexNo = fileContentString.indexOf('SPECIFIC CASES')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            // this.noOfSpecificCasesKharagpur = fileContentString.substring(indexNo, indexNo+3);
            this.noOfSpecificCasesKharagpur = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfSpecificCasesKharagpur = this.fileContentStringTemp;
            this.noOfSpecificCasesKharagpur = this.noOfSpecificCasesKharagpur.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfSpecificCasesKharagpur : "+this.noOfSpecificCasesKharagpur);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('GIST OF FIR')){
        let finding = fileContentString.match('GIST OF FIR')!;
        let indexNo = fileContentString.indexOf('GIST OF FIR')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL')){
            this.noOfFIRKharagpur = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfFIRKharagpur = this.fileContentStringTemp;
            this.noOfFIRKharagpur = this.noOfFIRKharagpur.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfFIRKharagpur : "+this.noOfFIRKharagpur);
            console.log("before break");
            break;
          }
        }

        console.log("outside for");
      }

      if(fileContentString.includes('UD CASES')){
        let finding = fileContentString.match('UD CASES')!;
        let indexNo = fileContentString.indexOf('UD CASES')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfUDKharagpur = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfUDKharagpur = this.fileContentStringTemp;
            this.noOfUDKharagpur = this.noOfUDKharagpur.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfUDKharagpur : "+this.noOfUDKharagpur);
            console.log("before break");
            break;
          }
        }
        console.log("noOfUDKharagpur" + this.noOfUDKharagpur);
        console.log("outside for");
      }

      if(fileContentString.includes('GIST OF FIR')){
        let finding = fileContentString.match('GIST OF FIR')!;
        let indexNo = fileContentString.indexOf('GIST OF FIR')!;
        let indexNoTemp;
        
        console.log("finding : " + finding);
        console.log("indexOf : " + indexNo);
        
        for(indexNo;indexNo<=fileContentString.length;indexNo++)
        {
          console.log("indexNo : "+indexNo);
          console.log("fileContentString.substring(indexNo, indexNo+3)" + fileContentString.substring(indexNo, indexNo+3));
          if(fileContentString.substring(indexNo, indexNo+3).match('NIL') || fileContentString.substring(indexNo, indexNo+3).match('Nil')){
            this.noOfFIRKharagpur = '0';
            console.log("bla");
            break;
          }
          else if(!isNaN(parseInt(fileContentString.charAt(indexNo))))
          {
            console.log("prev outside while indexNo2 : " + this.indexNo2);
            console.log("prev outside while fileContentString.charAt(indexNo) : " + fileContentString.charAt(this.indexNo));
            indexNoTemp = indexNo;
            console.log("prev outside while indexNoTemp : " + indexNoTemp);
            console.log("prev outside while fileContentString.charAt(indexNoTemp) : " + fileContentString.charAt(indexNoTemp));
            while(!isNaN(parseInt(fileContentString.charAt(indexNo))))
            {
              indexNo++;
              this.indexNo2 = indexNo-1;
              console.log("inside while indexNo2 : " + this.indexNo2);
            }
            console.log("self.fileContentString.charAt(self.indexNo2) : "+fileContentString.charAt(this.indexNo2));
            console.log("!isNaN(parseInt(self.fileContentString.charAt(self.indexNo2))) : "+!isNaN(parseInt(fileContentString.charAt(this.indexNo2))));
            console.log("this.indexNo2 : "+this.indexNo2);
            for(let i=indexNoTemp;i<=this.indexNo2;i++){
              this.fileContentStringTemp = this.fileContentStringTemp!.concat(fileContentString.charAt(i));
              console.log("fileContentStringTemp : "+this.fileContentStringTemp);
            }
            console.log("outside fileContentStringTemp : "+this.fileContentStringTemp);
            this.noOfFIRKharagpur = this.fileContentStringTemp;
            this.noOfFIRKharagpur = this.noOfFIRKharagpur.replace(/^0+/,"");
            this.fileContentStringTemp = '';
            console.log("outside noOfFIRKharagpur : "+this.noOfFIRKharagpur);
            console.log("before break");
            break;
          }
        }
        console.log("noOfFIRKharagpur" + this.noOfFIRKharagpur);
        console.log("outside for");

        let finding_misc = fileContentString.match('UD CASES')!;
        let indexNo_misc = fileContentString.indexOf('UD CASES')!;
        let indexNoTemp_misc;
        
        console.log("finding_misc : " + finding_misc);
        console.log("indexNo_misc : " + indexNo_misc);

        for(indexNo;indexNo<indexNo_misc-5;indexNo++)
          {
            let i = 0;
            this.detailsFIRKharagpur += fileContentString.charAt(indexNo);
          }

          console.log("this.detailsFIRKharagpur : " + this.detailsFIRKharagpur);
      }

      this.noOfCasesKharagpur = (parseInt(this.noOfSpecificCasesKharagpur) + parseInt(this.noOfPreventiveCasesKharagpur)).toString();
    }
  }

  public calculatePreventiveCasesTotal(a : string, b : string, c : string, d : string){
    this.totalPreventiveCasesTemp = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d);
    this.totalPreventiveCases = this.totalPreventiveCasesTemp.toString();
  }

  public calculateSpecificCasesTotal(a : string, b : string, c : string, d : string){
    this.totalSpecificCasesTemp = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d);
    this.totalSpecificCases = this.totalSpecificCasesTemp.toString();
  }

  public calculateFIRCasesTotal(a : string, b : string, c : string, d : string){
    this.totalFIRCasesTemp = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d);
    this.totalFIRCases = this.totalFIRCasesTemp.toString();
  }

  public calculateCasesTotal(a : string, b : string){
    this.totalCasesTemp = parseInt(a) + parseInt(b);
    this.totalCases = this.totalCasesTemp.toString();
  }

  public calculateSeizureTotal(a : string, b : string, c : string, d : string){
    this.totalSeizureCasesTemp = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d);
    this.totalSeizureCases = this.totalSeizureCasesTemp.toString();
  }

  public calculateUDTotal(a : string, b : string, c : string, d : string){
    this.totalUDCasesTemp = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d);
    this.totalUDCases = this.totalUDCasesTemp.toString();
  }

  public reset(a : string) {
    if(a === 'Howrah'){
      this.noOfCasesHowrah = '0';
      this.noOfPreventiveCasesHowrah = '0';
      this.noOfSpecificCasesHowrah = '0';
      this.noOfFIRHowrah = '0';
      this.noOfSeizureArmsHowrah = '0';
      this.noOfSeizureothersHowrah = '0';
      this.noOfSeizureDrugHowrah = '0';
      this.noOfSeizureLiquorHowrah = '0';
      this.noOfSeizureTotalHowrah = '0';
      this.detailsFIRHowrah = '';
      this.noOfUDHowrah = '0';
      console.log("Howrah reset complete");
      this.calculatePreventiveCasesTotal(this.noOfPreventiveCasesHowrah, this.noOfPreventiveCasesSealdah, this.noOfPreventiveCasesSiliguri, this.noOfPreventiveCasesKharagpur);
      this.calculateSpecificCasesTotal(this.noOfSpecificCasesHowrah, this.noOfSpecificCasesSealdah, this.noOfSpecificCasesSiliguri, this.noOfSpecificCasesKharagpur);
      this.calculateFIRCasesTotal(this.noOfFIRHowrah, this.noOfFIRSealdah, this.noOfFIRSiliguri, this.noOfFIRKharagpur);
      this.calculateSeizureTotal(this.noOfSeizureTotalHowrah, this.noOfSeizureSealdah, this.noOfSeizureSiliguri, this.noOfSeizureTotalKharagpur);
      this.calculateCasesTotal(this.totalPreventiveCases, this.totalSpecificCases);
      this.calculateUDTotal(this.noOfUDHowrah, this.noOfUDSealdah, this.noOfUDSiliguri, this.noOfUDKharagpur);
      console.log("Howrah total calculation complete");
    }
    else if(a === 'Sealdah'){
      this.noOfCasesSealdah = '0';
      this.noOfPreventiveCasesSealdah = '0';
      this.noOfSpecificCasesSealdah = '0';
      this.noOfFIRSealdah = '0';
      this.noOfSeizureSealdah = '0';
      this.detailsFIRSealdah = '';
      this.noOfUDSealdah = '0';
      console.log("Sealdah reset complete");
      this.calculatePreventiveCasesTotal(this.noOfPreventiveCasesHowrah, this.noOfPreventiveCasesSealdah, this.noOfPreventiveCasesSiliguri, this.noOfPreventiveCasesKharagpur);
      this.calculateSpecificCasesTotal(this.noOfSpecificCasesHowrah, this.noOfSpecificCasesSealdah, this.noOfSpecificCasesSiliguri, this.noOfSpecificCasesKharagpur);
      this.calculateFIRCasesTotal(this.noOfFIRHowrah, this.noOfFIRSealdah, this.noOfFIRSiliguri, this.noOfFIRKharagpur);
      this.calculateSeizureTotal(this.noOfSeizureTotalHowrah, this.noOfSeizureSealdah, this.noOfSeizureSiliguri, this.noOfSeizureTotalKharagpur);
      this.calculateCasesTotal(this.totalPreventiveCases, this.totalSpecificCases);
      this.calculateUDTotal(this.noOfUDHowrah, this.noOfUDSealdah, this.noOfUDSiliguri, this.noOfUDKharagpur);
      console.log("Sealdah total calculation complete");
    }
    else if(a === 'Siliguri'){
      this.noOfCasesSiliguri = '0';
      this.noOfPreventiveCasesSiliguri = '0';
      this.noOfSpecificCasesSiliguri = '0';
      this.noOfFIRSiliguri = '0';
      this.noOfSeizureSiliguri = '0';
      this.detailsFIRSiliguri = '';
      this.noOfUDSiliguri = '0';
      console.log("Siliguri reset complete");
      this.calculatePreventiveCasesTotal(this.noOfPreventiveCasesHowrah, this.noOfPreventiveCasesSealdah, this.noOfPreventiveCasesSiliguri, this.noOfPreventiveCasesKharagpur);
      this.calculateSpecificCasesTotal(this.noOfSpecificCasesHowrah, this.noOfSpecificCasesSealdah, this.noOfSpecificCasesSiliguri, this.noOfSpecificCasesKharagpur);
      this.calculateFIRCasesTotal(this.noOfFIRHowrah, this.noOfFIRSealdah, this.noOfFIRSiliguri, this.noOfFIRKharagpur);
      this.calculateSeizureTotal(this.noOfSeizureTotalHowrah, this.noOfSeizureSealdah, this.noOfSeizureSiliguri, this.noOfSeizureTotalKharagpur);
      this.calculateCasesTotal(this.totalPreventiveCases, this.totalSpecificCases);
      this.calculateUDTotal(this.noOfUDHowrah, this.noOfUDSealdah, this.noOfUDSiliguri, this.noOfUDKharagpur);
      console.log("Siliguri total calculation complete");
    }
    else if(a === 'Kharagpur'){
      this.noOfCasesKharagpur  = '0';
      this.noOfPreventiveCasesKharagpur  = '0';
      this.noOfSpecificCasesKharagpur = '0';
      this.noOfFIRKharagpur  = '0';
      this.noOfSeizureArmsKharagpur  = '0';
      this.noOfSeizureothersKharagpur  = '0';
      this.noOfSeizureTotalKharagpur  = '0';
      this.detailsFIRKharagpur  = '';
      this.noOfUDKharagpur = '0';
      console.log("Kharagpur reset complete");
      this.calculatePreventiveCasesTotal(this.noOfPreventiveCasesHowrah, this.noOfPreventiveCasesSealdah, this.noOfPreventiveCasesSiliguri, this.noOfPreventiveCasesKharagpur);
      this.calculateSpecificCasesTotal(this.noOfSpecificCasesHowrah, this.noOfSpecificCasesSealdah, this.noOfSpecificCasesSiliguri, this.noOfSpecificCasesKharagpur);
      this.calculateFIRCasesTotal(this.noOfFIRHowrah, this.noOfFIRSealdah, this.noOfFIRSiliguri, this.noOfFIRKharagpur);
      this.calculateSeizureTotal(this.noOfSeizureTotalHowrah, this.noOfSeizureSealdah, this.noOfSeizureSiliguri, this.noOfSeizureTotalKharagpur);
      this.calculateCasesTotal(this.totalPreventiveCases, this.totalSpecificCases);
      this.calculateUDTotal(this.noOfUDHowrah, this.noOfUDSealdah, this.noOfUDSiliguri, this.noOfUDKharagpur);
      console.log("Kharagpur total calculation complete");
    }
  }

  public printPage(){
    window.print();
  }
}
