import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Clock, Map } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Secure & Trusted", text: "Book with confidence. Your data is safe and your stay is guaranteed." },
  { icon: Sparkles, title: "Modern Experience", text: "Clean, youthful design with smooth micro-interactions throughout." },
  { icon: Clock, title: "Fast Search", text: "Instant results with intelligent filtering for hotels and homes." },
  { icon: Map, title: "Curated Picks", text: "Hand-picked stays in trending neighborhoods worldwide." },
];

export default function Features() {
  return (
    <section id="features" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border bg-white/80 backdrop-blur p-5 shadow hover:shadow-md transition"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1.5 text-sm text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
