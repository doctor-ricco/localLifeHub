import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function RegisterChoice() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <Navbar hideAuthButtons={true} />
      <div style={{ 
        backgroundColor: '#f5f5f7', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif',
        padding: '20px',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1368&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div style={{ 
          maxWidth: '400px', 
          width: '100%', 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '160px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: '600',
                color: 'white',
                textAlign: 'center'
              }}>
                Choose Your Path
              </h1>
            </div>
          </div>

          <div style={{ padding: '30px 20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={() => router.push('/register/guest')}
                style={{
                  width: '100%',
                  padding: '16px',
                  marginBottom: '16px',
                  backgroundColor: '#3b9b9b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(59, 155, 155, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Find a Local Host
              </button>

              <button
                onClick={() => router.push('/register/host')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: 'white',
                  color: '#3b9b9b',
                  border: '2px solid #3b9b9b',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Become a Host
              </button>
            </div>

            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#e5e7eb',
              borderRadius: '2px',
              margin: '20px auto 0'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 