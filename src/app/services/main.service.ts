import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDoctor, IOrder } from '../interfaces/orders.interfaces';
import { ISnackBar } from '../interfaces/snackbar.interface';
import { IAuth } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public isLoading = new BehaviorSubject<boolean>(false);
  public showSnackBar = new BehaviorSubject<ISnackBar | null>(null);
  public doctorsList = new BehaviorSubject<IDoctor[]>([]);
  public ordersList = new BehaviorSubject<IOrder[]>([
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdsdf',
      patient: 'sdfsdf',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdf',
      complaints: 'sdfsdfs',
    },
    {
      id: 'sdfsdsdf',
      patient: 'sdfsdf',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdf',
      complaints: 'sdfsdfs',
    },
    {
      id: 'sdfsdsdf',
      patient: 'sdfsdf',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdf',
      complaints: 'sdfsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
    {
      id: 'sdfsdfjsgkl;sdflghskldgfdskjldf',
      patient: 'sdfjkds',
      doctor: { fullname: 'dsfsdfsd' },
      ordersdate: 'dsfsdsfgsdgdsgdf',
      complaints: 'sdfsddsgsdfgsdfs',
    },
  ]);
  public newTokens = new BehaviorSubject<IAuth>({ accesstoken: '', refreshtoken: '' });
}
