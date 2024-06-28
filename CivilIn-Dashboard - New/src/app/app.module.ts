import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HomeComponent } from './components/home/home.component';
import { AssistanceListComponent } from './components/assistance-list/assistance-list.component';
import { ComplaintsListComponent } from './components/complaints-list/complaints-list.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BaseComponent } from './components/base/base.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { ModalModule} from 'ngx-bootstrap/modal'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule} from '@angular/common/http';
import { ComplaintsListNewComponent } from './components/complaints-list-new/complaints-list-new.component';
import { AssistanceListNewComponent } from './components/assistance-list-new/assistance-list-new.component'
import { DatePipe } from '@angular/common';
import { UsersListComponent } from './components/users-list/users-list.component';
import { GrpsListComponent } from './components/grps-list/grps-list.component';
import { MorningReportComponent } from './components/morning-report/morning-report.component';
import { ComplaintsWebComponent } from './components/complaints-web/complaints-web.component';
import { WindowService } from './services/window.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CodeComponent } from './components/code/code.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxPrintModule } from 'ngx-print';
import { NgxSearchPipeModule } from 'ngx-search-pipe';
import { OrderModule } from 'ngx-order-pipe';

export function loadCrucialData() {
  return function() {
    // or use UserService
    return delay(3000);
  }
}

export function delay(delay: number) {
  return function() {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PrivacyPolicyComponent,
    HomeComponent,
    AssistanceListComponent,
    ComplaintsListComponent,
    LoginComponent,
    LogoutComponent,
    VerifyEmailComponent,
    NavbarComponent,
    BaseComponent,
    ComplaintsListNewComponent,
    AssistanceListNewComponent,
    UsersListComponent,
    GrpsListComponent,
    MorningReportComponent,
    ComplaintsWebComponent,
    CodeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxSearchPipeModule, 
    NgxPaginationModule,
    FontAwesomeModule,
    HttpClientModule,
    AutocompleteLibModule,
    NgOtpInputModule,
    NgxPrintModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: loadCrucialData()
    },
    ScreenTrackingService,UserTrackingService,AuthService,DatePipe,WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
