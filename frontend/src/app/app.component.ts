import { Component, OnInit } from '@angular/core';
import { CommonMethods } from './common-methods';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Production Management Application';

  loginStatus: boolean = false;


  ngOnInit() {
    let auth = CommonMethods.getItem("auth");
    if (auth) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }
  }
}
