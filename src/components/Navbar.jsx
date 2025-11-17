import { Menu, Hotel, Plane } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow"
            >
              <Hotel className="h-5 w-5" />
            </motion.span>
            <span className="absolute -right-2 -bottom-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white">
              <Plane className="h-3 w-3" />
            </span>
          </div>
          <span className="font-semibold text-lg tracking-tight">StayHub</span>
        </div>
        <button className="inline-flex sm:hidden items-center gap-2 px-3 py-2 rounded-md border hover:bg-gray-50 text-sm">
          <Menu className="h-5 w-5" />
          Menu
        </button>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <a href="#book" className="hover:text-gray-900 transition">Book</a>
          <a href="#features" className="hover:text-gray-900 transition">Features</a>
          <a href="#contact" className="hover:text-gray-900 transition">Contact</a>
          <a href="#" className="ml-4 inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-black/90 transition">Sign in</a>
        </nav>
      </div>
    </motion.header>
  );
}
