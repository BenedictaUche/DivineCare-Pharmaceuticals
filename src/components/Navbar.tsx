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
import { useAuth } from "../../context/auth/AuthContext";



const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { cartItems } = useCart();
  const router = useRouter();
  const { user } = useAuth();
  console.log(user)

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
  }

  return (
    <nav className="bg-white text-black shadow-md px-4 py-6 fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/divinecarelogo.png" alt="MedicaShop" className=" h-12" />
          {/* <span className="text-2xl font-bold">
            DivineCare<strong>Ogba</strong>
          </span> */}
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-gray-300 text-base font-medium">
            Home
          </Link>
          <Link href="#" className="hover:text-gray-300 text-base font-medium">
            About us
          </Link>
          <Link href="#" className="hover:text-gray-300 text-base font-medium">
            Shop
          </Link>
          <Link href="#" className="hover:text-gray-300 text-base font-medium">
            Contact us
          </Link>
          <div className="flex items-center gap-2">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer"><CircleUserRound size={24} className="text-[#22C55E]" /></MenubarTrigger>
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
              <ShoppingBasket size={24} className="text-[#22C55E]" />
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
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="#" className="hover:text-gray-300">
            About us
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Shop
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Contact us
          </Link>
          <div className="flex items-center gap-2">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer"><CircleUserRound size={24} className="text-[#22C55E]" /></MenubarTrigger>
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
              <ShoppingBasket size={24} className="text-[#22C55E]" />
              <span className="ml-2">{cartItems.length}</span>
            </div>
          </div>
        </div>
      )}

      {isCartModalOpen &&
      <CartModal
        open={isCartModalOpen}
        setOpen={setIsCartModalOpen}
        title="Your Cart"
      />}
    </nav>
  );
};

export default Navbar;
