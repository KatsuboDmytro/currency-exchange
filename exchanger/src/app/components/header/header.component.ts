import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReturnedData } from 'src/app/interfaces/returned-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  usdPrice: string = '';
  eurPrice: string = '';
  
  @Input() currencies$!: Observable<ReturnedData[]>;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.price('USD');
    this.price('EUR');
  }

price(selectedValue: string): void {
  this.currencies$.pipe(
    map((curr: any[]) => {
      const filteredItem = curr.find((item: any) => item.cc === selectedValue);
      if (filteredItem) {
        if (selectedValue === 'USD') {
          this.usdPrice = filteredItem.rate;
        } else if (selectedValue === 'EUR') {
          this.eurPrice = filteredItem.rate;
        }
      }
    })
  ).subscribe(() => {
    console.log(this.usdPrice);
    console.log(this.eurPrice);
  });
}


}