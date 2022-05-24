import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { ApiService } from 'src/app/services/api.service';
import { EditDialogComponent } from 'src/app/components/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { IOrder } from 'src/app/interfaces/orders.interfaces';

@Component({
  selector: 'show-orders-main',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
})
export class ShowOrdersComponent implements OnInit {
  public readonly displayedColumns: string[] = [
    'patient',
    'doctor',
    'ordersdate',
    'complaints',
    'actions',
  ];
  constructor(
    private httpService: ApiService,
    public orderService: OrderService,
    public dialog: MatDialog,
  ) {}
  public ngOnInit(): void {
    this.orderService.sortingRequestOptions.subscribe(() => {
      this.httpService.getAllOrdersUser();
    });
  }
  openEditDialog(element: IOrder): void {
    this.dialog.open(EditDialogComponent, {
      width: '50%',
      data: { ...element },
    });
  }

  openDeleteDialog(element: IOrder): void {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe((answer) => {
        if (answer) this.httpService.deleteOrderFromServer(element);
      });
  }
}
