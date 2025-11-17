import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingTabs from "./components/BookingTabs";
import Features from "./components/Features";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <BookingTabs />
        <Features />
        <footer id="contact" className="py-10 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} StayHub. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
