/* eslint-disable jsx-a11y/anchor-is-valid */
import { motion } from "framer-motion";
import ChatBot
 from "./ChatBot";

const Footer = () => {
  return (

    <>
     <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white py-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Your Tailor</h3>
            <p className="text-gray-400">
              Elevate your wardrobe with cutting-edge fashion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/checkout" className="text-gray-400 hover:text-white transition-colors">
                  Checkout
                </a>
              </li>
              <li>
                <a href="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 rounded-l-lg bg-gray-800 text-white border-none focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-white text-gray-900 rounded-r-lg hover:bg-gray-200 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Your Tailor. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 5.5 4.46 9.96 9.96 9.96s9.96-4.46 9.96-9.96c0-5.5-4.46-9.96-9.96-9.96zm0 1.5c4.69 0 8.46 3.77 8.46 8.46s-3.77 8.46-8.46 8.46-8.46-3.77-8.46-8.46 3.77-8.46 8.46-8.46zm-1.5 3.75v3h-3v1.5h3v3h1.5v-3h3v-1.5h-3v-3h-1.5z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.87 8.14 6.84 9.45-.09-.08-.17-.36-.17-.74v-2.6c-.42.08-.86.13-1.31.13-1.01 0-1.93-.78-1.93-1.74 0-.96.78-1.74 1.74-1.74.49 0 .93.19 1.24.51 1.16-.41 2.31-1.07 3.39-2.03-.41-.65-.65-1.43-.65-2.25 0-1.95 1.34-3.54 3-3.54.84 0 1.6.37 2.13.96.66-.13 1.28-.47 1.84-.94-.22.68-.68 1.25-1.28 1.62.59-.07 1.15-.23 1.67-.47-.39.59-.89 1.1-1.47 1.51v.38c0 2.34-1.66 5.28-4.71 5.28-.95 0-1.84-.28-2.59-.75h.56c1.09 0 2.09-.41 2.87-1.09-.99-.02-1.84-.71-2.13-1.66h.44c.69 0 1.31-.22 1.84-.59-.66-.2-1.22-.62-1.5-1.22.25.04.5.06.75.06.36 0 .71-.05 1.03-.15-1.09-.22-1.91-1.19-1.91-2.31v-.03c.31.18.66.28 1.03.28-.66-.44-1.09-1.19-1.09-2.03 0-.44.12-.84.31-1.19 1.19 1.47 2.97 2.44 4.97 2.54-.04-.19-.06-.38-.06-.56 0-1.34 1.09-2.44 2.44-2.44.72 0 1.37.31 1.84.81.56-.11 1.09-.31 1.56-.59-.19.56-.59 1.03-1.09 1.34.5-.06 1-.22 1.44-.44-.34.5-.78.94-1.28 1.25v5.47c0 5.5-4.46 9.96-9.96 9.96z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>

    <ChatBot/>
    </>
   

    
  );
};

export default Footer;