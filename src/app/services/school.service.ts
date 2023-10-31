import { Injectable } from '@angular/core';
import { schoolname } from './data';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schoolnameList : schoolname[] = [
    {
      schoolName: 'St. Elizabeth School of Mabini'
    },
    {
      schoolName: 'Lady Fatima Montessori School'
    },
    {
      schoolName: 'Saint Francis Academy'
    },
    {
      schoolName: 'Mabini Central School'
    },
    {
      schoolName: 'Anselmo A. Sandoval Memorial National Highschool'
    },
    {
      schoolName: 'Santa Fe Integrated School'
    },
    {
      schoolName: 'Mabini College of Batangas'
    },
    {
      schoolName: 'Apolinario Mabini National High School'
    },
    {
      schoolName: 'Anilao Elementary School'
    },
    {
      schoolName: 'Solo Elementary School'
    },
    {
      schoolName: 'San Teodoro Elementary School'
    },
    {
      schoolName: "St. Lucrecia's School"
    },
    {
      schoolName: 'Bagalangit, Elementary, School'
    },
    {
      schoolName: 'San Juan-Sto. Niño Elementary School'
    },
    {
      schoolName: 'Laurel Elementary School'
    },
    {
      schoolName: 'Mainit Elementary School'
    },
    {
      schoolName: 'Panay Elementary School'
    },
    {
      schoolName: 'Talaga Elementary School'
    },
    {
      schoolName: 'Malimatoc Elementary School'
    },
    {
      schoolName: 'Batangas State University - TNEU Mabini Campus'
    }
  ];

  getSchoolNames(): schoolname[] {
    return this.schoolnameList;
  }
}
