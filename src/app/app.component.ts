import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private database: DatabaseService) { }

  gotData: Object[] = [];
  ngOnInit() {
    // console.log(this.database.fetchData());
    // this.database.fetchData().then((value) => {
    //   this.gotData.push(...(<[]>value));
    //   console.log(value);
    // });

    // this.database.putData({ first: 'hehe', last: 'haha' });
    this.database.fetchQueryData();
  }
}
