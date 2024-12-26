import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Strength, StrengthObject } from '../models/strength';
import { Observable } from 'rxjs';
import { SpecificArrestObject } from '../models/specific-arrest';
import { PreventiveArrest, PreventiveArrestObject } from '../models/preventive-arrest';
import { UDCaseObject } from '../models/ud-case';
import { SeizureObject } from '../models/seizure';
import { FirCaseObject } from '../models/fir-case';
import { DetailsCategoryMappingObject } from '../models/details-category-mapping';
import { AllDetails, AllDetailsObject } from '../models/all-details';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HowrahService {

  errMsg : any;

  httpClient = inject(HttpClient);
  strengthObject!: StrengthObject;

  constructor(private toastr: ToastrService) { }

  getStrengthHowrah() : Observable<StrengthObject> {
    return this.httpClient.get<StrengthObject>('http://localhost:8080/getHowrahStrengthToday')
  }

  getSpecificArrestHowrah() : Observable<SpecificArrestObject> {
    return this.httpClient.get<SpecificArrestObject>('http://localhost:8080/getHowrahSpecificArrestToday')
  }

  getPreventiveArrestHowrah() : Observable<PreventiveArrestObject> {
    return this.httpClient.get<PreventiveArrestObject>('http://localhost:8080/getHowrahPreventiveArrestToday')
  }

  getUDCaseHowrah() : Observable<UDCaseObject> {
    return this.httpClient.get<UDCaseObject>('http://localhost:8080/getHowrahUDCasesToday')
  }

  getSeizureHowrah() : Observable<SeizureObject> {
    return this.httpClient.get<SeizureObject>('http://localhost:8080/getHowrahSeizureToday')
  }

  getFirCaseHowrah() : Observable<FirCaseObject> {
    return this.httpClient.get<FirCaseObject>('http://localhost:8080/getHowrahFIRCaseToday')
  }

  getAllDetailsHowrah() : Observable<AllDetailsObject> {
    return this.httpClient.get<AllDetailsObject>('http://localhost:8080/getHowrahAllDetailsToday')
  }

  getAllDetailsTempHowrah() : Observable<AllDetailsObject> {
    return this.httpClient.get<AllDetailsObject>('http://localhost:8080/getHowrahAllDetailsTempToday')
  }

  getDetailsCategoryMappingHowrah() : Observable<DetailsCategoryMappingObject> {
    return this.httpClient.get<DetailsCategoryMappingObject>('http://localhost:8080/getHowrahAllDetailsCategoryMappingToday')
  }

  // Fetch logs (ERROR level only)
  getErrorLogs(a : string): Observable<string[]> {
    let params = new HttpParams();
    params = params.append('time', a); 
    return this.httpClient.get<string[]>('http://localhost:8080/logs', { params });
  }

  deleteAllDataHowrahToday(){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'
    };
    this.httpClient
      .delete('http://localhost:8080/deleteHowrahAllDataToday', options)
      .subscribe((s) => {
        console.log(s);
        this.showSuccessDataDelete();
    });
  }

  deleteAllDetailsTempHowrahToday(){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'
    };
    this.httpClient
      .delete('http://localhost:8080/deleteHowrahAllDetailsTempToday', options)
      .subscribe((s) => {
        console.log(s);
        this.showSuccessDataDelete();
    });
  }

  UpdateSelectedHeadStrengthDataToday(strength : Strength){
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

  UpdateAllDetailsDataTodayHowrah(allDetails : AllDetails){
    this.httpClient
      .patch('http://localhost:8080/updateAllDetailsDataTempTodayHowrah', allDetails)
      .subscribe({
        next : (data: any) => {
          console.log(data);
        },
        error : (error: { message: any; }) => {
        this.errMsg = error.message;
        }
      });
  }

  UpdatePreventiveArrestDataTodayHowrah(prevArrest : PreventiveArrest){
    this.httpClient
      .patch('http://localhost:8080/updatePreventiveArrestDataTempTodayHowrah', prevArrest)
      .subscribe({
        next : (data: any) => {
          console.log(data);
        },
        error : (error: { message: any; }) => {
        this.errMsg = error.message;
        }
      });
  }

  public showSuccessDataDelete() {
    this.toastr.success('Success', 'Data Deleted!');
  }
}
