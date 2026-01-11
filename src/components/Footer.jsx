import { FaFacebook, FaTwitter, FaInstagram, FaTrophy, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#4F46E5] text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Tagline */}
        <div className="md:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <FaTrophy className="text-[#F97316] text-4xl" />
            <span className="text-2xl font-bold">Contest Hub</span>
          </div>
          <p className="text-sm opacity-90 mb-4">
            Your gateway to interactive and fun contest experiences!
          </p>
          <p className="text-xs opacity-75">
            Empowering creators worldwide through competitive excellence and community collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3 opacity-90">
            <li>
              <Link to="/" className="hover:text-[#F97316] transition-colors duration-300 text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/allcontests" className="hover:text-[#F97316] transition-colors duration-300 text-sm">
                All Contests
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#F97316] transition-colors duration-300 text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:text-[#F97316] transition-colors duration-300 text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Help */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-3 opacity-90">
            <li>
              <Link to="/contacts" className="hover:text-[#F97316] transition-colors duration-300 text-sm">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:text-[#F97316] transition-colors duration-300 text-sm">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:text-[#F97316] transition-colors duration-300 text-sm">
                Guidelines
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:text-[#F97316] transition-colors duration-300 text-sm">
                Report Issue
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
          
          {/* Contact Info */}
          <div className="mb-4 space-y-2 text-sm opacity-90">
            <p>📧 support@contesthub.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 Innovation City, IC 12345</p>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-medium mb-3 text-sm">Follow the Developer</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/JH.Jafid/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#F97316] transition-colors duration-300 transform hover:scale-110"
                aria-label="Facebook Profile"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a 
                href="https://www.linkedin.com/in/juhaer-hakim/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#F97316] transition-colors duration-300 transform hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a 
                href="https://portfolio-juhaer-hakim.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#F97316] transition-colors duration-300 transform hover:scale-110"
                aria-label="Portfolio Website"
              >
                <FaGlobe className="text-2xl" />
              </a>
              <a 
                href="#" 
                className="hover:text-[#F97316] transition-colors duration-300 transform hover:scale-110 opacity-50 cursor-not-allowed"
                aria-label="Twitter (Coming Soon)"
              >
                <FaTwitter className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80 space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Contest Hub — All Rights Reserved.
          </div>
          <div className="flex space-x-6 text-center">
            <Link to="/contacts" className="hover:text-[#F97316] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/contacts" className="hover:text-[#F97316] transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/contacts" className="hover:text-[#F97316] transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs">
              Developed by <a 
                href="https://portfolio-juhaer-hakim.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F97316] hover:text-white transition-colors duration-300 font-medium"
              >
                Juhaer Hakim
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
