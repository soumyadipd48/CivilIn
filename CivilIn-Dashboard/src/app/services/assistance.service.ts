import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Assistance } from '../models/assistance';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  
  private dbPathAssistance = '/Assistance';

  assistancesRef!: AngularFireList<Assistance>;

  constructor(private db : AngularFireDatabase) { 
    this.assistancesRef = db.list(this.dbPathAssistance);
  }

  getAllAssintance() : AngularFireList<Assistance> {
    return this.assistancesRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.assistancesRef.update(key, value);
  }
}
