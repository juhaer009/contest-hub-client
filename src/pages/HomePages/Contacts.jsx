import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions, suggestions, or need support? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className="order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Get in Touch</h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <FaEnvelope className="text-xl sm:text-2xl text-[#4F46E5] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Email</h3>
                  <p className="text-sm sm:text-base text-gray-600">support@contesthub.com</p>
                  <p className="text-sm sm:text-base text-gray-600">info@contesthub.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <FaPhone className="text-xl sm:text-2xl text-[#F97316] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Phone</h3>
                  <p className="text-sm sm:text-base text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm sm:text-base text-gray-600">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <FaMapMarkerAlt className="text-xl sm:text-2xl text-[#7C3AED] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Address</h3>
                  <p className="text-sm sm:text-base text-gray-600">123 Contest Street</p>
                  <p className="text-sm sm:text-base text-gray-600">Innovation City, IC 12345</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 sm:mt-12">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-sm sm:text-base">How do I participate in contests?</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Simply browse our contests, register for the ones you're interested in, and follow the submission guidelines.</p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-sm sm:text-base">When are winners announced?</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Winners are typically announced within 7-14 days after the contest deadline, depending on the contest type.</p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-sm sm:text-base">How can I create my own contest?</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Log in to your dashboard and use the "Add Contest" feature to create and manage your own contests.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent text-sm sm:text-base"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent resize-none text-sm sm:text-base"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#4F46E5] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-[#4338CA] transition duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <FaPaperPlane className="text-sm" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;