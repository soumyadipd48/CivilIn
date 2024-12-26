import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Strength, StrengthObject } from '../models/strength';
import { Observable } from 'rxjs';
import { SpecificArrestObject } from '../models/specific-arrest';
import { PreventiveArrest, PreventiveArrestObject } from '../models/preventive-arrest';
import { UDCaseObject } from '../models/ud-case';
import { SeizureObject } from '../models/seizure';
import { FirCaseObject } from '../models/fir-case';
import { AllDetails, AllDetailsObject } from '../models/all-details';
import { DetailsCategoryMappingObject } from '../models/details-category-mapping';

@Injectable({
  providedIn: 'root'
})
export class KharagpurService {

  errMsg : any;

  httpClient = inject(HttpClient);
  strengthObject!: StrengthObject;

  constructor() { }

  getStrengthKharagpurToday() : Observable<StrengthObject> {
    return this.httpClient.get<StrengthObject>('http://localhost:8080/getKharagpurStrengthToday')
  }

  getSpecificArrestKharagpurToday() : Observable<SpecificArrestObject> {
    return this.httpClient.get<SpecificArrestObject>('http://localhost:8080/getKharagpurSpecificArrestToday')
  }

  getPreventiveArrestKharagpurToday() : Observable<PreventiveArrestObject> {
    return this.httpClient.get<PreventiveArrestObject>('http://localhost:8080/getKharagpurPreventiveArrestToday')
  }

  getUDCaseKharagpurToday() : Observable<UDCaseObject> {
    return this.httpClient.get<UDCaseObject>('http://localhost:8080/getKharagpurUDCasesToday')
  }

  getSeizureKharagpurToday() : Observable<SeizureObject> {
    return this.httpClient.get<SeizureObject>('http://localhost:8080/getKharagpurSeizureToday')
  }

  getFirCaseKharagpurToday() : Observable<FirCaseObject> {
    return this.httpClient.get<FirCaseObject>('http://localhost:8080/getKharagpurFIRCaseToday')
  }

  getAllDetailsKharagpur() : Observable<AllDetailsObject> {
    return this.httpClient.get<AllDetailsObject>('http://localhost:8080/getKharagpurAllDetailsToday')
  }

  getAllDetailsTempKharagpur() : Observable<AllDetailsObject> {
    return this.httpClient.get<AllDetailsObject>('http://localhost:8080/getKharagpurAllDetailsTempToday')
  }

  getDetailsCategoryMappingKharagpur() : Observable<DetailsCategoryMappingObject> {
    return this.httpClient.get<DetailsCategoryMappingObject>('http://localhost:8080/getKharagpurAllDetailsCategoryMappingToday')
  }

  // Fetch logs (ERROR level only)
    getErrorLogs(a : string): Observable<string[]> {
      let params = new HttpParams();
      params = params.append('time', a); 
      return this.httpClient.get<string[]>('http://localhost:8080/logs', { params });
    }

  deleteAllDataKharagpurToday(){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'
    };
    this.httpClient
      .delete('http://localhost:8080/deleteKharagpurAllDataToday', options)
      .subscribe((s) => {
        console.log(s);
    });
  }

  deleteAllDetailsTempKharagpurToday(){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'
    };
    this.httpClient
      .delete('http://localhost:8080/deleteKharagpurAllDetailsTempToday', options)
      .subscribe((s) => {
        console.log(s);
    });
  }

  UpdateSelectedHeadStrengthDataTodayKharagpur(strength : Strength){
    this.httpClient
      .patch('http://localhost:8080/updateSelectedHeadStrengthDataToday', strength)
      .subscribe({
        next : (data: any) => {
          console.log(data);
        },
        error : (error: { message: any; }) => {
        this.errMsg = error.message;
        }
      });
  }

  UpdateAllDetailsDataTodayKharagpur(allDetails : AllDetails){
    this.httpClient
      .patch('http://localhost:8080/updateAllDetailsDataTempTodayKharagpur', allDetails)
      .subscribe({
        next : (data: any) => {
          console.log(data);
        },
        error : (error: { message: any; }) => {
        this.errMsg = error.message;
        }
      });
  }

  UpdatePreventiveArrestDataTodayKharagpur(prevArrest : PreventiveArrest){
    this.httpClient
      .patch('http://localhost:8080/updatePreventiveArrestDataTempTodayKharagpur', prevArrest)
      .subscribe({
        next : (data: any) => {
          console.log(data);
        },
        error : (error: { message: any; }) => {
        this.errMsg = error.message;
        }
      });
  }
}
