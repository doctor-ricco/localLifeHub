import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
    return (
        <div style={{
            backgroundColor: '#f5f5f7',
            minHeight: '100vh',
            fontFamily: 'Poppins, sans-serif',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1368&q=80")',
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

                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#3b9b9b',
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '0.5px'
                    }}>
                        <a href="/signin">

                            LocalLifeHub.com

                        </a></h1>


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
                        backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
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
                padding: '20px',
                borderTop: '1px solid #e5e7eb',
                marginTop: 'auto'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center',
                    color: '#6b7280',
                    fontSize: '14px'
                }}>
                    © 2025 LocalLife. All rights reserved.
                </div>
            </footer>
        </div>
    );
} 