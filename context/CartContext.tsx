import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./auth/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

type CartItem = {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      // Fetch cart items from Firestore
      const fetchCart = async () => {
        const cartDoc = await getDoc(doc(db, "carts", user.uid));
        if (cartDoc.exists()) {
          setCartItems(cartDoc.data().items);
        }
      };

      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const saveCartToFirebase = async (items: any) => {
    if (user) {
      await setDoc(doc(db, "carts", user.uid), { items });
    }
  };

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    saveCartToFirebase(updatedCart);
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.productId !== itemId);
    setCartItems(updatedCart);
    saveCartToFirebase(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
