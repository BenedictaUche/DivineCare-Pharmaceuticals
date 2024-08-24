import { Mail, Phone } from "lucide-react";
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="container flex justify-between gap-8 items-center">
        {/* Logo and Description */}
        <div>
          <img src="/images/logo.svg" alt="MedicaShop" className="mb-4" />
          <p className="text-gray-600 w-[70ch]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Contact Information */}
        <div className="">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Get in touch
          </h3>
          <p className="text-gray-600 mt-4">
            4, Adeyemi Alao Str., Oke-Ira Ogba
            <br />
            Lagos - Nigeria
          </p>
          <p className="text-gray-600 mt-4">
            <a
              href="mailto:divinecareogba@gmail.com"
              className="flex items-center"
            >
              <Mail size={24} className="mr-2" /> divinecareogba@gmail.com
            </a>
            <a href="tel:+2348108085857" className="flex items-center mt-4">
              <Phone size={24} className="mr-2" /> +2348108085857
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto flex justify-between items-center border-t pt-6 mt-10">
        <p className="text-gray-600 text-sm">
          Copyright © 2024 DivineCarePharmaceuticalsOgba, All rights reserved.
          Powered by techwriterb.
        </p>
        <div className="flex space-x-4 items-center">
          <a href="#">
            <Facebook size={24} className="h-6 text-[#009E7F]" />
          </a>
          <a href="#">
            <Instagram size={24} className="h-6 text-[#009E7F]" />
          </a>
          <a href="#">
            <Twitter size={24} fill="#009E7F" className="h-6 text-[#009E7F]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
