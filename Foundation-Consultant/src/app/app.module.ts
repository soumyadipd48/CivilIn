import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { CarouselModule } from './carousel/carousel.module';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MdbCheckboxModule,
    CarouselModule,
    NgImageSliderModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
