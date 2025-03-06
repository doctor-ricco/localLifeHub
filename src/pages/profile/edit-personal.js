import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { validatePhone } from '../../utils/validation';

export default function EditPersonal() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: '',
    countryId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    // Carregar dados atuais
    const fetchData = async () => {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      setFormData({
        phone: data.user.phone || '',
        address: data.user.address || '',
        city: data.user.city || '',
        countryId: data.user.countryId || ''
      });
    };
    fetchData();
  }, [status]);

  useEffect(() => {
    // Carregar lista de países
    const fetchCountries = async () => {
      const response = await fetch('/api/countries');
      const data = await response.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Valida o telefone antes de enviar
      const validatedPhone = validatePhone(formData.phone);

      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: validatedPhone
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update personal information');
      }

      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Personal Information</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                  placeholder="+1 234-567-8900"
                />
              
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                  placeholder="Enter your street address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                  placeholder="Enter your city name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.countryId || ''}
                  onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
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