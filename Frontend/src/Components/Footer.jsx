import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-14 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
       
        <div>
          <h2 className="text-lg font-semibold mb-4">MSRTC Bus Booking</h2>
          <p className="text-sm">
            Your trusted partner for hassle-free bus travel. We offer affordable and reliable services across the country, with a focus on customer satisfaction and convenience.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/book" className="hover:text-blue-400">Book Tickets</a></li>
            <li><a href="/history" className="hover:text-blue-400">Travel History</a></li>
            <li><a href="/notification" className="hover:text-blue-400">Notifications</a></li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-sm mb-2">Email: support@msrtcbus.com</p>
          <p className="text-sm mb-4">Phone: +123 456 7890</p>

          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        © 2024 MSRTC Bus Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
