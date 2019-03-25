import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Terrorist {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  sortBy: string[] = ['Topic', 'Country', 'Rating'];

  categoryForm: FormGroup;
  sortByForm: FormGroup;
  default = 'Most Popular';
  isHidden = false;
  tilte = 'Topic';
  step = null;

  terrorists: Terrorist[] = [
    {value: 'ISIS', viewValue: 'ISIS'},
    {value: 'al-Qaeda', viewValue: 'al-Qaeda'},
    {value: 'taliban', viewValue: 'Taliban'}
  ];
    constructor() {
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
