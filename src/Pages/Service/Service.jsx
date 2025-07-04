import React from "react";
import { FaShippingFast, FaShieldAlt, FaMapMarkedAlt, FaMoneyBillWave, FaHeadset, FaClock } from "react-icons/fa";

const services = [
  {
    icon: <FaShippingFast className="text-4xl text-blue-500 mb-3" />,
    title: "Fast Delivery",
    desc: "Get your parcels delivered quickly and reliably across the country.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-green-500 mb-3" />,
    title: "Secure Handling",
    desc: "We ensure every parcel is handled with utmost care and security.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-purple-500 mb-3" />,
    title: "Wide Coverage",
    desc: "Our network covers all major cities and regions for your convenience.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-lime-500 mb-3" />,
    title: "Affordable Pricing",
    desc: "Enjoy competitive rates with no hidden charges for all deliveries.",
  },
  {
    icon: <FaClock className="text-4xl text-yellow-500 mb-3" />,
    title: "Real-Time Tracking",
    desc: "Track your parcels in real-time from pickup to delivery.",
  },
  {
    icon: <FaHeadset className="text-4xl text-pink-500 mb-3" />,
    title: "Customer Support",
    desc: "Our support team is here to help you 24/7 with any queries.",
  },
];

const Service = () => {
  return (
    <div className="min-h-screen bg-gray-50 rounded-3xl p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B2B2A] mb-4">Our Services</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Experience seamless parcel delivery with our range of professional services designed to meet your needs—fast, secure, and always reliable.
          </p>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-8 flex flex-col items-center hover:shadow-lg transition">
              {service.icon}
              <h3 className="text-xl font-bold mb-2 text-[#0B2B2A]">{service.title}</h3>
              <p className="text-gray-500 text-center">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service; 