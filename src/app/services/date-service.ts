import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {

  public getDateToday(): string {

    const month: string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const today = new Date();
    let currentMonth: string = month[today.getMonth()];
    let currentYear: number = today.getFullYear();
    let day: number = today.getDate();
    return currentMonth + " " + day + "." + currentYear + " at  " + this.formatAMPM(today);
  }

  public formatAMPM(date: Date): string {

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let ampm: string = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minutesFormatted: string | number = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutesFormatted + ' ' + ampm;
  }
}
