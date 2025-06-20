import React from 'react';
import rix from '../assets/images/rix.png';
import jade from '../assets/images/jade.png';
import byen from '../assets/images/byen.png';

const teamMembers = [
  {
    name: 'Erickson Guhilde',
    role: 'Programmer',
    image: rix,
  },
  {
    name: 'Carissa Jade Carinan',
    role: 'UI/UX Designer',
    image: jade,
  },
  {
    name: 'Stefanni Vienne Carcer',
    role: 'UI/UX Designer',
    image: byen,
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#8DBCC7] text-gray-800 font-sans mt-4 rounded-md">
      {/* Header */}
      <header className="py-20 px-6 text-center animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          About <span className="text-indigo-500">P!CPAC</span>
        </h1>
        <p className="mt-4 text-lg text-white max-w-2xl mx-auto leading-relaxed">
          Forget installations or accounts – our online photobooth is a versatile,
          browser-based tool you can use anytime, anywhere. Easily snap photobooth-style photos,
          personalize them with frame colors and digital stickers, then instantly download high-resolution
          strips to any device.
        </p>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-center rounded-t-3xl animate-slideUp">
        <h2 className="text-3xl font-bold text-[#8DBCC7] mb-10">
          What Makes <span className="text-indigo-500">P!CPAC</span> Special?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto text-gray-700">
          {[
            {
              title: 'Totally Free',
              desc: 'We’re not charging anything. It’s all about fun and creativity!',
              icon: '💸',
            },
            {
              title: 'Custom Borders',
              desc: 'Choose from a bunch of fun, silly, or stylish photo borders designed by us.',
              icon: '🎨',
            },
            {
              title: 'Made with Love',
              desc: 'It’s a summer project by friends — no pressure, just passion.',
              icon: '❤️',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#8DBCC7] text-white p-8 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transform transition duration-300"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-white text-center rounded-b-md shadow-md">
        <h2 className="text-3xl font-bold text-indigo-500 mb-12 animate-fadeIn">Meet the Team</h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200 p-5 transform hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-5">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-indigo-500 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
}
