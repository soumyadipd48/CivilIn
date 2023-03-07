import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { UserGRPS } from '../models/user-grps';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPathUsers = '/GRPs List';

  usersRef!: AngularFireList<UserGRPS>;

  constructor(private db : AngularFireDatabase) { 
    this.usersRef = db.list(this.dbPathUsers);
  }

  getAllUserGRPS() : AngularFireList<UserGRPS> {
    return this.usersRef;
  }
}
