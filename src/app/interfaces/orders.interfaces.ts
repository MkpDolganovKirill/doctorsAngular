export interface IDoctor {
  id?: string;
  fullname: string;
}

export interface IOrder {
  id: string;
  patient: string;
  doctor: IDoctor;
  ordersdate: string;
  complaints: string;
}
export interface ISortMethod {
  id: string;
  value: string;
  dateWith?: string;
  dateFor?: string;
}
