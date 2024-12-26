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
export class SiliguriService {

  errMsg : any;

  httpClient = inject(HttpClient);
  strengthObject!: StrengthObject;

  constructor(private toastr: ToastrService) { }

  getStrengthSiliguriToday() : Observable<StrengthObject> {
    return this.httpClient.get<StrengthObject>('http://localhost:8080/getSiliguriStrengthToday')
  }

  getSpecificArrestSiliguriToday() : Observable<SpecificArrestObject> {
    return this.httpClient.get<SpecificArrestObject>('http://localhost:8080/getSiliguriSpecificArrestToday')
  }

  getPreventiveArrestSiliguriToday() : Observable<PreventiveArrestObject> {
    return this.httpClient.get<PreventiveArrestObject>('http://localhost:8080/getSiliguriPreventiveArrestToday')
  }

  getUDCaseSiliguriToday() : Observable<UDCaseObject> {
    return this.httpClient.get<UDCaseObject>('http://localhost:8080/getSiliguriUDCasesToday')
  }

  getSeizureSiliguriToday() : Observable<SeizureObject> {
    return this.httpClient.get<SeizureObject>('http://localhost:8080/getSiliguriSeizureToday')
  }

  getFirCaseSiliguriToday() : Observable<FirCaseObject> {
    return this.httpClient.get<FirCaseObject>('http://localhost:8080/getSiliguriFIRCaseToday')
  }

  getAllDetailsSiliguri() : Observable<AllDetailsObject> {
    return this.httpClient.get<AllDetailsObject>('http://localhost:8080/getSiliguriAllDetailsToday')
  }

  getAllDetailsTempSiliguri() : Observable<AllDetailsObject> {
    return this.httpClient.get<AllDetailsObject>('http://localhost:8080/getSiliguriAllDetailsTempToday')
  }

  getDetailsCategoryMappingSiliguri() : Observable<DetailsCategoryMappingObject> {
    return this.httpClient.get<DetailsCategoryMappingObject>('http://localhost:8080/getSiliguriAllDetailsCategoryMappingToday')
  }

  // Fetch logs (ERROR level only)
    getErrorLogs(a : string): Observable<string[]> {
      let params = new HttpParams();
      params = params.append('time', a); 
      return this.httpClient.get<string[]>('http://localhost:8080/logs', { params });
    }

  deleteAllDataSiliguriToday(){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'
    };
    this.httpClient
      .delete('http://localhost:8080/deleteSiliguriAllDataToday', options)
      .subscribe((s) => {
        console.log(s);
    });
  }

  deleteAllDetailsTempSiliguriToday(){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'
    };
    this.httpClient
      .delete('http://localhost:8080/deleteSiliguriAllDetailsTempToday', options)
      .subscribe((s) => {
        console.log(s);
    });
  }

  UpdateSelectedHeadStrengthDataTodaySiliguri(strength : Strength){
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

  UpdateAllDetailsDataTodaySiliguri(allDetails : AllDetails){
    this.httpClient
      .patch('http://localhost:8080/updateAllDetailsDataTempTodaySiliguri', allDetails)
      .subscribe({
        next : (data: any) => {
          console.log(data);
        },
        error : (error: { message: any; }) => {
        this.errMsg = error.message;
        }
      });
  }

  UpdatePreventiveArrestDataTodaySiliguri(prevArrest : PreventiveArrest){
      this.httpClient
        .patch('http://localhost:8080/updatePreventiveArrestDataTempTodaySiliguri', prevArrest)
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
