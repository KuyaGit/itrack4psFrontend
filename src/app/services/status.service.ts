import { Injectable } from '@angular/core';
import { statusNames } from './data';
@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusList : statusNames[] = [
    {
      value: 1,
      status: 'Elementary Student'
    },
    {
      value: 2,
      status: 'Elementary Graduate continue studying Junior High School'
    },
    {
      value: 3,
      status: 'Junior High School Graduate continue studying Senior High School'
    },
    {
      value: 4,
      status: 'Senior High School Graduate'
    },
    {
      value: 5,
      status: 'Senior High School Graduate continue studying College'
    },
    {
      value: 6,
      status: 'Senior High School Graduate continue studying TESDA'
    },
    {
      value: 7,
      status: 'Junior High School Graduate continue studying TESDA'
    },
    {
      value: 8,
      status: 'Senior High School Graduate Working Now'
    },
    {
      value: 9,
      status: 'College Graduate'
    },
    {
      value: 10,
      status: 'College Graduate and Working Now'
    },
    {
      value: 11,
      status: 'TESDA Graduate'
    },
    {
      value: 12,
      status: 'Junior High School Graduate Working Now'
    }
  ];

  getStatusList(): statusNames[] {
    return this.statusList;
  }
  constructor() { }
}
