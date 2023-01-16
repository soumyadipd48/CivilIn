import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistanceListComponent } from './components/assistance-list/assistance-list.component';
import { BaseComponent } from './components/base/base.component';
import { ComplaintsListComponent } from './components/complaints-list/complaints-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'policy', component: PrivacyPolicyComponent },
  { path: 'base', component: BaseComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  //{ path: 'register', component: RegisterComponent },
  { path: 'complaints', component: ComplaintsListComponent, canActivate: [AuthGuard]  },
  { path: 'assistance', component: AssistanceListComponent, canActivate: [AuthGuard]  },
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  //{ path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
