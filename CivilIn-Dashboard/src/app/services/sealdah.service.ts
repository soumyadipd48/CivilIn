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
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SealdahService {

  errMsg : any;

  httpClient = inject(HttpClient);
  strengthObject!: StrengthObject;

  constructor(private toastr: ToastrService) { }

  getStrengthSealdahToday() : Observable<StrengthObject> {
    return this.httpClient.get<StrengthObject>('http://localhost:8080/getSealdahStrengthToday')
  }

  getSpecificArrestSealdahToday() : Observable<SpecificArrestObject> {
    return this.httpClient.get<SpecificArrestObject>('http://localhost:8080/getSealdahSpecificArrestToday')
  }

  getPreventiveArrestSealdahToday() : Observable<PreventiveArrestObject> {
    return this.httpClient.get<PreventiveArrestObject>('http://localhost:8080/getSealdahPreventiveArrestToday')
  }

  getUDCaseSealdahToday() : Observable<UDCaseObject> {
    return this.httpClient.get<UDCaseObject>('http://localhost:8080/getSealdahUDCasesToday')
  }

  getSeizureSealdahToday() : Observable<SeizureObject> {
    return this.httpClient.get<SeizureObject>('http://localhost:8080/getSealdahSeizureToday')
  }

  getFirCaseSealdahToday() : Observable<FirCaseObject> {
    return this.httpClient.get<FirCaseObject>('http://localhost:8080/getSealdahFIRCaseToday')
  }

  getAllDetailsSealdah() : Observable<AllDetailsObject> {
    return this.httpClient.get<AllDetailsObject>('http://localhost:8080/getSealdahAllDetailsToday')
  }

  getAllDetailsTempSealdah() : Observable<AllDetailsObject> {
    return this.httpClient.get<AllDetailsObject>('http://localhost:8080/getSealdahAllDetailsTempToday')
  }

  getDetailsCategoryMappingSealdah() : Observable<DetailsCategoryMappingObject> {
    return this.httpClient.get<DetailsCategoryMappingObject>('http://localhost:8080/getSealdahAllDetailsCategoryMappingToday')
  }

  // Fetch logs (ERROR level only)
    getErrorLogs(a : string): Observable<string[]> {
      let params = new HttpParams();
      params = params.append('time', a); 
      return this.httpClient.get<string[]>('http://localhost:8080/logs', { params });
    }

  deleteAllDataSealdahToday(){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'
    };
    this.httpClient
      .delete('http://localhost:8080/deleteSealdahAllDataToday', options)
      .subscribe((s) => {
        console.log(s);
    });
  }

  deleteAllDetailsTempSealdahToday(){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'
    };
    this.httpClient
      .delete('http://localhost:8080/deleteSealdahAllDetailsTempToday', options)
      .subscribe((s) => {
        console.log(s);
    });
  }

  UpdateSelectedHeadStrengthDataTodaySealdah(strength : Strength){
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

  UpdateAllDetailsDataTodaySealdah(allDetails : AllDetails){
    this.httpClient
      .patch('http://localhost:8080/updateAllDetailsDataTempTodaySealdah', allDetails)
      .subscribe({
        next : (data: any) => {
          console.log(data);
        },
        error : (error: { message: any; }) => {
        this.errMsg = error.message;
        }
      });
  }

  UpdatePreventiveArrestDataTodaySealdah(prevArrest : PreventiveArrest){
      this.httpClient
        .patch('http://localhost:8080/updatePreventiveArrestDataTempTodaySealdah', prevArrest)
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
