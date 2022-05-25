import { ISnackBar } from 'src/app/interfaces/snackbar.interface';

export const snackBarNotConnect: ISnackBar = {
  message: 'Подключение к серверу отсутствует',
  action: 'Закрыть',
  optional: {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  },
};

export const snackBarNotExistUser: ISnackBar = {
  message: 'Пользователь уже существует',
  action: 'Закрыть',
  optional: {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  },
};

export const snackBarUnknownUser: ISnackBar = {
  message: 'Неверное имя пользователя или пароль',
  action: 'Закрыть',
  optional: {
    duration: 100000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  },
};

export const snackBarDeletedOrder: ISnackBar = {
  message: 'Данный прием не существует',
  action: 'Закрыть',
  optional: {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  },
};
