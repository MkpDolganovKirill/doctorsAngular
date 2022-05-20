import { Component } from '@angular/core';
import { IOrder } from 'src/app/interfaces/orders.interfaces';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'show-orders-main',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
})
export class ShowOrdersComponent {
  displayedColumns: string[] = [
    'demo-position',
    'demo-name',
    'demo-weight',
    'demo-symbol',
    'actions',
  ];
  public nullOrNot: Array<IOrder> = [];
  constructor(public mainService: MainService) {}
  public ngOnInit(): void {
    console.log(this.mainService.ordersList.getValue().length);
    this.mainService.ordersList.subscribe((list) => {
      this.nullOrNot = list;
    });
  }
}
