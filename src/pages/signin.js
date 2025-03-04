import Link from 'next/link';

export default function SignIn() {
  return (
    <div style={{ 
      backgroundColor: '#f5f5f7', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
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
              Sign in
            </h1>
          </div>
        </div>
        
        <div style={{ padding: '30px 20px' }}>
          <form>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500',
                color: '#374151'
              }}>
                Email
              </label>
              <input 
                type="email" 
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#1e293b',
                  backgroundColor: '#f8fafc',
                  boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                }} 
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px' 
              }}>
                <label style={{ 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Password
                </label>
                <a 
                  href="#" 
                  style={{ 
                    color: '#3b9b9b', 
                    textDecoration: 'none', 
                    fontSize: '14px', 
                    fontWeight: '500' 
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <input 
                type="password" 
                style={{ 
                  width: '100%', 
                  padding: '12px 16px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '12px',
                  fontSize: '14px',
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
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: '#3b9b9b', 
                color: 'white', 
                border: 'none', 
                borderRadius: '12px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 6px -1px rgba(59, 155, 155, 0.3), 0 2px 4px -1px rgba(59, 155, 155, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Go
            </button>
          </form>
          
          <p style={{ 
            textAlign: 'center', 
            marginTop: '24px',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Don't have an account? 
            <a 
              href="/register" 
              style={{ 
                color: '#3b9b9b', 
                marginLeft: '5px',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Register
            </a>
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
  );
} 