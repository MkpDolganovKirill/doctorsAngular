import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { EditDialogComponent } from 'src/app/components/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { IOrder } from 'src/app/interfaces/orders.interfaces';
import { dateForDisplayOnPage } from 'src/constants/format-date.constants';
import { displayedColumnsForOrderTable } from 'src/constants/table-displayed.constants';

@Component({
  selector: 'show-orders-main',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
})
export class ShowOrdersComponent implements OnInit {
  public readonly displayedColumns = displayedColumnsForOrderTable;
  public dateFormat = dateForDisplayOnPage;
  constructor(public orderService: OrderService, public dialog: MatDialog) {}
  public ngOnInit(): void {
    this.orderService.sortingRequestOptions.subscribe(() => {
      this.orderService.getAllOrders();
    });
  }
  openEditDialog(element: IOrder): void {
    this.dialog.open(EditDialogComponent, {
      width: '50%',
      data: { ...element },
    });
  }

  openDeleteDialog(id: string): void {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe((answer) => {
        if (answer) this.orderService.deleteOrder(id);
      });
  }
}
