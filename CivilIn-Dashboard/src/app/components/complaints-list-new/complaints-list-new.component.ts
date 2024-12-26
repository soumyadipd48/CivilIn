import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as firebase1 from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { Complaint } from 'src/app/models/complaint';
import { UserGRPS } from 'src/app/models/user-grps';
import { ComplaintService } from 'src/app/services/complaint.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-complaints-list-new',
  templateUrl: './complaints-list-new.component.html',
  styleUrls: ['./complaints-list-new.component.css']
})
export class ComplaintsListNewComponent implements OnInit {

  classToggled = false;
  Complaints? : Complaint[];
  userGRPS? : UserGRPS[];
  currentComplaint? : Complaint;
  currentIndex = -1;
  currentLoggedInUser : string = '';
  selectedcomplaintType : string = 'Pending';
  selectedComplaint? : Complaint[];
  selectedComplaintLocal? : Complaint[];
  selectedComplaintNonLocal? : Complaint[];
  selectedGRPSComplaint? : Complaint[];
  selectedGRPSComplaintTemp? : Complaint[];
  selectedHWHComplaint? : Complaint[];
  selectedHWHComplaintTemp? : Complaint[];
  selectedKGPComplaint? : Complaint[];
  selectedKGPComplaintTemp? : Complaint[];
  selectedSGUJComplaint? : Complaint[];
  selectedSGUJComplaintTemp? : Complaint[];
  selectedSDAHComplaint? : Complaint[];
  selectedSDAHComplaintTemp? : Complaint[];
  searchText = '';
  selectedGRP = 'Select GRP';
  selectedGRPS = '---Select---';
  selectedPriority = '---Select---';
  selectedRemarks = '';
  order: any;
  showData: any;
  p:number = 1;
  loader = true;
  modalRef!: BsModalRef;
  selectedRemarksCompleted = '';
  modalComplaint_complaintId? : String = '';
  modalComplaint_AssignedGRP? : String = '';
  modalComplaint_AssignedGRPs? : String = '';
  modalComplaint_TrainType? : String = '';
  modalComplaint_TrainNo? : String = '';
  modalComplaint_CoachNo? : String = '';
  modalComplaint_SeatNo? : String = '';
  modalComplaint_stn_starting? : String = '';
  modalComplaint_stn_ending? : String = '';
  modalComplaint_remarks? : String = '';
  modalComplaint_complaintDesc? : String = '';
  modalComplaint_progress_unId? : String = '';
  modalComplaint_progress_status? : string = '';
  modalComplaint_progress_priority? : String = '';
  modalComplaint_progress_assignedToGRP? : string = '';
  modalComplaint_remarks_after_completion? : string = '';
  message = '';
  key : string = 'timestamp';
  reverse : boolean = false;
  currentUser : string = '';
  today : Date = new Date();
  curHr = this.today.getHours();
  wish : string = '';
  orderPriority? = '';
  complaint_count_all = 0;
  complaint_count_daily = 0;
  complaint_count_yesterday = 0;
  complaint_count_current_month = 0;
  complaint_count_previous_month = 0;
  complaint_count_month_compare = 0;
  complaint_count_daily_compare = 0;
  complaint_count_pending_daily = 0;
  complaint_count_pending_daily_array? : Complaint[];
  complaint_count_pending = 0;
  complaint_count_pending_array? : Complaint[];
  complaint_count_progress_daily = 0;
  complaint_count_progress_daily_array? : Complaint[];
  complaint_count_progress = 0;
  complaint_count_progress_array? : Complaint[];
  complaint_count_completed_daily = 0;
  complaint_count_completed_daily_array? : Complaint[];
  complaint_count_completed = 0;
  complaint_count_completed_array? : Complaint[];
  complaint_comparsion_msg : string = '';
  complaint_comparison_msg_daily : string = '';
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

  dataNotify : any = {
    'data':{
      title : 'first notification',
      body : 'Hello from Soumyadip'
    },
    'to': '/topics/howrah'   
  };

  // All station list
  stn : string[] = [
            "Howrah R/S",
            "Tikiapara R/S",
            "Liluah R/S",
            "Belur Math R/S",
            "Belur R/S",
            "Bally R/S",
            "Bally Halt R/S",
            "Bally Ghat R/S",
            "Baranagar R/S ",
            "Dakhineswar R/S",
            "Rajchandrapur  R/S ",
            "Belanagar R/S",
            "Bhattanagar R/S",
            "Dankuni R/S",
            "Uttarpara R/S",
            "Hindmotor R/S",
            "Konnagar R/S",
            "Gobra R/S",
            "Janai Road R/S",
            "Begampur R/S",
            "Baruipara R/S",
            "Mirzapur Bankipur R/S",
            "Balarambati R/S",
            "Kamarkundu R/S",
            "Madhusudanpur R/S",
            "Chandanpur R/S",
            "Porabazar R/S",
            "Belmuri R/S",
            "Dhaniakhali Halt R/S",
            "Sibaichandi R/S",
            "Cheragram R/S",
            "Hazigarh R/S",
            "Gurap R/S",
            "Jhapandanga R/S",
            "Jaugram R/S",
            "Nabagram R/S",
            "Masagram R/S",
            "Chanchai R/S",
            "Pallaroad R/S",
            "Tarakeswar R/S",
            "Lokenath R/S",
            "Bahirkhanda R/S",
            "Kaikala R/S",
            "Haripal R/S",
            "Malia Halt  R/S",
            "Nalikul R/S",
            "Singur R/S ",
            "Nasibpur R/S",
            "Diara R/S",
            "Rishra R/S",
            "Serampore R/S,",
            "Sheoraphully R/S",
            "Baidyabati R/S",
            "Bhadreswar R/S",
            "Mankundu R/S",
            "Chandannagr R/S",
            "Chinsurah R/S",
            "Hooghly R/S",
            "Bandel R/S",
            "Hooghly Ghat R/S",
            "Garifa R/S ",
            "Bansberia R/S",
            "Tribeni R/S",
            "Islampara Halt R/S",
            "Adisaptagram R/S",
            "Magra R/S",
            "Talandu R/S",
            "Khanyan R/S",
            "Pandua R/S",
            "Simlagarh R/S ",
            "Bainchi Gram R/S",
            "Bainchi R/S",
            "Debipur R/S",
            "Bagila R/S",
            "Memari R/S",
            "Nimo R/S",
            "Rasulpur R/S",
            "Palsit R/S",
            "Saktigarh R/S",
            "Gangpur R/S",
            "Barddhaman Jn. R/S",
            "Talit R/S",
            "Khana Junction R/S",
            "Galsi R/S",
            "Paraj R/S",
            "Mankar R/S",
            "Jhapater Dhal R/S",
            "Banpas R/S",
            "Noadar Dhal R/S",
            "Guskara R/S",
            "Pichkurirdhal R/S",
            "Bhedia R/S",
            "Kamnara R/S",
            "Kshetia R/S",
            "Chamardighi R/S",
            "Karjana R/S",
            "Karjanagram R/S",
            "Amarun R/S",
            "Bhatar R/S",
            "Balgona R/S",
            "Panagarh R/S",
            "Rajbandh R/S",
            "Durgapur R/S",
            "Waria R/S",
            "Pandabeswar R/S",
            "Ukhra R/S",
            "Andal R/S",
            "Kajoragram R/S",
            "Sidhuli R/S",
            "Ikrah R/S",
            "Jamuria R/S",
            "Baraboni R/S",
            "Sonachara R/S",
            "Tapasi R/S",
            "Bhaktarnagar Halt R/S",
            "Raniganj R/S",
            "Nimcha Halt R/S",
            "Barachak R/S",
            "Kalipahari R/S",
            "Asansol R/S",
            "Burnpur R/S",
            "Damodar R/S",
            "Sitarampur R/S",
            "Kulti R/S",
            "Barakar R/S",
            "Salanpur R/S",
            "Rupnarayanpur R/S",
            "Kuntighat R/S",
            "Dumurdaha R/S",
            "Khamargachi R/S",
            "Jirat R/S",
            "Balagarh R/S",
            "Somrabazar R/S",
            "Behula R/S",
            "Guptipara R/S",
            "Ambika Kalna R/S ",
            "Baghnapara R/S",
            "Dhatrigram R/S",
            "Nandai Gram Halt R/S",
            "Samudragarh R/S",
            "Kalinagar R/S",
            "Nabadwip Dham R/S",
            "Bishnupriya Halt R/S",
            "Bhandertikuri R/S",
            "Purbasthali R/S",
            "Mertala Phaleya Halt R/S",
            "Lakshmipur R/S",
            "Belerhat Halt R/S",
            "Patuli R/S",
            "Agradwip R/S",
            "Sahebtala Halt R/S",
            "Dainhat R/S",
            "Katwa R/S",
            "Shripat Shrikhand R/S",
            "Srikhanda R/S",
            "Bankapasi R/S",
            "Kaichar R/S",
            "Nigan R/S",
            "Saota R/S",
            "Nabagram Kakurhati Halt R/S",
            "Shiblun Halt R/S",
            "Gangatikuri R/S",
            "Ambalgram R/S",
            "Pachandi R/S",
            "Nirol Gram R/S",
            "Nirol R/S",
            "Komarpur R/S",
            "Jnandas Kandra R/S",
            "Kurmadanga R/S",
            "Jhamatpur Baharan R/S",
            "Salar R/S",
            "Malihati Talibpur R/S",
            "Tenya R/S",
            "Miangram R/S",
            "Bazarsau R/S",
            "Kazipara Halt R/S",
            "Chowrigacha R/S",
            "Daskalgram R/S",
            "Kirnahar R/S",
            "Maheshpur R/S",
            "Labpur R/S",
            "Gopalpurgram R/S",
            "Chowhatta R/S",
            "Ahmadpur R/S",
            "Bolpur R/S",
            "Prantik R/S",
            "Kopai R/S",
            "Ahmedpur R/S ",
            "Bataspur R/S",
            "Sainthia R/S",
            "Gadadharpur R/S",
            "MollarpurR/S",
            "Tarapith Road R/S",
            "Rampurhat R/S ",
            "Swadhinpur R/S",
            "Adalpahari R/S ",
            "Nalhati R/S",
            "Chatra R/S",
            "Murarai R/S",
            "Banshlai Bridge R/S",
            "Rajgram R/S",
            "Lohapur R/S",
            "Takipur R/S",
            "Mahisadohari R/S",
            "Kunuri R/S",
            "Suri R/S",
            "Kachujor R/S",
            "Chinpai R/S",
            "Dubrajpur R/S",
            "Panchra R/S",
            "Bhimgara R/S",
            "Kanthialia Road R/S",
            "Karnasubarna R/S",
            "Jibanti Halt R/S",
            "Khagraghat Road R/S",
            "Niyalishpara Halt R/S",
            "Lalbaghcourt Road R/S",
            "Dahaparadham Halt R/S",
            "Azimganj Jn R/S",
            "Azimganj City R/S",
            "Gosaingram R/S",
            "Barala R/S",
            "Sagardighi R/S",
            "Morgram R/S",
            "Poradanga R/S",
            "Mohipal Road R/S",
            "Mohipal Halt R/S",
            "Noapara Mahisasur Halt R/S",
            "Monigram R/S",
            "Gankar R/S",
            "Jangipore Road R/S",
            "Ahiran Halt R/S",
            "Sujnipara R/S",
            "Nimtita R/S",
            "Basudebpur Halt R/S",
            "Dhulianganga R/S",
            "Sankopara Halt R/S",
            "Ballalpur Halt R/S",
            "",
            "Sealdah R/S",
            "Park Circus R/S",
            "Bidhannagar R/S",
            "Sir Gurudas Banerjee Halt",
            "Dum Dum Jn.",
            "Dum Dum Cantt.",
            "Jessore Road",
            "Biman Bandar",
            "Belgharia",
            "Agarpara",
            "Sodpur",
            "Khardaha",
            "Titagarh",
            "Barrackpore",
            "Patipukur",
            "Kolkata Terminal",
            "Tala",
            "Bag Bazar",
            "Sovabazar",
            "Bara Bazar",
            "B.B.D. Bag",
            "Eden Gardens",
            "Prinsepghat",
            "Khidirpur",
            "Re-mount Road",
            "Palta",
            "Ichhapur",
            "Shyamnagar",
            "Jagaddal",
            "Kankinara",
            "Naihati Junction",
            "Halisahar",
            "Kanchrapara Workshop Gate",
            "Kanchrapara",
            "Kalyani",
            "Kalyani Shilpanchal",
            "Kalynai Ghoshpara",
            "Kalyani Simanta",
            "Madanpur",
            "Simurali",
            "Palpara",
            "Chakdaha",
            "Payradanga",
            "Ranaghat Junction",
            "Kalinarayanpur Jn.",
            "Habibpur",
            "Phulia",
            "Bathna Krittibas",
            "Santipur",
            "Bankimnagar",
            "Panchberia",
            "Aranghata",
            "Bahirgachhi",
            "Bhayna Halt",
            "Santinagar Halt",
            "Bagula",
            "Mayurhat Halt",
            "Taraknagar Halt",
            "Majdhia",
            "Banpur",
            "Harisnagar",
            "Gede",
            "Birnagar",
            "Taherpur",
            "Badkulla",
            "Jalalkhali Halt",
            "Krishnanagar City Jn.",
            "Dignagar Halt",
            "Bahadurpur halt",
            "Dhubulia",
            "Muragachha",
            "Bethuadahari",
            "Sonadanga",
            "Debogram",
            "Paglachandi",
            "Plassey",
            "Sirajnagar Halt",
            "Reginagr",
            "Beldanga",
            "Bhabta",
            "Sargachhi",
            "Balarampur Halt",
            "Berhampore Court",
            "Cossembazar",
            "Murshidabad",
            "Jiaganj",
            "Subarnamigi",
            "Bhagabangola",
            "Pirtala",
            "Krishnapur",
            "Lalgola",
            "Bamangachhi",
            "Duttapukur",
            "Bira",
            "Guma",
            "Ashoknagar Road",
            "Habra",
            "Sanhati Halt",
            "Machlandapur",
            "Gobardanga",
            "Thakurnagar",
            "Chandpara",
            "Bibhuti Bhushan Halt",
            "Bongaon",
            "Satberia",
            "Petrapole",
            "Coopers Halt",
            "Naba Raynagar",
            "Gagnapur",
            "Majhergram",
            "Akipur",
            "Gopalnagar",
            "Durganagar",
            "Birati",
            "Bisharpara Kodaliya",
            "New Barrackpore",
            "Madhyamgram",
            "Hridaypur",
            "Barasat Jn.",
            "Kazipara",
            "Karea Kadambagachhi",
            "Bahira Kalibari",
            "Sandalia",
            "Beliaghata Road",
            "Lebutala",
            "Bhasila",
            "Harua Road",
            "Kankra Mirzanagar",
            "Malatipur",
            "Ghoraras Ghona",
            "Champapukur",
            "Bhyabla",
            "Basirhat",
            "Matania Anantapur",
            "Madhyampur",
            "Nimdanri",
            "Taki road",
            "Hasnabad",
            "Ballygunge Jn.",
            "Dhakuria",
            "Lake Gardens",
            "Tollygunge",
            "New Alipur",
            "Majherhat",
            " Brace Bridge",
            "Santoshpur",
            "Akra",
            "Nungi",
            "Budge Budge",
            "Jadavpur",
            "Baghajatin",
            "New Garia",
            "Garia",
            "Narendrapur",
            "Sonarpur Jn.",
            "Subhasgram",
            "Mallickpur",
            "Bidyadharpur",
            "Kalikapur",
            "Champahati",
            "Piali",
            "Gourdaha",
            "Ghutiari Sarif",
            "Betberia Ghola",
            "Taldi",
            "Matla",
            "Canning",
            "Baruipur Jn.",
            "Kalyanpur",
            "Shasan Road",
            "Krishna Mohan",
            "Dhapdhapi",
            "Suryapur",
            "Gocharan",
            "Hogla",
            "Dakshin Barasat",
            "Baharu",
            "Joynagar-Majhilpur",
            "Mathurapur",
            "Madhabpur",
            "Lakshmikantapur",
            "Udairampur",
            "Kulpi",
            "Karanjali",
            "Nischindapur Market Halt",
            "Nischindapur",
            "Kashinagar",
            "Madhabnagar Halt",
            "Kakdwip",
            "Ukilerhat",
            "Namkhana",
            "Dakshin Durgapur",
            "Hotor",
            "Dhamuah",
            "Uttar Radhanagar",
            "Magrahat",
            "Bahirpuya Halt",
            "Sangrampur",
            "Deula",
            "Netra",
            "Basuldabga",
            "Gurudas Nagar",
            "Diamond Harbour",
            "Tildanga Rly. Station",
            "New Farakka Rly. Station ",
            "Chama gram Rly. Station ",
            "Khaltipur Rly. Station ",
            "Jamairghata Rly. Station ",
            "Gour Malda Rly. Station ",
            "Malda town Rly. Station  ",
            "Old Malda Jn. Rly. Station ",
            "Adina Rly. Station ",
            "Eklakhi Rly. Station ",
            "Mahananda bridge Halt Rly. Station  ",
            "Kumarganj Rly. Station ",
            "Sripur Halt Rly. Station ",
            "Samsi Rly. Station ",
            "Malahar Halt Rly. Station ",
            "Bhaluka Road Rly. Station ",
            "Milan Garh Rly. Station ",
            "Harishchandrapur Rly. Station ",
            "Kumedpur Rly. Station  ",
            "Dalkhola Rly. Station  ",
            "Surjakamal Rly. Station  ",
            "Kanki Rly. Station  ",
            "Hatwar Rly. Station ",
            "Panjipara Rly. Station  ",
            "Ikarchala Rly. Station  ",
            "Gaisal Rly. Station ",
            "Gunjaria Rly. Station ",
            "Aluabari Road Rly. Station  ",
            "Tinmile Hat Rly. Station  ",
            "Dumdangi Rly. Station  ",
            "Chatterhat Rly. Station  ",
            "Nijbari Rly. Station ",
            "Rangapani Rly. Station ",
            "New Jalpaiguri Rly. Station  ",
            "Ambari Falakata Rly. Station  ",
            "Belacoba Rly. Station  ",
            "Raninagar Rly. Station ",
            "Jalpaiguri Road Rly. Station ",
            "New Domohani Rly. Station  ",
            "New Maynaguri Rly. Station  ",
            "Betgara Rly. Station ",
            "Altagram Rly. Station  ",
            "Dhupguri Rly. Station ",
            "Kholaigram Rly. Station  ",
            "Salbari Rly. Station  ",
            "Falakata Rly. Station ",
            "Gumanihat Rly. Station  ",
            "Ghoksadanga Rly. Station ",
            "Sajerpar Rly. Station  ",
            "Pundibari Rly. Station  ",
            "New Cooch Behar Rly. Station  ",
            "New Baneswer Rly. Station  ",
            "New Alipurduar Rly. Station  ",
            "Samuktala Road Rly. Station ",
            "Kamakhyaguri Rly. Station  ",
            "Jorai Rly. Station  ",
            "Baneswar Rly. Station  ",
            "Alipurduar Rly. Station  ",
            "Alipurduar Court Rly. Station  ",
            "Alipurduar Jn. Rly. Station  ",
            "Coochbehar Rly. Station  ",
            "Dewanhat Rly. Station ",
            "Vetaguri Rly. Station ",
            "Dinhata College Halt Rly. Station  ",
            "Dinhata  Rly. Station  ",
            "Falimari Rly. Station ",
            "New Gitaldah Rly. Station  ",
            "Abutara Halt Rly. Station  ",
            "Bamanhat Rly. Station ",
            "Ambari Falakata Rly. Station  ",
            "Belacoba Rly. Station  ",
            "Raninagar Rly. Station ",
            "Jalpaiguri Road Rly. Station ",
            "Ambari Falakata Rly. Station  ",
            "Belacoba Rly. Station  ",
            "Raninagar Rly. Station ",
            "Mohitnagar Rly. Station ",
            "Jalpaiguri Rly. Station ",
            "Kadobari Halt Rly. Station ",
            "Mandalghat Rly. Station ",
            "Nandanpur Kererpara Halt. Rly. Station ",
            "Kashiabari Halt Rly. Station ",
            "Haldibari Rly. Station ",
            "Adhikari Rly. Station",
            "Batasi Rly. Station",
            "Naxalbari Rly. Station",
            "Hatighisa Rly. Station",
            "Bagdogra Rly. Station",
            "Matigara Rly. Station",
            "Siliguri Jn. Rly. Station",
            "Gulma Rly. Station",
            "Sevoke Rly. Station",
            "Bagrakote Rly. Station",
            "Odlabari Rly. Station",
            "Damdim Rly. Station",
            "New Mal Jn. Rly. Station",
            "Chalsa Jn. Rly. Station",
            "Nagarkata Rly. Station",
            "Carron Rly. Station",
            "Chengmari Rly. Station",
            "Banarhat Rly. Station",
            "Binnaguri Rly. Station",
            "Dalgaon  Rly. Station",
            "Mujnai Rly. Station",
            "Madarihat Rly. Station",
            "Hasimara Rly. Station  ",
            "Hamiltonganj Rly. Station ",
            "Kalchini Rly. Station  ",
            "Garopara Rly. Station ",
            "Rajabhatkhawa Rly. Station ",
            "Damanpur Rly. Station ",
            "Alipurduar jn. Rly. Station  ",
            "Alipurduar College  Rly. Station  ",
            "Salsalabari Rly. Station  ",
            "Samuktala Road Rly. Station ",
            "Kamakhyaguri Rly. Station  ",
            "Jorai Rly. Station  ",
            "Siliguri Town Rly. Station  ",
            "Jitkia Rly. Station ",
            "Raiganj Rly. Station ",
            "Bamangram Rly. Station ",
            "Bangalbari Rly. Station ",
            "Kaliaganj Rly. Station ",
            "Damilgaon Rly. Station ",
            "Radhikapur Rly. Station ",
            "Old Malda Jn. Rly. Station ",
            "Adina Rly. Station ",
            "Eklakhi Rly. Station ",
            "Gazole Rly. Station ",
            "Mahanagar Rly. Station ",
            "Deotala Rly. Station ",
            "Daulatpur Rly. Station ",
            "Buniadpur Rly. Station ",
            "Gangarampur Rly. Station ",
            "Malancha Rly. Station ",
            "Rampur bazar Rly. Station ",
            "Mallickpur Hat Rly. Station ",
            "Balurghat Rly. Station ",
            "Old Malda Jn. Rly. Station ",
            "Malda Court Rly. Station ",
            "Singhabad Rly. Station ",
            "Shalimar R/S ",
            "Padmapukhur R/S",
            "Dasnagar R/S",
            "Ramrajatala R/S",
            "Santragachi R/S",
            "Mourigram R/S",
            "Andul R/S",
            "Sankrail R/S",
            "Abada R/S",
            "Nalpur R/S",
            "Bauria R/S",
            "Chengail R/S",
            "Fuleswar R/S",
            "Uluberia R/S",
            "Birshibpur R/S",
            "Kulgachia R/S",
            "Bagnan R/S",
            "Ghoraghata R/S",
            "Deulti R/S",
            "Kolaghat R/S",
            "Mecheda R/S",
            "Nandai gajan R/S",
            "Bhogpur R/S",
            "Narayan Pakuria Murail R/S",
            "Panskura R/S",
            "Khirai Halt R/S",
            "Haur R/S",
            "Raghunathbari R/S",
            "Rajgoda R/S",
            "Sahid Matangini Halt R/S",
            "Tamluk R/S",
            "Keshabpur R/S",
            "Satish Samanta Halt R/S",
            "Mahisadal R/S",
            "Barda R/S",
            "Basulia Sutahata R/S",
            "Durgachak  R/S",
            "Durgachak Town Halt R/S",
            "Bandar Halt R/S",
            "Haldia R/S",
            "Nandakumar R/S",
            "Laban Satyagrah Smarak Halt R/S",
            "Deshapran R/S",
            "Henria Halt R/S",
            "Nachinda Halt R/S",
            "Kanthi R/S",
            "Shitalpur Halt R/S",
            "Sujalpur Halt R/S ",
            "Ashapurnadevi Halt R/S",
            "Badalpur Halt R/S",
            "Ramnagar R/S",
            "Tikra Halt R/S",
            "Digha R/S",
            "Radhamohanpur R/S",
            "Duan Halt R/S",
            "Balichak R/S",
            "Shyamchak R/S",
            "Madpur R/S",
            "Jakpur R/S",
            "Kharagpur R/S",
            "Hizli  R/S",
            "Benapur R/S",
            "Narayangarh R/S",
            "Bakrabad R/S",
            "Belda R/S",
            "Nekurshrini R/S",
            "Dantan R/S",
            "Angua R/S",
            "Nimpura Yard Halt R/S",
            "Kalaikunda R/S",
            "Girimaidan R/S",
            "Gokulpur R/S",
            "Cassai Halt R/S",
            "Midnapur R/S",
            "Khemashuli R/S",
            "Sardiha R/S",
            "Banshtola Halt R/S",
            "Jhargram R/S",
            "Khatkhura Halt R/S",
            "Gidhni R/S",
            "Bhadutola Halt  R/S",
            "Godapiyasal R/S",
            "Salboni R/S",
            "C.K.Road R/S",
            "Garbeta R/S",
            "Bogri Road Halt R/S",
            "Piyardoba R/S",
            "Bishnupur R/S",
            "Ramsagar R/S",
            "Ondagram R/S",
            "Kalisen Halt R/S",
            "Bheduasole Halt R/S",
            "Bankura R/S",
            "Anchuri Halt R/S",
            "Chatna R/S",
            "Jhantipahari R/S",
            "Bikna Halt R/S",
            "Nabanda Halt R/S",
            "Belboni Halt R/S",
            "Beliatore Halt R/S",
            "Chandar Halt R/S",
            "Brindabanpur Halt R/S",
            "Srirampur Halt R/S",
            "Hamirhati Halt R/S",
            "Sonamukhi R/S",
            "Dhansimla Halt R/S",
            "Dhagaria Halt R/S",
            "Patrasayar Halt R/S",
            "Betur Halt R/S",
            "Kumrul Halt R/S",
            "Indas Halt R/S",
            "Shankrul Halt R/S",
            "Sahaspur Halt R/S",
            "Bowaichandi Halt R/S",
            "Guir saranga Halt ",
            "Kaiyar Halt",
            "Sehara Bazar Halt,",
            "Gopinathpur Halt",
            "Shyamsundarpur Halt",
            "Rainagar Halt",
            "Srijam R/S",
            "Indrabil R/S",
            "Metal Sahar R/S",
            "Adra R/S",
            "Gardhrubeswar R/S",
            "Joychandi pahar R/S",
            "Bero R/S",
            "Ramkanali R/S",
            "Murardihi  R/S",
            "Madhukunda R/S",
            "Sanka R/S",
            "Rukni R/S",
            "Santaldihi R/S",
            "Anara R/S",
            "Bagalia R/S",
            "Kustaur R/S",
            "Chharrah R/S",
            "Purulia R/S",
            "Tamna R/S",
            "Kantadihi R/S",
            "Urma R/S",
            "Barabhum R/S",
            "Biramdih R/S",
            "Gourinath Dham R/S",
            "Chas Road Halt R/S",
            "Gar Jaipur Halt R/S",
            "Barbendia Halt R/S",
            "Kotsila R/S",
            "Begunkodar Halt  R/S",
            "Jhalda R/S",
            "Tulin R/S",
            "Damrughutu Halt R/S",
            "Pundag R/S",
            "Illoo R/S",
            "Torang R/S",
            "Suisa R/S"];

  // All Non-Local list
  mail_trn : string[] = [
    "13021 UP - Mithila Express",
    "11448 UP - Saktipunj Express",
    "15959 UP - Kamrup Express",
    "12369 UP - Haridwar (Kumbha) Exp",
    "12327 UP - Upasana Express",
    "13009 UP - Doon Exp",
    "12351 UP - Danapur Exp",
    "12333 UP - Vibhuti Exp",
    "12311 UP - Kalka Mail (Netaji Exp.)",
    "12307 UP - Jodhpur Exp",
    "12301 UP - Rajdhani Exp",
    "12305 UP - Rajdhani Exp",
    "12323 UP - Anand Bihar (Barmar) Exp.",
    "15271 UP - Muzafarpur - HWH Janasadharan Exp.",
    "22912 UP - Shipra Exp.",
    "12177 UP - Chambal Exp.",
    "12175 UP - Chambal Exp.",
    "13071 UP - Jamalpur Exp.",
    "13023 UP - Gaya Exp",
    "15711 UP - KIR-HWH Exp.",
    "12303 UP - HWH-New Delhi Poorva Exp.",
    "13025 UP - Bhopal Exp.",
    "12371 UP - HWH-Jaishalmir Exp.",
    "12353 UP - HWH-LUK Exp.",
    "13005 UP - Amritsar Mail",
    "12331 UP - Himgiri Exp.",
    "13019 UP - Bagh Exp",
    "12273 UP - NDLS Duronto Exp.",
    "22387 UP - Black-Diamond Express",
    "12019 UP - Ranchi-HWH Satabdi Exp.",
    "12041 UP - HWH- NJP Satabdi Exp.",
    "12863 UP - Yesvantpur-Howrah Exp.",
    "12870 UP - CSTM-HWH Exp.",
    "12871 UP - Sambalpur (Ispat) Exp",
    "22817 UP - HWH-MYS Exp.",
    "12073 UP - HWH-Bhubneswar Shatabdi Exp.",
    "12130 UP - Azad Hind Exp.",
    "12222 UP - Pune-HWH Duranto Exp",
    "12245 UP - HWH-SMVT Bengaluru Duranto Exp.",
    "12262 UP - HWH-Mumbai Duranto Exp.",
    "12277 UP - HWH-Puri Shatabdi to Exp.",
    "12663 UP - TPJ-HWH Exp.",
    "12665 UP - Kanyakumari Exp.",
    "12703 UP - Falaknuma Exp.",
    "12810 UP - Mumbai Mail",
    "12834 UP - Ahemedabad-Howrah Exp.",
    "12837 UP - Puri Exp.",
    "12839 UP - HWH-MAS Mail",
    "12860 UP - Gitanjali Exp.",
    "12345 UP - Saraighat Exp.",
    "18013 UP - Bokaro Steel City Exp.",
    "18011 UP - Chakradharpur Exp.",
    "12021 UP - Barbil Jan Shatabdi Exp.",
    "22861 UP - Kantabanji Ispat Exp.",
    "12857 UP - Tamralipta Exp.",
    "22897 UP - Kandari Exp.",
    "22863 UP - SMVT Bengaluru AC SF Exp.",
    "22887 UP - SMVT Bengaluru Humsafar Exp.",
    "20889 UP - Tirupati Humsafar Exp.",
    "22891 UP - Ranchi Intercity Exp.",
    "18627 UP - Ranchi Intercity Exp.",
    "22894 UP - Sainagar Shirdi SF Exp.",
    "22877 UP - Ernakulam Antoydaya Exp.",
    "22831 UP - Sri Sathya Sai Prashanthi Nilayam SF Exp.",
    "18043 UP - Bagha Jatain Exp.",
    "12827 UP - Purulia SF Exp.",
    "12813 UP - Steel Exp.",
    "18003 UP - Rani Shiromoni Exp.",
    "18615 UP - Kriya Yoga Exp.",
    "18005 UP - Sambaleswari Exp.",
    "12867 UP - Puducherry SF Exp",
    "12381 UP - Poorva Exp",
    "15235 UP - Darbhanga weekly Exp",
    "12023 UP - Patna Jan Shatabdi Exp",
    "12339 UP - Coal field Exp",
    "20975 UP - Agra cantt. Chambal Exp",
    "12341 UP - Agnibina Exp",
    "13043 UP - Howrah Raxul Exp",
    "12938 UP - Garba SF Exp",
    "13029 UP - Howrah Mokama Exp",
    "22307 UP - Bikaner SF Exp",
    "12321 UP - Howrah Mumbai CSMT Mail",
    "13017 UP - Ganadevata Exp",
    "13063 UP - Balurghat Exp",
    "13465 UP - Malda Town Intercity Exp",
    "03003 UP - Azimganj SPL Exp",
    "15961 UP - Kamrup Express",
    "13033 UP - Howrah Katihar Exp",
    "13027 UP - Azimganj Kaviguru Exp",
    "03027 UP - NJP SPL",
    "13053 UP - Kulik Exp",
    "13015 UP - Jamalpur Kaviguru Exp",
    "13031 UP - Howrah Jaynagar Exp",
    "12347 UP - Sahid Exp",
    "13011 UP - Malda Town Intercity Exp",
    "13045 UP - Mayurakshi Exp",
    "03047 UP - Viswabharati Fast Passenger",
    "12337 UP - Shantiniketan Exp",
    "22321 UP - Hool Exp",
    "12864 DN - Yesvantpur-Howrah Exp.",
    "12869 DN - CSTM-HWH Exp.",
    "12872 DN - Sambalpur (Ispat) Exp",
    "22818 DN - HWH-MYS Exp.",
    "12074 DN - HWH-Bhubneswar Shatabdi Exp.",
    "12129 DN - Azad Hind Exp.",
    "12221 DN - Pune-HWH Duranto Exp",
    "12246 DN - HWH-YPR Duranto Exp.",
    "12261 DN - HWH-Mumbai Duranto Exp.",
    "12278 DN - HWH-Puri Shatabdi to Exp.",
    "12664 DN - TPJ-HWH Exp.",
    "12666 DN - Kanyakumari Exp.",
    "12704 DN - Falaknuma Exp.",
    "12809 DN - Mumbai Mail (Via- Nagpur)",
    "12833 DN - Ahemedabad-Howrah Exp.",
    "12838 DN - Puri Exp.",
    "12840 DN - HWH-MAS Mail",
    "12859 DN - Gitanjali Exp.",
    "12346 DN - Saraighat Exp.",
    "13404 DN - Bananchal Express",
    "15227 DN - Yesvantpur -Majaffarpur Exp.",
    "15644 DN - Kamakhya-HWH- Puri Exp.",
    "12254 DN - BGP-YPR Anga Exp.",
    "12508 DN - SCL- TVC Exp.",
    "12510 DN - GHY-SBC Exp.",
    "12514 DN - GHY-SC Exp.",
    "12516 DN - Gouhati - Trivandram Coimbatore Exp.",
    "15640 DN - Kamakha- Puri Exp.",
    "22201 - Sealdah Puri Duronto Spl.",
    "12313 - Rajdhani Exp.",
    "13185 - Ganga Sagar Express",
    "13175 - Kanchanjunga Exp.",
    "13163 - Hateybazarey",
    "13105 - BALIA Exp.",
    "12259 - Duranta Exp.",
    "12329 - Samparkranti",
    "12987 - Ajmeersharif Exp.",
    "12379 - Jallianwala Bagh Exp.",
    "22317 - Humsafar Express",
    "12343 - Darjeeling Mail",
    "13141 - Tista Torsha Express",
    "13173 - Kanchanjunga Exp.",
    "13103 - Bhagirathi Express",
    "13169 - Hatey bazarey",
    "12377 - Padatik Express",
    "13153 - Gour Express",
    "13187 - Maa Tara Express",
    "13147 - Uttarbanga Express",
    "13149 - Kanchankannya Exp.",
    "12383 - Asansol Inter City express",
    "13179 - Suri Express",
    "22197 - V.G.L.B. Express",
    "12325 - Nangaldam Express",
    "12317 - Akaltakt Express",
    "13181 - Silghat Express",
    "15233 - Darvanga Express",
    "19607 - Ajmir/Madar Express",
    "13137 - Azamgar Express",
    "13151 - Jammu Tawai Express",
    "12357 - Durgiyana Amritsar Express",
    "13167 - Agtra Cant Express",
    "12319 - Agtra Cant Express",
    "19413 - Amedabad Express",
    "12315 - Ananya Express",
    "15047 - Purbanchal Express",
    "15049 - Purbanchal Express",
    "15051 - Purbanchal Express",
    "12359 - Patna Garibrath Express",
    "13121 - Shabdha Bedi/Gazipur Express",
    "13159 - Jogabani Express",
    "13157 - Trihut Express",
    "13155 - Sitamari/Darvhanga/Mithilanchal Express",
    "13135 - Jaynagar Express",
    "12496 - Bikenar Pratap Express",
    "13165 - Sitamari Express",
    "22323 - Gazipur City Express",
    "13113 - Hazarduari Express",
    "13161 - Tebhaga Express",
    "13117 - Dhanadhannya Express",
    "13145 - Radhikapur Express",
    "12363 - Inter City Express",
    "13108 - Moitree Express",
    "13109 - Moitree Express",
    "13129 - Bandhan Express",
    "02517 - Kolkata Gouhati Agartala Express",
    "22202 - Sealdah Puri Duronto Spl.",
    "12314 - Rajdhani Exp.",
    "13186 - Ganga Sagar Express",
    "13174 - Kanchanjunga Exp.",
    "13164 - Hateybazarey",
    "13106 - Balia Exp.",
    "12260 - Duranta Exp.",
    "12330 - Samparkranti",
    "12988 - Ajmeersharif Exp.",
    "12380 - Jallianwala Bagh Exp.",
    "22318 - Humsafar Express",
    "13176 - Silchar Express",
    "22198 - V.G.L.B. Express",
    "12326 - Nangaldam Express",
    "12318 - Akaltakt Express",
    "13182 - Silghat Express",
    "15234 - Darvanga Express",
    "19608 - Ajmir/Madar Express",
    "13138 - Azamgar Express",
    "13152 - Jammu Tawai Express",
    "12358 - Durgiyana Amritsar Express",
    "13168 - Agtra Cant Express",
    "12320 - Agtra Cant Express",
    "19414 - Amedabad Express",
    "12316 - Ananya Express",
    "15048 - Purbanchal Express",
    "15050 - Purbanchal Express",
    "15052 - Purbanchal Express",
    "12360 - Patna Garibrath Express",
    "13122 - Shabdha Bedi/Gazipur Express",
    "13160 - Jogabani Express",
    "13158 - Trihut Express",
    "13156 - Sitamari/Darvhanga/Mithilanchal Express",
    "13136 - Jaynagar Express",
    "12495 - Bikenar Pratap Express",
    "13166 - Sitamari Express",
    "22324 - Gazipur City Express",
    "15769 - Lamding Intercity Exp.",
    "15753 - Sifhung Exp.",
    "15483 - Sikkim Mahananda Exp.",
    "13150 - Kanchan Kannya Exp.",
    "15417 - Silghat Town Rajya Rani Exp.",
    "12378 - Padatik Exp",
    "13142 - Teesta Torsa Exp.",
    "13148 - Uttar Banga Exp.",
    "12042 - Howrah Shatabdi Exp.",
    "13245 - Capital Exp.",
    "12344 - Darjeeling Mail",
    "12523 - New Delhi Sf Exp.",
    "15722 - Paharia Exp.",
    "22612 - Mgr Chennai Central Sf Exp.",
    "4653 - Amritsar Clone Sf Special",
    "12407 - Amritsar Karmabhoomi Exp.",
    "15720 - Katihar Intercity Exp.",
    "13054 - Kulik Exp.",
    "13146 - Kolkata Rdp Exp.",
    "13064 - Howrah Exp.",
    "13162 - Tebhaga Exp.",
    "13012 - Howrah - Intercity Exp.",
    "13466 - Howrah - Intercity Exp.",
    "13154 - Gour Exp.",
    "14003 - New Delhi Exp.",
    "13409 - Kiul Intercity Exp.",
    "13425 - Malda (T) St Exp.",
    "13413 - Farakka Exp.",
    "13483 - Farakka Exp.",
    "13429 - Anand Vihar Terminal Weekly Exp.",
    "03435 - Anand Vihar Terminal Spl Fare.",
    "13415 - Patna Exp.",
    "01666 - Rani Kamalapati Spl",
    "22502 - SMVT Bengaluru SF Exp.",
    "20503 - New Delhi Rajdhani Exp.",
    "14619 - Tripura Sundari Exp.",
    "14037 - New Delhi Poorvottar Sampark Kranti Exp.",
    "22449 - New Delhi Poorvottar Sampark Kranti Exp.",
    "12516 - Coimbatore Exp.",
    "12508 - Aronai Exp.",
    "12514 - Secunderabad SF Exp.",
    "12510 - SMVT Bengaluru SF Exp.",
    "15906 - Kanyakumari Vivek SF Exp.",
    "12423 - New Delhi Rajdhani Exp.",
    "20501 - Anand Vihar Terminal Tejas Rajdhani Exp.",
    "15960 - Kamrup Exp.",
    "15626 - Deoghar Weekly Exp",
    "05611 - New Delhi one-way Spl",
    "15636 - Okha Dwarka Exp.",
    "15634 - Bikaner Exp",
    "15632 - Guwahati - Barmer Exp.",
    "15653 - Jammu Tawi Amarnath Exp",
    "15651 - Lohit Exp.",
    "15648 - Mumbai LTT Exp.",
    "15630 - Nagaon Exp.",
    "15646 - Mumbai Ltt Exp.",
    "13182 - Kaziranga Exp.",
    "13281 - Rajendra Nagar Terminal Weekly Exp.",
    "12504 - Smvt Bengaluru Humsafar Exp.",
    "15933 - Amritsar Exp.",
    "15903 - Chandigarh Exp.",
    "02986 - Smvt Bengaluru Sf Spl. Fare",
    "07029 - Secunderabad Spl.",
    "15909 - Avadh Assam Exp.",
    "15621 - Anand Vihar Terminal Weekly Exp.",
    "19306 - Dr. Ambedkar Nagar Weekly Exp.",
    "15620 - Gaya Weekly Exp.",
    "15668 - Gandhidham Exp.",
    "15655 - Shri Mata Vaishno Devi Katra Weekly Exp.",
    "15662 - Ranchi Weekly Exp.",
    "12505 - North East Exp.",
    "12552 - Smvt Bengaluru Ac Sf Exp.",
    "15658 - Bramhaputra Mail",
    "15624 - Bhagat Ki Kothi Exp.",
    "22512 - Mumbai Ltt Karmabhoomi Exp.",
    "19616 - Udaipur City Kavi Guru Exp.",
    "15077 - Gomti Nagar Weekly Exp.",
    "15640 - Kamakhya Puri Exp.",
    "12520 - Mumbai Ltt Ac Sf Exp.",
    "15644 - Kamakhya -Puri Exp.",
    "13247 - Rajendra Nagar Terminal Capital Exp.",
    "05727 - Katihar- Radhikapur Passenger Special",
    "05729 - Katihar- Radhikapur Passenger Special",
    "05708 - Katihar- Radhikapur Passenger Special",
    "15228 - Smvt Bengaluru Exp.",
    "05796 - Thiruvanthapuram Central Sf Spl. Exp.",
    "13248 - Kamakhya Capital Exp.",
    "15484 - Sikkim Mahananda Exp.",
    "15622 - Kamakhya Weekly Exp.",
    "15078 - Kamakhya Weekly Exp.",
    "15625 - Agartala Weekly Exp",
    "15934 - New Tinsukia Exp.",
    "12506 - North East Exp.",
    "15904 - Dibrugarh Exp.",
    "20506 - Dibrugarh Rajdhani Exp.",
    "20504 - Dibrugarh Rajdhani Exp.",
    "12424 - Dibrugarh Town Rajdhani Exp.",
    "19615 - Kamakhya Kavi Guru Exp.",
    "15654 - Guwahati Amarnath Exp",
    "15652 - Lohit Exp.",
    "15633 - Guwahati Exp.",
    "15631 - Barmer Exp.",
    "15910 - Avadh Assam Exp.",
    "20502 - Agartala Tejas Rajdhani Exp.",
    "22412 - Arunachal Ac Sf Exp.",
    "12519 - Kamakhya Ac Sf Exp.",
    "01665 - Agartala Special",
    "15667 - Kamakhya Exp.",
    "15635 - Guwahati Dwarka Exp.",
    "22450 - Guwahati Poorvottar Sampark Kranti Exp.",
    "14620 - Tripura Sundari Exp.",
    "14038 - Silchar Poorvattar Sampark Kranti Exp.",
    "15645 - Dibrugarh Exp.",
    "15656 - Kamakhya Weekly Exp.",
    "13282 - Dibrugarh Weekly Exp.",
    "19305 - Kamakhya Weekly Exp.",
    "15647 - Guwahati Exp.",
    "15619 - Kamakhya Weekly Exp.",
    "15657 - Bramhaputra Mail.",
    "15716 - Kishanganj Garib Nawaz Exp.",
    "12346 - Saraighat Exp.",
    "5639 - Kolkata Spl. Fare Exp",
    "2518 - Kolkata Spl. Fare Sf. Exp.",
    "2502 - Kolkata Spl. Fare Sf. Exp",
    "13176 - Kanchanjungha Exp.",
    "13174 - Kanchanjungha Exp.",
    "3174 - Sealdah Spl. Fare Humsafar Puja Spl.",
    "5702 - Katihar Malda (T) Passenger Spl.",
    "13034 - Katihar-Howrah Exp.",
    "13160 - Jogbani Kolkata Exp.",
    "13170 - Hate Bazare Exp.",
    "13164 - Hate Bazare Exp.",
    "15712 - Howrah Weekly Exp.",
    "5772 - Katihar Malda Court Passenger Spl.",
    "5718 - Katihar Malda Court Passenger Spl.",
    "15719 - Siliguri Intercity Exp.",
    "13246 - New Jalpaiguri Capital Exp.",
    "7543 - Katihar Siliguri Demu",
    "4654 - New Jalpaiguri Clone Sf Special",
    "12524 - New Jalpaiguri Sf Exp.",
    "12408 - New Jalpaiguri Karmabhoomi Exp.",
    "19601 - New Jalpaiguri Weekly Exp.",
    "12821 - Dhauli Exp",
    "12885 - Aranyak Express",
    "18045 - East Cost Exp.",
    "22849 - Secendrabad Weekly Express",
    "12841 - Coromandal Express",
    "12773 - Secendrabad AC SF",
    "18007 - Simlipal Intercity Express",
    "22853 - Visakhapattanam SF Express",
    "18409 - Jagannath Exp",
    "12152 - Samarsata SF Exp",
    "15021 - Gorakhpur Weekly Exp",
    "20972 - Udaipur city Weekly Exp",
    "22803 - Sambalpur SF Exp",
    "12887 - Puri Weekly SF Exp",
    "12881 - Garibrath Exp",
    "22835 - Puri Weekly SF Exp",
    "12895 - Puri weekly SF Exp",
    "12102 - Janenswari Exp",
    "12906 - Porbandar SF Exp",
    "22906 - Okha Exp",
    "22213 - Duranta Exp",
    "22642 - Thiruvananthapuram Exp",
    "18047 - Amrabati Exp",
    "12660 - Gurudev Exp",
    "18030 - Kurla Express",
    "22830 - Bhuj Express",
    "22825 - MGR Cennai Central Express",
    "12883 - Rupashi Bangla Express",
    "22857 - Santragachi Anand Bihar Weekly",
    "12768 - Huzur Sahib Nanded Express",
    "22855 - Tirupati Weekly Express",
    "20822 - Humsafar Exp",
    "22807 - Santragachi Chennai AC Exp",
    "22170 - Rani Kamalapati Humsafar Exp",
    "12950 - Kabi Guru Exp",
    "22841 - Antaday Exp.",
    "22851 - Vivek Exp.",
    "18009 - Ajmir Express",
    "20828 - Humsafar Express",
    "12884 - Rupashi Bangla Express",
    "12828 - Howrah SF Express",
    "22605 - Vellupuram SF Express",
    "12858 - Tamralipta Exp",
    "22873 - Visakhapattanam SF Express",
    "13505 - Asansol Express",
    "15721 - Paharia Express",
    "13417 - Malda Town Express",
    "22898 - Kandari Exp.",
    "22329 - Haldia Express",
    "12443 - Anand Bihar Express",
    "18023 - Kharagpur Gomo Express",
    "22603 - Vellupuram Express",
    "18027 - Asansol Memo Express",
    "18085 - Ranchi Exp",
    "18035 - Hatia Exp.",
    "18019 - Dhanbad Express",
    "18004 - Shiromani Express",
    "12822 - Dhauli Exp",
    "12886 - Aranyak Express",
    "22858 - Santragachi Anand Bihar Weekly",
    "18046 - East Cost Exp.",
    "22850 - Secendrabad Weekly Express",
    "12767 - Huzur Sahib Nanded Express",
    "22856 - Tirupati Weekly Express",
    "12774 - Secendrabad AC SF",
    "18008 - Simlipal Intercity Express",
    "20821 - 20821 Humsafar Exp",
    "22808 - Chennai- Santragachi Ac Exp",
    "22854 - Visakhapatnam- Shalimar Exp",
    "18410 - Jagannath Exp",
    "12151 - Samarsata Exp",
    "15022 - Gorakhpur Weekly Exp",
    "20971 - Udaipur City Weekly Exp",
    "22169 - Rani Kamalapati Humsafar Exp",
    "22804 - Sambalpur Sf Exp",
    "12888 - Puri Weekly Sf Exp",
    "12882 - Garibrath Exp",
    "22836 - Puri Weekly Sf Exp",
    "12896 - Puri Weekly Sf Exp",
    "12101 - Janenswari Exp",
    "12905 - Porbandar Sf Exp",
    "22905 - Okha Exp",
    "12949 - Kabi Guru Exp",
    "22214 - Duranta Exp",
    "22641 - Thiruvananthapuram Exp",
    "18048 - Amrabati Exp",
    "12659 - Gurudev Exp",
    "22874 - Digha Sf Express",
    "12842 - Coromandal Express",
    "18024 - Gomo Kharagpur Express",
    "22604 - Kharagpur Express",
    "18020 - Jhargram Express",
    "18086 - Kharagpur Exp",
    "12444 - Haldia Express",
    "22606 - Purulia Sf Express",
    "18029 - Kurla Express",
    "22842 - Antaday Exp.",
    "22852 - Vivek Exp",
    "18036 - Kharagpur Exp.",
    "18010 - Santragachi Express",
    "22829 - Bhuj Express",
    "20827 - Humsafar Express",
    "22826 - Shalimar Express",
    "18477 - Utkal Express",
    "18478 - Utkal Express",
    "12801 - Purusattam Exp.",
    "12802 - Purusattam Exp",
    "15643 - Kamakhya Exp",
    "15644 - Kamakhya Exp",
    "12515 - Silchar Exp",
    "12516 - Silchar Exp",
    "22643 - Patna Sf Express",
    "22644 - Ernakulam Sf Express",
    "12509 - Guwahati Express",
    "12510 - Guwahati Express",
    "15227 - Mujafarpur Sf Express",
    "15228 - Yasvantpur Sf Express",
    "22501 - New Tinsukia Weekly Sf Express",
    "22502 - Bengaluru Weekly Sf Express",
    "12507 - Aronai Express",
    "12508 - Aronai Express",
    "15905 - Dibrugarh Vivek Sf Express",
    "15906 - Kanyakumari Vivek Sf Express",
    "12281 - Duranto Express",
    "12282 - Duranto Express",
    "22823 - Rajdhani Express",
    "22824 - Rajdhani Express",
    "12551 - Kamakhya Weekly Ac Sf Express",
    "12552 - Yasvantpur Weekly Ac Sf Express",
    "22811 - Rajdhani Express",
    "22812 - Rajdhani Express",
    "12503 - Humsafar Exp",
    "12504 - Humsafar Exp",
    "07030 - Agartala Spl Exp",
    "07029 - Secendrabad Spl. Exp.",
    "12513 - Guwahati Sf Express",
    "12514 - Secendrabad Sf Express",
    "22511 - Kamakhya Karma Bhumi Exp",
    "22512 - Lokmanya Tilak Karma Bhumi Exp",
    "12875 - Nilachal Express",
    "12876 - Nilachal Express",
    "12815 - Nandan Kanan Express",
    "12816 - Nandan Kanan Express",
    "15639 - Kamakhya Express",
    "15640 - Puri Express",
    "12253 - Angya Express",
    "12254 - Angya Express",
    "18419 - Jaynagar Weekly Express",
    "18420 - Puri Weekly Express",
    "18449 - Badhyanathdham Exp",
    "18450 - Badhyanathdham Exp",
    "15629 - Nagaon Express",
    "15630 - Nagaon Express",
    "12819 - Sampark Kranti Express",
    "12820 - Sampark Kranti Express",
    "15929 - New Tinsukia Express",
    "12930 - Tambaram Express",
    "18182 - Chhapra Tata Exp",
    "18181 - Tata Chhapra Exp",
    "13288 - South Bihar Exp",
    "13287 - South Bihar Exp",
    "22844 - Bilashpur Weekly Sf Exp",
    "22843 - Patna Weekly Sf Exp",
    "18184 - Tatanagar Sf Exp",
    "18183 - Danapur Sf Exp",
    "18104 - Jallianwalabag Exp",
    "18103 - Jallianwalabag Exp",
    "20817 - Rajdhani Exp",
    "20818 - Rajdhani Exp"];

  //Demo purpose only, Data might come from Api calls/service
  name = 'Progress Bar';
  public counts = ["Recieved","Assigned","In Progress","Completed"];
  orderStatus?  = "";

  constructor(private complaintService : ComplaintService, private titleService : Title, private modalService : BsModalService, private userService : UserService, private datePipe : DatePipe) {
    this.titleService.setTitle("CivilIn-complaints-list");

    this.isLoggedIn();
   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader=false;
    }, 2000);
    this.retrieveUserGRPS();
    this.retrieveComplaint();
    // this.retrieveUserGRPS();
  }

  public toggleMenu() {

    this.classToggled = !this.classToggled;
  }

  //Sidebar toggle show hide function
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  public retrieveUserGRPS() : void {
    this.userService.getAllUserGRPS().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
          ({ key : c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.userGRPS = data;
      console.log(this.userGRPS);

      this.userGRPS.forEach( (element) => {
        var newEmailVar = element.grpsEmail;
        var newNamevar = element.grpsName;
        // console.log(newEmailVar);
        // console.log(newNamevar);
        if(newEmailVar === this.currentUser && newNamevar!= null)
        {
          this.currentLoggedInUser = newNamevar;
          // console.log("currentLoggedInUser"+this.currentLoggedInUser);
        }
      })
    })
  }

  public retrieveComplaint() : void {
    this.complaintService.getAllComplaints().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
          ({ key : c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.Complaints = data;

      this.Complaints.forEach( (element) => {
        // console.log("stn_details " + element.stn_details);
        const n = String(element.stn_details);
        // console.log("stn_details--->n " + n);
        
        element.stn_details_name = n;

        // console.log("element.stn_details_name " + element.stn_details_name);
      })

      // this.complaint_count_pending_daily = this.Complaints.filter(
      //   item => item.status === 'Pending'
      // )
      this.complaint_count_pending_array = this.Complaints.filter(
        item => item.status === 'Pending'
      )
      this.complaint_count_progress_array = this.Complaints.filter(
        item => item.status === 'In Progress'
      )
      this.complaint_count_completed_array = this.Complaints.filter(
        item => item.status === 'Completed'
      )

      this.complaint_count_all = this.Complaints.length;
      this.complaint_count_pending = this.complaint_count_pending_array.length;
      this.complaint_count_progress = this.complaint_count_progress_array.length;
      this.complaint_count_completed = this.complaint_count_completed_array.length;

      console.log("complaint count"+this.Complaints.length);

      // convert stn_details to station name

      // this.Complaints.forEach( (element) => {

      //   const n = element.stn_details;
        
      //   element.stn_details_name = this.stn[n!];
      // })

      // convert trainPnr to station names

      this.Complaints.forEach( (element) => {
        if(element.trainType == 'Local'){
          var newarr = element.trainPnr!.split("|");
          element.stn_starting = newarr[0];
          element.stn_ending = newarr[1];
        }
        else{
          console.log("element : "+JSON.stringify(element));
          var newarr = element.trainPnr!.split("|");
          element.mailTrainNo = newarr[0];
          element.stn_starting = newarr[1];
          element.stn_ending = newarr[2];
        }

        var newGRPSNo : string;
        var newGRPSName : string;
        GRPSList.forEach( (element1) => {
          // console.log("city"+element1.city);
          // console.log("currentLoggedInUser"+this.currentLoggedInUser);
          if(this.currentLoggedInUser === element1.city && element1.id!=null)
          {
            newGRPSNo = element1.id;
            newGRPSName = element1.city;
            console.log("inside newGRPSNo"+newGRPSNo);  
            console.log("inside newGRPSName"+newGRPSName);  
          }
          //console.log("newGRPSNo"+newGRPSNo);
          //console.log("newGRPSName"+newGRPSName);  
        })

        if(newGRPSName!){
          this.selectedGRPSComplaint = this.Complaints?.filter(
            item => item.assignedGRPs === newGRPSName
          )
          this.selectedGRPSComplaintTemp = this.selectedGRPSComplaint;
        }
        this.selectedHWHComplaint = this.Complaints?.filter(
          item => item.assignedGRP === 'HWH-GRP'
        )
        this.selectedHWHComplaintTemp = this.selectedHWHComplaint;
        this.selectedKGPComplaint = this.Complaints?.filter(
          item => item.assignedGRP === 'KGP-GRP'
        )
        this.selectedKGPComplaintTemp = this.selectedKGPComplaint;
        this.selectedSGUJComplaint = this.Complaints?.filter(
          item => item.assignedGRP === 'SGUJ-GRP'
        )
        this.selectedSGUJComplaintTemp = this.selectedSGUJComplaint;
        this.selectedSDAHComplaint = this.Complaints?.filter(
          item => item.assignedGRP === 'SDAH-GRP'
        )
        this.selectedSDAHComplaintTemp = this.selectedSDAHComplaint;
      })

      this.selectedComplaint = this.Complaints?.filter(
        item => item.status === 'Pending'
      );

      this.selectedComplaintLocal = this.selectedComplaint?.filter(
        item => item.trainType == 'Local'
      );
      this.selectedComplaintNonLocal = this.selectedComplaint?.filter(
        item => item.trainType == 'Non-Local'
      );

      this.Complaints.forEach( (element) => {

        let strang : any = element.timestamp!*1000;
        let newDate = new Date(strang);
        let newDateNew = this.datePipe.transform(newDate.toDateString(),'dd-MM-yyyy HH:mm:ss');
        console.log("newdate : " + newDateNew);
        let year = newDate.getFullYear();
        console.log("year: " + year);
        let month = newDate.getMonth()+1;
        console.log("month : " + month);
        let day = newDate.getDate();
        console.log("day: " + day);
        let today = new Date();
        console.log("today: " + today);
        let todayDate = today.getDate();
        console.log("today date: " + todayDate);
        let yesterdayDate = today.getDate()-1;
        console.log("yesterday date: " + yesterdayDate);
        let todayMonth = today.getMonth()+1;
        console.log("today month: " + todayMonth);
        let previousMonth = today.getMonth();
        console.log("previous month: " + previousMonth);
        let todayYear = today.getFullYear();
        console.log("today year: " + todayYear);
        if(month==todayMonth && day==todayDate && year==todayYear){
          this.complaint_count_daily = this.complaint_count_daily+1;
          if(element.status === 'Pending'){
            this.complaint_count_pending_daily = this.complaint_count_pending_daily+1;
          }
          if(element.status === 'In-Progress'){
            this.complaint_count_progress_daily = this.complaint_count_progress_daily+1;
          }
          if(element.status === 'Completed'){
            this.complaint_count_completed_daily = this.complaint_count_completed_daily+1;
          }
        }
        console.log(this.complaint_count_daily + " daily count");
        if(month==todayMonth && day==yesterdayDate && year==todayYear){
          this.complaint_count_yesterday = this.complaint_count_yesterday+1;
        }
        console.log(this.complaint_count_yesterday + " yesterday count");
        if(this.complaint_count_daily>this.complaint_count_yesterday)
        {
          this.complaint_count_daily_compare = (((this.complaint_count_daily-this.complaint_count_yesterday)/this.complaint_count_yesterday)*100);
          console.log("Comparison daily : "+this.complaint_count_daily_compare);
          this.complaint_comparison_msg_daily = 'increased';
        }
        if(this.complaint_count_yesterday>this.complaint_count_daily)
        {
          this.complaint_count_daily_compare = (((this.complaint_count_yesterday-this.complaint_count_yesterday)/this.complaint_count_yesterday)*100);
          console.log("Comparison daily : "+this.complaint_count_daily_compare);
          this.complaint_comparison_msg_daily = 'decreased';
        }
        if(this.complaint_count_yesterday == this.complaint_count_daily){
          this.complaint_count_daily_compare = 0;
          console.log("Comparison daily : "+this.complaint_count_daily_compare);
          this.complaint_comparison_msg_daily = 'increased';
        }
        if(month==todayMonth && year==todayYear){
          this.complaint_count_current_month = this.complaint_count_current_month+1;
        }
        console.log(this.complaint_count_current_month + " current month count");
        if(month==previousMonth && year==todayYear){
          this.complaint_count_previous_month = this.complaint_count_previous_month+1;
        }
        console.log(this.complaint_count_previous_month + " previous month count");
        if(this.complaint_count_current_month>this.complaint_count_previous_month)
        {
          this.complaint_count_month_compare = (((this.complaint_count_current_month-this.complaint_count_previous_month)/this.complaint_count_previous_month)*100);
          console.log("Comparison monthly : "+this.complaint_count_month_compare);
          this.complaint_comparsion_msg = 'increased';
        }
        if(this.complaint_count_previous_month>this.complaint_count_current_month)
        {
          this.complaint_count_month_compare = (((this.complaint_count_previous_month-this.complaint_count_current_month)/this.complaint_count_previous_month)*100);
          console.log("Comparison monthly : "+this.complaint_count_month_compare);
          this.complaint_comparsion_msg = 'decreased';
        }
        if(this.complaint_count_current_month == this.complaint_count_previous_month)
        {
          this.complaint_count_month_compare = 0;
          console.log("Comparison monthly : "+this.complaint_count_month_compare);
          this.complaint_comparsion_msg = 'increased';
        }
      });

      console.log("complaint_count_pending_daily : " + this.complaint_count_pending_daily);
      console.log("complaint_count_progress_daily : " + this.complaint_count_progress_daily);
      console.log("complaint_count_completed_daily : " + this.complaint_count_completed_daily);
    
      // by default recent complaint will show
      
      this.sortTimestamp(this.key);
    })
  }

  //OLD method for value selected

  // public valueSelected(){
  //   if(this.selectedcomplaintType === 'All')
  //   {
  //     this.selectedComplaint = this.Complaints;
  //     console.log("else" + this.selectedComplaint);
  //     console.log("Else selected head" + this.selectedcomplaintType);
  //   }
  //   else
  //   {
  //     this.selectedComplaint = this.Complaints?.filter(
  //       item => item.status === this.selectedcomplaintType
  //     );
  //     console.log("If" + this.selectedComplaint);
  //     console.log("If selected head" + this.selectedcomplaintType);
  //   }
  // }

  public valueSelected(){
    if(this.currentUser === 'hwh.srp@gmail.com'){
      if(this.selectedcomplaintType === 'All')
      {
        this.selectedHWHComplaint = this.selectedHWHComplaintTemp;
        console.log("else" + this.selectedHWHComplaint);
        console.log("Else selected head" + this.selectedcomplaintType);
      }
      else
      {
        this.selectedHWHComplaint = this.selectedHWHComplaintTemp?.filter(
          item => item.status === this.selectedcomplaintType
        );
        console.log("If" + this.selectedHWHComplaint);
        console.log("If selected head" + this.selectedcomplaintType);
      }
    }
    else if(this.currentUser === 'grpkgp.control.room@gmail.com'){
      if(this.selectedcomplaintType === 'All')
      {
        this.selectedKGPComplaint = this.selectedKGPComplaintTemp;
        console.log("else" + this.selectedKGPComplaint);
        console.log("Else selected head" + this.selectedcomplaintType);
      }
      else
      {
        this.selectedKGPComplaint = this.selectedKGPComplaintTemp?.filter(
          item => item.status === this.selectedcomplaintType
        );
        console.log("If" + this.selectedKGPComplaint);
        console.log("If selected head" + this.selectedcomplaintType);
      }
    }
    else if(this.currentUser === 'grpsdah.control.room@gmail.com'){
      if(this.selectedcomplaintType === 'All')
      {
        this.selectedSDAHComplaint = this.selectedSDAHComplaintTemp;
        console.log("else" + this.selectedSDAHComplaint);
        console.log("Else selected head" + this.selectedcomplaintType);
      }
      else
      {
        this.selectedSDAHComplaint = this.selectedSDAHComplaintTemp?.filter(
          item => item.status === this.selectedcomplaintType
        );
        console.log("If" + this.selectedSDAHComplaint);
        console.log("If selected head" + this.selectedcomplaintType);
      }
    }
    else if(this.currentUser === 'grpsguj.control.room@gmail.com'){
      if(this.selectedcomplaintType === 'All')
      {
        this.selectedSGUJComplaint = this.selectedSGUJComplaintTemp;
        console.log("else" + this.selectedSGUJComplaint);
        console.log("Else selected head" + this.selectedcomplaintType);
      }
      else
      {
        this.selectedSGUJComplaint = this.selectedSGUJComplaintTemp?.filter(
          item => item.status === this.selectedcomplaintType
        );
        console.log("If" + this.selectedSGUJComplaint);
        console.log("If selected head" + this.selectedcomplaintType);
      }
    }
    else if(this.currentUser === 'grphq.control.room@gmail.com'){
      if(this.selectedcomplaintType === 'All')
      {
        this.selectedComplaint = this.Complaints;
        console.log("else" + this.selectedComplaint);
        console.log("Else selected head" + this.selectedcomplaintType);
        this.selectedComplaintLocal = this.selectedComplaint?.filter(
          item => item.trainType == 'Local'
        );
        this.selectedComplaintNonLocal = this.selectedComplaint?.filter(
          item => item.trainType == 'Non-Local'
        );
      }
      else
      {
        this.selectedComplaint = this.Complaints?.filter(
          item => item.status === this.selectedcomplaintType
        );
        console.log("If" + this.selectedComplaint);
        console.log("If selected head" + this.selectedcomplaintType);
        this.selectedComplaintLocal = this.selectedComplaint?.filter(
          item => item.trainType == 'Local'
        );
        this.selectedComplaintNonLocal = this.selectedComplaint?.filter(
          item => item.trainType == 'Non-Local'
        );
      }
    }
    else{
      if(this.selectedcomplaintType === 'All')
      {
        this.selectedGRPSComplaint = this.selectedGRPSComplaintTemp;
        console.log("else" + this.selectedGRPSComplaint);
        console.log("Else selected head" + this.selectedcomplaintType);
      }
      else
      {
        this.selectedGRPSComplaint = this.selectedGRPSComplaintTemp?.filter(
          item => item.status === this.selectedcomplaintType
        );
        console.log("If" + this.selectedGRPSComplaint);
        console.log("If selected head" + this.selectedcomplaintType);
      }
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

  public openModal(template : TemplateRef<any>, complaint : Complaint)
  {
    sessionStorage.setItem('complaint_unId', JSON.stringify(complaint.complaintUnId));
    this.currentComplaint = complaint;
    this.modalComplaint_complaintId = JSON.stringify(complaint.complaintUnId);
    this.modalComplaint_complaintDesc = complaint.complaintBrief;
    this.modalRef = this.modalService.show(template);
  }

  public openModal_progress(template : TemplateRef<any>, complaint : Complaint)
  {
    // sessionStorage.setItem('assistance_progress_unId', JSON.stringify(assistance.assUnId));
    // sessionStorage.setItem('assistance_progress_status', JSON.stringify(assistance.status));
    // sessionStorage.setItem('assistance_progress_priority', JSON.stringify(assistance.priority));
    this.modalComplaint_progress_unId = JSON.stringify(complaint.complaintUnId);
    this.modalComplaint_progress_status = JSON.stringify(complaint.status);
    this.modalComplaint_progress_priority = JSON.stringify(complaint.priority);
    this.modalComplaint_progress_assignedToGRP = complaint.assignedGRP;
    this.modalComplaint_complaintDesc = complaint.complaintBrief;
    this.modalComplaint_remarks_after_completion = complaint.modalComplaint_remarks;
    this.modalComplaint_remarks = complaint.remarks;
    this.orderStatus = complaint.status;
    console.log("orderStatus "+this.orderStatus);
    this.modalRef = this.modalService.show(template);
  }

  public openModal_afterAssigned(template : TemplateRef<any>, complaint : Complaint)
  {
    sessionStorage.setItem('complaint_unId', JSON.stringify(complaint.complaintUnId));
    this.currentComplaint = complaint;
    this.modalComplaint_progress_unId = JSON.stringify(complaint.complaintUnId);
    this.modalComplaint_complaintDesc = complaint.complaintBrief;
    this.modalComplaint_progress_status = JSON.stringify(complaint.status);
    this.modalComplaint_progress_priority = JSON.stringify(complaint.priority);
    this.modalComplaint_remarks = complaint.remarks;
    this.orderStatus = complaint.status;
    this.orderPriority = complaint.priority;
    console.log("orderStatus "+this.orderStatus);
    this.modalRef = this.modalService.show(template);
  }

  public openModal_complete(template : TemplateRef<any>, complaint : Complaint)
  {
    sessionStorage.setItem('complaint_unId', JSON.stringify(complaint.complaintUnId));
    this.currentComplaint = complaint;
    this.modalComplaint_progress_unId = JSON.stringify(complaint.complaintUnId);
    this.modalComplaint_complaintDesc = complaint.complaintBrief;
    this.modalComplaint_progress_priority = JSON.stringify(complaint.priority);
    // this.modalAssistance_remarks_HQ = assistance.remarks;
    this.modalComplaint_remarks = complaint.remarks;
    this.orderStatus = complaint.status;
    this.orderPriority = complaint.priority;
    this.modalRef = this.modalService.show(template);
  }

  public updateComplaint(): void {

    const data = {
      status: 'Assigned',
      assignedGRP: this.selectedGRP,
      assignedGRPS: this.selectedGRPS,
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

    //notification code to send notification to each GRPS selected from dropdown

    var tempGRPS : string;

    GRPSList.forEach((element) => {
      if(element.id === this.selectedGRPS)
      {
        tempGRPS = element.city.toLowerCase();
        console.log("tempGRPS"+tempGRPS);
      }
    })

    this.dataNotify = {
      "data":{
        title : 'New Notification',
        body : 'New Complaint registered'
      },
      // 'to': '/topics/{{ tempGRPS }}'
      "to": "/topics/"+tempGRPS!
    };

    this.complaintService.sendNotification(this.dataNotify).subscribe((resp)=>{
      console.log(resp);
    });

    sessionStorage.removeItem('complaint_unId');
    this.selectedGRP = 'Select GRP';
    this.selectedGRPS = '';
    this.selectedPriority = '';
    this.selectedRemarks = '';
    this.modalService.hide();
  }

  public notifyComplaint(complaint : Complaint) : void {
    const assignedGRPs = complaint.assignedGRPs?.toLowerCase();
    console.log("assignedGRPs"+assignedGRPs);
    this.dataNotify = {
      "data":{
        title : 'New Notification',
        body : 'New Complaint registered! Please check.'
      },
      // 'to': '/topics/{{ tempGRPS }}'
      "to": "/topics/"+assignedGRPs!
    };
    this.complaintService.sendNotification(this.dataNotify).subscribe((resp)=>{
      console.log(resp);
    });
  }

  public acceptComplaint(): void {
    const data = {
      status: 'In Progress',
    };

    console.log("data after assign" + data);

    if (this.currentComplaint!.key) {
      this.complaintService.update(this.currentComplaint!.key, data)
        .then(() => this.message = 'The Complaint was updated successfully!')
        .catch(err => console.log(err));
    }

    sessionStorage.removeItem('complaint_unId');
    this.modalService.hide();
  }

  public completeComplaint(): void {
    const data = {
      status: 'Completed',
      // remarksAfterCompletion : this.selectedRemarksCompleted
      // modalAssistance_remarks_HQ : this.selectedRemarksCompleted
      modalComplaint_remarks : this.selectedRemarksCompleted
    };

    console.log("data after assign" + data);

    if (this.currentComplaint!.key) {
      this.complaintService.update(this.currentComplaint!.key, data)
        .then(() => this.message = 'Assistance completed successfully!')
        .catch(err => console.log(err));
    }

    sessionStorage.removeItem('complaint_unId');
    // this.selectedRemarksCompleted = '';
    this.selectedRemarksCompleted = '';
    this.modalService.hide();
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


    // this.userService.getAllUserGRPS().snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c =>
    //       ({ key : c.payload.key, ...c.payload.val()})
    //     )
    //   )
    // ).subscribe(data => {
    //   this.userGRPS = data;
    //   console.log(this.userGRPS);
    // })

    // // this.userGRPS?.forEach( (element) => {
    // //   console.log("inside current user" + this.currentUser);
    // //   if(this.currentUser !== element.grpsEmail!){
    // //     var newVar = element.grpsName;
    // //     console.log(newVar);
    // //   }
    // // })
    // this.userGRPS?.forEach((element) => {
    //   var newVar = element.grpsEmail;
    //   if(newVar === this.currentUser)
    //   {
    //     console.log("Yes");
    //   }
    //   else{
    //     console.log("No");
    //   }
    //   console.log("executed");
    // })
    


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
  form = new FormGroup({
    GRP: new FormControl(),
    GRPS: new FormControl()
  });
  
  public checkFirstDropdown($event: any){
     this.allGRPS=GRPSList.filter(c=>c.cid===$event);
      let  itm=this.allGRPS[0];
      this.form.controls['GRPS'].setValue(itm.id);
     console.log($event);
  }

  openModalNew(complaint : Complaint){
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation is-blurred';
    main!.className = 'main is-blurred';
    sessionStorage.setItem('complaint_unId', JSON.stringify(complaint.complaintUnId));
    this.currentComplaint = complaint;
    this.modalComplaint_complaintId = JSON.stringify(complaint.complaintUnId);
    this.modalComplaint_AssignedGRP = complaint.assignedGRP;
    this.modalComplaint_AssignedGRPs = complaint.assignedGRPs;
    this.modalComplaint_TrainType = complaint.trainType;
    if(complaint.trainType == 'Local'){
      this.modalComplaint_stn_starting = complaint.stn_starting;
      this.modalComplaint_stn_ending= complaint.stn_ending;
    }else{
      this.modalComplaint_TrainNo = complaint.mailTrainNo;
      this.modalComplaint_CoachNo = complaint.stn_starting;
      this.modalComplaint_SeatNo= complaint.stn_ending;
    }
    this.modalComplaint_complaintDesc = complaint.complaintBrief;
    const data = {
      isNewctrlrm : false,
      timestampctrlrmview : firebase1.default.firestore.Timestamp.now().seconds
    }
    if (this.currentComplaint!.key && complaint.isNewctrlrm == true && this.currentUser === 'grphq.control.room@gmail.com') {
      this.complaintService.update(this.currentComplaint!.key, data)
        .then(() => this.message = 'The Complaint is not new!')
        .catch(err => console.log(err));
    }
    const modelDiv = document.getElementById('myModal');
    if(modelDiv != null){
      modelDiv.style.display = 'block';
    }
  }

  closeModalNew(){
    const modelDiv = document.getElementById('myModal');
    var navigation = document.getElementById('navigation');
    var main = document.getElementById('main');
    navigation!.className = 'navigation';
    main!.className = 'main';
    if(modelDiv != null){
      modelDiv.style.display = 'none';
    }
  }

  public exportToExcel(){
    const workbook = new ExcelJS.Workbook();
    const worksheet1 = workbook.addWorksheet('Complaints-Local');
    const worksheet2 = workbook.addWorksheet('Complaints-Non-Local');

    worksheet1.columns = [
      { header: 'complaint Id', key: 'complaintUnId', width: 15},
      { header: 'User Name', key: 'name', width: 32 },
      { header: 'Phone No', key: 'phone', width: 15 },
      { header: 'Complaint Type', key: 'complaint_type', width: 20 },
      { header: 'Complaint Details', key: 'complaint_details', width: 32 },
      { header: 'Train Type', key: 'train_type', width: 15 },
      { header: 'Location', key: 'location', width: 15 },
      { header: 'Starting Station', key: 'starting_stn', width: 15 },
      { header: 'Ending Station', key: 'ending_stn', width: 15 },
      { header: 'Timestamp', key: 'timestamp', width: 15 },
      { header: 'Status', key: 'status', width: 15 },

    ];

    worksheet2.columns = [
      { header: 'complaint Id', key: 'complaintUnId', width: 15},
      { header: 'User Name', key: 'name', width: 32 },
      { header: 'Phone No', key: 'phone', width: 15 },
      { header: 'Complaint Type', key: 'complaint_type', width: 20 },
      { header: 'Complaint Details', key: 'complaint_details', width: 32 },
      { header: 'Train Type', key: 'train_type', width: 15 },
      { header: 'Location', key: 'location', width: 15 },
      { header: 'Train No', key: 'mailTrainNo', width: 15 },
      { header: 'Coach No', key: 'starting_stn', width: 15 },
      { header: 'Birth No', key: 'ending_stn', width: 15 },
      { header: 'Timestamp', key: 'timestamp', width: 15 },
      { header: 'Status', key: 'status', width: 15 },

    ];

    for (const complaint of this.selectedComplaintLocal!) {
      worksheet1.addRow({
        complaintUnId: complaint.complaintUnId ,
        // date: purchase.item_purchase_date.toString().slice(0, 10).split('-').reverse().join('/'),
        name: complaint.complaintByName,
        phone: complaint.complaintByPhone,
        complaint_type: complaint.complaintHead,
        complaint_details: complaint.complaintBrief,
        train_type: complaint.trainType,
        location: complaint.stn_details_name,
        starting_stn: complaint.stn_starting,
        ending_stn: complaint.stn_ending,
        timestamp: this.datePipe.transform(complaint.timestamp!*1000,'dd-MM-yyyy HH:mm:ss'),
        status: complaint.status
       })
      .alignment = { horizontal: 'left' };
    }

    for (const complaint of this.selectedComplaintNonLocal!) {
      worksheet2.addRow({
        complaintUnId: complaint.complaintUnId ,
        // date: purchase.item_purchase_date.toString().slice(0, 10).split('-').reverse().join('/'),
        name: complaint.complaintByName,
        phone: complaint.complaintByPhone,
        complaint_type: complaint.complaintHead,
        complaint_details: complaint.complaintBrief,
        train_type: complaint.trainType,
        location: complaint.stn_details_name,
        mailTrainNo: complaint.mailTrainNo,
        starting_stn: complaint.stn_starting,
        ending_stn: complaint.stn_ending,
        timestamp: this.datePipe.transform(complaint.timestamp!*1000,'dd-MM-yyyy HH:mm:ss'),
        status: complaint.status
       })
      .alignment = { horizontal: 'left' };
    }

    worksheet1.getRow(1).font = { bold: true };

    worksheet2.getRow(1).font = { bold: true };

    // get help from here
    // https://stackoverflow.com/questions/62149358/exceljs-iterate-each-cell-of-each-row-and-column/62149808#62149808
    worksheet1.columns.forEach(column => {
      // for each non empty cell
      column.eachCell!((cell, rowNumber) => {
        cell.border = {
          top: { style: 'thick' },
          left: { style: 'thick' },
          bottom: { style: 'thick' },
          right: { style: 'thick' }
        };
      });
    });

    worksheet2.columns.forEach(column => {
      // for each non empty cell
      column.eachCell!((cell, rowNumber) => {
        cell.border = {
          top: { style: 'thick' },
          left: { style: 'thick' },
          bottom: { style: 'thick' },
          right: { style: 'thick' }
        };
      });
    });

    // save under export.xlsx, dont use writeFile see the above stackoverflow question
    // await workbook.xlsx.writeFile('export.xlsx');
    // await maybe optional here
    workbook.xlsx.writeBuffer()
      .then(buffer => FileSaver.saveAs(new Blob([buffer]), `Complaints.xlsx`))
      .catch(err => console.log('Error writing excel export', err));
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
