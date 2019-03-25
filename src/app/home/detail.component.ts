import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfFileService } from '../service/pdf-file.service';
import { PdfFile } from '../shared/lookup-interfaces/pdf-file';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

export interface Terrorist {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./home.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public files: PdfFile[] = [];
  file: any;
  private routeSub: any;
  id: string;
  pdfQuery = '';
  error: any;
  pdf: any;
  renderText = true;
  step = null;

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  terrorists: Terrorist[] = [
    {value: 'ISIS', viewValue: 'ISIS'},
    {value: 'al-Qaeda', viewValue: 'al-Qaeda'},
    {value: 'taliban', viewValue: 'Taliban'}
  ];

  constructor(private pdfFileService: PdfFileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      // console.log(params);
      this.id = params['id'];
      this.pdfFileService.getPdfFiles()
    .subscribe(res => {
      this.files = res.filter(item => {
          if (item.id === this.id ) {
            this.file = item;
            console.log(this.file);
          }
        });
      });
    });
  }

  searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true
      });
    }
  }

ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
}
