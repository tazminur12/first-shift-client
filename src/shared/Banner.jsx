import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../assets/banner/banner1.png';
import bannerImg2 from '../assets/banner/banner2.png';
import bannerImg3 from '../assets/banner/banner3.png';
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className="mt-4">
            <Carousel
                autoPlay
                infiniteLoop = {true}
                interval={4000}
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                swipeable
                emulateTouch
            >
                <div>
                    <img src={bannerImg1} alt="Banner 1" className="rounded-xl object-cover max-h-[500px] w-full" />
                </div>
                <div>
                    <img src={bannerImg2} alt="Banner 2" className="rounded-xl object-cover max-h-[500px] w-full" />
                </div>
                <div>
                    <img src={bannerImg3} alt="Banner 3" className="rounded-xl object-cover max-h-[500px] w-full" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
