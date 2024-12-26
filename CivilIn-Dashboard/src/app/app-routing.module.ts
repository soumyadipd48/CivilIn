import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistanceListComponent } from './components/assistance-list/assistance-list.component';
import { BaseComponent } from './components/base/base.component';
import { ComplaintsListNewComponent } from './components/complaints-list-new/complaints-list-new.component';
import { ComplaintsListComponent } from './components/complaints-list/complaints-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AssistanceListNewComponent } from './components/assistance-list-new/assistance-list-new.component';
import { GrpsListComponent } from './components/grps-list/grps-list.component';
import { MorningReportComponent } from './components/morning-report/morning-report.component';
import { ComplaintsWebComponent } from './components/complaints-web/complaints-web.component';
import { CodeComponent } from './components/code/code.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MorningReportNewComponent } from './components/morning-report-new/morning-report-new.component';
import { MorningReportNewAnalysisComponent } from './components/morning-report-new-analysis/morning-report-new-analysis.component';
import { MorningReportViewOnlyComponent } from './components/morning-report-view-only/morning-report-view-only.component';

const routes: Routes = [
  { path: 'policy', component: PrivacyPolicyComponent },
  { path: 'base', component: BaseComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  //{ path: 'register', component: RegisterComponent },
  { path: 'complaints', component: ComplaintsListComponent, canActivate: [AuthGuard]  },
  { path: 'complaintsNew', component: ComplaintsListNewComponent, canActivate: [AuthGuard]  },
  { path: 'assistance', component: AssistanceListComponent, canActivate: [AuthGuard]  },
  { path: 'assistanceNew', component: AssistanceListNewComponent, canActivate: [AuthGuard]  },
  { path: 'GRPS', component: GrpsListComponent, canActivate: [AuthGuard]  },
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  //{ path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'morning-report', component: MorningReportComponent},
  { path: 'morning-report-new', component: MorningReportNewComponent},
  { path: 'morning-report-view', component: MorningReportNewAnalysisComponent},
  { path: 'morning-report-viewOnly', component: MorningReportViewOnlyComponent},
  { path: 'complaints_web', component: ComplaintsWebComponent },
  { path: 'code', component: CodeComponent },
  { path: 'dash', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
