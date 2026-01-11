import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../components/ContestCard";
import Loading from "../../components/Loading"
import { Link } from "react-router";
import { FaTrophy, FaUsers, FaAward, FaChevronLeft, FaChevronRight, FaPaintBrush, FaCode, FaCamera, FaMusic, FaGamepad, FaPen, FaRocket, FaLock, FaClock, FaGift, FaStar, FaQuoteLeft, FaEnvelope, FaQuestion, FaArrowRight, FaPlay, FaCheck } from "react-icons/fa";

const Home = () => {
  const axiosInstance = useAxios();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popular-contest"],
    queryFn: async () => {
      const res = await axiosInstance.get("/popular-contest");
      return res.data;
    },
  });

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: "Unleash Your Creative Potential",
      subtitle: "Join thousands of creators in exciting contests",
      description: "Participate in diverse contests, showcase your skills, and win amazing prizes while connecting with a global community of innovators.",
      bgGradient: "from-[#4F46E5] via-[#7C3AED] to-[#EC4899]",
      image: "🎨",
      stats: { participants: "10K+", contests: "500+", prizes: "$50K+" }
    },
    {
      id: 2,
      title: "Compete with the Best",
      subtitle: "Challenge yourself in premium contests",
      description: "Take on exciting challenges, learn from industry experts, and elevate your skills through competitive experiences designed for growth.",
      bgGradient: "from-[#059669] via-[#0891B2] to-[#7C3AED]",
      image: "🏆",
      stats: { participants: "15K+", contests: "300+", prizes: "$75K+" }
    },
    {
      id: 3,
      title: "Win Amazing Rewards",
      subtitle: "Turn your passion into prizes",
      description: "Earn recognition, valuable prizes, and build your portfolio while participating in contests that match your interests and expertise.",
      bgGradient: "from-[#DC2626] via-[#EA580C] to-[#D97706]",
      image: "💎",
      stats: { participants: "8K+", contests: "200+", prizes: "$30K+" }
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, heroSlides.length]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[65vh] lg:h-[70vh] min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] overflow-hidden">
        {/* Background with gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgGradient} transition-all duration-1000 ease-in-out`}>
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 sm:top-6 lg:top-10 left-4 sm:left-6 lg:left-10 w-8 h-8 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-16 sm:top-24 lg:top-32 right-8 sm:right-12 lg:right-20 w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16 bg-white rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-8 sm:bottom-12 lg:bottom-20 left-1/4 w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-white rounded-full animate-ping delay-700"></div>
            <div className="absolute bottom-12 sm:bottom-20 lg:bottom-32 right-1/3 w-8 h-8 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-white rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className={`text-white transform transition-all duration-700 text-center lg:text-left ${isAnimating ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'}`}>
                <div className="text-3xl sm:text-4xl lg:text-6xl mb-3 sm:mb-4 animate-bounce">{currentSlideData.image}</div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                  {currentSlideData.title}
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 opacity-90 font-medium">
                  {currentSlideData.subtitle}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  {currentSlideData.description}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
                  <Link to="/allcontests" className="btn btn-sm sm:btn-md lg:btn-lg bg-white text-[#4F46E5] hover:bg-gray-100 border-none px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                    Explore Contests
                  </Link>
                  <Link to="/auth" className="btn btn-sm sm:btn-md lg:btn-lg btn-outline border-white text-white hover:bg-white hover:text-[#4F46E5] px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                    Join Now
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-sm mx-auto lg:mx-0">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold">{currentSlideData.stats.participants}</div>
                    <div className="text-xs sm:text-sm opacity-80">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold">{currentSlideData.stats.contests}</div>
                    <div className="text-xs sm:text-sm opacity-80">Active Contests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold">{currentSlideData.stats.prizes}</div>
                    <div className="text-xs sm:text-sm opacity-80">Total Prizes</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Feature Icons */}
              <div className={`hidden lg:flex flex-col space-y-6 xl:space-y-8 transform transition-all duration-700 delay-300 ${isAnimating ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'}`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 xl:p-6 transform hover:scale-105 transition-all duration-300">
                  <FaTrophy className="text-2xl xl:text-4xl text-[#F97316] mb-3 xl:mb-4" />
                  <h3 className="text-lg xl:text-xl font-semibold text-white mb-2">Win Big Prizes</h3>
                  <p className="text-sm xl:text-base text-white/80">Compete for amazing rewards and recognition</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 xl:p-6 transform hover:scale-105 transition-all duration-300">
                  <FaUsers className="text-2xl xl:text-4xl text-[#10B981] mb-3 xl:mb-4" />
                  <h3 className="text-lg xl:text-xl font-semibold text-white mb-2">Join Community</h3>
                  <p className="text-sm xl:text-base text-white/80">Connect with creators from around the world</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 xl:p-6 transform hover:scale-105 transition-all duration-300">
                  <FaAward className="text-2xl xl:text-4xl text-[#8B5CF6] mb-3 xl:mb-4" />
                  <h3 className="text-lg xl:text-xl font-semibold text-white mb-2">Showcase Skills</h3>
                  <p className="text-sm xl:text-base text-white/80">Display your talents and build your portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              disabled={isAnimating}
            >
              <FaChevronLeft className="text-sm sm:text-base" />
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-1 sm:space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  disabled={isAnimating}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              disabled={isAnimating}
            >
              <FaChevronRight className="text-sm sm:text-base" />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Contests Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Popular Contests
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover trending contests and join thousands of participants in exciting challenges
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {isLoading ? 
              <div className="col-span-full flex justify-center py-12">
                <Loading />
              </div>
              : 
              contests.map((contest) => 
                <ContestCard 
                  key={contest._id} 
                  contest={contest}
                />
              )
            }
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link to="/allcontests">
              <button className="btn btn-primary btn-sm sm:btn-md lg:btn-lg px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                View All Contests
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Why Choose Contest Hub?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the ultimate contest platform with features designed to enhance your creative journey
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRocket className="text-lg sm:text-xl lg:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Easy Participation</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Simple registration process and user-friendly interface for seamless contest participation</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#059669] to-[#0891B2] text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaLock className="text-lg sm:text-xl lg:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Fair Judging</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Transparent evaluation process with expert judges ensuring fair competition for all</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaClock className="text-lg sm:text-xl lg:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Real-time Updates</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Stay informed with instant notifications about contest updates, results, and new opportunities</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#7C2D12] to-[#A16207] text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaGift className="text-lg sm:text-xl lg:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Amazing Rewards</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Win valuable prizes, certificates, and recognition from industry professionals</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#BE185D] to-[#EC4899] text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-lg sm:text-xl lg:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Global Community</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Connect with creators worldwide and build lasting professional relationships</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaStar className="text-lg sm:text-xl lg:text-2xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Skill Development</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Enhance your abilities through challenging contests and expert feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contest Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Contest Categories
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore diverse contest categories and find the perfect match for your skills and interests
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <FaPaintBrush className="text-2xl sm:text-3xl lg:text-4xl text-[#4F46E5] mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Design</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Creative visual contests</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <FaCode className="text-2xl sm:text-3xl lg:text-4xl text-[#059669] mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Programming</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Coding challenges</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <FaCamera className="text-2xl sm:text-3xl lg:text-4xl text-[#DC2626] mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Photography</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Visual storytelling</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <FaMusic className="text-2xl sm:text-3xl lg:text-4xl text-[#7C3AED] mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Music</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Audio competitions</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <FaPen className="text-2xl sm:text-3xl lg:text-4xl text-[#EA580C] mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Writing</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Literary contests</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <FaGamepad className="text-2xl sm:text-3xl lg:text-4xl text-[#0891B2] mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Gaming</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Game development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Contest Hub by Numbers
            </h2>
            <p className="text-base sm:text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join a thriving community of creators and innovators making their mark
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">50K+</div>
              <div className="text-sm sm:text-base lg:text-lg opacity-90">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">1,200+</div>
              <div className="text-sm sm:text-base lg:text-lg opacity-90">Contests Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">$2M+</div>
              <div className="text-sm sm:text-base lg:text-lg opacity-90">Prizes Awarded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">95%</div>
              <div className="text-sm sm:text-base lg:text-lg opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get started in just a few simple steps and begin your creative journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center relative">
              <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Sign Up & Browse</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Create your account and explore our diverse range of contests across multiple categories</p>
              <div className="hidden md:block absolute top-8 sm:top-10 -right-3 sm:-right-4 text-[#4F46E5] text-xl sm:text-2xl">
                <FaArrowRight />
              </div>
            </div>
            <div className="text-center relative">
              <div className="bg-gradient-to-r from-[#059669] to-[#0891B2] text-white w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Participate & Create</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Join contests that match your skills and submit your best work following the guidelines</p>
              <div className="hidden md:block absolute top-8 sm:top-10 -right-3 sm:-right-4 text-[#059669] text-xl sm:text-2xl">
                <FaArrowRight />
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Win & Celebrate</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Get judged by experts, win amazing prizes, and celebrate your achievements with the community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              What Our Community Says
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear from successful participants who have transformed their careers through Contest Hub
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <FaQuoteLeft className="text-2xl sm:text-3xl text-[#4F46E5] mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic leading-relaxed">
                "Contest Hub transformed my design career. The feedback from judges helped me improve, and winning contests opened doors to amazing opportunities."
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="Sarah" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Sarah Johnson</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Graphic Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <FaQuoteLeft className="text-2xl sm:text-3xl text-[#059669] mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic leading-relaxed">
                "The programming contests here are top-notch. I've learned so much from the challenges and connected with amazing developers worldwide."
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Mike" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Mike Chen</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Software Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <FaQuoteLeft className="text-2xl sm:text-3xl text-[#DC2626] mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic leading-relaxed">
                "As a photographer, Contest Hub gave me the platform to showcase my work. The community support and recognition have been incredible."
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" alt="Emma" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Emma Rodriguez</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Photographer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how Contest Hub has helped creators achieve their dreams and build successful careers
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">From Participant to Industry Leader</h3>
                <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base leading-relaxed">
                  Alex started as a beginner in our design contests. Through consistent participation and learning from feedback, 
                  Alex now runs a successful design agency and mentors new participants.
                </p>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">150+</div>
                    <div className="text-xs sm:text-sm opacity-80">Contests Participated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">25</div>
                    <div className="text-xs sm:text-sm opacity-80">Contests Won</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">$50K</div>
                    <div className="text-xs sm:text-sm opacity-80">Total Earnings</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaCheck className="text-[#059669] mr-2 sm:mr-3 flex-shrink-0" />
                  <h4 className="font-semibold text-sm sm:text-base">Portfolio Development</h4>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Built a strong portfolio through diverse contest submissions</p>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaCheck className="text-[#059669] mr-2 sm:mr-3 flex-shrink-0" />
                  <h4 className="font-semibold text-sm sm:text-base">Skill Enhancement</h4>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Improved skills through expert feedback and challenging projects</p>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaCheck className="text-[#059669] mr-2 sm:mr-3 flex-shrink-0" />
                  <h4 className="font-semibold text-sm sm:text-base">Network Building</h4>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Connected with industry professionals and potential clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay updated with contest tips, success stories, and industry insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                  <FaPaintBrush className="text-xl sm:text-2xl" />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="text-xs sm:text-sm text-[#4F46E5] font-semibold mb-2">Design Tips</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-[#4F46E5] transition-colors duration-300 leading-tight">
                  10 Essential Design Principles for Contest Success
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  Master these fundamental design principles to create winning submissions that stand out from the competition.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-500">Dec 15, 2024</span>
                  <button className="text-[#4F46E5] hover:text-[#4338CA] font-semibold flex items-center text-sm sm:text-base">
                    Read More <FaArrowRight className="ml-1 sm:ml-2 text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-[#059669] to-[#0891B2] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                  <FaTrophy className="text-xl sm:text-2xl" />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="text-xs sm:text-sm text-[#059669] font-semibold mb-2">Success Story</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-[#059669] transition-colors duration-300 leading-tight">
                  How Maria Won Her First Design Contest
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  Follow Maria's journey from beginner to winner and learn the strategies that led to her contest success.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-500">Dec 12, 2024</span>
                  <button className="text-[#059669] hover:text-[#047857] font-semibold flex items-center text-sm sm:text-base">
                    Read More <FaArrowRight className="ml-1 sm:ml-2 text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            </article>
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-[#DC2626] to-[#EA580C] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                  <FaCode className="text-xl sm:text-2xl" />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="text-xs sm:text-sm text-[#DC2626] font-semibold mb-2">Programming</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-[#DC2626] transition-colors duration-300 leading-tight">
                  Coding Contest Preparation Guide
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  Essential tips and resources to help you prepare for programming contests and improve your coding skills.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-500">Dec 10, 2024</span>
                  <button className="text-[#DC2626] hover:text-[#B91C1C] font-semibold flex items-center text-sm sm:text-base">
                    Read More <FaArrowRight className="ml-1 sm:ml-2 text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Find answers to common questions about participating in contests
            </p>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start">
                <FaQuestion className="text-[#4F46E5] mt-1 mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">How do I participate in a contest?</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Simply create an account, browse available contests, read the guidelines carefully, and submit your entry before the deadline. 
                    Make sure to follow all submission requirements for the best chance of success.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start">
                <FaQuestion className="text-[#4F46E5] mt-1 mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">When are contest results announced?</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Contest results are typically announced within 7-14 days after the submission deadline. 
                    You'll receive notifications via email and can check your dashboard for updates.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start">
                <FaQuestion className="text-[#4F46E5] mt-1 mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Can I participate in multiple contests simultaneously?</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Yes! You can participate in as many contests as you'd like, as long as you can meet all the submission requirements 
                    and deadlines. We encourage exploring different categories to expand your skills.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start">
                <FaQuestion className="text-[#4F46E5] mt-1 mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">What happens if I win a contest?</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Winners receive their prizes as specified in the contest details, along with certificates and recognition. 
                    You'll also gain valuable exposure and the opportunity to showcase your work to a wider audience.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start">
                <FaQuestion className="text-[#4F46E5] mt-1 mr-3 sm:mr-4 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Is there a fee to participate in contests?</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Most contests on our platform are free to enter. Some premium contests may have entry fees, 
                    which will be clearly stated in the contest details. Entry fees help fund larger prize pools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaEnvelope className="text-3xl sm:text-4xl lg:text-5xl mx-auto mb-4 sm:mb-6 opacity-90" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Stay in the Loop
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter and never miss new contests, winner announcements, and exclusive tips from industry experts
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              />
              <button className="bg-white text-[#4F46E5] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Subscribe
              </button>
            </div>
            <p className="text-xs sm:text-sm opacity-70 mt-3 sm:mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
            <FaPlay className="text-3xl sm:text-4xl lg:text-5xl text-[#4F46E5] mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators who have already discovered their potential through Contest Hub. 
              Your next big opportunity is just one contest away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/auth">
                <button className="btn btn-primary btn-sm sm:btn-md lg:btn-lg px-6 sm:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto">
                  Get Started Today
                </button>
              </Link>
              <Link to="/allcontests">
                <button className="btn btn-outline btn-sm sm:btn-md lg:btn-lg px-6 sm:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto">
                  Browse Contests
                </button>
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
              Free to join • No credit card required • Start participating immediately
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
