import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

interface ISnackBarOptions {
  duration?: number;
  verticalPosition?: MatSnackBarVerticalPosition;
  horizontalPosition?: MatSnackBarHorizontalPosition;
}

export interface ISnackBar {
  message: string;
  action: string;
  optional?: ISnackBarOptions;
}
