import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function HostResults() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { city } = router.query;
  
  const [hosts, setHosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    
    // Só buscar hosts quando a cidade estiver disponível no query
    if (city) {
      fetchHosts();
    }
  }, [status, city, router]);

  const fetchHosts = async () => {
    try {
      setIsLoading(true);
      
      // Chamar a API para buscar hosts na cidade selecionada
      const response = await fetch(`/api/hosts/find?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch hosts');
      }
      
      const data = await response.json();
      setHosts(data.hosts || []);
    } catch (error) {
      console.error('Error fetching hosts:', error);
      setError('Failed to load hosts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
              <button
                onClick={() => router.push('/dashboard')}
                className="text-[#229494] hover:text-[#229494] px-3 py-2 text-md flex items-center"
              >
                <span className="material-icons text-sm text-[#229494] mr-1">dashboard</span>
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        className="relative min-h-[calc(100vh-4rem)]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 90, 73, 0.4), rgba(2, 47, 46, 0.2)),
            url('/images/watermelon.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => router.push('/find-host')}
              className="flex items-center text-white hover:text-white/60"
            >
              <span className="material-icons text-sm mr-1 text-white hover:text-white/60">arrow_back</span>
              Back to Search
            </button>
            
            <h1 className="text-3xl font-bold text-white mt-4">
              Hosts in {city}
            </h1>
            <p className="text-white">
              {hosts.length} {hosts.length === 1 ? 'host' : 'hosts'} found
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {hosts.length === 0 && !error ? (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
              No hosts found in {city}. Try another destination or check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hosts.map((host) => (
                <div 
                  key={host.id} 
                  className="bg-white/60 rounded-lg shadow-md hover:shadow-lg border border-[#8ee2e2]/20 hover:border-[#8ee2e2]/30 transition-all duration-200"
                  onClick={() => router.push(`/host/${host.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {/* Imagem de perfil */}
                      <div className="h-16 w-16 flex-shrink-0 rounded-full overflow-hidden border border-gray-200">
                        {host.profileImage ? (
                          <img 
                            src={host.profileImage} 
                            alt={`${host.name}'s profile`} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-[#e5e7eb] flex items-center justify-center">
                            <span className="material-icons text-gray-400 text-2xl">
                              account_circle
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-4 flex-grow min-w-0">
                        <h2 className="text-xl font-semibold text-[#229494] truncate">{host.name}</h2>
                        <p className="text-sm text-gray-500 flex items-center">
                          <span className="material-icons text-xs mr-1 flex-shrink-0">location_on</span>
                          <span className="truncate">{host.city}</span>
                        </p>
                      </div>
                      
                      <div className="ml-auto flex-shrink-0">
                        <div className="bg-[#229494]/30 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                          {host.matchPercentage}% match
                        </div>
                      </div>
                    </div>
                    
                    {host.bio && (
                      <div className="mb-4">
                        <p className="text-gray-600 line-clamp-3">{host.bio}</p>
                      </div>
                    )}
                    
                    {host.interests && host.interests.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Interests in common with you</h3>
                        <div className="flex flex-wrap gap-2">
                          {host.interests.map((interest) => {
                            const isShared = host.sharedInterests?.some(si => si.id === interest.id);
                            return (
                              <span
                                key={interest.id}
                                className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${
                                  isShared 
                                    ? "bg-[#229494] text-white " 
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                <span className="material-icons text-sm mr-1">
                                  {interest.icon || 'interests'}
                                </span>
                                {interest.name}
                                {isShared && (
                                  <span className="material-icons text-sm ml-1 text-white">check</span>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Match: </span>
                        <span className="text-[#229494] font-semibold">{host.matchPercentage}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Impedir que o clique propague para o card
                          router.push(`/host/${host.id}`);
                        }}
                        className="w-full px-4 py-2 text-sm bg-[#3b9b9b] hover:bg-[#229494] text-white rounded-md transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 