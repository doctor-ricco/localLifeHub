import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { validatePhone } from '../../utils/validation';

// Componente de Upload de Imagem
function ImageUpload({ currentImage, onImageUpdate }) {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Atualizar preview quando a prop currentImage mudar
    setPreview(currentImage);
  }, [currentImage]);
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Limpar erros anteriores
    setError('');
    
    console.log("Arquivo selecionado:", {
      nome: file.name,
      tipo: file.type,
      tamanho: `${(file.size / 1024).toFixed(2)}KB`,
      ultimaModificacao: new Date(file.lastModified).toISOString()
    });
    
    // Verificação mais permissiva do tipo de arquivo
    const validMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    const isValidType = validMimeTypes.includes(file.type);
    const isValidExtension = validExtensions.includes(fileExtension);
    
    // Se tipo ou extensão é válida, prossegue
    if (!isValidType && !isValidExtension) {
      console.error("Tipo de arquivo inválido:", file.type, fileExtension);
      setError(`Tipo de arquivo inválido: ${file.type}. Apenas JPG, PNG, GIF e WebP são permitidos.`);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter menos de 5MB");
      return;
    }
    
    // Vamos ler o arquivo como base64
    const reader = new FileReader();
    
    // Quando o arquivo for carregado como base64
    reader.onload = async () => {
      try {
        // Definir preview
        setPreview(reader.result);
        setUploading(true);
        
        console.log("Iniciando upload da imagem...");
        
        // Enviar dados da imagem como base64 para a API
        const response = await fetch("/api/user/upload-profile-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageData: reader.result // Dados da imagem em base64
          }),
        });
        
        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
          // Tentar obter mais detalhes sobre o erro
          let errorMessage = "Erro ao fazer upload da imagem";
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            // Se não conseguir ler o JSON, usar o status text
            errorMessage = response.statusText || errorMessage;
          }
          
          console.error("Erro no upload:", response.status, errorMessage);
          throw new Error(errorMessage);
        }
        
        const data = await response.json();
        console.log("Resposta do servidor:", data);
        
        if (data.success) {
          onImageUpdate(data.imageUrl);
          console.log("Imagem atualizada com sucesso:", data.imageUrl);
        } else {
          throw new Error("O servidor não retornou um status de sucesso");
        }
      } catch (error) {
        console.error("Erro ao processar upload da imagem:", error);
        setError(error.message || "Erro ao fazer upload da imagem");
      } finally {
        setUploading(false);
      }
    };
    
    // Iniciar a leitura do arquivo como base64
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">Foto de Perfil</label>
      <div className="flex items-center space-x-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border">
          {preview ? (
            <img 
              src={preview} 
              alt="Preview de perfil" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="material-icons text-gray-400 text-3xl">account_circle</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        <div>
          <label className="block">
            <span className="px-4 py-2 bg-[#3b9b9b] text-white rounded-md cursor-pointer hover:bg-[#229494] transition-colors">
              Upload Photo
            </span>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <p className="text-sm text-gray-500 mt-1">JPG, PNG ou GIF. Máx 5MB.</p>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default function EditPersonal() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: '',
    countryId: ''
  });
  const [profileImage, setProfileImage] = useState(null);
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
      setProfileImage(data.user.profileImage || null);
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
    <div className="min-h-screen bg-white">
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

      <main
        className="relative min-h-[calc(100vh-4rem)]"
        style={{
          backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
            url('/images/man-backpack.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-md border border-[#8ee2e2]/20 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Personal Information</h1>
              <p className="text-gray-600">Update your personal details</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Componente de Upload de Imagem */}
                <ImageUpload 
                  currentImage={profileImage} 
                  onImageUpdate={(url) => setProfileImage(url)} 
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border text-gray-700 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#229494]"
                    placeholder="+123 456 7890"
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
                    className="w-full px-4 py-2 border border-[#229494]/30 rounded-md focus:ring-[#229494] focus:border-[#229494] text-gray-700"
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
                    className="w-full px-4 py-2 border border-[#229494]/30 rounded-md focus:ring-[#229494] focus:border-[#229494] text-gray-700"
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
                    className="w-full px-4 py-2 border border-[#229494]/30 rounded-md focus:ring-[#229494] focus:border-[#229494] text-gray-700"
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

              <div className="flex justify-between pt-4 border-t border-gray-200">
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