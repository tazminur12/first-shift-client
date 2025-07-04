import React from 'react';
import Banner from '../shared/Banner';
import Services from './Service/Services';
import ServiceSection from './Service/ServiceSection';
import ClientLogosMarquee from './ClientMarquee/ClientLogosMarquee';
import Benefits from './Benefits/Benefits';
import BeMerchant from './BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Benefits></Benefits>
            <BeMerchant></BeMerchant>
            
        </div>
    );
};

export default Home;