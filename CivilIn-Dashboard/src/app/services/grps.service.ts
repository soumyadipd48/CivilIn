import { Injectable } from '@angular/core';
import { Grps } from '../models/grps';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrpsService {

  private dbPathAssistance = '/GRPs List';

  GRPsRef!: AngularFireList<Grps>;

  constructor(private db : AngularFireDatabase, private http: HttpClient) {
    this.GRPsRef = db.list(this.dbPathAssistance);
  }

  getAllGRPs() : AngularFireList<Grps> {
    return this.GRPsRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.GRPsRef.update(key, value);
  }
}
