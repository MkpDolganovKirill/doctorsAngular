import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/interfaces/orders.interfaces';
import { MainService } from 'src/app/services/main.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'show-orders-main',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
})
export class ShowOrdersComponent implements OnInit {
  public displayedColumns: string[] = ['patient', 'doctor', 'ordersdate', 'complaints', 'actions'];
  public nullOrNot: Array<IOrder> = [];
  constructor(public mainService: MainService, private httpService: HttpService) {}
  public ngOnInit(): void {
    this.httpService.getAllOrdersUser();
    this.mainService.ordersList.subscribe((list) => {
      this.nullOrNot = list;
    });
  }

  deleteOrder(element: IOrder) {
    this.httpService.deleteOrderFromServer(element);
    this.httpService.getAllOrdersUser();
  }
}
