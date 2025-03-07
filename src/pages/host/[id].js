import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function HostProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  
  const [host, setHost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaywall, setShowPaywall] = useState(true); // Sempre mostrar o paywall nesta fase
  const [countedMatch, setCountedMatch] = useState(0);

  // Adicionar uma referência para o ID do host atual
  const currentHostId = React.useRef(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    
    // Função para buscar dados do host
    const fetchHostData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        // Buscar dados do host pelo ID
        const response = await fetch(`/api/hosts/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch host data');
        }
        
        const data = await response.json();
        console.log('Host data received:', data.host);
        
        setHost(data.host);
      } catch (error) {
        console.error('Error fetching host data:', error);
        setError('Failed to load host profile');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (session && id) {
      fetchHostData();
    }
  }, [id, status, router, session]);

  useEffect(() => {
    // Verificar se o host mudou
    if (host && host.matchPercentage && currentHostId.current !== host.id) {
      // Atualizar o ID do host atual
      currentHostId.current = host.id;
      
      // Resetar o contador para começar do zero
      setCountedMatch(0);
      
      // Iniciar a contagem após um pequeno atraso para garantir que o reset foi aplicado
      setTimeout(() => {
        const targetMatch = host.matchPercentage;
        let start = 0;
        const duration = 1500; // 1.5 segundos
        const interval = 15;
        const increment = (targetMatch / (duration / interval));
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= targetMatch) {
            setCountedMatch(targetMatch);
            clearInterval(timer);
          } else {
            setCountedMatch(Math.floor(start));
          }
        }, interval);
        
        return () => clearInterval(timer);
      }, 50);
    }
  }, [host]);

  const handleSubscribe = (plan) => {
    // Apenas para demonstração - sem lógica real ainda
    console.log(`Selected plan: ${plan}`);
    // Aqui seria redirecionado para a página de pagamento
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b9b9b]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => router.push('/find-host')}
            className="w-full px-4 py-2 bg-[#3b9b9b] text-white rounded-md hover:bg-[#229494] transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  if (!host) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Host Not Found</h2>
          <p className="text-gray-700 mb-4">The host you're looking for could not be found.</p>
          <button
            onClick={() => router.push('/find-host')}
            className="w-full px-4 py-2 bg-[#3b9b9b] text-white rounded-md hover:bg-[#229494] transition-colors"
          >
            Back to Search
          </button>
        </div>
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
            linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
            url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-[#3b9b9b] hover:text-[#229494]"
            >
              <span className="material-icons text-sm mr-1 text-[#3b9b9b] hover:text-[#229494]">arrow_back</span>
              Back to Results
            </button>
          </div>

          {/* Host Preview Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-[#8ee2e2]/20 p-6 mb-6 relative">
            {/* Match Percentage - posicionado como na imagem */}
            <div className="absolute top-[120px] right-6">
              <div className="relative border-gradient">
                <div className="bg-white text-[#3b9b9b] px-6 py-3 rounded-sm text-center">
                  <div className="text-sm uppercase tracking-wide font-medium">MATCH</div>
                  <div className="text-4xl font-bold">{countedMatch}%</div>
                </div>
              </div>
            </div>
            
            {/* Informações do host - sem o flex container anterior */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-full bg-[#229494]/20 flex items-center justify-center">
                  <span className="text-2xl text-[#229494]">
                    {host.name?.[0]?.toUpperCase() || 'H'}
                  </span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{host.name}</h2>
                  <p className="text-gray-600 flex items-center">
                    <span className="material-icons text-sm mr-1">location_on</span>
                    {host.city || 'Location not specified'}{host.country ? `, ${host.country.name}` : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-4 pr-36">
              <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 line-clamp-3">{host.bio || 'No bio available'}</p>
              <p className="text-[#229494] mt-2 font-medium">Subscribe to see full profile</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Shared Interests</h3>
              <div className="flex flex-wrap gap-2">
                {host.sharedInterests?.slice(0, 3).map((interest) => (
                  <span
                    key={interest.id}
                    className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium bg-[#229494]/20 text-[#229494]"
                  >
                    <span className="material-icons text-sm mr-1">{interest.icon || 'interests'}</span>
                    {interest.name}
                  </span>
                ))}
                {host.sharedInterests?.length > 3 && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium bg-gray-100 text-gray-700">
                    +{host.sharedInterests.length - 3} more
                  </span>
                )}
              </div>
              
              {host.interests?.length > (host.sharedInterests?.length || 0) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-[#229494]">{host.interests.length - (host.sharedInterests?.length || 0)}</span> more interests to discover
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Paywall */}
          {showPaywall && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-[#8ee2e2]/20 overflow-hidden">
              <div className="bg-[#229494] text-white p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Premium Access Required</h2>
                <p className="text-white/90">
                  Subscribe to connect with local hosts and experience authentic local life
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Monthly Plan */}
                  <div className="border border-[#229494]/30 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly</h3>
                    <div className="text-3xl font-bold text-[#229494] mb-4">
                      €2.99<span className="text-sm text-gray-500 font-normal">/month</span>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <span className="material-icons text-[#229494] mr-2 text-sm">check_circle</span>
                        <span className="text-gray-600">Connect with unlimited hosts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-[#229494] mr-2 text-sm">check_circle</span>
                        <span className="text-gray-600">Message hosts directly</span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-[#229494] mr-2 text-sm">check_circle</span>
                        <span className="text-gray-600">Cancel anytime</span>
                      </li>
                    </ul>
                    
                    <button
                      onClick={() => handleSubscribe('monthly')}
                      className="w-full px-4 py-2 bg-[#3b9b9b] text-white rounded-md hover:bg-[#229494] transition-colors"
                    >
                      Subscribe Monthly
                    </button>
                  </div>
                  
                  {/* Annual Plan */}
                  <div className="annual-plan-gradient rounded-lg p-[2px] relative hover:shadow-md transition-shadow">
                    <div className="bg-white rounded-md p-6 relative">
                      <div className="absolute top-0 right-0 bg-[#229494] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        BEST VALUE
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Annual</h3>
                      <div className="text-3xl font-bold text-[#229494] mb-4">
                        €26.99<span className="text-sm text-gray-500 font-normal">/year</span>
                      </div>
                      <div className="text-sm text-[#229494] font-medium mb-4">
                        Save 25% compared to monthly
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="material-icons text-[#229494] mr-2 text-sm">check_circle</span>
                          <span className="text-gray-600">Connect with unlimited hosts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-[#229494] mr-2 text-sm">check_circle</span>
                          <span className="text-gray-600">Message hosts directly</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-[#229494] mr-2 text-sm">check_circle</span>
                          <span className="text-gray-600">Priority support</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-[#229494] mr-2 text-sm">check_circle</span>
                          <span className="text-gray-600">Exclusive local events</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-[#229494] mr-2 text-sm">check_circle</span>
                          <span className="text-gray-600">Get Video Call with you host</span>
                        </li>
                      </ul>
                      
                      <button
                        onClick={() => handleSubscribe('annual')}
                        className="w-full px-4 py-2 bg-[#3b9b9b] text-white rounded-md hover:bg-[#229494] transition-colors"
                      >
                        Subscribe Annually
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    By subscribing, you agree to our 
                    <a href="#" className="text-[#229494] hover:underline ml-1">Terms of Service</a> and 
                    <a href="#" className="text-[#229494] hover:underline ml-1">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Adicionar este estilo no componente */}
      <style jsx>{`
        .border-gradient {
          position: relative;
          padding: 3px;
          border-radius: 6px;
          background: linear-gradient(-45deg, #229494, #8ee2e2, #3b9b9b, #229494);
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        
        .annual-plan-gradient {
          background: linear-gradient(-45deg, #229494, #8ee2e2, #3b9b9b, #229494);
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
} 