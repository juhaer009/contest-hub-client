import { FaFacebook, FaTwitter, FaInstagram, FaTrophy } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#4F46E5] text-white py-10 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Tagline */}
        <div className="flex items-center space-x-3">
          <FaTrophy className="text-[#F97316] text-4xl" />
          <span className="text-2xl font-bold">Contest Hub</span>
        </div>
        <p className="text-sm mt-2 opacity-90 md:col-start-1">
          Your gateway to interactive and fun contest experiences!
        </p>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 opacity-90">
            <li>
              <a href="#" className="hover:text-[#F97316] transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F97316] transition">
                Contests
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F97316] transition">
                Leaderboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F97316] transition">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-[#F97316] transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-[#F97316] transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#F97316] transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/20 pt-5 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Contest Hub — All Rights Reserved.
      </div>
    </footer>
  );
}
