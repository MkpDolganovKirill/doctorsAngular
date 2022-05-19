import { Component } from '@angular/core';
import { IOrder } from 'src/app/interfaces/orders.interfaces';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'show-orders-main',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
})
export class ShowOrdersComponent {
  public nullOrNot: Array<IOrder> = [
    {
      id: 'string',
      patient: 'string',
      doctor: {
        fullname: 'sdfklsdkfl',
      },
      ordersdate: 'string',
      complaints: 'string',
    },
  ];
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(public mainService: MainService) {}

  public ngOnInit(): void {
    this.mainService.ordersList.subscribe((list) => {
      this.nullOrNot = list;
    })
  }
}
