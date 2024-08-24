import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/auth/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };

const CartModal = ({
    title,
    open,
    setOpen,
    className,
  }: ModalProps) => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();
  console.log(cartItems)

  const handleCheckout = () => {
    if (!user) {
      alert("You need to sign in to proceed with checkout.");
      return;
    }

    const message = cartItems
      .map(
        (item) => `${item.quantity} x ${item.productName} - ₦${item.productPrice * item.quantity}`
      )
      .join("%0A");

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=Order%20Summary:%0A${message}`;

    window.open(whatsappUrl, "_blank");
    setOpen;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pb-4 sm:rounded-none">
        <DialogHeader>
          <DialogTitle
            className={`font-bold flex items-center text-center pb-5 text-xl ${className}`}
          >
            {title}
          </DialogTitle>
          <div>
          {/* <h2 className="text-2xl font-bold mb-4">Your Cart</h2> */}
        {!user ? (
          <p className="text-red-500 mb-4">Please sign in to view your cart.</p>
        ) : cartItems.length === 0 ? (
          <p className="text-black">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>
                  {item.quantity} x {item.productName}
                </span>
                <span>₦{item.productPrice * item.quantity}</span>
              </li>
            ))}
            <hr />
            <li className="flex justify-between my-2">
                <span>Total:</span>
                <span>
                ₦{cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0)}
                </span>
            </li>
          </ul>
        )}
        <div className="flex justify-between mt-4">

          {user && cartItems.length > 0 && (
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Checkout
            </button>
          )}
        </div>
          </div>
        </DialogHeader>
        </DialogContent>
      {/* <div className="bg-white p-8 rounded-md w-full max-w-md text-black">

      </div> */}
    </Dialog>
  );
};

export default CartModal;
