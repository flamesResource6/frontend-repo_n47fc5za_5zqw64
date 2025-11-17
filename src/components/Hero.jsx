import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[1100px] rounded-full bg-gradient-to-r from-blue-200/60 to-purple-200/60 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
          >
            Book stays that feel like you
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600"
          >
            A fresh, youthful way to find hotels and home stays. Clean design, fast
            search, and delightful animations.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-video rounded-2xl bg-white/70 backdrop-blur border shadow-lg overflow-hidden">
            <div className="h-full w-full grid grid-cols-3 gap-2 p-3">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="h-20 rounded-lg bg-gradient-to-br from-indigo-100 to-blue-100"
                />
              ))}
            </div>
          </div>
          <div className="absolute -z-10 -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-200/60 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
