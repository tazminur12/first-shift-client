import React from 'react';
import Marquee from 'react-fast-marquee';
import PropTypes from 'prop-types';

// Import your logo images (make sure logo7 is properly imported)
import logo1 from '../../assets/brands/amazon.png';
import logo2 from '../../assets/brands/amazon_vector.png';
import logo3 from '../../assets/brands/casio.png';
import logo4 from '../../assets/brands/moonstar.png';
import logo5 from '../../assets/brands/randstad.png';
import logo6 from '../../assets/brands/start-people 1.png';

const ClientLogosMarquee = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
      <p className="text-2xl md:text-1xl font-bold text-center max-w-4xl mx-auto mb-12 text-gray-800 leading-relaxed">
  We've helped thousands of sales teams across industries achieve their goals with our reliable delivery solutions.
</p>

        
        <div className="relative">
          {/* Gradient overlays for better UX */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
          
          <Marquee 
            speed={50} 
            gradient={false} 
            pauseOnHover={true}
            className="py-4"
          >
            <div className="flex space-x-16 items-center px-4">
              {logos.map((logo, index) => (
                <div 
                  key={index}
                  className="relative group"
                >
                  {/* Logo with color reveal effect */}
                  <div className="relative z-10">
                    <img
                      src={logo}
                      alt={`Client logo ${index + 1}`}
                      className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  
                  {/* Subtle glow effect on hover */}
                  <div className="
                    absolute inset-0 rounded-lg
                    bg-green-500/10 blur-md
                    scale-95 group-hover:scale-105
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500
                  " />
                </div>
              ))}
              
              {/* Duplicate for seamless looping */}
              {logos.map((logo, index) => (
                <div 
                  key={`duplicate-${index}`}
                  className="relative group"
                >
                  <div className="relative z-10">
                    <img
                      src={logo}
                      alt={`Client logo ${index + 1}`}
                      className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  <div className="
                    absolute inset-0 rounded-lg
                    bg-green-500/10 blur-md
                    scale-95 group-hover:scale-105
                    opacity-0 group-hover:opacity-100
                    transition-all duration-500
                  " />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

ClientLogosMarquee.propTypes = {
  logos: PropTypes.arrayOf(PropTypes.string)
};

export default ClientLogosMarquee;