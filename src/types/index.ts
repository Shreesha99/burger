export type MenuItem = {
  id: string;
  name: string;
  price: number;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "served";
};
