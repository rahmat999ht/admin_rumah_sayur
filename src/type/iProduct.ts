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
}
