export interface IProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  desc: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string | null;
  createdById: string;
  // order: IOrder; // Uncomment this if you have a circular reference and handle it appropriately
}
