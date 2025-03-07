import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function FindHost() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('');
  const [popularCities, setPopularCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    
    // Carregar lista de cidades populares
    const fetchPopularCities = async () => {
      try {
        // Idealmente, teríamos um endpoint para buscar cidades populares
        // Por enquanto, vamos usar uma lista estática
        setPopularCities([
          'Paris',
          'Rome',
          'Barcelona',
          'London',
          'New York',
          'Tokyo',
          'Sydney',
          'Rio de Janeiro',
          'Cape Town',
          'Amsterdam',
          'Berlin',
          'Lisbon'
        ]);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Failed to load cities');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPopularCities();
  }, [status, router]);

  const handleSearch = () => {
    if (!selectedCity) {
      setError('Please select a destination city');
      return;
    }
    
    // Navegar para a página de resultados com a cidade selecionada como query parameter
    router.push(`/host-results?city=${encodeURIComponent(selectedCity)}`);
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
            linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
            url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-4">Find a Local Host</h1>
            <p className="text-lg text-white">
            Meet locals who share your interests and see their city through their eyes.<br />
            You might be surprised!
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-[#8ee2e2]/20">
            <div className="mb-6">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Where do you want to go?
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 text-gray-700/80 border border-[#229494] rounded-lg focus:ring-[#229494] focus:border-[#229494]"
                required
              >
                <option value="">Select a destination</option>
                {popularCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              onClick={handleSearch}
              className="w-full px-6 py-3 bg-[#3b9b9b] hover:bg-[#229494] text-white rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-icons">search</span>
              Find Hosts
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 