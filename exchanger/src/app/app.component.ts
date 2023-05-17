import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReturnedData } from 'src/app/interfaces/returned-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'exchanger';
  @Input() currencies$!: Observable<ReturnedData[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.currencies$ = this.http.get<ReturnedData[]>('https://63f6813d9daf59d1ad8a1d22.mockapi.io/spam').pipe(
      map((data: ReturnedData[]) => data)
    );
  }
}
