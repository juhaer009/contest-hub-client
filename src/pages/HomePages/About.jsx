import React from 'react';
import { FaTrophy, FaUsers, FaAward, FaRocket } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Contest Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your gateway to interactive and fun contest experiences! We bring together 
            creative minds and competitive spirits in one dynamic platform.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center">
            <FaTrophy className="text-6xl text-[#F97316] mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              To create an engaging platform where creativity meets competition, 
              fostering innovation and bringing out the best in every participant.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <FaUsers className="text-4xl text-[#4F46E5] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
            <p className="text-gray-600">
              Join a vibrant community of creators, innovators, and competitors 
              from around the world.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <FaAward className="text-4xl text-[#F97316] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Fair Competition</h3>
            <p className="text-gray-600">
              Transparent judging, clear rules, and equal opportunities for 
              all participants to showcase their talents.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <FaRocket className="text-4xl text-[#7C3AED] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Innovation Focus</h3>
            <p className="text-gray-600">
              Encouraging creative thinking and innovative solutions across 
              various contest categories and challenges.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
            <p>
              Contest Hub was born from the idea that everyone has unique talents waiting 
              to be discovered and celebrated. We believe that healthy competition drives 
              innovation and brings out the best in people.
            </p>
            <p>
              Our platform provides a space where creativity flourishes, skills are 
              sharpened, and connections are made. Whether you're a seasoned competitor 
              or just starting your journey, Contest Hub welcomes you to explore, 
              participate, and grow.
            </p>
            <p>
              Join us in building a community where every contest is an opportunity 
              to learn, every participant is valued, and every achievement is celebrated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;