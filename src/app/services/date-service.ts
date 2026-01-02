import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {

  public month: string[] = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  public weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  public getMonthCalendar(month: number, year: number): number[] {
    let monthCalendar: number[] = [];

    let lastDay: number = new Date(year, month + 1, 0).getDate();
    let firstDay: number = new Date(year, month, 1).getDay();

    if (firstDay === 0) {
      firstDay = 6;
    }
    else {
      firstDay--;
    }

    for (let i: number = 0; i < 35; i++) {
      if (i < firstDay) {
        monthCalendar[i] = 0;
      }
      else {
        if ((i - firstDay) < lastDay) {
          monthCalendar[i] = (i - firstDay) + 1;
        }
        else {
          monthCalendar[i] = 0;
        }
      }
    }

    return monthCalendar;
  }
  public getDateToday(): string {
    const today = new Date();
    let currentMonth: string = this.month[today.getMonth()];
    let currentYear: number = today.getFullYear();
    let day: number = today.getDate();
    return currentMonth + " " + day + "." + currentYear + " at  " + this.formatAMPM(today);
  }

  public getMonthAndYear(): string {
    const today = new Date();
    let currentMonth: string = this.month[today.getMonth()];
    let currentYear: number = today.getFullYear();

    return currentMonth + " " + currentYear;
  }

  public getMonthName(month: number): string {
    const today = new Date();
    return this.month[month];
  }
  public getDay(): number {
    const today = new Date();
    return today.getDay();
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

  public getDayOfWeekName(): string {
    const d = new Date();
    return this.weekday[d.getDay()];
  }
  public getDayAndMonth(): string {
    const today = new Date();
    let currentMonth: string = this.month[today.getMonth()];
    let day: number = today.getDate();
    return day + " " + currentMonth;
  }
  public getYear(): number {
    const today = new Date();
    return today.getFullYear();
  }
  public getMonth(): number {
    const today = new Date();
    return today.getMonth();
  }
  public getDayNumber(): number {
    const today = new Date();
    return today.getDate();
  }
  public getDaysInMonth (month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
}
