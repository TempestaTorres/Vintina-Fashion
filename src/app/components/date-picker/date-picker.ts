import {Component, EventEmitter, Output} from '@angular/core';
import {DateService} from '../../services/date-service';

@Component({
  selector: 'app-date-picker',
  imports: [],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DatePicker {

  @Output() dateChange = new EventEmitter();
  @Output() timeChange = new EventEmitter();

  public weekday: boolean[] = [false, false, false, false, false, false, false];
  public currentMonthAndYear: string = '';
  public currentYear: number = 0;
  public todayYear: number = 0;
  public todayMonth: number = 0;
  public currentMonth: number = 0;
  public currentDay: number = 0;

  public buttonPrevDisabled: boolean = false;

  public monthCalendar: number[] = [];
  public week1: number[] = [];
  public week2: number[] = [];
  public week3: number[] = [];
  public week4: number[] = [];
  public week5: number[] = [];
  public buttonEnabled1: boolean[] = [];
  public buttonEnabled2: boolean[] = [];
  public buttonEnabled3: boolean[] = [];
  public buttonEnabled4: boolean[] = [];
  public buttonEnabled5: boolean[] = [];
  public buttonToday1: boolean[] = [];
  public buttonToday2: boolean[] = [];
  public buttonToday3: boolean[] = [];
  public buttonToday4: boolean[] = [];
  public buttonToday5: boolean[] = [];
  public buttonActive1: boolean[] = [];
  public buttonActive2: boolean[] = [];
  public buttonActive3: boolean[] = [];
  public buttonActive4: boolean[] = [];
  public buttonActive5: boolean[] = [];


  constructor(public dateService: DateService) {}

  ngOnInit() {

    this.resetActiveButton();
    this.updateTodayCalender();
    this.buttonPrevDisabled = true;
  }

  private updateWeeks(): void {
    for (let i: number = 0; i <= this.monthCalendar.length; i++) {
      if (i < 7) {
        this.week1[i] = this.monthCalendar[i];
        this.buttonEnabled1[i] = this.monthCalendar[i] < this.currentDay;
        this.buttonToday1[i] = this.monthCalendar[i] === this.currentDay;
      }
      if (i >= 7 && i <= 13) {
        this.week2[i - 7] = this.monthCalendar[i];
        this.buttonEnabled2[i - 7] = this.monthCalendar[i] < this.currentDay;
        this.buttonToday2[i - 7] = this.monthCalendar[i] === this.currentDay;
      }
      if (i >= 14 && i <= 20) {
        this.week3[i - 14] = this.monthCalendar[i];
        this.buttonEnabled3[i - 14] = this.monthCalendar[i] < this.currentDay;
        this.buttonToday3[i - 14] = this.monthCalendar[i] === this.currentDay;
      }
      if (i >= 21 && i <= 27) {
        this.week4[i - 21] = this.monthCalendar[i];
        this.buttonEnabled4[i - 21] = this.monthCalendar[i] < this.currentDay;
        this.buttonToday4[i - 21] = this.monthCalendar[i] === this.currentDay;
      }
      if (i >= 28 && i <= 34) {
        this.week5[i - 28] = this.monthCalendar[i];
        this.buttonEnabled5[i - 28] = this.monthCalendar[i] < this.currentDay;
        this.buttonToday5[i - 28] = this.monthCalendar[i] === this.currentDay;
      }
    }
  }

  public buttonNextClick(): void {

    if (this.currentMonth < 11) {
      this.currentMonth++;
    }
    else {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.resetActiveButton();
    this.updateCalendar();

    this.buttonPrevDisabled = false;
  }

  public buttonPrevClick(): void {
    if (this.currentMonth > 0) {
      this.currentMonth--;
    }
    else if (this.currentMonth === 0 && this.currentYear !== this.todayYear) {
        this.currentYear--;
        this.currentMonth = 11;
    }

    if (this.currentYear === this.todayYear) {
      this.buttonPrevDisabled = true;
      this.updateTodayCalender();
    }
    else {
      this.updateCalendar();
    }
    this.resetActiveButton();
  }

  private updateTodayCalender(): void {
    this.currentMonthAndYear = this.dateService.getMonthAndYear();
    this.setCurrentDayOfWeek();
    this.currentYear = this.dateService.getYear();
    this.todayYear = this.currentYear;
    this.currentMonth = this.dateService.getMonth();
    this.todayMonth = this.currentMonth;
    this.currentDay = this.dateService.getDayNumber();
    this.monthCalendar = this.dateService.getMonthCalendar(this.currentMonth, this.currentYear);
    this.updateWeeks();
  }

  private updateCalendar(): void {
    this.currentMonthAndYear = this.dateService.getMonthName(this.currentMonth) + " " + this.currentYear;
    this.monthCalendar = this.dateService.getMonthCalendar(this.currentMonth, this.currentYear);
    this.updateCurrentDayOfWeek();
    this.updateWeeks();
  }

  private updateCurrentDayOfWeek(): void {
    this.resetWeekday();

    for (let i: number = 0; i < 7; i++) {
      if (this.monthCalendar[i] !== 0) {
        this.currentDay = this.monthCalendar[i];
        if (i === 6) {
          this.weekday[0] = true;
        }
        else {
          this.weekday[i + 1] = true;
        }
        break;
      }
    }
  }

  private resetWeekday(): void {
    for (let i: number = 0; i < this.weekday.length; i++) {
      if (this.weekday[i]) {
        this.weekday[i] = false;
        break;
      }
    }
  }

  private resetActiveButton(): void {
    for (let i: number = 0; i < 7; i++) {
      this.buttonActive1[i] = false;
      this.buttonActive2[i] = false;
      this.buttonActive3[i] = false;
      this.buttonActive4[i] = false;
      this.buttonActive5[i] = false;
    }
  }

  public onTimeChange(s: HTMLSelectElement): void {
    this.timeChange.emit(s.value);
  }

  public onDayPicked(day: number, buttonIndex: number): void {
    this.currentDay = day;
    this.updateTodayButton(buttonIndex);
    this.resetWeekday();

    for (let i: number = 0; i < 7; i++) {
      if (this.week1[i] === this.currentDay) {
        if (i === 6) {
          this.weekday[0] = true;
        }
        else {
          this.weekday[i + 1] = true;
        }
        break;
      }
    }
    let m = this.dateService.getMonthName(this.currentMonth);
    this.dateChange.emit({
      month: m,
      year: this.currentYear,
      day: this.currentDay,
    });
  }

  private updateTodayButton(buttonIndex: number): void {

    this.resetAllTodayButtons();
    this.resetActiveButton();

    if (buttonIndex < 7) {
      this.buttonActive1[buttonIndex] = true;
    }
    else if (buttonIndex >= 7 && buttonIndex <= 13) {
      this.buttonActive2[buttonIndex - 7] = true;
    }
    else if (buttonIndex >= 14 && buttonIndex <= 20) {
      this.buttonActive3[buttonIndex - 14] = true;
    }
    else if (buttonIndex >= 21 && buttonIndex <= 27) {
      this.buttonActive4[buttonIndex - 21] = true;
    }
    else if (buttonIndex >= 28 && buttonIndex <= 34) {
      this.buttonActive5[buttonIndex - 28] = true;
    }
  }

  private resetAllTodayButtons(): void {
    for (let i: number = 0; i < this.buttonToday1.length; i++) {
      this.buttonToday1[i] = false;
      this.buttonToday2[i] = false;
      this.buttonToday3[i] = false;
      this.buttonToday4[i] = false;
      this.buttonToday5[i] = false;
    }
  }

  private setCurrentDayOfWeek(): void {
    for (let index: number = 0; index < this.weekday.length; index++) {
      this.weekday[index] = false;
    }
    this.weekday[this.dateService.getDay()] = true;
  }
}
