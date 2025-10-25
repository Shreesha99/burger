"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const menu = [
  { id: "1", name: "Burger", price: 100 },
  { id: "2", name: "Sandwich", price: 80 },
  { id: "3", name: "Kebab", price: 150 },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  const addToCart = (item: any) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");

    try {
      const res = await axios.post("/api/payu/create", {
        amount: total,
        firstname: "Test Customer",
        email: "test@example.com",
        phone: "9999999999",
        productinfo: "Burger Order",
      });

      const form = document.createElement("form");
      form.method = "POST";
      form.action = res.data.action;

      const fields = {
        key: res.data.key,
        txnid: res.data.txnid,
        amount: res.data.amount,
        firstname: res.data.firstname,
        email: res.data.email,
        phone: res.data.phone,
        productinfo: res.data.productinfo,
        surl: res.data.surl,
        furl: res.data.furl,
        hash: res.data.hash,
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-3 gap-4">
        {menu.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Cart</h2>
          {cart.map((c) => (
            <div key={c.id}>
              {c.name} x {c.quantity} = ₹{c.price * c.quantity}
            </div>
          ))}
          <div className="mt-2 font-semibold">Total: ₹{total}</div>
          <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
