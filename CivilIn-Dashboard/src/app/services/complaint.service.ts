import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Complaint } from '../models/complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private dbPathComplaints = '/Complaints';

  complaintsRef!: AngularFireList<Complaint>;

  constructor(private db : AngularFireDatabase) { 
    this.complaintsRef = db.list(this.dbPathComplaints);
  }

  getAllComplaints() : AngularFireList<Complaint> {
    return this.complaintsRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.complaintsRef.update(key, value);
  }
}
