import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function Register() {
  const router = useRouter();
  const { type } = router.query;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userType: type,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      } else {
        setError(data.message || 'Erro ao registrar');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Ocorreu um erro ao registrar. Tente novamente.');
      setIsLoading(false);
    }
  };

  if (success) {
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
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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
                alignItems: 'center',
                padding: '20px'
              }}>
                <h1 style={{ 
                  fontSize: '28px', 
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  Registration Successful!
                </h1>
              </div>
            </div>
            
            <div style={{ padding: '30px 20px', textAlign: 'center' }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
                color: '#374151',
                marginBottom: '16px'
              }}>
                Welcome, {name}!
              </h2>
              <p style={{ 
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                color: '#6b7280',
                marginBottom: '24px'
              }}>
                Your account has been created successfully.
              </p>
              <p style={{ 
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                color: '#6b7280'
              }}>
                You will be redirected to the login page in a moment...
              </p>
              
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
            backgroundImage: type === 'host' 
              ? 'url("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")' 
              : 'url("https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '160px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
              alignItems: 'center',
              padding: '20px'
            }}>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '0.5px',
                textAlign: 'center',
                color: 'white'
              }}>
                Register as {type === 'host' ? 'Host' : 'Guest'}
              </h1>
            </div>
          </div>
          
          <div style={{ padding: '30px 20px' }}>
            {error && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '20px',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif',
                  color: '#374151'
                }}>
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1e293b',
                    backgroundColor: '#f8fafc',
                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                  }} 
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif',
                  color: '#374151'
                }}>
                  Email
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1e293b',
                    backgroundColor: '#f8fafc',
                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                  }} 
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif',
                  color: '#374151'
                }}>
                  Password
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1e293b',
                    backgroundColor: '#f8fafc',
                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                  }} 
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  backgroundColor: '#3b9b9b', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif',
                  boxShadow: '0 4px 6px -1px rgba(59, 155, 155, 0.3), 0 2px 4px -1px rgba(59, 155, 155, 0.2)',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
            
            <p style={{ 
              textAlign: 'center', 
              marginTop: '24px',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
              color: '#6b7280'
            }}>
              Already have an account? 
              <Link 
                href="/signin" 
                style={{ 
                  color: '#3b9b9b', 
                  marginLeft: '5px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Sign in
              </Link>
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px'
            }}>
              <Link 
                href="/" 
                style={{ 
                  color: '#3b9b9b', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Back
              </Link>
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