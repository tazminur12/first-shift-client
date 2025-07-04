import React from 'react';
import PropTypes from 'prop-types';

const ServiceCard = ({ icon, title, description, isHighlighted = false }) => {
    return (
        <div className={`
            relative bg-gray-800 rounded-xl p-8 h-full
            transition-all duration-300
            hover:shadow-lg hover:-translate-y-1
            border-l-4 ${isHighlighted ? 'border-green-500' : 'border-transparent'}
            hover:border-green-500
            group
        `}>
            {/* Icon Container */}
            <div className="
                w-16 h-16 mb-6 rounded-lg 
                bg-gray-700 flex items-center justify-center
                group-hover:bg-green-500 group-hover:text-white
                transition-colors duration-300
            ">
                <div className="text-3xl text-green-500 group-hover:text-white">
                    {icon}
                </div>
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400">{description}</p>
            
            {/* Learn More Link */}
            <div className="mt-6">
                <button className="
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
            </div>
        </div>
    );
};

ServiceCard.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isHighlighted: PropTypes.bool
};

export default ServiceCard;