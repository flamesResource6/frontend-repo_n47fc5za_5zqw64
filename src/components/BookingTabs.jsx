import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Mail, Building2, Home, MapPin } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

function Input({ icon: Icon, label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="mt-1.5 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Icon className="h-4 w-4" />
        </div>
        <input
          {...props}
          className="w-full pl-10 pr-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white/80"
        />
      </div>
    </label>
  );
}

function DateInput({ label, icon: Icon, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="mt-1.5 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Icon className="h-4 w-4" />
        </div>
        <input
          type="date"
          {...props}
          className="w-full pl-10 pr-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white/80"
        />
      </div>
    </label>
  );
}

export default function BookingTabs() {
  const [active, setActive] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);

    if (active === "hotel") {
      const payload = {
        full_name: form.get("full_name"),
        email: form.get("email"),
        destination: form.get("destination"),
        check_in: form.get("check_in"),
        check_out: form.get("check_out"),
        guests: Number(form.get("guests")),
        rooms: Number(form.get("rooms")),
        room_type: form.get("room_type") || null,
        special_requests: form.get("special_requests") || null,
      };
      await postBooking("/api/bookings/hotel", payload);
    } else {
      const payload = {
        guest_name: form.get("guest_name"),
        email: form.get("email"),
        listing_name: form.get("listing_name") || null,
        location: form.get("location"),
        check_in: form.get("check_in"),
        check_out: form.get("check_out"),
        guests: Number(form.get("guests")),
        budget_per_night: form.get("budget_per_night") ? Number(form.get("budget_per_night")) : null,
        notes: form.get("notes") || null,
      };
      await postBooking("/api/bookings/airbnb", payload);
    }

    setLoading(false);
  };

  const postBooking = async (path, payload) => {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to submit");
      setMessage("Request received! We saved your booking details.");
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <section id="book" className="relative py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur border rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-full sm:w-max">
            <button
              onClick={() => setActive("hotel")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                active === "hotel" ? "bg-white shadow" : "hover:bg-white/60"
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => setActive("airbnb")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                active === "airbnb" ? "bg-white shadow" : "hover:bg-white/60"
              }`}
            >
              Airbnb
            </button>
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {active === "hotel" ? (
                <motion.form
                  key="hotel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  <Input name="full_name" icon={Users} label="Full name" placeholder="Alex Johnson" required />
                  <Input name="email" icon={Mail} label="Email" type="email" placeholder="alex@mail.com" required />
                  <Input name="destination" icon={MapPin} label="Destination" placeholder="Barcelona" required />
                  <DateInput name="check_in" icon={Calendar} label="Check-in" required />
                  <DateInput name="check_out" icon={Calendar} label="Check-out" required />
                  <Input name="guests" icon={Users} label="Guests" type="number" min={1} defaultValue={2} required />
                  <Input name="rooms" icon={Building2} label="Rooms" type="number" min={1} defaultValue={1} required />
                  <Input name="room_type" icon={Building2} label="Room type" placeholder="Deluxe, Suite..." />
                  <label className="sm:col-span-2 block">
                    <span className="text-sm text-gray-600">Special requests</span>
                    <textarea name="special_requests" className="mt-1.5 w-full rounded-md border p-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} />
                  </label>
                  <div className="sm:col-span-2 flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ y: -1 }}
                      disabled={loading}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 shadow"
                    >
                      {loading ? "Submitting..." : "Send booking request"}
                    </motion.button>
                    {message && <span className="text-sm text-gray-600">{message}</span>}
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="airbnb"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  <Input name="guest_name" icon={Users} label="Guest name" placeholder="Taylor Kim" required />
                  <Input name="email" icon={Mail} label="Email" type="email" placeholder="taylor@mail.com" required />
                  <Input name="location" icon={MapPin} label="Location" placeholder="Lisbon" required />
                  <DateInput name="check_in" icon={Calendar} label="Check-in" required />
                  <DateInput name="check_out" icon={Calendar} label="Check-out" required />
                  <Input name="guests" icon={Users} label="Guests" type="number" min={1} defaultValue={2} required />
                  <Input name="listing_name" icon={Home} label="Preferred listing (optional)" placeholder="Ocean View Loft" />
                  <Input name="budget_per_night" icon={Home} label="Budget per night ($)" type="number" min={0} step="10" />
                  <label className="sm:col-span-2 block">
                    <span className="text-sm text-gray-600">Notes</span>
                    <textarea name="notes" className="mt-1.5 w-full rounded-md border p-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} />
                  </label>
                  <div className="sm:col-span-2 flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ y: -1 }}
                      disabled={loading}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 shadow"
                    >
                      {loading ? "Submitting..." : "Send booking request"}
                    </motion.button>
                    {message && <span className="text-sm text-gray-600">{message}</span>}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
