import { useState } from "react";
import Link from "next/link";
import { AlignJustify, X, CircleUserRound, ShoppingBasket } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { logout } from "../../context/auth/auth";
import CartModal from "./Modals/CartModal";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { cartItems } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
  }

  return (
    <nav className="bg-[#009e7f] text-white px-4 py-6 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold">
            medica<strong>shop</strong>
          </span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#" className="hover:text-gray-300 text-lg font-medium">
            Home
          </a>
          <a href="#" className="hover:text-gray-300 text-lg font-medium">
            About us
          </a>
          <a href="#" className="hover:text-gray-300 text-lg font-medium">
            Shop
          </a>
          <a href="#" className="hover:text-gray-300 text-lg font-medium">
            Contact us
          </a>
          <div className="flex items-center gap-4">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer"><CircleUserRound size={24} /></MenubarTrigger>
                <MenubarContent>
                  <MenubarItem className="cursor-pointer">
                    <Link href="/auth/signup">Sign up</Link>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer">
                    <Link href="/auth/signin">Login</Link></MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <div onClick={() => setIsCartModalOpen(true)} className="cursor-pointer inline-flex items-center gap-1">
              <ShoppingBasket size={24} />
              <span className="ml-2">{cartItems.length}</span>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={24} /> : <AlignJustify size={24} />}
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            About us
          </a>
          <a href="#" className="hover:text-gray-300">
            Shop
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact us
          </a>
        </div>
      )}

      {isCartModalOpen && <CartModal closeModal={() => setIsCartModalOpen(false)} />}
    </nav>
  );
};

export default Navbar;
