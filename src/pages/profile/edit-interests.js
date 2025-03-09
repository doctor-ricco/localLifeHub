import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function EditInterests() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [availableInterests, setAvailableInterests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const MAX_INTERESTS = 8;
  const MIN_INTERESTS = 1;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    
    // Carregar interesses atuais do usuário
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setSelectedInterests(data.user.interests.map(i => i.name) || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    // Carregar todos os interesses disponíveis
    const fetchAvailableInterests = async () => {
      try {
        const response = await fetch('/api/interests/default');
        const data = await response.json();
        setAvailableInterests(data || []);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };
    
    fetchUserData();
    fetchAvailableInterests();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar número de interesses
    if (selectedInterests.length < MIN_INTERESTS) {
      setError(`Please select at least ${MIN_INTERESTS} interest`);
      return;
    }
    
    if (selectedInterests.length > MAX_INTERESTS) {
      setError(`You can select up to ${MAX_INTERESTS} interests`);
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      console.log('Enviando interesses:', selectedInterests);
      
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({ interests: selectedInterests })
      });

      const data = await response.json();
      console.log('Resposta da API:', data);

      if (response.ok) {
        // Usar location.replace para forçar um refresh completo
        window.location.replace('/dashboard');
      } else {
        throw new Error(data.message || 'Failed to update interests');
      }
    } catch (error) {
      console.error('Erro ao atualizar interesses:', error);
      setError(error.message || 'Failed to update interests');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-white">
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

      <main
        className="relative min-h-[calc(100vh-4rem)]"
        style={{
          backgroundImage: `
          linear-gradient(to bottom, rgba(63, 63, 63, 0.2), rgba(63, 63, 63, 0.3)),
            url('/images/woman.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-md border border-[#8ee2e2]/20 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Interests</h1>
              <p className="text-gray-600">Select your interests to connect with like-minded people</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Interests
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableInterests.map((interest) => {
                      const isSelected = selectedInterests.includes(interest.name);
                      const isDisabled = selectedInterests.length >= MAX_INTERESTS && !isSelected;
                      
                      return (
                        <div key={interest.id} className="relative">
                          <input
                            type="checkbox"
                            id={`interest-${interest.id}`}
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={() => toggleInterest(interest.name)}
                            className="sr-only"
                          />
                          <label
                            htmlFor={`interest-${interest.id}`}
                            className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-[#229494] text-white'
                                : isDisabled
                                  ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span className="material-icons text-sm mr-2">
                              {interest.icon || 'interests'}
                            </span>
                            {interest.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Selected: {selectedInterests.length}/{MAX_INTERESTS}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 text-sm border border-[#3b9b9b] bg-white text-[#3b9b9b] hover:bg-[#3b9b9b]/10 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm bg-[#3b9b9b] text-white rounded-md hover:bg-[#229494] transition-colors"
                  disabled={isSubmitting || selectedInterests.length === 0}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 