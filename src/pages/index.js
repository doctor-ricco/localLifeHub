import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
    return (
        <div style={{
            backgroundColor: '#f5f5f7',
            minHeight: '100vh',
            fontFamily: 'Poppins, sans-serif',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url("/images/krakow.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <Head>
                <title>LocalLife - Experience cities like a local</title>
                <meta name="description" content="Connect with locals for authentic experiences in your destination city." />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <header style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <a 
                            href="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none'
                            }}
                        >
                            <img 
                                src="/images/logo.png" 
                                alt="LocalLifeHub Logo" 
                                style={{
                                    height: '32px',
                                    width: '32px',
                                    marginRight: '8px'
                                }}
                            />
                            <h1 style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#3b9b9b',
                                fontFamily: 'Poppins, sans-serif',
                                letterSpacing: '0.5px',
                                margin: 0
                            }}>
                                <span style={{ color: '#2A8A8A', fontWeight: 'bold' }}>Local</span>
                                <span style={{ color: '#2A8A8A', fontWeight: 'bold' }}>life</span>
                                <span style={{ color: '#5BBABA', fontWeight: 'lighter' }}>Hub</span>
                            </h1>
                        </a>
                    </div>
                    <nav>
                        <a
                            href="/signin"
                            style={{
                                color: '#3b9b9b',
                                marginLeft: '20px',
                                textDecoration: 'none',
                                fontWeight: '500'
                            }}
                        >
                            Sign In
                        </a>
                    </nav>
                </div>
            </header>

            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '40px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 160px)'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    padding: '0',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    maxWidth: '400px',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        backgroundImage: 'url("/images/couple.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '240px',
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
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px'
                        }}>
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: '600',
                                marginBottom: '10px',
                                fontFamily: 'Poppins, sans-serif',
                                letterSpacing: '0.5px',
                                textAlign: 'center',
                                color: 'white'
                            }}>
                                Discover your favorite City<br />like a local
                            </h2>
                            <p style={{
                                fontSize: '14px',
                                lineHeight: '1.5',
                                color: 'rgba(255, 255, 255, 0.8)',
                                marginBottom: '0',
                                textAlign: 'center'
                            }}>

                                Connect with people who will show you <br /> the authentic side of their city. <br /><br />Travel like a pro, enjoy life like a local.                           </p>
                        </div>
                    </div>

                    <div style={{ padding: '30px 20px' }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            marginBottom: '20px'
                        }}>
                            <a
                                href="/register/guest"
                                style={{
                                    backgroundColor: '#3b9b9b',
                                    color: 'white',
                                    padding: '14px 20px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    display: 'block',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 6px -1px rgba(59, 155, 155, 0.3), 0 2px 4px -1px rgba(59, 155, 155, 0.2)',
                                    fontSize: '16px'
                                }}
                            >
                                Find a Local Host
                            </a>

                            <a
                                href="/register/host"
                                style={{
                                    backgroundColor: 'white',
                                    color: '#3b9b9b',
                                    padding: '14px 20px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    display: 'block',
                                    textAlign: 'center',
                                    border: '1px solid #3b9b9b',
                                    fontSize: '16px'
                                }}
                            >
                                Become a Host
                            </a>
                        </div>

                        <p style={{
                            textAlign: 'center',
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '10px'
                        }}>
                            Already have an account?
                            <a
                                href="/signin"
                                style={{
                                    color: '#3b9b9b',
                                    marginLeft: '5px',
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                }}
                            >
                                Sign In
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
            </main>

            <footer style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '15px',
                borderTop: '1px solid #e5e7eb',
                marginTop: 'auto',
                position: 'fixed',
                bottom: '0',
                width: '100%'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center',
                    color: '#6b7280',
                    fontSize: '14px'
                }}>
                    © 2025 LocalLifeHub. All rights reserved.
                </div>
            </footer>
        </div>
    );
} 