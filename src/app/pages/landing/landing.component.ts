import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    data: Date = new Date();
    name: string = '';
    email: string = '';
    message: string = '';
    sent: boolean = false;
    private url: URL;

    constructor(private http: HttpClient) {
      this.url = new URL(window.location.href);
    }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
  }

  ngOnDestroy(){
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }

  /**
   * Send mail relay for contact form.
   *
   * @param contact
   */
  sendMessage(contact: NgForm) {
    const headers: any = {
      "X-Api-Key": "5zVlYaXFU41cRvPZeFYd3akE2cMj5YD9ao27AEFd",
      "Content-Type": "application/json"
    };
    const apiUrl: string = "https://sentinels.realrxapis.com/v1/prod/api/controllers/mail/relay";

    let payload: any = {
      subject: "SENTINELS - Stoic Technology Group",
      recipient: "mark@korberos.com",
      expedite: contact.value.expedite,
      message: contact.value
    };

    // Post mail to relay API.
    this.http.post<any>(apiUrl, JSON.stringify(payload), { headers })
      .subscribe(
        (data) => {
          this.sent = true;
          console.log(data);

        },
        (error) => { console.error(error); }
      );
  }
}
