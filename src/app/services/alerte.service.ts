import { Injectable } from '@angular/core';
import { Alert } from '../model/alert';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {
  alert: Alert | undefined;
  constructor() {}
  creatAlert(type: SweetAlertIcon, message: string,timer:number) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      title: message,
      icon: type
    })
  }
}
