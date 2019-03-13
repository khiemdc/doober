import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PdfFile } from '../shared/pdfFile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfFileService {

constructor(private http: HttpClient) { }

public getPdfFiles(): Observable<PdfFile[]>{
  // return this.http.get<PdfFile[]>('http://localhost:41516/api');
  return this.http.get<PdfFile[]>('../../src/app/shared/files.json');
}



}

