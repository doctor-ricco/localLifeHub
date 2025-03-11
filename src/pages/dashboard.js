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
    ),
    "Local Cuisine": (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "Cultural Events": (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    "Art & Museums": (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    "Music & Concerts": (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    "Local Markets": (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
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

    // Verificar se há um parâmetro refresh na URL
    if (router.query.refresh === 'true') {
      // Remover o parâmetro da URL sem recarregar a página
      router.replace('/dashboard', undefined, { shallow: true });
    }
  }, [status, session, router.query.refresh]);

  const fetchUserData = async () => {
    try {
      // Adicionar um timestamp para evitar cache
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/user/profile?t=${timestamp}`);
      const data = await response.json();
      console.log('Dados do usuário atualizados:', data.user);
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-[#8ee2e2]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a 
                href="/dashboard" 
                className="flex items-center"
              >
                <img
                  src="/images/logo.png"
                  alt="LocalLifeHub Logo"
                  className="h-8 w-8 mr-2"
                />
                <h1 className="text-2xl tracking-wide">
                  <span className="text-[#2A8A8A] font-bold">Local</span>
                  <span className="text-[#2A8A8A] font-bold">life</span>
                  <span className="text-[#5BBABA] font-extralight">Hub</span>
                </h1>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-[#2A8A8A]/10 px-4 py-2 rounded-md">
                <span className="material-icons text-[#2A8A8A] mr-2 text-md">person</span>
                <span className="text-gray-700">
                  Welcome, <span className="font-semibold text-[#2A8A8A]">{userData?.name || 'User'}</span>!
                </span>
              </div>

              {/* Botão "Find a Host" apenas para guests */}
              {userData?.userType?.toLowerCase() === 'guest' && (
                <button
                  onClick={() => router.push('/find-host')}
                  className="flex items-center px-4 py-2 text-sm bg-[#3b9b9b] text-white rounded-md hover:bg-[#229494] transition-colors"
                >
                  <span className="material-icons text-sm mr-1">travel_explore</span>
                  Find a Host
                </button>
              )}

              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm border border-[#3b9b9b] bg-white text-[#3b9b9b] hover:bg-[#3b9b9b] hover:text-white hover:border-[#3b9b9b] rounded-md"
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
          linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), 
          url("/images/krakow-1.jpg")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Profile Card - Estilo atualizado */}
              <div className="rounded-lg shadow-sm overflow-hidden" style={{ borderRadius: '0.5rem' }}>
                <div 
                  style={{
                    backgroundImage: '',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '280px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '20px'
                    }}
                  >
                    {/* Foto de perfil */}
                    <div 
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '4px solid white',
                        overflow: 'hidden',
                        marginTop: '40px',
                        marginBottom: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        aspectRatio: '1 / 1',  
                        minWidth: '120px',     
                        minHeight: '120px'     
                      }}
                    >
                      {userData?.profileImage ? (
                        <img 
                          src={userData.profileImage} 
                          alt={userData.name} 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                          }}
                        />
                      ) : (
                        <div 
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <span className="material-icons" style={{ fontSize: '60px', color: '#9ca3af' }}>
                            account_circle
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h2 
                      style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        marginBottom: '10px',
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        color: 'white'
                      }}
                    >
                      {userData?.name}
                    </h2>
                    <p 
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '0',
                        textAlign: 'center'
                      }}
                    >
                      {userData?.userType}
                    </p>
                  </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '30px 20px', borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem', overflow: 'hidden' }}>
                  <h3 
                    style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '16px'
                    }}
                  >
                    Contact Information
                  </h3>
                  <hr style={{ marginBottom: '16px' }} />

                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '500' }}><strong>Email: </strong></span>
                      {userData?.email}
                    </p>
                    <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '500' }}><strong>Phone: </strong></span>
                      {userData?.phone || 'Not provided'}
                    </p>
                    <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '500' }}><strong>Address: </strong></span>
                      {userData?.address || 'Not provided'}
                    </p>
                    <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '500' }}><strong>City: </strong></span>
                      {userData?.city || 'Not provided'}
                    </p>
                    <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '500' }}><strong>Country: </strong> </span>
                      {typeof userData?.country === 'string'
                        ? userData?.country
                        : userData?.country?.name || 'Not provided'}
                    </p>
                  </div>

                  <button
                    onClick={() => router.push('/profile/edit-personal')}
                    style={{
                      backgroundColor: '#3b9b9b',
                      color: 'white',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      width: '100%',
                      fontWeight: '500',
                      display: 'block',
                      textAlign: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(59, 155, 155, 0.3), 0 2px 4px -1px rgba(59, 155, 155, 0.2)',
                      fontSize: '16px'
                    }}
                  >
                    Edit Personal Info
                  </button>
                </div>
              </div>

              {/* Interests Card - Estilo atualizado */}
              <div className="rounded-lg shadow-sm overflow-hidden" style={{ borderRadius: '0.5rem' }}>
                <div
                  style={{
                    backgroundImage: 'url("/images/travel.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '280px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '20px'
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        marginBottom: '10px',
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        color: 'white'
                      }}
                    >
                      Your Interests
                    </h2>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '0',
                        textAlign: 'center'
                      }}
                    >
                      Connect with people who share your passions
                    </p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '30px 20px',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem'
                }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      minHeight: '30px',
                      marginBottom: '20px'
                    }}
                  >
                    {userData?.interests?.map((interest) => (
                      <span
                        key={interest.id}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '6px 12px',
                          borderRadius: '16px',
                          fontSize: '14px',
                          fontWeight: '500',
                          backgroundColor: 'rgba(34, 148, 148, 0.1)',
                          color: '#229494'
                        }}
                      >
                        {interestIcons[interest.name]}
                        {interest.name}
                      </span>
                    ))}
                    {(!userData?.interests || userData.interests.length === 0) && (
                      <span style={{ fontSize: '14px', color: '#6B7280', fontStyle: 'italic' }}>
                        No interests added yet
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => router.push('/profile/edit-interests')}
                    style={{
                      backgroundColor: '#3b9b9b',
                      color: 'white',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      width: '100%',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(59, 155, 155, 0.3), 0 2px 4px -1px rgba(59, 155, 155, 0.2)',
                      fontSize: '16px'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Interests
                  </button>
                </div>
              </div>

              {/* Bio Card - Estilo atualizado com imagem e design semelhante à página inicial */}
              <div className="rounded-lg shadow-sm overflow-hidden" style={{ borderRadius: '0.5rem' }}>
                <div
                  style={{
                    backgroundImage: 'url("/images/backpack.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '280px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '20px'
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        marginBottom: '10px',
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        color: 'white'
                      }}
                    >
                      About You
                    </h2>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '0',
                        textAlign: 'center'
                      }}
                    >
                      Share your story with potential hosts and guests
                    </p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '30px 20px',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem'
                }}>
                  <div
                    style={{
                      minHeight: '100px',
                      marginBottom: '20px'
                    }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#4B5563'
                      }}
                    >
                      {userData?.bio || 'No bio provided yet. Tell others about yourself, your travel style, and what you love about your city.'}
                    </p>
                  </div>

                  <button
                    onClick={() => router.push('/profile/edit-bio')}
                    style={{
                      backgroundColor: '#3b9b9b',
                      color: 'white',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      width: '100%',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(59, 155, 155, 0.3), 0 2px 4px -1px rgba(59, 155, 155, 0.2)',
                      fontSize: '16px'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Bio
                  </button>
                </div>
              </div>

              {/* Activity Card - Estilo atualizado */}
              <div className="md:col-span-3 rounded-lg shadow-sm overflow-hidden">
                <div
                  style={{
                    backgroundImage: 'url("")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '20px'
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        marginBottom: '10px',
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        color: 'white'
                      }}
                    >
                      Recent Activity
                    </h2>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: '1.5',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '0',
                        textAlign: 'center'
                      }}
                    >
                      Keep track of your account changes and interactions
                    </p>
                  </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '30px 20px' }}>
                  <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '16px' }}>
                    <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
                      Account created on {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}
                    </p>
                    <p style={{ fontSize: '14px', color: '#4B5563' }}>
                      Last updated on {userData?.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : 'Unknown'}
                    </p>
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