import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-6 bg-green-500 rounded-tr-xl rounded-bl-xl"></div>
              <span className="text-xl font-bold text-white">Profast</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Fast, secure & reliable delivery — your trusted courier partner.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-green-500 transition-colors flex items-center">
                <span className="w-1 h-1 bg-gray-400 mr-2 rounded-full"></span> Services</Link></li>
              <li><Link to="/coverage" className="text-gray-400 hover:text-green-500 transition-colors flex items-center">
                <span className="w-1 h-1 bg-gray-400 mr-2 rounded-full"></span> Coverage</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-green-500 transition-colors flex items-center">
                <span className="w-1 h-1 bg-gray-400 mr-2 rounded-full"></span> Pricing</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-500 transition-colors flex items-center">
                <span className="w-1 h-1 bg-gray-400 mr-2 rounded-full"></span> About Us</Link></li>
            </ul>
          </div>

          {/* For Riders */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">For Riders</h3>
            <ul className="space-y-3">
              <li><Link to="/be-a-rider" className="text-gray-400 hover:text-green-500 transition-colors flex items-center">
                <span className="w-1 h-1 bg-gray-400 mr-2 rounded-full"></span> Join as a Rider</Link></li>
              <li><Link to="/rider-support" className="text-gray-400 hover:text-green-500 transition-colors flex items-center">
                <span className="w-1 h-1 bg-gray-400 mr-2 rounded-full"></span> Rider Support</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-green-500 transition-colors flex items-center">
                <span className="w-1 h-1 bg-gray-400 mr-2 rounded-full"></span> Sign In</Link></li>
              <li><Link to="/rider-benefits" className="text-gray-400 hover:text-green-500 transition-colors flex items-center">
                <span className="w-1 h-1 bg-gray-400 mr-2 rounded-full"></span> Rider Benefits</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3" />
                <a href="mailto:support@profast.com" className="text-gray-400 hover:text-green-500 transition-colors">
                  support@profast.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-gray-400 mr-3" />
                <a href="tel:+8801234567890" className="text-gray-400 hover:text-green-500 transition-colors">
                  +880-1234-567890
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-sm text-center text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Profast Courier. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;