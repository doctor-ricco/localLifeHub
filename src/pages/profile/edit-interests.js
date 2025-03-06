import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function EditInterests() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const interests = [
    'Photography', 'Cooking', 'Travel', 'Music',
    'Sports', 'Reading', 'Art', 'Technology'
  ];

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    // Carregar interesses atuais
    const fetchData = async () => {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setSelectedInterests(data.user.interests.map(i => i.name) || []);
    };
    fetchData();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {interests.map((interest) => (
                <label
                  key={interest}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedInterests.includes(interest)
                      ? 'bg-primary-50 border-primary-200 text-primary-900'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedInterests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                  />
                  <span className={`text-sm ${
                    selectedInterests.includes(interest)
                      ? 'text-primary-700'
                      : 'text-gray-700'
                  }`}>
                    {interest}
                  </span>
                </label>
              ))}
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