import { Component, OnInit } from '@angular/core';
import { PdfFile } from '../shared/lookup-interfaces/pdf-file';
import { ICountry } from '../shared/lookup-interfaces/country';
import { PdfFileService } from '../service/pdf-file.service';
import { HelperService } from '../service/helper.service';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { SearchPipe } from '../shared/search.pipe';
import { FormGroup, FormControl } from '@angular/forms';

export interface Terrorist {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public files: PdfFile[] = [];
  public countries: ICountry[] = [];

  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  sortBy: string[] = ['Topic', 'Country', 'Rating'];

  categoryForm: FormGroup;
  sortByForm: FormGroup;
  default = 'Most Popular';
  isHidden = false;
  tilte = 'Topic';
  step = null;
  searchText: string;

  terrorists: Terrorist[] = [
    {value: 'ISIS', viewValue: 'ISIS'},
    {value: 'al-Qaeda', viewValue: 'al-Qaeda'},
    {value: 'taliban', viewValue: 'Taliban'}
  ];

  ratingClicked: number;
  itemIdRatingClicked: string;

  selected: string;
  selectedData;
  isSelected = false;
  totalNumber: number;

  constructor(private pdfFileService: PdfFileService,
              private helperService: HelperService,
              private http: HttpClient) {
        this.categoryForm = new FormGroup({
        category: new FormControl(null)
      });
      // this.countryForm.controls['country'].setValue(this.default, {onlySelf: true});
      this.sortByForm = new FormGroup({
        sortBy: new FormControl(null)
      });
      this.sortByForm.controls['sortBy'].setValue(this.default, {onlySelf: true});
  }

  ngOnInit() {
    this.getPdfFiles();
    this.getCountries();
  }

  getPdfFiles() {
    this.pdfFileService.getPdfFiles()
        .subscribe(res => {
        this.files = res;
        console.log(this.files);
      });
    }

  getCountries() {
    this.helperService.getCountries()
        .subscribe(res => {
          console.log(res);
          this.countries = res;
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

  onSelect(val) {
    console.log(val);
    this.selectedData = this.files.filter(x => x.country === val);
    console.log(this.selectedData.length);
    this.totalNumber = this.selectedData.length;
    this.isSelected = true;
  }

  backToAll() {
    this.isSelected = false;
    this.selectedData = null;
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

