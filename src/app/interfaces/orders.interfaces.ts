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
