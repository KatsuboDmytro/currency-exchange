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
  currFrom: string = '';
  infoFrom: [] = [];

  inputTo: number = 1;
  currTo: string = '';
  infoTo: [] = [];

  @Input() currencies$!: Observable<ReturnedData[]>;

  constructor(private http: HttpClient) { }
  ngOnInit() { }

  onInputChange(e: Event): void{
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (target.id === 'inputFrom') {
      this.inputFrom = parseFloat(target.value);
    } else if (target.id === 'inputTo') {
      this.inputTo = parseFloat(target.value);
    }
    console.log(this.inputFrom);
    console.log(this.inputTo);
  }

  changeFrom(selectedValue: string): void {
    this.currencies$.pipe(
      map((curr: any[]) => {
        return curr.filter((item: any) => item.r030 == selectedValue ? this.inputFrom = item.rate : '');
      }),
      map((curr: any[]) => {
        return curr.filter((item: any) => item.r030 == selectedValue ? this.currFrom = item.cc : '');
      })
    ).subscribe((filteredItem: any) => {    
      this.infoFrom = filteredItem;
      console.log(this.infoFrom);
      console.log(this.inputFrom);
      console.log(this.currFrom);
    });
  
    console.log(selectedValue);
  }

  changeTo(selectedValue: string): void {
    this.currencies$.pipe(
      map((curr: any[]) => {
        return curr.filter((item: any) => item.r030 == selectedValue ? this.currTo = item.cc : '');
      })
    ).subscribe((filteredItem: any) => {
      this.infoTo = filteredItem;
      console.log(this.infoTo);
      console.log(this.currTo);
    });
  
    console.log(selectedValue);
  }
}
