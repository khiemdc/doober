import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RatingComponent } from './rating/rating.component';
import { HttpClientModule } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { SearchPipe } from './shared/search.pipe';
import { PdfFileService } from './service/pdf-file.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DetailComponent } from './home/detail.component';
import { ReviewComponent } from './review/review.component';
import { UploadComponent } from './upload/upload.component';
import { HelperService } from './service/helper.service';

@NgModule({
   declarations: [
      SearchPipe,
      AppComponent,
      HomeComponent,
      NavbarComponent,
      RatingComponent,
      DetailComponent,
      ReviewComponent,
      UploadComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      PdfViewerModule,
      AppRoutingModule,
      MDBBootstrapModule.forRoot(),
      MaterialModule,
      BrowserAnimationsModule
   ],
   schemas: [
      NO_ERRORS_SCHEMA
   ],
   providers: [
      PdfFileService,
      HelperService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
