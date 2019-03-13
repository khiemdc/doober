import { Component, OnInit } from '@angular/core';
import { PdfFileService } from '../service/pdf-file.service';
import { PdfFile } from '../shared/pdfFile';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public files: PdfFile[] = [];

  ratingClicked: number;
  itemIdRatingClicked: string;

  constructor(private pdfFileService: PdfFileService,
    private http: HttpClient) { }

    ngOnInit() {
      this.pdfFileService.getPdfFiles()
      .subscribe(res => {
        this.files = res;
        console.log(this.files);
        });
    }

  ratingComponentClick(clickObj: any): void {
    const item = this.files.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.name;
    }

  }
}

