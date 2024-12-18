import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 px-4">
        {/* Left Section: Logo or About */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold">Footer Title</h1>
          <p className="text-sm mt-2">
            Thank you to choose online voting system.
          </p>
        </div>

        {/* Center Section: Links */}
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="#" className="hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Contact
          </Link>
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="flex space-x-4">
          <Link
            href="#"
            className="hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="hover:text-blue-400 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagramSquare className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Sujal Rajput. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
