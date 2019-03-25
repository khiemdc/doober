import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  postFile(title: string, fileToUpload: File) {
    const endpoint = 'https://localhost:44394/api/Files/upload';
    const formData: FormData = new FormData();
    formData.append('uploadedFile', fileToUpload, fileToUpload.name);
    console.log('Title is: ' + title);
    const httpOptions = {headers: new HttpHeaders()};
    return this.http.post<File>(endpoint + '?title=' + title, formData, httpOptions);
  }
}
