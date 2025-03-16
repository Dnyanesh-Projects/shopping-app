import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductListing from "@/pages/ProductListing";
import CartPage from "@/pages/CartPage";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  // Fetch cart from localStorage safely
  const [cart, setCart] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product: any) => {
    setCart((prev: any[]) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success("Added to cart!");
  };

  // Update cart (change quantity or remove item)
  const updateCart = (id: number, quantity: number) => {
    setCart((prev: any[]) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Number(quantity) } : item))
        .filter((item) => item.quantity > 0) // Remove if quantity is 0
    );
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ProductListing addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} updateCart={updateCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
