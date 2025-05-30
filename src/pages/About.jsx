import React from 'react';
import rix from '../assets/images/rix.png'
import jade from '../assets/images/jade.png'
import byen from '../assets/images/byen.png'

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
    <div className="min-h-screen mt-4 bg-[#8DBCC7] text-gray-800 font-sans shadow-md">

      <header className="py-16 px-6 text-center">
        <h1 className="text-5xl font-bold text-white drop-shadow-md">About <span className='text-indigo-500'>P!CPAC</span></h1>
        <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
          P!CPAC is a fun and free photobooth project made by friends over summer vacation.
          No bookings, no payments — just good vibes and cool photo borders!
        </p>
      </header>

      <section className="py-10 px-6 bg-white text-center rounded-t-3xl">
        <h2 className="text-3xl font-bold text-[#8DBCC7] mb-6">What Makes <span className='text-indigo-500'>P!CPAC</span> Special?</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto text-gray-700">
          <div className="bg-[#8DBCC7] p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Totally Free</h3>
            <p>We’re not charging anything. It’s all about fun and creativity!</p>
          </div>
          <div className="bg-[#8DBCC7] p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Custom Borders</h3>
            <p>Choose from a bunch of fun, silly, or stylish photo borders designed by us.</p>
          </div>
          <div className="bg-[#8DBCC7] p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
            <p>It’s a summer project by friends — no pressure, just passion.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-indigo-500 mb-10">Meet the Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-lg border border-gray-300 p-3 pb-6 transform hover:scale-105 transition duration-300"
              style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.15)', maxWidth: '350px', margin: 'auto' }}
            >
              <div className="bg-white rounded-sm overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-indigo-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-white py-8">
        © {new Date().getFullYear()} P!CPAC — Say Cheese, Anytime, Anywhere. ✨
      </footer>
    </div>
  );
}
