import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDoctor } from '../interfaces/orders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  public doctorsList = new BehaviorSubject<IDoctor[]>([]);
}
