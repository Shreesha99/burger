import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "../../types";

export default function OrderPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;
    axios.get("/api/orders").then((res) => {
      const found = res.data.find((o: Order) => o.id === id);
      setOrder(found);
    });
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Placed!</h1>
      <p>Order ID: {order.id}</p>
      <div className="mt-2">
        {order.items.map((i) => (
          <div key={i.id}>
            {i.name} x {i.quantity} = ₹{i.price * i.quantity}
          </div>
        ))}
      </div>
      <div className="mt-2 font-semibold">Total: ₹{order.total}</div>
    </div>
  );
}
