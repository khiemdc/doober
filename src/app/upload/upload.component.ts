import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PdfFileService } from '../service/pdf-file.service';
import { PdfFile } from '../shared/lookup-interfaces/pdf-file';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadService } from '../service/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public files: PdfFile[] = [];
  uploadForm: FormGroup;
  fileToUpload: File = null;
  filePath: string;
  todayDate;
  searchText: string;
  totalFilesUpload: number;

  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];

  constructor(private fb: FormBuilder,
              private pdfFileService: PdfFileService,
              private http: HttpClient,
              private fileUploadService: UploadService) { }

  ngOnInit() {
    this.createUploadForm();
    this.todayDate = new Date();
    this.pdfFileService.getPdfFiles()
    .subscribe(res => {
      this.files = res;
      this.totalFilesUpload = this.files.length;
      console.log(this.totalFilesUpload);
      });
  }

  private createUploadForm() {
    this.uploadForm = this.fb.group({
      fileName: null,
      title: '',
      description: ''
      });
  }

  handleFileInput(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.filePath = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  saveUpload(title: string, File: File) {
    console.log(this.uploadForm.value);
     this.fileUploadService.postFile(this.uploadForm.value.title, this.fileToUpload)
              .subscribe((res) => {
                console.log(res);
                }
    );
  }

}
