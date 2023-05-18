import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReturnedData } from 'src/app/interfaces/returned-data';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit{
  
  inputFrom: number = 1;
  rateFrom: number = 1;
  currFrom: string = '';
  infoFrom: [] = [];
  
  inputTo: number = 1;
  rateTo: number = 1;
  currTo: string = '';
  infoTo: [] = [];

  isRotated: boolean = false;
  whichInput: number = 1;

  @Input() currencies$!: Observable<ReturnedData[]>;

  constructor(private http: HttpClient) { }
  ngOnInit() {  }
  

  rotateImage(isRotated: boolean) {
    this.isRotated = !isRotated;
    console.log(this.isRotated);
  }

  onInputChange(e: Event): void{
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (target.id === 'inputFrom') {
      this.inputFrom = parseFloat(target.value);
      this.whichInput = 1;
    } else if (target.id === 'inputTo') {
      this.inputTo = parseFloat(target.value);
      this.whichInput = 2;
    }
    this.convertCurrency('');
  }

  convertCurrency(selectedValue: string) {
    let newAmount = 0;

    if(this.whichInput === 1){
      newAmount = this.inputFrom * (this.rateFrom / this.rateTo);
      this.inputTo = newAmount;
    } else if(this.whichInput === 2){
      newAmount = this.inputTo * (this.rateTo / this.rateFrom);
      this.inputFrom = newAmount;
    }

    this.currencies$.pipe(
      map((curr: any[]) => {
        return curr.filter((item: any) => item.r030 == selectedValue ? (
          (this.whichInput === 1) ? this.inputTo = newAmount : (this.whichInput === 2) ? this.inputFrom = newAmount : ''
        ) : '');
      })
    ).subscribe((filteredItem: any) => {    });
  }

  changeFrom(selectedValue: string): void {
    this.currencies$.pipe(
      map((curr: any[]) => {
        return curr.filter((item: any) => item.r030 == selectedValue ? this.rateFrom = item.rate : '');
      }),
      map((curr: any[]) => {
        return curr.filter((item: any) => item.r030 == selectedValue ? this.currFrom = item.cc : '');
      })
    ).subscribe((filteredItem: any) => {    
      this.convertCurrency(selectedValue);
    });
  }

  changeTo(selectedValue: string): void {
    this.currencies$.pipe(
      map((curr: any[]) => {
        return curr.filter((item: any) => item.r030 == selectedValue ? this.rateTo = item.rate : '');
      }),
      map((curr: any[]) => {
        return curr.filter((item: any) => item.r030 == selectedValue ? this.currTo = item.cc : '');
      })
    ).subscribe((filteredItem: any) => {
      this.infoTo = filteredItem;
      this.convertCurrency(selectedValue);
    });
  }
}
