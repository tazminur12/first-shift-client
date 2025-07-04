import React from 'react';
import { FaShippingFast, FaWarehouse, FaTemperatureLow, FaLock, FaGlobeAmericas, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            icon: <FaShippingFast />,
            title: "Express Delivery",
            description: "Same-day and next-day delivery options for urgent shipments across the city.",
            bgColor: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        {
            icon: <FaWarehouse />,
            title: "Warehousing",
            description: "Secure storage solutions with inventory management for your business needs.",
            bgColor: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        {
            icon: <FaTemperatureLow />,
            title: "Cold Chain",
            description: "Temperature-controlled logistics for pharmaceuticals and perishable goods.",
            bgColor: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        {
            icon: <FaLock />,
            title: "Secure Transport",
            description: "High-value item transportation with GPS tracking and armed security options.",
            bgColor: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        {
            icon: <FaGlobeAmericas />,
            title: "International Shipping",
            description: "Door-to-door global delivery with customs clearance assistance.",
            bgColor: "bg-gradient-to-br from-gray-800 to-gray-900"
        },
        {
            icon: <FaHeadset />,
            title: "Dedicated Support",
            description: "24/7 customer service with personal account managers for business clients.",
            bgColor: "bg-gradient-to-br from-gray-800 to-gray-900"
        }
    ];

    // Animation variants
    const cardVariants = {
        offscreen: {
            y: 50,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Our <span className="text-green-500">Services</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Comprehensive logistics solutions tailored to your business and personal delivery needs.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {services.map((service, index) => (
                            <motion.div 
                                key={index}
                                variants={cardVariants}
                                className={`${service.bgColor} rounded-xl p-8 h-full relative overflow-hidden group`}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {/* 3D Tilt Effect */}
                                <div className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
                                </div>
                                
                                {/* Icon Container */}
                                <div className="
                                    w-16 h-16 mb-6 rounded-lg 
                                    bg-gray-700 flex items-center justify-center
                                    group-hover:bg-green-500 group-hover:text-white
                                    transition-colors duration-300
                                ">
                                    <div className="text-3xl text-green-500 group-hover:text-white">
                                        {service.icon}
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400 mb-6">{service.description}</p>
                                
                                {/* Learn More Button */}
                                <button className="
                                    relative z-10
                                    text-green-500 font-medium 
                                    hover:text-green-400 
                                    flex items-center
                                    transition-colors duration-200
                                ">
                                    Learn more
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 ml-1" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-800 py-16 px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl font-bold mb-6">Ready to Ship With Us?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Get a free quote today and experience the Profast difference in logistics.
                    </p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                    >
                        Get a Quote
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
};

export default Services;