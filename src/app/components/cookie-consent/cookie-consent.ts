import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cookie-consent',
  imports: [
    RouterLink
  ],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.css',
})
export class CookieConsent {

  public cookieActive: boolean = false;
  public cookieName: string = 'cookie-consent';

  constructor() {
  }

  ngOnInit() {

    let cname: string = this.getCookie(this.cookieName);

    setTimeout(() => {
      this.cookieActive = cname === "";
    }, 3000);
  }

  public rejectCookies(): void {
    this.cookieActive = false;
  }

  public acceptCookies(): void {
    this.cookieActive = false;
    this.setCookie();

  }

  private setCookie(): void {
    const d: Date = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires: string = "expires="+ d.toUTCString();
    document.cookie = this.cookieName + "=true;" + expires + ";path=/";
  }

  private getCookie(cname: string): string {
    let name: string = cname + "=";
    let decodedCookie: string = decodeURIComponent(document.cookie);
    let ca: string[] = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
      let c: string = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
