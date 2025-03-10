import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { validatePhone } from '../utils/validation';

// Componente de Upload de Imagem
function ImageUpload({ currentImage, onImageUpdate }) {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setError('');
    
    const validMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    const isValidType = validMimeTypes.includes(file.type);
    const isValidExtension = validExtensions.includes(fileExtension);
    
    if (!isValidType && !isValidExtension) {
      setError(`Tipo de arquivo inválido. Apenas JPG, PNG, GIF e WebP são permitidos.`);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter menos de 5MB");
      return;
    }
    
    try {
      setUploading(true);
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64Data = reader.result;
        setPreview(base64Data);
        
        try {
          const response = await fetch('/api/user/upload-profile-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageData: base64Data
            })
          });
          
          if (!response.ok) {
            throw new Error('Falha ao fazer upload da imagem');
          }
          
          const data = await response.json();
          onImageUpdate(data.imageUrl);
        } catch (error) {
          console.error('Erro no upload:', error);
          setError('Falha ao fazer upload da imagem. Por favor, tente novamente.');
        } finally {
          setUploading(false);
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      setError('Erro ao processar imagem. Por favor, tente novamente.');
      setUploading(false);
    }
  };
  
  return (
    <div className="mb-4">
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400">Photo</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        <div>
          <label className="cursor-pointer bg-[#3b9b9b] text-white px-4 py-2 rounded hover:bg-[#229494]">
            Upload Photo
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
            />
          </label>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default function CompleteProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasCheckedSession = useRef(false);
  
  const [activeSection, setActiveSection] = useState(() => {
    return router.query.section || 'personal';
  });

  const [personalInfo, setPersonalInfo] = useState({
    phone: '',
    address: '',
    city: '',
    countryId: '',
    interests: [],
    bio: '',
    profileImage: ''
  });

  const [countries, setCountries] = useState([]);
  const [availableInterests, setAvailableInterests] = useState([]);
  const [interestError, setInterestError] = useState('');
  const MAX_INTERESTS = 8;
  const MIN_INTERESTS = 1;

  useEffect(() => {
    if (!hasCheckedSession.current && status === 'unauthenticated') {
      hasCheckedSession.current = true;
      router.push('/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (router.query.section) {
      setActiveSection(router.query.section);
    }
  }, [router.query.section]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('/api/countries');
      const data = await response.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch('/api/interests/default');
        const data = await response.json();
        console.log('Raw interests data:', data);
        
        // Garantir que data é um array
        const interestsArray = Array.isArray(data) ? data : [];
        console.log('Processed interests array:', interestsArray);
        
        setAvailableInterests(interestsArray);
      } catch (error) {
        console.error('Detailed fetch error:', error);
        setAvailableInterests([]);
      }
    };
    
    fetchInterests();
  }, []);

  if (status === 'loading' || (status === 'unauthenticated' && !hasCheckedSession.current)) {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const handleNext = (e) => {
    e.preventDefault();
    
    if (step === 2) {
      const error = validateInterests(personalInfo.interests);
      if (error) {
        setInterestError(error);
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
      setInterestError('');
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step !== 3) {
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    try {
      console.log('Submitting data:', personalInfo);

      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...personalInfo,
          interests: Array.isArray(personalInfo.interests) ? personalInfo.interests : [],
          profileImage: personalInfo.profileImage || null
        }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        if (data.user?.interests) {
          setPersonalInfo(prev => ({
            ...prev,
            interests: Array.isArray(data.user.interests) 
              ? data.user.interests.map(interest => interest.name)
              : []
          }));
        }
        router.push('/dashboard');
      } else {
        throw new Error(data.message || 'Error updating profile');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const validatedPhone = personalInfo.phone ? validatePhone(personalInfo.phone) : null;
      
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: validatedPhone,
          address: personalInfo.address,
          city: personalInfo.city,
          country: personalInfo.country,
          profileImage: personalInfo.profileImage || null
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update personal information');
      }

      router.push('/complete-profile?section=interests');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInterestsSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interests: personalInfo.interests
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update interests');
      }

      router.push('/complete-profile?section=bio');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio: personalInfo.bio
        })
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

  const toggleInterest = (interest) => {
    setPersonalInfo(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return {
        ...prev,
        interests: newInterests
      };
    });
  };

  const validateInterests = (interests) => {
    if (!interests || !Array.isArray(interests)) {
      return 'Please select at least one interest';
    }
    
    if (interests.length < MIN_INTERESTS) {
      return `Please select at least ${MIN_INTERESTS} interest`;
    }
    
    if (interests.length > MAX_INTERESTS) {
      return `You can select up to ${MAX_INTERESTS} interests`;
    }
    
    return '';
  };

  const handleImageUpdate = (imageUrl) => {
    setPersonalInfo(prev => ({
      ...prev,
      profileImage: imageUrl
    }));
  };

  const renderPersonalInfoStep = () => {
    return (
      <div className="space-y-4">
        <ImageUpload
          currentImage={personalInfo.profileImage}
          onImageUpdate={handleImageUpdate}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
            placeholder="+1 234-567-8900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={personalInfo.address}
            onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
            placeholder="Enter your street address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            value={personalInfo.city}
            onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
            placeholder="Enter your city name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={personalInfo.countryId || ''}
            onChange={(e) => setPersonalInfo({ ...personalInfo, countryId: e.target.value })}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white ${
              personalInfo.countryId ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            <option value="" className="text-gray-400">Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id} className="text-gray-900">
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header com imagem de fundo similar ao registro */}
        <div className="relative h-40 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")`
          }}>
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <h1 className="text-3xl font-semibold text-white">Complete Your Profile</h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center space-x-4 py-6">
          {[1, 2, 3].map((item) => (
            <div key={item} 
              className={`w-3 h-3 rounded-full ${
                step >= item ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                {renderPersonalInfoStep()}
              </>
            )}

            {step === 2 && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Select Your Interests (Min: {MIN_INTERESTS}, Max: {MAX_INTERESTS})
                </label>
                
                {interestError && (
                  <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {interestError}
                  </div>
                )}
                
                <div className="mb-2 text-sm text-gray-500">
                  Selected: {personalInfo.interests.length}/{MAX_INTERESTS}
                </div>
                
                {Array.isArray(availableInterests) && availableInterests.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {availableInterests.map((interest) => {
                      const isSelected = personalInfo.interests.includes(interest.name);
                      const isDisabled = personalInfo.interests.length >= MAX_INTERESTS && !isSelected;
                      
                      return (
                        <label 
                          key={interest.id} 
                          className={`flex items-center p-3 border rounded-lg ${
                            isSelected 
                              ? 'bg-primary-50 border-primary-200' 
                              : isDisabled 
                                ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                                : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={(e) => {
                              const newInterests = e.target.checked
                                ? [...personalInfo.interests, interest.name]
                                : personalInfo.interests.filter(i => i !== interest.name);
                              
                              setPersonalInfo(prev => ({
                                ...prev,
                                interests: newInterests
                              }));
                              
                              setInterestError('');
                            }}
                            className="form-checkbox h-4 w-4 text-primary-600"
                          />
                          <div className="ml-2 flex items-center">
                            <span className="material-icons text-gray-500 mr-2 text-lg">
                              {interest.icon || 'interests'}
                            </span>
                            <span className={isDisabled ? 'text-gray-400' : 'text-gray-700'}>
                              {interest.name}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">No interests available</p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Bio
                </label>
                <textarea
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-gray-900 bg-white"
                  rows="4"
                  placeholder="Tell us about yourself..."
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-[#3b9b9b] text-white rounded-lg hover:bg-[#229494] ml-auto"
                  disabled={isSubmitting}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className={`px-6 py-2 bg-[#3b9b9b]  text-white rounded-lg hover:bg-[#229494] ml-auto ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Profile'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 