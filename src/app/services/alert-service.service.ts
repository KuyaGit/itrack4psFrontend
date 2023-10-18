import { Injectable } from '@angular/core';
import  Swal  from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  constructor() { }

  public simpleAlert(
    icon: any,
    title: string,
    text: string,
    confirmCallback?: () => void,
    cancelCallback?: () => void
  ) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed && confirmCallback) {
        confirmCallback();
      } else if (result.isDismissed && cancelCallback) {
        cancelCallback();
      }
    });
  }

  public alertWithTimer(icon: any, title: string, text: string) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      confirmButtonColor: '#3085d6',
      timer: 2000,
    });
  }
}
