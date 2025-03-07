import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function EditBio() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    // Carregar bio atual
    const fetchBio = async () => {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setBio(data.user.bio || '');
    };
    fetchBio();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio })
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        throw new Error('Failed to update bio');
      }
    } catch (error) {
      setError('Failed to update bio');
    } finally {
      setIsSubmitting(false);
    }
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
            url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-[#8ee2e2]/20 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Bio</h1>
              <p className="text-gray-600">Tell others about yourself</p>
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
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-[#229494]/30 rounded-md focus:ring-[#229494] focus:border-[#229494] text-gray-700"
                    placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    {bio.length}/500 characters
                  </p>
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
                  disabled={isSubmitting}
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