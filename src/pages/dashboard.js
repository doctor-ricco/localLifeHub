import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const interestIcons = {
    Photography: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    Cooking: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3v4a1 1 0 01-1 1h-3a1 1 0 01-1-1V3m4 12v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4m0-4h6M3 12h18" />
      </svg>
    ),
    Travel: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Music: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    Sports: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    Reading: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    Art: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    Technology: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }

    if (session?.user?.email) {
      fetchUserData();
    }
  }, [status, session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar com fundo sólido */}
      <nav className="bg-white border-b border-[#8ee2e2]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#2fb4b4]">LocalLifeHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{session?.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content com imagem de fundo e gradiente */}
      <main 
        className="relative min-h-[calc(100vh-4rem)]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgba(117, 212, 212, 0.9), rgba(142, 226, 226, 0.85), rgba(167, 235, 235, 0.8)),
            url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-[#8ee2e2]/20 hover:shadow-md hover:border-[#8ee2e2]/30 transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-xl text-primary-600">
                        {userData?.name?.[0]?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{userData?.name}</h2>
                      <p className="text-sm text-gray-500">{userData?.userType}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-900"> {userData?.email}</p>
                        <p className="text-sm text-gray-900"> {userData?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-900"> {userData?.address || 'Not provided'}</p>
                        <p className="text-sm text-gray-900"> {userData?.city || 'Not provided'}</p>
                        <p className="text-sm text-gray-900"> {userData?.country || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => router.push('/profile/edit-personal')}
                      className="w-full px-4 py-2 text-sm bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Personal Info
                    </button>
                  </div>
                </div>
              </div>

              {/* Interests Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-[#8ee2e2]/20 hover:shadow-md hover:border-[#8ee2e2]/30 transition-all duration-200">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Interests</h2>
                  <div className="flex flex-wrap gap-2 min-h-[30px]">
                    {userData?.interests?.map((interest) => (
                      <span
                        key={interest.id}
                        className="inline-flex items-center px-2 py-[1px] rounded text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
                      >
                        {interestIcons[interest.name]}
                        {interest.name}
                      </span>
                    ))}
                    {(!userData?.interests || userData.interests.length === 0) && (
                      <span className="text-sm text-gray-500 italic">
                        No interests added yet
                      </span>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => router.push('/profile/edit-interests')}
                      className="w-full px-4 py-2 text-sm bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Interests
                    </button>
                  </div>
                </div>
              </div>

              {/* Bio Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-[#8ee2e2]/20 hover:shadow-md hover:border-[#8ee2e2]/30 transition-all duration-200">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About You</h2>
                  <div className="min-h-[100px]">
                    <p className="text-gray-600">
                      {userData?.bio || 'No bio provided yet.'}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => router.push('/profile/edit-bio')}
                      className="w-full px-4 py-2 text-sm bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Bio
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Card */}
              <div className="md:col-span-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-[#8ee2e2]/20 hover:shadow-md hover:border-[#8ee2e2]/30 transition-all duration-200">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="border-t border-gray-200">
                    <div className="py-4">
                      <p className="text-gray-600">Account created on {new Date(userData?.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-600">Last updated on {new Date(userData?.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 