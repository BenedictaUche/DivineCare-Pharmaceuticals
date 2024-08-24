import { Mail, Phone } from "lucide-react";
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">
        {/* Logo and Description */}
        <div className="md:w-1/3">
          <img src="/images/divinecarelogo.png" alt="MedicaShop" className="mb-6 h-12" />
          <p className="text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Contact Information */}
        <div className="md:w-1/3">
          <h3 className="font-semibold text-xl mb-4 text-white">Get in touch</h3>
          <p className="text-gray-400">
            4, Adeyemi Alao Str., Oke-Ira Ogba
            <br />
            Lagos - Nigeria
          </p>
          <div className="mt-4">
            <Link
              href="mailto:divinecareogba@gmail.com"
              className="flex items-center text-gray-400 hover:text-[#009E7F] transition-colors"
            >
              <Mail size={20} className="mr-2" />
              divinecareogba@gmail.com
            </Link>
            <Link
              href="tel:+2348108085857"
              className="flex items-center mt-4 text-gray-400 hover:text-[#009E7F] transition-colors"
            >
              <Phone size={20} className="mr-2" />
              +2348108085857
            </Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="md:w-1/3">
          <h3 className="font-semibold text-xl mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-6">
            <Link href="#" aria-label="Facebook" className="hover:text-[#009E7F]">
              <Facebook size={28} className="h-7 w-7 text-gray-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-[#009E7F]">
              <Instagram size={28} className="h-7 w-7 text-gray-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-[#009E7F]">
              <Twitter size={28} fill="#009E7F" className="h-7 w-7 text-gray-400 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6 mt-8">
        <p className="text-gray-500 text-sm text-center md:text-left">
          &copy; 2024 DivineCarePharmaceuticalsOgba, All rights reserved. Powered by techwriterb.
        </p>
        <div className="flex space-x-6 items-center mt-4 md:mt-0">
          <Link href="#" className="text-gray-500 text-sm hover:text-[#009E7F] transition-colors">
            Privacy Policy
          </Link>
          <a href="#" className="text-gray-500 text-sm hover:text-[#009E7F] transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
