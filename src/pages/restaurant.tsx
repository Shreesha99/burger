import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "../types";

export default function Restaurant() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await axios.get("/api/orders");
    setOrders(res.data);
  };

  const clearOrder = async (id: string) => {
    await axios.post(`/api/orders/${id}/clear`);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurant Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border p-4 rounded shadow">
              <p>Order ID: {o.id}</p>
              {o.items.map((i) => (
                <div key={i.id}>
                  {i.name} x {i.quantity} = ₹{i.price * i.quantity}
                </div>
              ))}
              <div className="mt-2 font-semibold">Total: ₹{o.total}</div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => clearOrder(o.id)}
              >
                Clear Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
