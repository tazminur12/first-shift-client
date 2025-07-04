import React from "react";

const team = [
  { name: "Ayesha Rahman", role: "CEO", img: "https://i.pravatar.cc/100?img=1" },
  { name: "Tanvir Ahmed", role: "CTO", img: "https://i.pravatar.cc/100?img=2" },
  { name: "Nusrat Jahan", role: "COO", img: "https://i.pravatar.cc/100?img=3" },
  { name: "Rafiq Hasan", role: "Lead Engineer", img: "https://i.pravatar.cc/100?img=4" },
];

const highlights = [
  { year: "2021", text: "Founded with a vision for fast, reliable delivery." },
  { year: "2022", text: "Expanded coverage to all major cities in Bangladesh." },
  { year: "2023", text: "Launched real-time tracking and mobile app." },
  { year: "2024", text: "Reached 1 million successful deliveries." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 rounded-3xl p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B2B2A] mb-4">About Profast</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Profast is dedicated to revolutionizing parcel delivery in Bangladesh. We combine technology, reliability, and customer care to deliver your packages on time, every time.
          </p>
        </div>
        {/* Mission & Values */}
        <div className="mb-12 bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-4 text-[#0B2B2A]">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            To make parcel delivery seamless, secure, and accessible for everyone—individuals and businesses alike. We believe in transparency, speed, and putting our customers first.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Customer-centric service</li>
            <li>Nationwide coverage</li>
            <li>Real-time tracking</li>
            <li>Affordable pricing</li>
            <li>Continuous innovation</li>
          </ul>
        </div>
        {/* Highlights / Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#0B2B2A]">Our Journey</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex-1 bg-white rounded-xl shadow p-6 text-center">
                <div className="text-3xl font-bold text-lime-500 mb-2">{item.year}</div>
                <div className="text-gray-700">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Team Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-[#0B2B2A]">Meet Our Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow p-4">
                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full mb-3 border-4 border-lime-200 object-cover" />
                <div className="font-semibold text-[#0B2B2A]">{member.name}</div>
                <div className="text-gray-500 text-sm">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
