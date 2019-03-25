import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfFileService } from '../service/pdf-file.service';
import { PdfFile } from '../shared/lookup-interfaces/pdf-file';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  public files: PdfFile[] = [];
  file: any;
  private routeSub: any;
  id: string;
  pdfQuery = '';
  error: any;
  pdf: any;
  renderText = true;
  searchText: string;

  filePath: string;

  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
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
}
