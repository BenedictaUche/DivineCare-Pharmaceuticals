import React from "react";
import { useCart } from "../../../context/CartContext";

const CartModal = ({ closeModal }: { closeModal: () => void }) => {
  const { cartItems, removeFromCart } = useCart();

  const handleCheckout = () => {
    const message = cartItems
      .map(
        (item) => `${item.quantity} x ${item.name} - $${item.price * item.quantity}`
      )
      .join("%0A");

    const whatsappUrl = `https://api.whatsapp.com/send?phone=1234567890&text=Order%20Summary:%0A${message}`;

    window.open(whatsappUrl, "_blank");
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-full max-w-md text-black">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-black">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.quantity} x {item.name}
                </span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
          {cartItems.length > 0 && (
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
