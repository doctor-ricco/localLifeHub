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
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: selectedInterests })
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        throw new Error('Failed to update interests');
      }
    } catch (error) {
      setError('Failed to update interests');
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Interests</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-2 text-sm text-gray-500">
            Selected: {selectedInterests.length}/{MAX_INTERESTS}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {availableInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest.name);
                const isDisabled = selectedInterests.length >= MAX_INTERESTS && !isSelected;
                
                return (
                  <label
                    key={interest.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-primary-50 border-primary-200 text-primary-900'
                        : isDisabled
                          ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                          : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => toggleInterest(interest.name)}
                    />
                    <div className="flex items-center">
                      <span className="material-icons text-gray-500 mr-2 text-lg">
                        {interest.icon || 'interests'}
                      </span>
                      <span className={`text-sm ${
                        isSelected
                          ? 'text-primary-700'
                          : isDisabled
                            ? 'text-gray-400'
                            : 'text-gray-700'
                      }`}>
                        {interest.name}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 