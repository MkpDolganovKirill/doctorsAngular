export interface IDoctor {
  id?: string;
  fullname: string;
}

export interface IOrder {
  id: string;
  patient: string;
  doctor?: IDoctor;
  doctorId: string;
  ordersdate: string;
  complaints: string;
}

export interface ICreateOrder {
  patient: string;
  doctor: string;
  ordersdate: string;
  complaints: string;
}

export interface ISortMethod {
  id: string;
  value: string;
}

export interface ISortingOptions {
  sortMethod: string;
  sortType: string;
  dateWith: string;
  dateFor: string;
}

export interface IGetOrdersRequest {
  orders: IOrder[];
  doctors: IDoctor[];
}
