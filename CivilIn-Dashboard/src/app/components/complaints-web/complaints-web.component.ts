import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';
import firebase from 'firebase/compat/app';
import * as firebase1 from 'firebase/compat/app';
import "firebase/firestore";
import "firebase/auth";
import { } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ComplaintService } from 'src/app/services/complaint.service';
import { Complaint } from 'src/app/models/complaint';
import { LocationService } from 'src/app/services/location.service';

export class Incident {
  public name!: string;
  public coName!: string;
  public coNumber!: Number;
  public trainNumber!: string;
  public coachNumber!: string;
  public berthNumber!: string;
  public complaintSub!: string;
  public complaintText!: string;
  public mobileNo!: string;
  public email!: string;
  public password!: string;
  public originatingStation!: string;
  public destinationStation!: string;
  public nearestStation!: string;
}

export class Missing {
  public name!: string;
  public coName!: string;
  public coNumber!: Number;
  public trainNumber!: string;
  public coachNumber!: string;
  public berthNumber!: string;
  public complaintSub!: string;
  public complaintText!: string;
  public mobileNo!: string;
  public email!: string;
  public password!: string;
  public originatingStation!: string;
  public destinationStation!: string;
  public nearestStation!: string;
}

export class PhoneNumber {
  country!: string;
  area!: string;
  prefix!: string;
  line!: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}

const configNew = {
  projectId: 'civilin-aa26d',
  appId: '1:152879681858:web:5b48309d2cffeb630578db',
  databaseURL: 'https://civilin-aa26d-default-rtdb.firebaseio.com',
  storageBucket: 'civilin-aa26d.appspot.com',
  apiKey: 'AIzaSyBeD6xgKo8raugyOmOQqj8GxXacDMSVdiE',
  authDomain: 'civilin-aa26d.firebaseapp.com',
  messagingSenderId: '152879681858',
  measurementId: 'G-SXFPD4W1BZ',
  vapidKey: 'BAI_PV9Gi3e91GreAlSqfF5C3y0pkpFYYM3daaKMsv1MQY639tSz7E1cWkbhZ1G2T8Mvt0d5o9cfZNxLFrhyzQM'
};


@Component({
  selector: 'app-complaints-web',
  templateUrl: './complaints-web.component.html',
  styleUrls: ['./complaints-web.component.css']
})
export class ComplaintsWebComponent implements OnInit {
  // [x: string]: any;

  // phoneNumber : any;
  reCaptchaVerifier: any;

  keyword = 'name';

  nearestStationNew : any;
  assignedGRPS : any;
  assignedGRP : any;
  trainPnr : any;
  originatingStation : any;
  destinationStation : any;

  model = new Incident();
  modelMissing = new Missing();
  incidentSubjects: string[] = [
    'Unauthorized Person in Ladies or Disabled or Reserved Compartment',
    'Harassment of Extortion by Security or Railway Personnel',
    'Nuisance by Hawkers or beggar or Passenger',
    'Smoking or Alcohol Consumption or Narcotics',
    'Quarrelling or Hooliganism',
    'Run Over or Passenger Fell Down'
  ];
  missingSubjects: string[] = [
    'Theft of Phone or Bag or laptop',
    'Snatching',
    'Passenger Missing',
    'Dacoity',
    'Robbery',
    'Luggage Left Behind',
    'Unclaimed or Suspected Articles'
  ];
  data = [
    {id: 1, grpsName: 'Howrah', grpName : 'Howrah', name: 'Howrah R/S'},
    {id: 2, grpsName: 'Howrah', grpName : 'Howrah', name: 'Tikiapara R/S'},
    {id: 3,  grpsName: 'Belur', grpName: 'Howrah', name: 'Liluah R/S'},
    {id: 4,  grpsName: 'Belur', grpName: 'Howrah', name: 'Belur Math R/S'},
    {id: 5,  grpsName: 'Belur', grpName: 'Howrah', name: 'Belur R/S'},
    {id: 6,  grpsName: 'Belur', grpName: 'Howrah', name: 'Bally R/S'},
    {id: 7,  grpsName: 'Belur', grpName: 'Howrah', name: 'Bally Halt R/S'},
    {id: 8,  grpsName: 'Belur', grpName: 'Howrah', name: 'Bally Ghat R/S'},
    {id: 9,  grpsName: 'Belur', grpName: 'Howrah', name: 'Baranagar R/S '},
    {id: 10, grpsName: 'Belur', grpName: 'Howrah', name: 'Dakhineswar R/S'},
    {id: 11, grpsName: 'Belur', grpName: 'Howrah', name: 'Rajchandrapur  R/S '},
    {id: 12, grpsName: 'Belur', grpName: 'Howrah', name: 'Belanagar R/S'},
    {id: 13, grpsName: 'Belur', grpName: 'Howrah', name: 'Bhattanagar R/S'},
    {id: 14, grpsName: 'Belur', grpName: 'Howrah', name: 'Dankuni R/S'},
    {id: 15, grpsName: 'Belur', grpName: 'Howrah', name: 'Uttarpara R/S'},
    {id: 16, grpsName: 'Belur', grpName: 'Howrah', name: 'Hindmotor R/S'},
    {id: 17, grpsName: 'Belur', grpName: 'Howrah', name: 'Konnagar R/S'},
    {id: 18, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Gobra R/S'},
    {id: 19, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Janai Road R/S'},
    {id: 20, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Begampur R/S'},
    {id: 21, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Baruipara R/S'},
    {id: 22, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Mirzapur Bankipur R/S'},
    {id: 23, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Balarambati R/S'},
    {id: 24, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Kamarkundu R/S'},
    {id: 25, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Madhusudanpur R/S'},
    {id: 26, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Chandanpur R/S'},
    {id: 27, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Porabazar R/S'},
    {id: 28, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Belmuri R/S'},
    {id: 29, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Dhaniakhali Halt R/S'},
    {id: 30, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Sibaichandi R/S'},
    {id: 31, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Cheragram R/S'},
    {id: 32, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Hazigarh R/S'},
    {id: 33, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Gurap R/S'},
    {id: 34, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Jhapandanga R/S'},
    {id: 35, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Jaugram R/S'},
    {id: 36, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Nabagram R/S'},
    {id: 37, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Masagram R/S'},
    {id: 38, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Chanchai R/S'},
    {id: 39, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Pallaroad R/S'},
    {id: 40, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Tarakeswar R/S'},
    {id: 41, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Lokenath R/S'},
    {id: 42, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Bahirkhanda R/S'},
    {id: 43, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Kaikala R/S'},
    {id: 44, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Haripal R/S'},
    {id: 45, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Malia Halt  R/S'},
    {id: 46, grpsName: 'Kamarkundu', grpName: 'Howrah', name: 'Nalikul R/S'},
    {id: 47, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Singur R/S '},
    {id: 48, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Nasibpur R/S'},
    {id: 49, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Diara R/S'},
    {id: 50, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Rishra R/S'},
    {id: 51, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Serampore R/S,'},
    {id: 52, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Sheoraphully R/S'},
    {id: 53, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Baidyabati R/S'},
    {id: 54, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Bhadreswar R/S'},
    {id: 55, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Mankundu R/S'},
    {id: 56, grpsName: 'Sheoraphully', grpName: 'Howrah', name: 'Chandannagr R/S'},
    {id: 57, grpsName: 'Bandel', grpName: 'Howrah', name: 'Chinsurah R/S'},
    {id: 58, grpsName: 'Bandel', grpName: 'Howrah', name: 'Hooghly R/S'},
    {id: 59, grpsName: 'Bandel', grpName: 'Howrah', name: 'Bandel R/S'},
    {id: 60, grpsName: 'Bandel', grpName: 'Howrah', name: 'Hooghly Ghat R/S'},
    {id: 61, grpsName: 'Bandel', grpName: 'Howrah', name: 'Garifa R/S '},
    {id: 62, grpsName: 'Bandel', grpName: 'Howrah', name: 'Bansberia R/S'},
    {id: 63, grpsName: 'Bandel', grpName: 'Howrah', name: 'Tribeni R/S'},
    {id: 64, grpsName: 'Bandel', grpName: 'Howrah', name: 'Islampara Halt R/S'},
    {id: 65, grpsName: 'Bandel', grpName: 'Howrah', name: 'Adisaptagram R/S'},
    {id: 66, grpsName: 'Bandel', grpName: 'Howrah', name: 'Magra R/S'},
    {id: 67, grpsName: 'Bandel', grpName: 'Howrah', name: 'Talandu R/S'},
    {id: 68, grpsName: 'Bandel', grpName: 'Howrah', name: 'Khanyan R/S'},
    {id: 69, grpsName: 'Bandel', grpName: 'Howrah', name: 'Pandua R/S'},
    {id: 70, grpsName: 'Bandel', grpName: 'Howrah', name: 'Simlagarh R/S '},
    {id: 71, grpsName: 'Bandel', grpName: 'Howrah', name: 'Bainchi Gram R/S'},
    {id: 72, grpsName: 'Bandel', grpName: 'Howrah', name: 'Bainchi R/S'},
    {id: 73, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Debipur R/S'},
    {id: 74, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Bagila R/S'},
    {id: 75, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Memari R/S'},
    {id: 76, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Nimo R/S'},
    {id: 77, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Rasulpur R/S'},
    {id: 78, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Palsit R/S'},
    {id: 79, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Saktigarh R/S'},
    {id: 80, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Gangpur R/S'},
    {id: 81, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Barddhaman Jn. R/S'},
    {id: 82, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Talit R/S'},
    {id: 83, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Khana Junction R/S'},
    {id: 84, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Galsi R/S'},
    {id: 85, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Paraj R/S'},
    {id: 86, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Mankar R/S'},
    {id: 87, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Jhapater Dhal R/S'},
    {id: 88, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Banpas R/S'},
    {id: 89, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Noadar Dhal R/S'},
    {id: 90, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Guskara R/S'},
    {id: 91, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Pichkurirdhal R/S'},
    {id: 92, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Bhedia R/S'},
    {id: 93, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Kamnara R/S'},
    {id: 94, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Kshetia R/S'},
    {id: 95, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Chamardighi R/S'},
    {id: 96, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Karjana R/S'},
    {id: 97, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Karjanagram R/S'},
    {id: 98, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Amarun R/S'},
    {id: 99, grpsName: 'Burdwan', grpName: 'Howrah', name: 'Bhatar R/S'},
    {id: 100, grpsName: 'Burdwan', grpName: 'Howrah',  name: 'Balgona R/S'},
    {id: 101, grpsName: 'Andal', grpName: 'Howrah', name: 'Panagarh R/S'},
    {id: 102, grpsName: 'Andal', grpName: 'Howrah', name: 'Rajbandh R/S'},
    {id: 103, grpsName: 'Andal', grpName: 'Howrah', name: 'Durgapur R/S'},
    {id: 104, grpsName: 'Andal', grpName: 'Howrah', name: 'Waria R/S'},
    {id: 105, grpsName: 'Andal', grpName: 'Howrah', name: 'Pandabeswar R/S'},
    {id: 106, grpsName: 'Andal', grpName: 'Howrah', name: 'Ukhra R/S'},
    {id: 107, grpsName: 'Andal', grpName: 'Howrah', name: 'Andal R/S'},
    {id: 108, grpsName: 'Andal', grpName: 'Howrah', name: 'Kajoragram R/S'},
    {id: 109, grpsName: 'Andal', grpName: 'Howrah', name: 'Sidhuli R/S'},
    {id: 110, grpsName: 'Andal', grpName: 'Howrah', name: 'Ikrah R/S'},
    {id: 111, grpsName: 'Andal', grpName: 'Howrah', name: 'Jamuria R/S'},
    {id: 112, grpsName: 'Andal', grpName: 'Howrah', name: 'Baraboni R/S'},
    {id: 113, grpsName: 'Andal', grpName: 'Howrah', name: 'Sonachara R/S'},
    {id: 114, grpsName: 'Andal', grpName: 'Howrah', name: 'Tapasi R/S'},
    {id: 115, grpsName: 'Andal', grpName: 'Howrah', name: 'Bhaktarnagar Halt R/S'},
    {id: 116, grpsName: 'Andal', grpName: 'Howrah', name: 'Raniganj R/S'},
    {id: 117, grpsName: 'Andal', grpName: 'Howrah', name: 'Nimcha Halt R/S'},
    {id: 118, grpsName: 'Asansol', grpName: 'Howrah', name: 'Barachak R/S'},
    {id: 119, grpsName: 'Asansol', grpName: 'Howrah', name: 'Kalipahari R/S'},
    {id: 120, grpsName: 'Asansol', grpName: 'Howrah', name: 'Asansol R/S'},
    {id: 121, grpsName: 'Asansol', grpName: 'Howrah', name: 'Burnpur R/S'},
    {id: 122, grpsName: 'Asansol', grpName: 'Howrah', name: 'Damodar R/S'},
    {id: 123, grpsName: 'Asansol', grpName: 'Howrah', name: 'Sitarampur R/S'},
    {id: 124, grpsName: 'Asansol', grpName: 'Howrah', name: 'Kulti R/S'},
    {id: 125, grpsName: 'Asansol', grpName: 'Howrah', name: 'Barakar R/S'},
    {id: 126, grpsName: 'Asansol', grpName: 'Howrah', name: 'Salanpur R/S'},
    {id: 127, grpsName: 'Asansol', grpName: 'Howrah', name: 'Rupnarayanpur R/S'},
    {id: 128, grpsName: 'Kalna', grpName: 'Howrah', name: 'Kuntighat R/S'},
    {id: 129, grpsName: 'Kalna', grpName: 'Howrah', name: 'Dumurdaha R/S'},
    {id: 130, grpsName: 'Kalna', grpName: 'Howrah', name: 'Khamargachi R/S'},
    {id: 131, grpsName: 'Kalna', grpName: 'Howrah', name: 'Jirat R/S'},
    {id: 132, grpsName: 'Kalna', grpName: 'Howrah', name: 'Balagarh R/S'},
    {id: 133, grpsName: 'Kalna', grpName: 'Howrah', name: 'Somrabazar R/S'},
    {id: 134, grpsName: 'Kalna', grpName: 'Howrah', name: 'Behula R/S'},
    {id: 135, grpsName: 'Kalna', grpName: 'Howrah', name: 'Guptipara R/S'},
    {id: 136, grpsName: 'Kalna', grpName: 'Howrah', name: 'Ambika Kalna R/S '},
    {id: 137, grpsName: 'Kalna', grpName: 'Howrah', name: 'Baghnapara R/S'},
    {id: 138, grpsName: 'Kalna', grpName: 'Howrah', name: 'Dhatrigram R/S'},
    {id: 139, grpsName: 'Kalna', grpName: 'Howrah', name: 'Nandai Gram Halt R/S'},
    {id: 140, grpsName: 'Kalna', grpName: 'Howrah', name: 'Samudragarh R/S'},
    {id: 141, grpsName: 'Kalna', grpName: 'Howrah', name: 'Kalinagar R/S'},
    {id: 142, grpsName: 'Kalna', grpName: 'Howrah', name: 'Nabadwip Dham R/S'},
    {id: 143, grpsName: 'Katwa', grpName: 'Howrah', name: 'Bishnupriya Halt R/S'},
    {id: 144, grpsName: 'Katwa', grpName: 'Howrah', name: 'Bhandertikuri R/S'},
    {id: 145, grpsName: 'Katwa', grpName: 'Howrah', name: 'Purbasthali R/S'},
    {id: 146, grpsName: 'Katwa', grpName: 'Howrah', name: 'Mertala Phaleya Halt R/S'},
    {id: 147, grpsName: 'Katwa', grpName: 'Howrah', name: 'Lakshmipur R/S'},
    {id: 148, grpsName: 'Katwa', grpName: 'Howrah', name: 'Belerhat Halt R/S'},
    {id: 149, grpsName: 'Katwa', grpName: 'Howrah', name: 'Patuli R/S'},
    {id: 150, grpsName: 'Katwa', grpName: 'Howrah', name: 'Agradwip R/S'},
    {id: 151, grpsName: 'Katwa', grpName: 'Howrah', name: 'Sahebtala Halt R/S'},
    {id: 152, grpsName: 'Katwa', grpName: 'Howrah', name: 'Dainhat R/S'},
    {id: 153, grpsName: 'Katwa', grpName: 'Howrah', name: 'Katwa R/S'},
    {id: 154, grpsName: 'Katwa', grpName: 'Howrah', name: 'Shripat Shrikhand R/S'},
    {id: 155, grpsName: 'Katwa', grpName: 'Howrah', name: 'Srikhanda R/S'},
    {id: 156, grpsName: 'Katwa', grpName: 'Howrah', name: 'Bankapasi R/S'},
    {id: 157, grpsName: 'Katwa', grpName: 'Howrah', name: 'Kaichar R/S'},
    {id: 158, grpsName: 'Katwa', grpName: 'Howrah', name: 'Nigan R/S'},
    {id: 159, grpsName: 'Katwa', grpName: 'Howrah', name: 'Saota R/S'},
    {id: 160, grpsName: 'Katwa', grpName: 'Howrah', name: 'Nabagram Kakurhati Halt R/S'},
    {id: 161, grpsName: 'Katwa', grpName: 'Howrah', name: 'Shiblun Halt R/S'},
    {id: 162, grpsName: 'Katwa', grpName: 'Howrah', name: 'Gangatikuri R/S'},
    {id: 163, grpsName: 'Katwa', grpName: 'Howrah', name: 'Ambalgram R/S'},
    {id: 164, grpsName: 'Katwa', grpName: 'Howrah', name: 'Pachandi R/S'},
    {id: 165, grpsName: 'Katwa', grpName: 'Howrah', name: 'Nirol Gram R/S'},
    {id: 166, grpsName: 'Katwa', grpName: 'Howrah', name: 'Nirol R/S'},
    {id: 167, grpsName: 'Katwa', grpName: 'Howrah', name: 'Komarpur R/S'},
    {id: 168, grpsName: 'Katwa', grpName: 'Howrah', name: 'Jnandas Kandra R/S'},
    {id: 169, grpsName: 'Katwa', grpName: 'Howrah', name: 'Kurmadanga R/S'},
    {id: 170, grpsName: 'Katwa', grpName: 'Howrah', name: 'Jhamatpur Baharan R/S'},
    {id: 171, grpsName: 'Katwa', grpName: 'Howrah', name: 'Salar R/S'},
    {id: 172, grpsName: 'Katwa', grpName: 'Howrah', name: 'Malihati Talibpur R/S'},
    {id: 173, grpsName: 'Katwa', grpName: 'Howrah', name: 'Tenya R/S'},
    {id: 174, grpsName: 'Katwa', grpName: 'Howrah', name: 'Miangram R/S'},
    {id: 175, grpsName: 'Katwa', grpName: 'Howrah', name: 'Bazarsau R/S'},
    {id: 176, grpsName: 'Katwa', grpName: 'Howrah', name: 'Kazipara Halt R/S'},
    {id: 177, grpsName: 'Katwa', grpName: 'Howrah', name: 'Chowrigacha R/S'},
    {id: 178, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Daskalgram R/S'},
    {id: 179, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Kirnahar R/S'},
    {id: 180, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Maheshpur R/S'},
    {id: 181, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Labpur R/S'},
    {id: 182, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Gopalpurgram R/S'},
    {id: 183, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Chowhatta R/S'},
    {id: 184, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Ahmadpur R/S'},
    {id: 185, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Bolpur R/S'},
    {id: 186, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Prantik R/S'},
    {id: 187, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Kopai R/S'},
    {id: 188, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Ahmedpur R/S '},
    {id: 189, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Bataspur R/S'},
    {id: 190, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Sainthia R/S'},
    {id: 191, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Gadadharpur R/S'},
    {id: 192, grpsName: 'Sainthia', grpName: 'Howrah', name: 'MollarpurR/S'},
    {id: 193, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Tarapith Road R/S'},
    {id: 194, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Rampurhat R/S '},
    {id: 195, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Swadhinpur R/S'},
    {id: 196, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Adalpahari R/S '},
    {id: 197, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Nalhati R/S'},
    {id: 198, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Chatra R/S'},
    {id: 199, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Murarai R/S'},
    {id: 200, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Banshlai Bridge R/S'},
    {id: 201, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Rajgram R/S'},
    {id: 202, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Lohapur R/S'},
    {id: 203, grpsName: 'Sainthia', grpName: 'Howrah', name: 'Takipur R/S'},
    {id: 204, grpsName: 'Suri', grpName: 'Howrah', name: 'Mahisadohari R/S'},
    {id: 205, grpsName: 'Suri', grpName: 'Howrah', name: 'Kunuri R/S'},
    {id: 206, grpsName: 'Suri', grpName: 'Howrah', name: 'Suri R/S'},
    {id: 207, grpsName: 'Suri', grpName: 'Howrah', name: 'Kachujor R/S'},
    {id: 208, grpsName: 'Suri', grpName: 'Howrah', name: 'Chinpai R/S'},
    {id: 209, grpsName: 'Suri', grpName: 'Howrah', name: 'Dubrajpur R/S'},
    {id: 210, grpsName: 'Suri', grpName: 'Howrah', name: 'Panchra R/S'},
    {id: 211, grpsName: 'Suri', grpName: 'Howrah', name: 'Bhimgara R/S'},
    {id: 212, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Kanthialia Road R/S'},
    {id: 213, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Karnasubarna R/S'},
    {id: 214, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Jibanti Halt R/S'},
    {id: 215, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Khagraghat Road R/S'},
    {id: 216, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Niyalishpara Halt R/S'},
    {id: 217, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Lalbaghcourt Road R/S'},
    {id: 218, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Dahaparadham Halt R/S'},
    {id: 219, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Azimganj Jn R/S'},
    {id: 220, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Azimganj City R/S'},
    {id: 221, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Gosaingram R/S'},
    {id: 222, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Barala R/S'},
    {id: 223, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Sagardighi R/S'},
    {id: 224, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Morgram R/S'},
    {id: 225, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Poradanga R/S'},
    {id: 226, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Mohipal Road R/S'},
    {id: 227, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Mohipal Halt R/S'},
    {id: 228, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Noapara Mahisasur Halt R/S'},
    {id: 229, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Monigram R/S'},
    {id: 230, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Gankar R/S'},
    {id: 231, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Jangipore Road R/S'},
    {id: 232, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Ahiran Halt R/S'},
    {id: 233, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Sujnipara R/S'},
    {id: 234, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Nimtita R/S'},
    {id: 235, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Basudebpur Halt R/S'},
    {id: 236, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Dhulianganga R/S'},
    {id: 237, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Sankopara Halt R/S'},
    {id: 238, grpsName: 'Azimganj', grpName: 'Howrah', name: 'Ballalpur Halt R/S'},
    {id: 239, name: ''},
    {id: 240, name: 'Sealdah R/S'},
    {id: 241, name: 'Park Circus R/S'},
    {id: 242, name: 'Bidhannagar R/S'},
    {id: 243, name: 'Sir Gurudas Banerjee Halt'},
    {id: 244, name: 'Dum Dum Jn.'},
    {id: 245, name: 'Dum Dum Cantt.'},
    {id: 246, name: 'Jessore Road'},
    {id: 247, name: 'Biman Bandar'},
    {id: 248, name: 'Belgharia'},
    {id: 249, name: 'Agarpara'},
    {id: 250, name: 'Sodpur'},
    {id: 251, name: 'Khardaha'},
    {id: 252, name: 'Titagarh'},
    {id: 253, name: 'Barrackpore'},
    {id: 254, name: 'Patipukur'},
    {id: 255, name: 'Kolkata Terminal'},
    {id: 256, name: 'Tala'},
    {id: 257, name: 'Bag Bazar'},
    {id: 258, name: 'Sovabazar'},
    {id: 259, name: 'Bara Bazar'},
    {id: 260, name: 'B.B.D. Bag'},
    {id: 261, name: 'Eden Gardens'},
    {id: 262, name: 'Prinsepghat'},
    {id: 263, name: 'Khidirpur'},
    {id: 264, name: 'Re-mount Road'},
    {id: 265, name: 'Palta'},
    {id: 266, name: 'Ichhapur'},
    {id: 267, name: 'Shyamnagar'},
    {id: 268, name: 'Jagaddal'},
    {id: 269, name: 'Kankinara'},
    {id: 270, name: 'Naihati Junction'},
    {id: 271, name: 'Halisahar'},
    {id: 272, name: 'Kanchrapara Workshop Gate'},
    {id: 273, name: 'Kanchrapara'},
    {id: 274, name: 'Kalyani'},
    {id: 275, name: 'Kalyani Shilpanchal'},
    {id: 276, name: 'Kalynai Ghoshpara'},
    {id: 277, name: 'Kalyani Simanta'},
    {id: 278, name: 'Madanpur'},
    {id: 279, name: 'Simurali'},
    {id: 280, name: 'Palpara'},
    {id: 281, name: 'Chakdaha'},
    {id: 282, name: 'Payradanga'},
    {id: 283, name: 'Ranaghat Junction'},
    {id: 284, name: 'Kalinarayanpur Jn.'},
    {id: 285, name: 'Habibpur'},
    {id: 286, name: 'Phulia'},
    {id: 287, name: 'Bathna Krittibas'},
    {id: 288, name: 'Santipur'},
    {id: 289, name: 'Bankimnagar'},
    {id: 290, name: 'Panchberia'},
    {id: 291, name: 'Aranghata'},
    {id: 292, name: 'Bahirgachhi'},
    {id: 293, name: 'Bhayna Halt'},
    {id: 294, name: 'Santinagar Halt'},
    {id: 295, name: 'Bagula'},
    {id: 296, name: 'Mayurhat Halt'},
    {id: 297, name: 'Taraknagar Halt'},
    {id: 298, name: 'Majdhia'},
    {id: 299, name: 'Banpur'},
    {id: 300, name: 'Harisnagar'},
    {id: 301, name: 'Gede'},
    {id: 302, name: 'Birnagar'},
    {id: 303, name: 'Taherpur'},
    {id: 304, name: 'Badkulla'},
    {id: 305, name: 'Jalalkhali Halt'},
    {id: 306, name: 'Krishnanagar City Jn.'},
    {id: 307, name: 'Dignagar Halt'},
    {id: 308, name: 'Bahadurpur halt'},
    {id: 309, name: 'Dhubulia'},
    {id: 310, name: 'Muragachha'},
    {id: 311, name: 'Bethuadahari'},
    {id: 312, name: 'Sonadanga'},
    {id: 313, name: 'Debogram'},
    {id: 314, name: 'Paglachandi'},
    {id: 315, name: 'Plassey'},
    {id: 316, name: 'Sirajnagar Halt'},
    {id: 317, name: 'Reginagr'},
    {id: 318, name: 'Beldanga'},
    {id: 319, name: 'Bhabta'},
    {id: 320, name: 'Sargachhi'},
    {id: 321, name: 'Balarampur Halt'},
    {id: 322, name: 'Berhampore Court'},
    {id: 323, name: 'Cossembazar'},
    {id: 324, name: 'Murshidabad'},
    {id: 325, name: 'Jiaganj'},
    {id: 326, name: 'Subarnamigi'},
    {id: 327, name: 'Bhagabangola'},
    {id: 328, name: 'Pirtala'},
    {id: 329, name: 'Krishnapur'},
    {id: 330, name: 'Lalgola'},
    {id: 331, name: 'Bamangachhi'},
    {id: 332, name: 'Duttapukur'},
    {id: 333, name: 'Bira'},
    {id: 334, name: 'Guma'},
    {id: 335, name: 'Ashoknagar Road'},
    {id: 336, name: 'Habra'},
    {id: 337, name: 'Sanhati Halt'},
    {id: 338, name: 'Machlandapur'},
    {id: 339, name: 'Gobardanga'},
    {id: 340, name: 'Thakurnagar'},
    {id: 341, name: 'Chandpara'},
    {id: 342, name: 'Bibhuti Bhushan Halt'},
    {id: 343, name: 'Bongaon'},
    {id: 344, name: 'Satberia'},
    {id: 345, name: 'Petrapole'},
    {id: 346, name: 'Coopers Halt'},
    {id: 347, name: 'Naba Raynagar'},
    {id: 348, name: 'Gagnapur'},
    {id: 349, name: 'Majhergram'},
    {id: 350, name: 'Akipur'},
    {id: 351, name: 'Gopalnagar'},
    {id: 352, name: 'Durganagar'},
    {id: 353, name: 'Birati'},
    {id: 354, name: 'Bisharpara Kodaliya'},
    {id: 355, name: 'New Barrackpore'},
    {id: 356, name: 'Madhyamgram'},
    {id: 357, name: 'Hridaypur'},
    {id: 358, name: 'Barasat Jn.'},
    {id: 359, name: 'Kazipara'},
    {id: 360, name: 'Karea Kadambagachhi'},
    {id: 361, name: 'Bahira Kalibari'},
    {id: 362, name: 'Sandalia'},
    {id: 363, name: 'Beliaghata Road'},
    {id: 364, name: 'Lebutala'},
    {id: 365, name: 'Bhasila'},
    {id: 366, name: 'Harua Road'},
    {id: 367, name: 'Kankra Mirzanagar'},
    {id: 368, name: 'Malatipur'},
    {id: 369, name: 'Ghoraras Ghona'},
    {id: 370, name: 'Champapukur'},
    {id: 371, name: 'Bhyabla'},
    {id: 372, name: 'Basirhat'},
    {id: 373, name: 'Matania Anantapur'},
    {id: 374, name: 'Madhyampur'},
    {id: 375, name: 'Nimdanri'},
    {id: 376, name: 'Taki road'},
    {id: 377, name: 'Hasnabad'},
    {id: 378, name: 'Ballygunge Jn.'},
    {id: 379, name: 'Dhakuria'},
    {id: 380, name: 'Lake Gardens'},
    {id: 381, name: 'Tollygunge'},
    {id: 382, name: 'New Alipur'},
    {id: 383, name: 'Majherhat'},
    {id: 384, name: ' Brace Bridge'},
    {id: 385, name: 'Santoshpur'},
    {id: 386, name: 'Akra'},
    {id: 387, name: 'Nungi'},
    {id: 388, name: 'Budge Budge'},
    {id: 389, name: 'Jadavpur'},
    {id: 390, name: 'Baghajatin'},
    {id: 391, name: 'New Garia'},
    {id: 392, name: 'Garia'},
    {id: 393, name: 'Narendrapur'},
    {id: 394, name: 'Sonarpur Jn.'},
    {id: 395, name: 'Subhasgram'},
    {id: 396, name: 'Mallickpur'},
    {id: 397, name: 'Bidyadharpur'},
    {id: 398, name: 'Kalikapur'},
    {id: 399, name: 'Champahati'},
    {id: 400, name: 'Piali'},
    {id: 401, name: 'Gourdaha'},
    {id: 402, name: 'Ghutiari Sarif'},
    {id: 403, name: 'Betberia Ghola'},
    {id: 404, name: 'Taldi'},
    {id: 405, name: 'Matla'},
    {id: 406, name: 'Canning'},
    {id: 407, name: 'Baruipur Jn.'},
    {id: 408, name: 'Kalyanpur'},
    {id: 409, name: 'Shasan Road'},
    {id: 410, name: 'Krishna Mohan'},
    {id: 411, name: 'Dhapdhapi'},
    {id: 412, name: 'Suryapur'},
    {id: 413, name: 'Gocharan'},
    {id: 414, name: 'Hogla'},
    {id: 415, name: 'Dakshin Barasat'},
    {id: 416, name: 'Baharu'},
    {id: 417, name: 'Joynagar-Majhilpur'},
    {id: 418, name: 'Mathurapur'},
    {id: 419, name: 'Madhabpur'},
    {id: 420, name: 'Lakshmikantapur'},
    {id: 421, name: 'Udairampur'},
    {id: 422, name: 'Kulpi'},
    {id: 423, name: 'Karanjali'},
    {id: 424, name: 'Nischindapur Market Halt'},
    {id: 425, name: 'Nischindapur'},
    {id: 426, name: 'Kashinagar'},
    {id: 427, name: 'Madhabnagar Halt'},
    {id: 428, name: 'Kakdwip'},
    {id: 429, name: 'Ukilerhat'},
    {id: 430, name: 'Namkhana'},
    {id: 431, name: 'Dakshin Durgapur'},
    {id: 432, name: 'Hotor'},
    {id: 433, name: 'Dhamuah'},
    {id: 434, name: 'Uttar Radhanagar'},
    {id: 435, name: 'Magrahat'},
    {id: 436, name: 'Bahirpuya Halt'},
    {id: 437, name: 'Sangrampur'},
    {id: 438, name: 'Deula'},
    {id: 439, name: 'Netra'},
    {id: 440, name: 'Basuldabga'},
    {id: 441, name: 'Gurudas Nagar'},
    {id: 442, name: 'Diamond Harbour'},
    {id: 443, name: 'Tildanga Rly. Station'},
    {id: 444, name: 'New Farakka Rly. Station '},
    {id: 445, name: 'Chama gram Rly. Station '},
    {id: 446, name: 'Khaltipur Rly. Station '},
    {id: 447, name: 'Jamairghata Rly. Station '},
    {id: 448, name: 'Gour Malda Rly. Station '},
    {id: 449, name: 'Malda town Rly. Station  '},
    {id: 450, name: 'Old Malda Jn. Rly. Station '},
    {id: 451, name: 'Adina Rly. Station '},
    {id: 452, name: 'Eklakhi Rly. Station '},
    {id: 453, name: 'Mahananda bridge Halt Rly. Station  '},
    {id: 454, name: 'Kumarganj Rly. Station '},
    {id: 455, name: 'Sripur Halt Rly. Station '},
    {id: 456, name: 'Samsi Rly. Station '},
    {id: 457, name: 'Malahar Halt Rly. Station '},
    {id: 458, name: 'Bhaluka Road Rly. Station '},
    {id: 459, name: 'Milan Garh Rly. Station '},
    {id: 460, name: 'Harishchandrapur Rly. Station '},
    {id: 461, name: 'Kumedpur Rly. Station  '},
    {id: 462, name: 'Dalkhola Rly. Station  '},
    {id: 463, name: 'Surjakamal Rly. Station  '},
    {id: 464, name: 'Kanki Rly. Station  '},
    {id: 465, name: 'Hatwar Rly. Station '},
    {id: 466, name: 'Panjipara Rly. Station  '},
    {id: 467, name: 'Ikarchala Rly. Station  '},
    {id: 468, name: 'Gaisal Rly. Station '},
    {id: 469, name: 'Gunjaria Rly. Station '},
    {id: 470, name: 'Aluabari Road Rly. Station  '},
    {id: 471, name: 'Tinmile Hat Rly. Station  '},
    {id: 472, name: 'Dumdangi Rly. Station  '},
    {id: 473, name: 'Chatterhat Rly. Station  '},
    {id: 474, name: 'Nijbari Rly. Station '},
    {id: 475, name: 'Rangapani Rly. Station '},
    {id: 476, name: 'New Jalpaiguri Rly. Station  '},
    {id: 477, name: 'Ambari Falakata Rly. Station  '},
    {id: 478, name: 'Belacoba Rly. Station  '},
    {id: 479, name: 'Raninagar Rly. Station '},
    {id: 480, name: 'Jalpaiguri Road Rly. Station '},
    {id: 481, name: 'New Domohani Rly. Station  '},
    {id: 482, name: 'New Maynaguri Rly. Station  '},
    {id: 483, name: 'Betgara Rly. Station '},
    {id: 484, name: 'Altagram Rly. Station  '},
    {id: 485, name: 'Dhupguri Rly. Station '},
    {id: 486, name: 'Kholaigram Rly. Station  '},
    {id: 487, name: 'Salbari Rly. Station  '},
    {id: 488, name: 'Falakata Rly. Station '},
    {id: 489, name: 'Gumanihat Rly. Station  '},
    {id: 490, name: 'Ghoksadanga Rly. Station '},
    {id: 491, name: 'Sajerpar Rly. Station  '},
    {id: 492, name: 'Pundibari Rly. Station  '},
    {id: 493, name: 'New Cooch Behar Rly. Station  '},
    {id: 494, name: 'New Baneswer Rly. Station  '},
    {id: 495, name: 'New Alipurduar Rly. Station  '},
    {id: 496, name: 'Samuktala Road Rly. Station '},
    {id: 497, name: 'Kamakhyaguri Rly. Station  '},
    {id: 498, name: 'Jorai Rly. Station  '},
    {id: 499, name: 'Baneswar Rly. Station  '},
    {id: 500, name: 'Alipurduar Rly. Station  '},
    {id: 501, name: 'Alipurduar Court Rly. Station  '},
    {id: 502, name: 'Alipurduar Jn. Rly. Station  '},
    {id: 503, name: 'Coochbehar Rly. Station  '},
    {id: 504, name: 'Dewanhat Rly. Station '},
    {id: 505, name: 'Vetaguri Rly. Station '},
    {id: 506, name: 'Dinhata College Halt Rly. Station  '},
    {id: 507, name: 'Dinhata  Rly. Station  '},
    {id: 508, name: 'Falimari Rly. Station '},
    {id: 509, name: 'New Gitaldah Rly. Station  '},
    {id: 510, name: 'Abutara Halt Rly. Station  '},
    {id: 511, name: 'Bamanhat Rly. Station '},
    {id: 512, name: 'Ambari Falakata Rly. Station  '},
    {id: 513, name: 'Belacoba Rly. Station  '},
    {id: 514, name: 'Raninagar Rly. Station '},
    {id: 515, name: 'Jalpaiguri Road Rly. Station '},
    {id: 516, name: 'Ambari Falakata Rly. Station  '},
    {id: 517, name: 'Belacoba Rly. Station  '},
    {id: 518, name: 'Raninagar Rly. Station '},
    {id: 519, name: 'Mohitnagar Rly. Station '},
    {id: 520, name: 'Jalpaiguri Rly. Station '},
    {id: 521, name: 'Kadobari Halt Rly. Station '},
    {id: 522, name: 'Mandalghat Rly. Station '},
    {id: 523, name: 'Nandanpur Kererpara Halt. Rly. Station '},
    {id: 524, name: 'Kashiabari Halt Rly. Station '},
    {id: 525, name: 'Haldibari Rly. Station '},
    {id: 526, name: 'Adhikari Rly. Station'},
    {id: 527, name: 'Batasi Rly. Station'},
    {id: 528, name: 'Naxalbari Rly. Station'},
    {id: 529, name: 'Hatighisa Rly. Station'},
    {id: 530, name: 'Bagdogra Rly. Station'},
    {id: 531, name: 'Matigara Rly. Station'},
    {id: 532, name: 'Siliguri Jn. Rly. Station'},
    {id: 533, name: 'Gulma Rly. Station'},
    {id: 534, name: 'Sevoke Rly. Station'},
    {id: 535, name: 'Bagrakote Rly. Station'},
    {id: 536, name: 'Odlabari Rly. Station'},
    {id: 537, name: 'Damdim Rly. Station'},
    {id: 538, name: 'New Mal Jn. Rly. Station'},
    {id: 539, name: 'Chalsa Jn. Rly. Station'},
    {id: 540, name: 'Nagarkata Rly. Station'},
    {id: 541, name: 'Carron Rly. Station'},
    {id: 542, name: 'Chengmari Rly. Station'},
    {id: 543, name: 'Banarhat Rly. Station'},
    {id: 544, name: 'Binnaguri Rly. Station'},
    {id: 545, name: 'Dalgaon  Rly. Station'},
    {id: 546, name: 'Mujnai Rly. Station'},
    {id: 547, name: 'Madarihat Rly. Station'},
    {id: 548, name: 'Hasimara Rly. Station  '},
    {id: 549, name: 'Hamiltonganj Rly. Station '},
    {id: 550, name: 'Kalchini Rly. Station  '},
    {id: 551, name: 'Garopara Rly. Station '},
    {id: 552, name: 'Rajabhatkhawa Rly. Station '},
    {id: 553, name: 'Damanpur Rly. Station '},
    {id: 554, name: 'Alipurduar jn. Rly. Station  '},
    {id: 555, name: 'Alipurduar College  Rly. Station  '},
    {id: 556, name: 'Salsalabari Rly. Station  '},
    {id: 557, name: 'Samuktala Road Rly. Station '},
    {id: 558, name: 'Kamakhyaguri Rly. Station  '},
    {id: 559, name: 'Jorai Rly. Station  '},
    {id: 560, name: 'Siliguri Town Rly. Station  '},
    {id: 561, name: 'Jitkia Rly. Station '},
    {id: 562, name: 'Raiganj Rly. Station '},
    {id: 563, name: 'Bamangram Rly. Station '},
    {id: 564, name: 'Bangalbari Rly. Station '},
    {id: 565, name: 'Kaliaganj Rly. Station '},
    {id: 566, name: 'Damilgaon Rly. Station '},
    {id: 567, name: 'Radhikapur Rly. Station '},
    {id: 568, name: 'Old Malda Jn. Rly. Station '},
    {id: 569, name: 'Adina Rly. Station '},
    {id: 570, name: 'Eklakhi Rly. Station '},
    {id: 571, name: 'Gazole Rly. Station '},
    {id: 572, name: 'Mahanagar Rly. Station '},
    {id: 573, name: 'Deotala Rly. Station '},
    {id: 574, name: 'Daulatpur Rly. Station '},
    {id: 575, name: 'Buniadpur Rly. Station '},
    {id: 576, name: 'Gangarampur Rly. Station '},
    {id: 577, name: 'Malancha Rly. Station '},
    {id: 578, name: 'Rampur bazar Rly. Station '},
    {id: 579, name: 'Mallickpur Hat Rly. Station '},
    {id: 580, name: 'Balurghat Rly. Station '},
    {id: 581, name: 'Old Malda Jn. Rly. Station '},
    {id: 582, name: 'Malda Court Rly. Station '},
    {id: 583, name: 'Singhabad Rly. Station '},
    {id: 584, name: 'Shalimar R/S '},
    {id: 585, name: 'Padmapukhur R/S'},
    {id: 586, name: 'Dasnagar R/S'},
    {id: 587, name: 'Ramrajatala R/S'},
    {id: 588, name: 'Santragachi R/S'},
    {id: 589, name: 'Mourigram R/S'},
    {id: 590, name: 'Andul R/S'},
    {id: 591, name: 'Sankrail R/S'},
    {id: 592, name: 'Abada R/S'},
    {id: 593, name: 'Nalpur R/S'},
    {id: 594, name: 'Bauria R/S'},
    {id: 595, name: 'Chengail R/S'},
    {id: 596, name: 'Fuleswar R/S'},
    {id: 597, name: 'Uluberia R/S'},
    {id: 598, name: 'Birshibpur R/S'},
    {id: 599, name: 'Kulgachia R/S'},
    {id: 600, name: 'Bagnan R/S'},
    {id: 601, name: 'Ghoraghata R/S'},
    {id: 602, name: 'Deulti R/S'},
    {id: 603, name: 'Kolaghat R/S'},
    {id: 604, name: 'Mecheda R/S'},
    {id: 605, name: 'Nandai gajan R/S'},
    {id: 606, name: 'Bhogpur R/S'},
    {id: 607, name: 'Narayan Pakuria Murail R/S'},
    {id: 608, name: 'Panskura R/S'},
    {id: 609, name: 'Khirai Halt R/S'},
    {id: 610, name: 'Haur R/S'},
    {id: 611, name: 'Raghunathbari R/S'},
    {id: 612, name: 'Rajgoda R/S'},
    {id: 613, name: 'Sahid Matangini Halt R/S'},
    {id: 614, name: 'Tamluk R/S'},
    {id: 615, name: 'Keshabpur R/S'},
    {id: 616, name: 'Satish Samanta Halt R/S'},
    {id: 617, name: 'Mahisadal R/S'},
    {id: 618, name: 'Barda R/S'},
    {id: 619, name: 'Basulia Sutahata R/S'},
    {id: 620, name: 'Durgachak  R/S'},
    {id: 621, name: 'Durgachak Town Halt R/S'},
    {id: 622, name: 'Bandar Halt R/S'},
    {id: 623, name: 'Haldia R/S'},
    {id: 624, name: 'Nandakumar R/S'},
    {id: 625, name: 'Laban Satyagrah Smarak Halt R/S'},
    {id: 626, name: 'Deshapran R/S'},
    {id: 627, name: 'Henria Halt R/S'},
    {id: 628, name: 'Nachinda Halt R/S'},
    {id: 629, name: 'Kanthi R/S'},
    {id: 630, name: 'Shitalpur Halt R/S'},
    {id: 631, name: 'Sujalpur Halt R/S '},
    {id: 632, name: 'Ashapurnadevi Halt R/S'},
    {id: 633, name: 'Badalpur Halt R/S'},
    {id: 634, name: 'Ramnagar R/S'},
    {id: 635, name: 'Tikra Halt R/S'},
    {id: 636, name: 'Digha R/S'},
    {id: 637, name: 'Radhamohanpur R/S'},
    {id: 638, name: 'Duan Halt R/S'},
    {id: 639, name: 'Balichak R/S'},
    {id: 640, name: 'Shyamchak R/S'},
    {id: 641, name: 'Madpur R/S'},
    {id: 642, name: 'Jakpur R/S'},
    {id: 643, name: 'Kharagpur R/S'},
    {id: 644, name: 'Hizli  R/S'},
    {id: 645, name: 'Benapur R/S'},
    {id: 646, name: 'Narayangarh R/S'},
    {id: 647, name: 'Bakrabad R/S'},
    {id: 648, name: 'Belda R/S'},
    {id: 649, name: 'Nekurshrini R/S'},
    {id: 650, name: 'Dantan R/S'},
    {id: 651, name: 'Angua R/S'},
    {id: 652, name: 'Nimpura Yard Halt R/S'},
    {id: 653, name: 'Kalaikunda R/S'},
    {id: 654, name: 'Girimaidan R/S'},
    {id: 655, name: 'Gokulpur R/S'},
    {id: 656, name: 'Cassai Halt R/S'},
    {id: 657, name: 'Midnapur R/S'},
    {id: 658, name: 'Khemashuli R/S'},
    {id: 659, name: 'Sardiha R/S'},
    {id: 660, name: 'Banshtola Halt R/S'},
    {id: 661, name: 'Jhargram R/S'},
    {id: 662, name: 'Khatkhura Halt R/S'},
    {id: 663, name: 'Gidhni R/S'},
    {id: 664, name: 'Bhadutola Halt  R/S'},
    {id: 665, name: 'Godapiyasal R/S'},
    {id: 666, name: 'Salboni R/S'},
    {id: 667, name: 'C.K.Road R/S'},
    {id: 668, name: 'Garbeta R/S'},
    {id: 669, name: 'Bogri Road Halt R/S'},
    {id: 670, name: 'Piyardoba R/S'},
    {id: 671, name: 'Bishnupur R/S'},
    {id: 672, name: 'Ramsagar R/S'},
    {id: 673, name: 'Ondagram R/S'},
    {id: 674, name: 'Kalisen Halt R/S'},
    {id: 675, name: 'Bheduasole Halt R/S'},
    {id: 676, name: 'Bankura R/S'},
    {id: 677, name: 'Anchuri Halt R/S'},
    {id: 678, name: 'Chatna R/S'},
    {id: 679, name: 'Jhantipahari R/S'},
    {id: 680, name: 'Bikna Halt R/S'},
    {id: 681, name: 'Nabanda Halt R/S'},
    {id: 682, name: 'Belboni Halt R/S'},
    {id: 683, name: 'Beliatore Halt R/S'},
    {id: 684, name: 'Chandar Halt R/S'},
    {id: 685, name: 'Brindabanpur Halt R/S'},
    {id: 686, name: 'Srirampur Halt R/S'},
    {id: 687, name: 'Hamirhati Halt R/S'},
    {id: 688, name: 'Sonamukhi R/S'},
    {id: 689, name: 'Dhansimla Halt R/S'},
    {id: 690, name: 'Dhagaria Halt R/S'},
    {id: 691, name: 'Patrasayar Halt R/S'},
    {id: 692, name: 'Betur Halt R/S'},
    {id: 693, name: 'Kumrul Halt R/S'},
    {id: 694, name: 'Indas Halt R/S'},
    {id: 695, name: 'Shankrul Halt R/S'},
    {id: 696, name: 'Sahaspur Halt R/S'},
    {id: 697, name: 'Bowaichandi Halt R/S'},
    {id: 698, name: 'Guir saranga Halt '},
    {id: 699, name: 'Kaiyar Halt'},
    {id: 700, name: 'Sehara Bazar Halt,'},
    {id: 701, name: 'Gopinathpur Halt'},
    {id: 702, name: 'Shyamsundarpur Halt'},
    {id: 703, name: 'Rainagar Halt'},
    {id: 704, name: 'Srijam R/S'},
    {id: 705, name: 'Indrabil R/S'},
    {id: 706, name: 'Metal Sahar R/S'},
    {id: 707, name: 'Adra R/S'},
    {id: 708, name: 'Gardhrubeswar R/S'},
    {id: 709, name: 'Joychandi pahar R/S'},
    {id: 710, name: 'Bero R/S'},
    {id: 711, name: 'Ramkanali R/S'},
    {id: 712, name: 'Murardihi  R/S'},
    {id: 713, name: 'Madhukunda R/S'},
    {id: 714, name: 'Sanka R/S'},
    {id: 715, name: 'Rukni R/S'},
    {id: 716, name: 'Santaldihi R/S'},
    {id: 717, name: 'Anara R/S'},
    {id: 718, name: 'Bagalia R/S'},
    {id: 719, name: 'Kustaur R/S'},
    {id: 720, name: 'Chharrah R/S'},
    {id: 721, name: 'Purulia R/S'},
    {id: 722, name: 'Tamna R/S'},
    {id: 723, name: 'Kantadihi R/S'},
    {id: 724, name: 'Urma R/S'},
    {id: 725, name: 'Barabhum R/S'},
    {id: 726, name: 'Biramdih R/S'},
    {id: 727, name: 'Gourinath Dham R/S'},
    {id: 728, name: 'Chas Road Halt R/S'},
    {id: 729, name: 'Gar Jaipur Halt R/S'},
    {id: 730, name: 'Barbendia Halt R/S'},
    {id: 731, name: 'Kotsila R/S'},
    {id: 732, name: 'Begunkodar Halt  R/S'},
    {id: 733, name: 'Jhalda R/S'},
    {id: 734, name: 'Tulin R/S'},
    {id: 735, name: 'Damrughutu Halt R/S'},
    {id: 736, name: 'Pundag R/S'},
    {id: 737, name: 'Illoo R/S'},
    {id: 738, name: 'Torang R/S'},
    {id: 739, name: 'Suisa R/S'}
];

non_local_trains = [
  {id: 1, name: '13021 UP - Mithila Express'},
  {id: 2, name: '11448 UP - Saktipunj Express'},
  {id: 3, name: '15959 UP - Kamrup Express'},
  {id: 4, name: '12369 UP - Haridwar (Kumbha) Exp'},
  {id: 5, name: '12327 UP - Upasana Express'},
  {id: 6, name: '13009 UP - Doon Exp'},
  {id: 7, name: '12351 UP - Danapur Exp'},
  {id: 8, name: '12333 UP - Vibhuti Exp'},
  {id: 9, name: '12311 UP - Kalka Mail (Netaji Exp.)'},
  {id: 10, name: '12307 UP - Jodhpur Exp'},
  {id: 11, name: '12301 UP - Rajdhani Exp'},
  {id: 12, name: '12305 UP - Rajdhani Exp'},
  {id: 13, name: '12323 UP - Anand Bihar (Barmar) Exp.'},
  {id: 14, name: '15271 UP - Muzafarpur - HWH Janasadharan Exp.'},
  {id: 15, name: '22912 UP - Shipra Exp.'},
  {id: 16, name: '12177 UP - Chambal Exp.'},
  {id: 17, name: '12175 UP - Chambal Exp.'},
  {id: 18, name: '13071 UP - Jamalpur Exp.'},
  {id: 19, name: '13023 UP - Gaya Exp'},
  {id: 20, name: '15711 UP - KIR-HWH Exp.'},
  {id: 21, name: '12303 UP - HWH-New Delhi Poorva Exp.'},
  {id: 22, name: '13025 UP - Bhopal Exp.'},
  {id: 23, name: '12371 UP - HWH-Jaishalmir Exp.'},
  {id: 24, name: '12353 UP - HWH-LUK Exp.'},
  {id: 25, name: '13005 UP - Amritsar Mail'},
  {id: 26, name: '12331 UP - Himgiri Exp.'},
  {id: 27, name: '13019 UP - Bagh Exp'},
  {id: 28, name: '12273 UP - NDLS Duronto Exp.'},
  {id: 29, name: '22387 UP - Black-Diamond Express'},
  {id: 30, name: '12019 UP - Ranchi-HWH Satabdi Exp.'},
  {id: 31, name: '12041 UP - HWH- NJP Satabdi Exp.'},
  {id: 32, name: '12863 UP - Yesvantpur-Howrah Exp.'},
  {id: 33, name: '12870 UP - CSTM-HWH Exp.'},
  {id: 34, name: '12871 UP - Sambalpur (Ispat) Exp'},
  {id: 35, name: '22817 UP - HWH-MYS Exp.'},
  {id: 36, name: '12073 UP - HWH-Bhubneswar Shatabdi Exp.'},
  {id: 37, name: '12130 UP - Azad Hind Exp.'},
  {id: 38, name: '12222 UP - Pune-HWH Duranto Exp'},
  {id: 39, name: '12245 UP - HWH-SMVT Bengaluru Duranto Exp.'},
  {id: 40, name: '12262 UP - HWH-Mumbai Duranto Exp.'},
  {id: 41, name: '12277 UP - HWH-Puri Shatabdi to Exp.'},
  {id: 42, name: '12663 UP - TPJ-HWH Exp.'},
  {id: 43, name: '12665 UP - Kanyakumari Exp.'},
  {id: 44, name: '12703 UP - Falaknuma Exp.'},
  {id: 45, name: '12810 UP - Mumbai Mail'},
  {id: 46, name: '12834 UP - Ahemedabad-Howrah Exp.'},
  {id: 47, name: '12837 UP - Puri Exp.'},
  {id: 48, name: '12839 UP - HWH-MAS Mail'},
  {id: 49, name: '12860 UP - Gitanjali Exp.'},
  {id: 50, name: '12345 UP - Saraighat Exp.'},
  {id: 51, name: '18013 UP - Bokaro Steel City Exp.'},
  {id: 52, name: '18011 UP - Chakradharpur Exp.'},
  {id: 53, name: '12021 UP - Barbil Jan Shatabdi Exp.'},
  {id: 54, name: '22861 UP - Kantabanji Ispat Exp.'},
  {id: 55, name: '12857 UP - Tamralipta Exp.'},
  {id: 56, name: '22897 UP - Kandari Exp.'},
  {id: 57, name: '22863 UP - SMVT Bengaluru AC SF Exp.'},
  {id: 58, name: '22887 UP - SMVT Bengaluru Humsafar Exp.'},
  {id: 59, name: '20889 UP - Tirupati Humsafar Exp.'},
  {id: 60, name: '22891 UP - Ranchi Intercity Exp.'},
  {id: 61, name: '18627 UP - Ranchi Intercity Exp.'},
  {id: 62, name: '22894 UP - Sainagar Shirdi SF Exp.'},
  {id: 63, name: '22877 UP - Ernakulam Antoydaya Exp.'},
  {id: 64, name: '22831 UP - Sri Sathya Sai Prashanthi Nilayam SF Exp.'},
  {id: 65, name: '18043 UP - Bagha Jatain Exp.'},
  {id: 66, name: '12827 UP - Purulia SF Exp.'},
  {id: 67, name: '12813 UP - Steel Exp.'},
  {id: 68, name: '18003 UP - Rani Shiromoni Exp.'},
  {id: 69, name: '18615 UP - Kriya Yoga Exp.'},
  {id: 70, name: '18005 UP - Sambaleswari Exp.'},
  {id: 71, name: '12867 UP - Puducherry SF Exp'},
  {id: 72, name: '12381 UP - Poorva Exp'},
  {id: 73, name: '15235 UP - Darbhanga weekly Exp'},
  {id: 74, name: '12023 UP - Patna Jan Shatabdi Exp'},
  {id: 75, name: '12339 UP - Coal field Exp'},
  {id: 76, name: '20975 UP - Agra cantt. Chambal Exp'},
  {id: 77, name: '12341 UP - Agnibina Exp'},
  {id: 78, name: '13043 UP - Howrah Raxul Exp'},
  {id: 79, name: '12938 UP - Garba SF Exp'},
  {id: 80, name: '13029 UP - Howrah Mokama Exp'},
  {id: 81, name: '22307 UP - Bikaner SF Exp'},
  {id: 82, name: '12321 UP - Howrah Mumbai CSMT Mail'},
  {id: 83, name: '13017 UP - Ganadevata Exp'},
  {id: 84, name: '13063 UP - Balurghat Exp'},
  {id: 85, name: '13465 UP - Malda Town Intercity Exp'},
  {id: 86, name: '03003 UP - Azimganj SPL Exp'},
  {id: 87, name: '15961 UP - Kamrup Express'},
  {id: 88, name: '13033 UP - Howrah Katihar Exp'},
  {id: 89, name: '13027 UP - Azimganj Kaviguru Exp'},
  {id: 90, name: '03027 UP - NJP SPL'},
  {id: 91, name: '13053 UP - Kulik Exp'},
  {id: 92, name: '13015 UP - Jamalpur Kaviguru Exp'},
  {id: 93, name: '13031 UP - Howrah Jaynagar Exp'},
  {id: 94, name: '12347 UP - Sahid Exp'},
  {id: 95, name: '13011 UP - Malda Town Intercity Exp'},
  {id: 96, name: '13045 UP - Mayurakshi Exp'},
  {id: 97, name: '03047 UP - Viswabharati Fast Passenger'},
  {id: 98, name: '12337 UP - Shantiniketan Exp'},
  {id: 99, name: '22321 UP - Hool Exp'},
  {id: 100, name: '12864 DN - Yesvantpur-Howrah Exp.'},
  {id: 101, name: '12869 DN - CSTM-HWH Exp.'},
  {id: 102, name: '12872 DN - Sambalpur (Ispat) Exp'},
  {id: 103, name: '22818 DN - HWH-MYS Exp.'},
  {id: 104, name: '12074 DN - HWH-Bhubneswar Shatabdi Exp.'},
  {id: 105, name: '12129 DN - Azad Hind Exp.'},
  {id: 106, name: '12221 DN - Pune-HWH Duranto Exp'},
  {id: 107, name: '12246 DN - HWH-YPR Duranto Exp.'},
  {id: 108, name: '12261 DN - HWH-Mumbai Duranto Exp.'},
  {id: 109, name: '12278 DN - HWH-Puri Shatabdi to Exp.'},
  {id: 110, name: '12664 DN - TPJ-HWH Exp.'},
  {id: 111, name: '12666 DN - Kanyakumari Exp.'},
  {id: 112, name: '12704 DN - Falaknuma Exp.'},
  {id: 113, name: '12809 DN - Mumbai Mail (Via- Nagpur)'},
  {id: 114, name: '12833 DN - Ahemedabad-Howrah Exp.'},
  {id: 115, name: '12838 DN - Puri Exp.'},
  {id: 116, name: '12840 DN - HWH-MAS Mail'},
  {id: 117, name: '12859 DN - Gitanjali Exp.'},
  {id: 118, name: '12346 DN - Saraighat Exp.'},
  {id: 119, name: '13404 DN - Bananchal Express'},
  {id: 120, name: '15227 DN - Yesvantpur -Majaffarpur Exp.'},
  {id: 121, name: '15644 DN - Kamakhya-HWH- Puri Exp.'},
  {id: 122, name: '12254 DN - BGP-YPR Anga Exp.'},
  {id: 123, name: '12508 DN - SCL- TVC Exp.'},
  {id: 124, name: '12510 DN - GHY-SBC Exp.'},
  {id: 125, name: '12514 DN - GHY-SC Exp.'},
  {id: 126, name: '12516 DN - Gouhati - Trivandram Coimbatore Exp.'},
  {id: 127, name: '15640 DN - Kamakha- Puri Exp.'},
  {id: 128, name: '22201 - Sealdah Puri Duronto Spl.'},
  {id: 129, name: '12313 - Rajdhani Exp.'},
  {id: 130, name: '13185 - Ganga Sagar Express'},
  {id: 131, name: '13175 - Kanchanjunga Exp.'},
  {id: 132, name: '13163 - Hateybazarey'},
  {id: 133, name: '13105 - BALIA Exp.'},
  {id: 134, name: '12259 - Duranta Exp.'},
  {id: 135, name: '12329 - Samparkranti'},
  {id: 136, name: '12987 - Ajmeersharif Exp.'},
  {id: 137, name: '12379 - Jallianwala Bagh Exp.'},
  {id: 138, name: '22317 - Humsafar Express'},
  {id: 139, name: '12343 - Darjeeling Mail'},
  {id: 140, name: '13141 - Tista Torsha Express'},
  {id: 141, name: '13173 - Kanchanjunga Exp.'},
  {id: 142, name: '13103 - Bhagirathi Express'},
  {id: 143, name: '13169 - Hatey bazarey'},
  {id: 144, name: '12377 - Padatik Express'},
  {id: 145, name: '13153 - Gour Express'},
  {id: 146, name: '13187 - Maa Tara Express'},
  {id: 147, name: '13147 - Uttarbanga Express'},
  {id: 148, name: '13149 - Kanchankannya Exp.'},
  {id: 149, name: '12383 - Asansol Inter City express'},
  {id: 150, name: '13179 - Suri Express'},
  {id: 151, name: '22197 - V.G.L.B. Express'},
  {id: 152, name: '12325 - Nangaldam Express'},
  {id: 153, name: '12317 - Akaltakt Express'},
  {id: 154, name: '13181 - Silghat Express'},
  {id: 155, name: '15233 - Darvanga Express'},
  {id: 156, name: '19607 - Ajmir/Madar Express'},
  {id: 157, name: '13137 - Azamgar Express'},
  {id: 158, name: '13151 - Jammu Tawai Express'},
  {id: 159, name: '12357 - Durgiyana Amritsar Express'},
  {id: 160, name: '13167 - Agtra Cant Express'},
  {id: 161, name: '12319 - Agtra Cant Express'},
  {id: 162, name: '19413 - Amedabad Express'},
  {id: 163, name: '12315 - Ananya Express'},
  {id: 164, name: '15047 - Purbanchal Express'},
  {id: 165, name: '15049 - Purbanchal Express'},
  {id: 166, name: '15051 - Purbanchal Express'},
  {id: 167, name: '12359 - Patna Garibrath Express'},
  {id: 168, name: '13121 - Shabdha Bedi/Gazipur Express'},
  {id: 169, name: '13159 - Jogabani Express'},
  {id: 170, name: '13157 - Trihut Express'},
  {id: 171, name: '13155 - Sitamari/Darvhanga/Mithilanchal Express'},
  {id: 172, name: '13135 - Jaynagar Express'},
  {id: 173, name: '12496 - Bikenar Pratap Express'},
  {id: 174, name: '13165 - Sitamari Express'},
  {id: 175, name: '22323 - Gazipur City Express'},
  {id: 176, name: '13113 - Hazarduari Express'},
  {id: 177, name: '13161 - Tebhaga Express'},
  {id: 178, name: '13117 - Dhanadhannya Express'},
  {id: 179, name: '13145 - Radhikapur Express'},
  {id: 180, name: '12363 - Inter City Express'},
  {id: 181, name: '13108 - Moitree Express'},
  {id: 182, name: '13109 - Moitree Express'},
  {id: 183, name: '13129 - Bandhan Express'},
  {id: 184, name: '02517 - Kolkata Gouhati Agartala Express'},
  {id: 185, name: '22202 - Sealdah Puri Duronto Spl.'},
  {id: 186, name: '12314 - Rajdhani Exp.'},
  {id: 187, name: '13186 - Ganga Sagar Express'},
  {id: 188, name: '13174 - Kanchanjunga Exp.'},
  {id: 189, name: '13164 - Hateybazarey'},
  {id: 190, name: '13106 - Balia Exp.'},
  {id: 191, name: '12260 - Duranta Exp.'},
  {id: 192, name: '12330 - Samparkranti'},
  {id: 193, name: '12988 - Ajmeersharif Exp.'},
  {id: 194, name: '12380 - Jallianwala Bagh Exp.'},
  {id: 195, name: '22318 - Humsafar Express'},
  {id: 196, name: '13176 - Silchar Express'},
  {id: 197, name: '22198 - V.G.L.B. Express'},
  {id: 198, name: '12326 - Nangaldam Express'},
  {id: 199, name: '12318 - Akaltakt Express'},
  {id: 200, name: '13182 - Silghat Express'},
  {id: 201, name: '15234 - Darvanga Express'},
  {id: 202, name: '19608 - Ajmir/Madar Express'},
  {id: 203, name: '13138 - Azamgar Express'},
  {id: 204, name: '13152 - Jammu Tawai Express'},
  {id: 205, name: '12358 - Durgiyana Amritsar Express'},
  {id: 206, name: '13168 - Agtra Cant Express'},
  {id: 207, name: '12320 - Agtra Cant Express'},
  {id: 208, name: '19414 - Amedabad Express'},
  {id: 209, name: '12316 - Ananya Express'},
  {id: 210, name: '15048 - Purbanchal Express'},
  {id: 211, name: '15050 - Purbanchal Express'},
  {id: 212, name: '15052 - Purbanchal Express'},
  {id: 213, name: '12360 - Patna Garibrath Express'},
  {id: 214, name: '13122 - Shabdha Bedi/Gazipur Express'},
  {id: 215, name: '13160 - Jogabani Express'},
  {id: 216, name: '13158 - Trihut Express'},
  {id: 217, name: '13156 - Sitamari/Darvhanga/Mithilanchal Express'},
  {id: 218, name: '13136 - Jaynagar Express'},
  {id: 219, name: '12495 - Bikenar Pratap Express'},
  {id: 220, name: '13166 - Sitamari Express'},
  {id: 221, name: '22324 - Gazipur City Express'},
  {id: 222, name: '15769 - Lamding Intercity Exp.'},
  {id: 223, name: '15753 - Sifhung Exp.'},
  {id: 224, name: '15483 - Sikkim Mahananda Exp.'},
  {id: 225, name: '13150 - Kanchan Kannya Exp.'},
  {id: 226, name: '15417 - Silghat Town Rajya Rani Exp.'},
  {id: 227, name: '12378 - Padatik Exp'},
  {id: 228, name: '13142 - Teesta Torsa Exp.'},
  {id: 229, name: '13148 - Uttar Banga Exp.'},
  {id: 230, name: '12042 - Howrah Shatabdi Exp.'},
  {id: 231, name: '13245 - Capital Exp.'},
  {id: 232, name: '12344 - Darjeeling Mail'},
  {id: 233, name: '12523 - New Delhi Sf Exp.'},
  {id: 234, name: '15722 - Paharia Exp.'},
  {id: 235, name: '22612 - Mgr Chennai Central Sf Exp.'},
  {id: 236, name: '4653 - Amritsar Clone Sf Special'},
  {id: 237, name: '12407 - Amritsar Karmabhoomi Exp.'},
  {id: 238, name: '15720 - Katihar Intercity Exp.'},
  {id: 239, name: '13054 - Kulik Exp.'},
  {id: 240, name: '13146 - Kolkata Rdp Exp.'},
  {id: 241, name: '13064 - Howrah Exp.'},
  {id: 242, name: '13162 - Tebhaga Exp.'},
  {id: 243, name: '13012 - Howrah - Intercity Exp.'},
  {id: 244, name: '13466 - Howrah - Intercity Exp.'},
  {id: 245, name: '13154 - Gour Exp.'},
  {id: 246, name: '14003 - New Delhi Exp.'},
  {id: 247, name: '13409 - Kiul Intercity Exp.'},
  {id: 248, name: '13425 - Malda (T) St Exp.'},
  {id: 249, name: '13413 - Farakka Exp.'},
  {id: 250, name: '13483 - Farakka Exp.'},
  {id: 251, name: '13429 - Anand Vihar Terminal Weekly Exp.'},
  {id: 252, name: '03435 - Anand Vihar Terminal Spl Fare.'},
  {id: 253, name: '13415 - Patna Exp.'},
  {id: 254, name: '01666 - Rani Kamalapati Spl'},
  {id: 255, name: '22502 - SMVT Bengaluru SF Exp.'},
  {id: 256, name: '20503 - New Delhi Rajdhani Exp.'},
  {id: 257, name: '14619 - Tripura Sundari Exp.'},
  {id: 258, name: '14037 - New Delhi Poorvottar Sampark Kranti Exp.'},
  {id: 259, name: '22449 - New Delhi Poorvottar Sampark Kranti Exp.'},
  {id: 260, name: '12516 - Coimbatore Exp.'},
  {id: 261, name: '12508 - Aronai Exp.'},
  {id: 262, name: '12514 - Secunderabad SF Exp.'},
  {id: 263, name: '12510 - SMVT Bengaluru SF Exp.'},
  {id: 264, name: '15906 - Kanyakumari Vivek SF Exp.'},
  {id: 265, name: '12423 - New Delhi Rajdhani Exp.'},
  {id: 266, name: '20501 - Anand Vihar Terminal Tejas Rajdhani Exp.'},
  {id: 267, name: '15960 - Kamrup Exp.'},
  {id: 268, name: '15626 - Deoghar Weekly Exp'},
  {id: 269, name: '05611 - New Delhi one-way Spl'},
  {id: 270, name: '15636 - Okha Dwarka Exp.'},
  {id: 271, name: '15634 - Bikaner Exp'},
  {id: 272, name: '15632 - Guwahati - Barmer Exp.'},
  {id: 273, name: '15653 - Jammu Tawi Amarnath Exp'},
  {id: 274, name: '15651 - Lohit Exp.'},
  {id: 275, name: '15648 - Mumbai LTT Exp.'},
  {id: 276, name: '15630 - Nagaon Exp.'},
  {id: 277, name: '15646 - Mumbai Ltt Exp.'},
  {id: 278, name: '13182 - Kaziranga Exp.'},
  {id: 279, name: '13281 - Rajendra Nagar Terminal Weekly Exp.'},
  {id: 280, name: '12504 - Smvt Bengaluru Humsafar Exp.'},
  {id: 281, name: '15933 - Amritsar Exp.'},
  {id: 282, name: '15903 - Chandigarh Exp.'},
  {id: 283, name: '02986 - Smvt Bengaluru Sf Spl. Fare'},
  {id: 284, name: '07029 - Secunderabad Spl.'},
  {id: 285, name: '15909 - Avadh Assam Exp.'},
  {id: 286, name: '15621 - Anand Vihar Terminal Weekly Exp.'},
  {id: 287, name: '19306 - Dr. Ambedkar Nagar Weekly Exp.'},
  {id: 288, name: '15620 - Gaya Weekly Exp.'},
  {id: 289, name: '15668 - Gandhidham Exp.'},
  {id: 290, name: '15655 - Shri Mata Vaishno Devi Katra Weekly Exp.'},
  {id: 291, name: '15662 - Ranchi Weekly Exp.'},
  {id: 292, name: '12505 - North East Exp.'},
  {id: 293, name: '12552 - Smvt Bengaluru Ac Sf Exp.'},
  {id: 294, name: '15658 - Bramhaputra Mail'},
  {id: 295, name: '15624 - Bhagat Ki Kothi Exp.'},
  {id: 296, name: '22512 - Mumbai Ltt Karmabhoomi Exp.'},
  {id: 297, name: '19616 - Udaipur City Kavi Guru Exp.'},
  {id: 298, name: '15077 - Gomti Nagar Weekly Exp.'},
  {id: 299, name: '15640 - Kamakhya Puri Exp.'},
  {id: 300, name: '12520 - Mumbai Ltt Ac Sf Exp.'},
  {id: 301, name: '15644 - Kamakhya -Puri Exp.'},
  {id: 302, name: '13247 - Rajendra Nagar Terminal Capital Exp.'},
  {id: 303, name: '05727 - Katihar- Radhikapur Passenger Special'},
  {id: 304, name: '05729 - Katihar- Radhikapur Passenger Special'},
  {id: 305, name: '05708 - Katihar- Radhikapur Passenger Special'},
  {id: 306, name: '15228 - Smvt Bengaluru Exp.'},
  {id: 307, name: '05796 - Thiruvanthapuram Central Sf Spl. Exp.'},
  {id: 308, name: '13248 - Kamakhya Capital Exp.'},
  {id: 309, name: '15484 - Sikkim Mahananda Exp.'},
  {id: 310, name: '15622 - Kamakhya Weekly Exp.'},
  {id: 311, name: '15078 - Kamakhya Weekly Exp.'},
  {id: 312, name: '15625 - Agartala Weekly Exp'},
  {id: 313, name: '15934 - New Tinsukia Exp.'},
  {id: 314, name: '12506 - North East Exp.'},
  {id: 315, name: '15904 - Dibrugarh Exp.'},
  {id: 316, name: '20506 - Dibrugarh Rajdhani Exp.'},
  {id: 317, name: '20504 - Dibrugarh Rajdhani Exp.'},
  {id: 318, name: '12424 - Dibrugarh Town Rajdhani Exp.'},
  {id: 319, name: '19615 - Kamakhya Kavi Guru Exp.'},
  {id: 320, name: '15654 - Guwahati Amarnath Exp'},
  {id: 321, name: '15652 - Lohit Exp.'},
  {id: 322, name: '15633 - Guwahati Exp.'},
  {id: 323, name: '15631 - Barmer Exp.'},
  {id: 324, name: '15910 - Avadh Assam Exp.'},
  {id: 325, name: '20502 - Agartala Tejas Rajdhani Exp.'},
  {id: 326, name: '22412 - Arunachal Ac Sf Exp.'},
  {id: 327, name: '12519 - Kamakhya Ac Sf Exp.'},
  {id: 328, name: '01665 - Agartala Special'},
  {id: 329, name: '15667 - Kamakhya Exp.'},
  {id: 330, name: '15635 - Guwahati Dwarka Exp.'},
  {id: 331, name: '22450 - Guwahati Poorvottar Sampark Kranti Exp.'},
  {id: 332, name: '14620 - Tripura Sundari Exp.'},
  {id: 333, name: '14038 - Silchar Poorvattar Sampark Kranti Exp.'},
  {id: 334, name: '15645 - Dibrugarh Exp.'},
  {id: 335, name: '15656 - Kamakhya Weekly Exp.'},
  {id: 336, name: '13282 - Dibrugarh Weekly Exp.'},
  {id: 337, name: '19305 - Kamakhya Weekly Exp.'},
  {id: 338, name: '15647 - Guwahati Exp.'},
  {id: 339, name: '15619 - Kamakhya Weekly Exp.'},
  {id: 340, name: '15657 - Bramhaputra Mail.'},
  {id: 341, name: '15716 - Kishanganj Garib Nawaz Exp.'},
  {id: 342, name: '12346 - Saraighat Exp.'},
  {id: 343, name: '5639 - Kolkata Spl. Fare Exp'},
  {id: 344, name: '2518 - Kolkata Spl. Fare Sf. Exp.'},
  {id: 345, name: '2502 - Kolkata Spl. Fare Sf. Exp'},
  {id: 346, name: '13176 - Kanchanjungha Exp.'},
  {id: 347, name: '13174 - Kanchanjungha Exp.'},
  {id: 348, name: '3174 - Sealdah Spl. Fare Humsafar Puja Spl.'},
  {id: 349, name: '5702 - Katihar Malda (T) Passenger Spl.'},
  {id: 350, name: '13034 - Katihar-Howrah Exp.'},
  {id: 351, name: '13160 - Jogbani Kolkata Exp.'},
  {id: 352, name: '13170 - Hate Bazare Exp.'},
  {id: 353, name: '13164 - Hate Bazare Exp.'},
  {id: 354, name: '15712 - Howrah Weekly Exp.'},
  {id: 355, name: '5772 - Katihar Malda Court Passenger Spl.'},
  {id: 356, name: '5718 - Katihar Malda Court Passenger Spl.'},
  {id: 357, name: '15719 - Siliguri Intercity Exp.'},
  {id: 358, name: '13246 - New Jalpaiguri Capital Exp.'},
  {id: 359, name: '7543 - Katihar Siliguri Demu'},
  {id: 360, name: '4654 - New Jalpaiguri Clone Sf Special'},
  {id: 361, name: '12524 - New Jalpaiguri Sf Exp.'},
  {id: 362, name: '12408 - New Jalpaiguri Karmabhoomi Exp.'},
  {id: 363, name: '19601 - New Jalpaiguri Weekly Exp.'},
  {id: 364, name: '12821 - Dhauli Exp'},
  {id: 365, name: '12885 - Aranyak Express'},
  {id: 366, name: '18045 - East Cost Exp.'},
  {id: 367, name: '22849 - Secendrabad Weekly Express'},
  {id: 368, name: '12841 - Coromandal Express'},
  {id: 369, name: '12773 - Secendrabad AC SF'},
  {id: 370, name: '18007 - Simlipal Intercity Express'},
  {id: 371, name: '22853 - Visakhapattanam SF Express'},
  {id: 372, name: '18409 - Jagannath Exp'},
  {id: 373, name: '12152 - Samarsata SF Exp'},
  {id: 374, name: '15021 - Gorakhpur Weekly Exp'},
  {id: 375, name: '20972 - Udaipur city Weekly Exp'},
  {id: 376, name: '22803 - Sambalpur SF Exp'},
  {id: 377, name: '12887 - Puri Weekly SF Exp'},
  {id: 378, name: '12881 - Garibrath Exp'},
  {id: 379, name: '22835 - Puri Weekly SF Exp'},
  {id: 380, name: '12895 - Puri weekly SF Exp'},
  {id: 381, name: '12102 - Janenswari Exp'},
  {id: 382, name: '12906 - Porbandar SF Exp'},
  {id: 383, name: '22906 - Okha Exp'},
  {id: 384, name: '22213 - Duranta Exp'},
  {id: 385, name: '22642 - Thiruvananthapuram Exp'},
  {id: 386, name: '18047 - Amrabati Exp'},
  {id: 387, name: '12660 - Gurudev Exp'},
  {id: 388, name: '18030 - Kurla Express'},
  {id: 389, name: '22830 - Bhuj Express'},
  {id: 390, name: '22825 - MGR Cennai Central Express'},
  {id: 391, name: '12883 - Rupashi Bangla Express'},
  {id: 392, name: '22857 - Santragachi Anand Bihar Weekly'},
  {id: 393, name: '12768 - Huzur Sahib Nanded Express'},
  {id: 394, name: '22855 - Tirupati Weekly Express'},
  {id: 395, name: '20822 - Humsafar Exp'},
  {id: 396, name: '22807 - Santragachi Chennai AC Exp'},
  {id: 397, name: '22170 - Rani Kamalapati Humsafar Exp'},
  {id: 398, name: '12950 - Kabi Guru Exp'},
  {id: 399, name: '22841 - Antaday Exp.'},
  {id: 400, name: '22851 - Vivek Exp.'},
  {id: 401, name: '18009 - Ajmir Express'},
  {id: 402, name: '20828 - Humsafar Express'},
  {id: 403, name: '12884 - Rupashi Bangla Express'},
  {id: 404, name: '12828 - Howrah SF Express'},
  {id: 405, name: '22605 - Vellupuram SF Express'},
  {id: 406, name: '12858 - Tamralipta Exp'},
  {id: 407, name: '22873 - Visakhapattanam SF Express'},
  {id: 408, name: '13505 - Asansol Express'},
  {id: 409, name: '15721 - Paharia Express'},
  {id: 410, name: '13417 - Malda Town Express'},
  {id: 411, name: '22898 - Kandari Exp.'},
  {id: 412, name: '22329 - Haldia Express'},
  {id: 413, name: '12443 - Anand Bihar Express'},
  {id: 414, name: '18023 - Kharagpur Gomo Express'},
  {id: 415, name: '22603 - Vellupuram Express'},
  {id: 416, name: '18027 - Asansol Memo Express'},
  {id: 417, name: '18085 - Ranchi Exp'},
  {id: 418, name: '18035 - Hatia Exp.'},
  {id: 419, name: '18019 - Dhanbad Express'},
  {id: 420, name: '18004 - Shiromani Express'},
  {id: 421, name: '12822 - Dhauli Exp'},
  {id: 422, name: '12886 - Aranyak Express'},
  {id: 423, name: '22858 - Santragachi Anand Bihar Weekly'},
  {id: 424, name: '18046 - East Cost Exp.'},
  {id: 425, name: '22850 - Secendrabad Weekly Express'},
  {id: 426, name: '12767 - Huzur Sahib Nanded Express'},
  {id: 427, name: '22856 - Tirupati Weekly Express'},
  {id: 428, name: '12774 - Secendrabad AC SF'},
  {id: 429, name: '18008 - Simlipal Intercity Express'},
  {id: 430, name: '20821 - 20821 Humsafar Exp'},
  {id: 431, name: '22808 - Chennai- Santragachi Ac Exp'},
  {id: 432, name: '22854 - Visakhapatnam- Shalimar Exp'},
  {id: 433, name: '18410 - Jagannath Exp'},
  {id: 434, name: '12151 - Samarsata Exp'},
  {id: 435, name: '15022 - Gorakhpur Weekly Exp'},
  {id: 436, name: '20971 - Udaipur City Weekly Exp'},
  {id: 437, name: '22169 - Rani Kamalapati Humsafar Exp'},
  {id: 438, name: '22804 - Sambalpur Sf Exp'},
  {id: 439, name: '12888 - Puri Weekly Sf Exp'},
  {id: 440, name: '12882 - Garibrath Exp'},
  {id: 441, name: '22836 - Puri Weekly Sf Exp'},
  {id: 442, name: '12896 - Puri Weekly Sf Exp'},
  {id: 443, name: '12101 - Janenswari Exp'},
  {id: 444, name: '12905 - Porbandar Sf Exp'},
  {id: 445, name: '22905 - Okha Exp'},
  {id: 446, name: '12949 - Kabi Guru Exp'},
  {id: 447, name: '22214 - Duranta Exp'},
  {id: 448, name: '22641 - Thiruvananthapuram Exp'},
  {id: 449, name: '18048 - Amrabati Exp'},
  {id: 450, name: '12659 - Gurudev Exp'},
  {id: 451, name: '22874 - Digha Sf Express'},
  {id: 452, name: '12842 - Coromandal Express'},
  {id: 453, name: '18024 - Gomo Kharagpur Express'},
  {id: 454, name: '22604 - Kharagpur Express'},
  {id: 455, name: '18020 - Jhargram Express'},
  {id: 456, name: '18086 - Kharagpur Exp'},
  {id: 457, name: '12444 - Haldia Express'},
  {id: 458, name: '22606 - Purulia Sf Express'},
  {id: 459, name: '18029 - Kurla Express'},
  {id: 460, name: '22842 - Antaday Exp.'},
  {id: 461, name: '22852 - Vivek Exp'},
  {id: 462, name: '18036 - Kharagpur Exp.'},
  {id: 463, name: '18010 - Santragachi Express'},
  {id: 464, name: '22829 - Bhuj Express'},
  {id: 465, name: '20827 - Humsafar Express'},
  {id: 466, name: '22826 - Shalimar Express'},
  {id: 467, name: '18477 - Utkal Express'},
  {id: 468, name: '18478 - Utkal Express'},
  {id: 469, name: '12801 - Purusattam Exp.'},
  {id: 470, name: '12802 - Purusattam Exp'},
  {id: 471, name: '15643 - Kamakhya Exp'},
  {id: 472, name: '15644 - Kamakhya Exp'},
  {id: 473, name: '12515 - Silchar Exp'},
  {id: 474, name: '12516 - Silchar Exp'},
  {id: 475, name: '22643 - Patna Sf Express'},
  {id: 476, name: '22644 - Ernakulam Sf Express'},
  {id: 477, name: '12509 - Guwahati Express'},
  {id: 478, name: '12510 - Guwahati Express'},
  {id: 479, name: '15227 - Mujafarpur Sf Express'},
  {id: 480, name: '15228 - Yasvantpur Sf Express'},
  {id: 481, name: '22501 - New Tinsukia Weekly Sf Express'},
  {id: 482, name: '22502 - Bengaluru Weekly Sf Express'},
  {id: 483, name: '12507 - Aronai Express'},
  {id: 484, name: '12508 - Aronai Express'},
  {id: 485, name: '15905 - Dibrugarh Vivek Sf Express'},
  {id: 486, name: '15906 - Kanyakumari Vivek Sf Express'},
  {id: 487, name: '12281 - Duranto Express'},
  {id: 488, name: '12282 - Duranto Express'},
  {id: 489, name: '22823 - Rajdhani Express'},
  {id: 490, name: '22824 - Rajdhani Express'},
  {id: 491, name: '12551 - Kamakhya Weekly Ac Sf Express'},
  {id: 492, name: '12552 - Yasvantpur Weekly Ac Sf Express'},
  {id: 493, name: '22811 - Rajdhani Express'},
  {id: 494, name: '22812 - Rajdhani Express'},
  {id: 495, name: '12503 - Humsafar Exp'},
  {id: 496, name: '12504 - Humsafar Exp'},
  {id: 497, name: '07030 - Agartala Spl Exp'},
  {id: 498, name: '07029 - Secendrabad Spl. Exp.'},
  {id: 499, name: '12513 - Guwahati Sf Express'},
  {id: 500, name: '12514 - Secendrabad Sf Express'},
  {id: 501, name: '22511 - Kamakhya Karma Bhumi Exp'},
  {id: 502, name: '22512 - Lokmanya Tilak Karma Bhumi Exp'},
  {id: 503, name: '12875 - Nilachal Express'},
  {id: 504, name: '12876 - Nilachal Express'},
  {id: 505, name: '12815 - Nandan Kanan Express'},
  {id: 506, name: '12816 - Nandan Kanan Express'},
  {id: 507, name: '15639 - Kamakhya Express'},
  {id: 508, name: '15640 - Puri Express'},
  {id: 509, name: '12253 - Angya Express'},
  {id: 510, name: '12254 - Angya Express'},
  {id: 511, name: '18419 - Jaynagar Weekly Express'},
  {id: 512, name: '18420 - Puri Weekly Express'},
  {id: 513, name: '18449 - Badhyanathdham Exp'},
  {id: 514, name: '18450 - Badhyanathdham Exp'},
  {id: 515, name: '15629 - Nagaon Express'},
  {id: 516, name: '15630 - Nagaon Express'},
  {id: 517, name: '12819 - Sampark Kranti Express'},
  {id: 518, name: '12820 - Sampark Kranti Express'},
  {id: 519, name: '15929 - New Tinsukia Express'},
  {id: 520, name: '12930 - Tambaram Express'},
  {id: 521, name: '18182 - Chhapra Tata Exp'},
  {id: 522, name: '18181 - Tata Chhapra Exp'},
  {id: 523, name: '13288 - South Bihar Exp'},
  {id: 524, name: '13287 - South Bihar Exp'},
  {id: 525, name: '22844 - Bilashpur Weekly Sf Exp'},
  {id: 526, name: '22843 - Patna Weekly Sf Exp'},
  {id: 527, name: '18184 - Tatanagar Sf Exp'},
  {id: 528, name: '18183 - Danapur Sf Exp'},
  {id: 529, name: '18104 - Jallianwalabag Exp'},
  {id: 530, name: '18103 - Jallianwalabag Exp'},
  {id: 531, name: '20817 - Rajdhani Exp'},
  {id: 532, name: '20818 - Rajdhani Exp'}
];

  isDisplayedPassenger: boolean = false;
  isDisplayedLocal: boolean = false;
  isIncident: boolean = true;
  isMissing: boolean = false;

  windowRef: any;
  mobileNo: any;

  phoneNumber = new PhoneNumber()

  verificationCode!: string;

  user: any;
  message = '';

  lat: any = '00.00000';
  lng: any = '00.00000';

  complaint = new Complaint();

  position: any;

  constructor(private win: WindowService, private complaintService: ComplaintService, private locationService: LocationService, private router: Router) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    if (!firebase.apps.length) {
      firebase.initializeApp(configNew);
   }else {
      firebase.app(); // if already initialized, use that one
   }
  }

  onSubmit(form: any) {
    console.log(form.value);
    this.mobileNo = form.value.mobileNo;
    this.model = form.value;
    console.log("model : " + this.model.name);
    console.log("on submit" + this.mobileNo);
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    });
    firebase.auth().signInWithPhoneNumber(this.mobileNo, this.reCaptchaVerifier).then((confirmationResult) => {
      console.log("confirmationResult" + JSON.stringify(confirmationResult));
      localStorage.setItem('verificationId', JSON.stringify(confirmationResult.verificationId));
      this.saveComplaint();
      this.router.navigate(['code']);
    }).catch((err) => {
      alert(err.message);
      localStorage.removeItem('verificationId');
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    })
    // this.sendLoginCode();
    //this.saveComplaintNew();
  }

  showHideTextPassenger() {
    // Show/hide text
    this.isDisplayedPassenger = !this.isDisplayedPassenger;
    // Add other stuff
  }

  showHideTextLocal() {
    // Show/hide text
    this.isDisplayedLocal = !this.isDisplayedLocal;
    // Add other stuff
  }

  // sendLoginCode(appVerify: any) {

  //   const appVerifier = appVerify;

  //   console.log("appVerifier : " + JSON.stringify(appVerifier));

  //   const num = this.phoneNumber.e164;

  //   console.log("mobile no : " + this.mobileNo);

  //   firebase.auth()
  //     .signInWithPhoneNumber(this.mobileNo, appVerifier)
  //     .then(result => {

  //       this.windowRef.confirmationResult = result;
  //       console.log(this.windowRef.confirmationResult);

  //     })
  //     .catch(error => console.log('error', error));

  // }

  // verifyLoginCode() {
  //   this.windowRef.confirmationResult
  //     .confirm(this.verificationCode)
  //     .then((result: { user: any; }) => {

  //       this.user = result.user;
  //       console.log(result);
  //       var resetForm = <HTMLFormElement>document.getElementById('userForm');
  //       resetForm.reset();
  //     })
  //     .catch((error: any) => console.log(error, "Incorrect code entered?"));
  // }

  showIncident() {
    this.isIncident = !this.isIncident;
    this.isMissing = false;
  }

  showMissing() {
    this.isMissing = !this.isMissing;
    this.isIncident = false;
  }

  async getCurrLocation() {
    const position: any = await this.locationService.getCurrentLocation();
    this.lat = position.lat;
    this.lng = position.lng;
    console.log("Latitude : ", this.lat);
    console.log("Longitude : ", this.lng);
    return position.lat;
  }

  async saveComplaint(): Promise<void> {
    const output = this.generateRandomNumber();
    // this.lat = this.getCurrLocation();
    // console.log("Latitude save : ", this.lat);
    // console.log("Longitude save : ", this.lng);
    var isPersonal = '';
    var isLocal = '';
    var isInc = '';
    var complaintByName = '';
    var complaintByPhone = '';
    if (this.isDisplayedPassenger) {
      isPersonal = 'Co-Passenger (for someone else)';
      complaintByName = this.model.coName;
      complaintByPhone = this.model.coNumber.toString();
    } else {
      isPersonal = 'Personal (for me)';
      complaintByName = this.model.name;
      complaintByPhone = this.model.mobileNo;
    }
    if (this.isDisplayedLocal) {
      isLocal = 'Local';
      this.model.trainNumber = this.originatingStation + "|" + this.destinationStation;
    } else {
      isLocal = 'Non-Local';
      this.model.trainNumber = this.trainPnr + "|" + this.model.coachNumber + "|" + this.model.berthNumber;
    }
    if (this.isIncident) {
      isInc = 'Incident'
    } else {
      isInc = 'Missing'
    }
    console.log("nearestStationNew : "+this.nearestStationNew);
    console.log("assignedGRP : "+this.assignedGRP);
    console.log("assignedGRPS : "+this.assignedGRPS);
    const data = {
      assignedGRP: this.assignedGRP.toString(),
      assignedGRPs: this.assignedGRPS.toString(),
      complaintBrief: this.model.complaintText,
      complaintByName: complaintByName,
      complaintByPhone: complaintByPhone,
      complaintFor: isPersonal,
      complaintHead: this.model.complaintSub,
      complaintType: isInc,
      complaintUnId: output.toString(),
      imgLink: 'NA',
      lat: this.lat,
      lng: this.lng,
      priority: '_',
      remarks: '_',
      status: 'Pending',
      stn_details: this.nearestStationNew,
      timestamp: 12345678,
      trainPnr: this.model.trainNumber,
      trainType: isLocal,
      type: 'complaint',
      userId: '_',
      userName: this.model.name,
      userphone: this.model.mobileNo,
      isNewctrlrm: true,
      timestampctrlrmview: 0,
      timestampctrlrmnotify: 0,
      isNewgrps: true,
      timestampgrpsview: 0,
      timestampgrpsotify: 0,
    };
    console.log("data : " + JSON.stringify(data));
    localStorage.setItem('data',JSON.stringify(data));

  }

  insertComplaint(data : any, user: any): any {
    const obj = JSON.parse(data);
    console.log("inside insertComplaint data : "+obj);
    console.log("complaintBrief : "+obj.complaintBrief);
    var timestamp = firebase1.default.firestore.Timestamp.now().seconds;
    const dataNew = {
      assignedGRP: obj.assignedGRP,
      assignedGRPs: obj.assignedGRPs,
      complaintBrief: obj.complaintBrief,
      complaintByName: obj.complaintByName,
      complaintByPhone: obj.complaintByPhone,
      complaintFor: obj.complaintFor,
      complaintHead: obj.complaintHead,
      complaintType: obj.complaintType,
      complaintUnId: obj.complaintUnId,
      imgLink: obj.imgLink,
      lat: obj.lat,
      lng: obj.lng,
      priority: obj.priority,
      remarks: obj.remarks,
      status: obj.status,
      stn_details: obj.stn_details,
      timestamp: timestamp,
      trainPnr: obj.trainPnr,
      trainType: obj.trainType,
      type: obj.type,
      complaintId: '-',
      userId: obj.userId,
      userName: obj.userName,
      userphone: obj.userphone,
      isNewctrlrm: obj.isNewctrlrm,
      timestampctrlrmview: obj.timestampctrlrmview,
      timestampctrlrmnotify: obj.timestampctrlrmnotify,
      isNewgrps: obj.isNewgrps,
      timestampgrpsview: obj.timestampgrpsview,
      timestampgrpsotify: obj.timestampgrpsotify
    };
    console.log("inside insertComplaint dataNew : " + dataNew);
    var newId = this.complaintService.insert(dataNew)
    //.then(() => this.message = 'The Complaint was updated successfully!')
    //.catch((err: any) => console.log(err));

    console.log('complaintId : ' + newId);
    localStorage.setItem('complaint_uniqueId', obj.complaintUnId);

    const data_new = {
      complaintId: newId,
      userId: user
    }

    this.complaintService.update(newId, data_new)
      .then(() => {
        this.message = 'The Complaint was updated successfully!';
        console.log("inside unique id update " + newId);
      })
      .catch(err => console.log(err));
  }

  // saveComplaintNew(): void {
  //   const output = this.generateRandomNumber();
  //   var isPersonal = '';
  //   var isLocal = '';
  //   var isInc = '';
  //   var complaintByName = '';
  //   var complaintByPhone = '';
  //   if (this.isDisplayedPassenger) {
  //     isPersonal = 'Co-Passenger (for someone else)';
  //     complaintByName = this.model.coName;
  //     complaintByPhone = this.model.coNumber.toString();
  //   } else {
  //     isPersonal = 'Personal (for me)';
  //     complaintByName = this.model.name;
  //     complaintByPhone = this.model.mobileNo;
  //   }
  //   if (this.isDisplayedLocal) {
  //     isLocal = 'Local';
  //     this.model.trainNumber = this.model.originatingStation + "|" + this.model.destinationStation;
  //   } else {
  //     isLocal = 'Non-Local';
  //   }
  //   if (this.isIncident) {
  //     isInc = 'Incident'
  //   } else {
  //     isInc = 'Missing'
  //   }
    //const position : any = await this.locationService.getCurrentLocation();
    //console.log("inside : ", position.lat);
    // const data = {
    //   assignedGRP: 'NA',
    //   assignedGRPs: 'NA',
    //   complaintBrief: this.model.complaintText,
    //   complaintByName: complaintByName,
    //   complaintByPhone: complaintByPhone,
    //   complaintFor: isPersonal,
    //   complaintHead: this.model.complaintSub,
    //   complaintType: isInc,
    //   complaintUnId: output.toString(),
    //   imgLink: 'NA',
    //   lat: this.lat,
    //   lng: this.lng,
    //   priority: '_',
    //   remarks: '_',
    //   status: 'Assigned',
    //   stn_details: this.model.nearestStation,
    //   timestamp: 12345678,
    //   trainPnr: this.model.trainNumber,
    //   trainType: isLocal,
    //   type: 'complaint',
    //   userName: this.model.name,
    //   userphone: this.model.mobileNo
    // };
    // console.log("data : " + JSON.stringify(data));


    // var newId = this.complaintService.insert(data);
    // .then(() => this.message = 'The Complaint was updated successfully!')
    // .catch((err: any) => console.log(err));

  //   console.log('complaintId : ' + newId);

  //   const data_new = {
  //     complaintId: newId
  //   }

  //   this.complaintService.update(newId, data_new)
  //     .then(() => {
  //       this.message = 'The Complaint was updated successfully!';
  //       console.log("inside unique id update " + newId);
  //     })
  //     .catch(err => console.log(err));

  // }

  generateRandomNumber(): any {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
      .random() * (maxm - minm + 1)) + minm;
  }

  selectEvent(item: any) {
    // do something with selected item
    // this.nearestStationNew = item.name;
  }

  selectEventTrainNo(item: any) {
    // do something with selected item
    this.trainPnr = item.name;
  }

  selectEventOrgStation(item: any) {
    // do something with selected item
    this.originatingStation = item.name;
  }

  selectEventDestStation(item: any) {
    // do something with selected item
    this.destinationStation = item.name;
  }

  selectEventStationofOccurance(item: any) {
    // do something with selected item
    this.nearestStationNew = item.name;
    this.assignedGRPS = item.grpsName;
    this.assignedGRP = item.grpName;
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

}
