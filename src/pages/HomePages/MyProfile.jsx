import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaTrophy, FaAward } from 'react-icons/fa';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: 'Contest enthusiast and creative problem solver.',
    location: 'New York, USA',
    joinDate: new Date().toLocaleDateString(),
    contestsParticipated: 12,
    contestsWon: 3,
    totalPoints: 1250
  });

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
    // You could add a toast notification here
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      ...profileData,
      displayName: user?.displayName || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your profile</h2>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and contest statistics</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="relative mb-6">
                <img
                  src={user.photoURL || '/default-avatar.png'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto border-4 border-[#4F46E5] shadow-lg"
                />
                <div className="absolute bottom-0 right-1/2 transform translate-x-16 translate-y-2">
                  <div className="bg-[#4F46E5] text-white p-2 rounded-full">
                    <FaUser className="text-sm" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{profileData.displayName}</h2>
              <p className="text-gray-600 mb-4">{profileData.email}</p>
              
              <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaTrophy className="text-[#F97316]" />
                  <span className="font-semibold">Contest Stats</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-bold text-lg">{profileData.contestsParticipated}</div>
                    <div className="opacity-90">Participated</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{profileData.contestsWon}</div>
                    <div className="opacity-90">Won</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F97316] text-white rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <FaAward />
                  <span className="font-semibold">Total Points</span>
                </div>
                <div className="text-2xl font-bold">{profileData.totalPoints}</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Profile Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-[#4F46E5] text-white px-4 py-2 rounded-lg hover:bg-[#4338CA] transition"
                  >
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      <FaSave />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                    >
                      <FaTimes />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2" />
                    Display Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">{profileData.displayName}</div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email Address
                  </label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-600">
                    {profileData.email}
                    <span className="text-xs ml-2">(Cannot be changed)</span>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">{profileData.bio}</div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                      placeholder="City, Country"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">{profileData.location}</div>
                  )}
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2" />
                    Member Since
                  </label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg text-gray-600">{profileData.joinDate}</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-[#4F46E5] text-white p-2 rounded-full">
                    <FaTrophy />
                  </div>
                  <div>
                    <h4 className="font-semibold">Won "Creative Design Challenge"</h4>
                    <p className="text-gray-600 text-sm">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-[#F97316] text-white p-2 rounded-full">
                    <FaAward />
                  </div>
                  <div>
                    <h4 className="font-semibold">Participated in "Code Sprint 2024"</h4>
                    <p className="text-gray-600 text-sm">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-[#7C3AED] text-white p-2 rounded-full">
                    <FaUser />
                  </div>
                  <div>
                    <h4 className="font-semibold">Updated profile information</h4>
                    <p className="text-gray-600 text-sm">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;