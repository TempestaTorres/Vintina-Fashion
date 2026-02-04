import { Component } from '@angular/core';
import {ObserveElementDirective} from '../../directives/scroll-observer';
import {NgClass} from '@angular/common';
import {Collections, ICollectionType} from './collection-types';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'ng-app-collection',
  imports: [
    ObserveElementDirective,
    NgClass,
    RouterLink,
  ],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
  standalone: true
})
export class Collection {

  public readonly collections:ICollectionType[] = Collections;

  isIntersecting (status: boolean, element: HTMLElement) {
    if (status) {
      element.classList.remove('app-invisible');
    }
  }
}
