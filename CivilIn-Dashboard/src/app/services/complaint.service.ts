import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Complaint } from '../models/complaint';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  sendNotificationUrl = "https://fcm.googleapis.com/fcm/send";

  private dbPathComplaints = '/Complaints';

  complaintsRef!: AngularFireList<Complaint>;

  constructor(private db : AngularFireDatabase, private http: HttpClient) { 
    this.complaintsRef = db.list(this.dbPathComplaints);
  }

  getAllComplaints() : AngularFireList<Complaint> {
    return this.complaintsRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.complaintsRef.update(key, value);
  }

  sendNotification(data : any){
    const headers = new HttpHeaders({'Authorization':'key=AAAAI5hW0UI:APA91bEi2kUgWQjfHx980VMin5avlT5fSu8d5HesTAUG0BLvxB4hbD0QrF5C6qusJ3zPxoDVaM4nOLGYnAgLEJYMCW8a7HRzt7uCYIcaP4AZ8J9RhViyV3KHP-BJ3JPGTonzut86VWDB',
    'Content-Type':'application/json'});
    return this.http.post(this.sendNotificationUrl, data, {headers : headers});
  }
}
