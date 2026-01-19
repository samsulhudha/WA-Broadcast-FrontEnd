import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    // CSS for Animations
    const styles = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        @keyframes pulseGlow {
            0% { box-shadow: 0 0 5px rgba(0, 255, 157, 0.2); }
            50% { box-shadow: 0 0 20px rgba(0, 255, 157, 0.6); }
            100% { box-shadow: 0 0 5px rgba(0, 255, 157, 0.2); }
        }
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .animate-fade-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-10px) !important; box-shadow: 0 10px 30px rgba(0, 255, 157, 0.15) !important; }
        
        .floating-badge { animation: float 3s ease-in-out infinite; }
        
        .hero-text-gradient {
            background: linear-gradient(90deg, #ffffff, #00ff9d, #ffffff);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientMove 3s linear infinite;
        }
    `;

    const heroStyle = {
        background: 'radial-gradient(circle at 50% 50%, rgba(18, 140, 126, 0.15) 0%, rgba(17, 27, 33, 1) 80%)',
        padding: '8rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
    };

    const sectionTitleStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '3rem',
        color: 'var(--neon-green)',
        textAlign: 'center',
        textShadow: '0 0 15px rgba(0, 255, 157, 0.4)',
        letterSpacing: '-1px'
    };

    const cardStyle = {
        background: 'rgba(32, 44, 51, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        height: '100%',
        color: '#e9edef',
    };

    return (
        <div className="landing-page" style={{ minHeight: '100vh', background: 'var(--wa-dark-bg)', color: '#e9edef', fontFamily: '"Inter", sans-serif' }}>
            <style>{styles}</style>
            
            {/* Navbar */}
            <nav className="p-d-flex p-jc-between p-ai-center p-p-4 animate-fade-up" style={{ backdropFilter: 'blur(5px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(18, 140, 126, 0.3)' }}>
                <div className="p-d-flex p-ai-center hover-lift" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <i className="pi pi-whatsapp p-mr-2" style={{ fontSize: '1.8rem', color: 'var(--neon-green)' }}></i>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>WA Broadcast</span>
                </div>
                <div>
                    <Button label="Login" className="p-button-text p-mr-3 hover-lift" style={{ color: '#fff', fontSize: '1.1rem' }} onClick={() => navigate('/login')} />
                    <Button label="Get Started" className="p-button-rounded p-button-success hover-lift" onClick={() => navigate('/signup')} />
                </div>
            </nav>

            {/* Hero Section */}
            <header style={heroStyle}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h1 className="p-mb-4 animate-fade-up delay-100" style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1.2, margin: '0 0 1.5rem 0' }}>
                        Reach Everyone. <br />
                        <span className="hero-text-gradient">Everywhere. Instantly.</span>
                    </h1>
                    <p className="p-mb-6 animate-fade-up delay-200" style={{ fontSize: '1.25rem', color: '#aebac1', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 3rem auto' }}>
                        The most powerful WhatsApp Broadcast tool for Indian Businesses. <br/>
                        Scale your outreach with zero friction and 100% reliability.
                    </p>
                    <div className="p-d-flex p-jc-center p-ai-center gap-3 animate-fade-up delay-300">
                        <Button label="Start for Free" icon="pi pi-arrow-right" iconPos="right" className="p-button-rounded p-button-success p-button-lg p-mr-3 hover-lift" style={{ transform: 'scale(1.1)' }} onClick={() => navigate('/signup')} />
                        <Button label="View Demo" icon="pi pi-play" className="p-button-rounded p-button-outlined p-button-secondary p-button-lg hover-lift" style={{ color: '#fff' }} />
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="p-p-6" style={{ background: '#0b141a' }}>
                <h2 style={sectionTitleStyle} className="animate-fade-up">Why Global Brands Trust Us</h2>
                <div className="p-grid p-gap-4 p-jc-center">
                    {[
                        { icon: 'pi pi-users', title: 'Smart Lists', desc: 'Organize thousands of contacts with ease. Search, filter, and manage efficiently.' },
                        { icon: 'pi pi-bolt', title: 'Instant Delivery', desc: 'Our high-performance engine ensures your messages land in seconds, not hours.' },
                        { icon: 'pi pi-lock', title: 'Bank-Grade Security', desc: 'Your customer data is encrypted and protected with enterprise-level security protocols.' }
                    ].map((feature, idx) => (
                        <div className="p-col-12 p-md-4 animate-fade-up" style={{ animationDelay: `${(idx + 1) * 0.2}s` }} key={idx}>
                            <Card className="hover-lift" style={cardStyle}>
                                <div className="p-text-center p-mb-4">
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                        <i className={`pi ${feature.icon}`} style={{ fontSize: '2.5rem', color: 'var(--neon-green)' }}></i>
                                    </div>
                                </div>
                                <h3 className="p-text-center p-mb-3" style={{ color: '#fff' }}>{feature.title}</h3>
                                <p className="p-text-center" style={{ color: '#aebac1', lineHeight: 1.6 }}>{feature.desc}</p>
                            </Card>
                        </div>
                    ))}
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="p-p-6" style={{ background: 'var(--wa-dark-bg)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 100% 0%, rgba(0, 255, 157, 0.05) 0%, transparent 50%)', pointerEvents: 'none' }}></div>
                <h2 style={sectionTitleStyle} className="animate-fade-up">Perfect For Every Industry</h2>
                <div className="p-grid p-gap-4 p-jc-center">
                    {[
                        { title: 'Retail & E-commerce', icon: 'pi pi-shopping-bag', items: ['Flash Sale Alerts', 'New Arrival Notifications', 'Order Updates'] },
                        { title: 'Education & Schools', icon: 'pi pi-book', items: ['Exam Schedules', 'Emergency Closures', 'Parent Broadcasts'] },
                        { title: 'Service Business', icon: 'pi pi-calendar-plus', items: ['Gym/Salon Offers', 'Appointment Reminders', 'Weekly Tips'] },
                        { title: 'Content Creators', icon: 'pi pi-video', items: ['New Video Alerts', 'Exclusive Content', 'Community Updates'] }
                    ].map((usecase, idx) => (
                        <div className="p-col-12 p-md-6 p-lg-3 animate-fade-up" style={{ animationDelay: `${(idx + 1) * 0.15}s` }} key={idx}>
                            <Card className="hover-lift" style={{ ...cardStyle, background: 'rgba(32, 44, 51, 0.4)', borderTop: '3px solid var(--neon-green)' }}>
                                <div className="p-mb-3 p-d-flex p-ai-center">
                                    <i className={`pi ${usecase.icon} p-mr-2`} style={{ fontSize: '1.5rem', color: 'var(--neon-green)' }}></i>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#fff' }}>{usecase.title}</h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#aebac1', fontSize: '0.9rem', lineHeight: '2' }}>
                                    {usecase.items.map((item, i) => (
                                        <li key={i}><i className="pi pi-angle-right p-mr-2" style={{ color: 'var(--wa-teal)' }}></i> {item}</li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    ))}
                </div>
            </section>
            {/* Pricing Section */}
            <section className="p-p-4" style={{ padding: '4rem 2rem' }}>
                <h2 style={{...sectionTitleStyle, marginBottom: '2rem'}}>Unbeatable Pricing</h2>
                <div className="p-grid p-jc-center p-ai-end">
                    
                    {/* Free Tier */}
                    <div className="p-col-12 p-md-4">
                        <Card style={{ ...cardStyle, borderTop: '4px solid #aebac1', padding: '1rem' }}>
                            <div className="p-text-center">
                                <h3 style={{ fontSize: '1.25rem', color: '#aebac1', margin: '0' }}>Free Forever</h3>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: '0.5rem 0' }}>₹0</div>
                                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#aebac1', lineHeight: '1.8', fontSize: '0.9rem' }}>
                                    {[ '100 Contacts', 'Daily Broadcasts', 'Basic Support' ].map((item, i) => (
                                        <li key={i}><i className="pi pi-check p-mr-2" style={{ color: 'var(--wa-green)' }}></i> {item}</li>
                                    ))}
                                </ul>
                                <Button label="Start Free" className="p-button-outlined p-button-secondary p-button-sm p-mt-2" style={{ width: '100%', color: '#fff' }} onClick={() => navigate('/signup')} />
                            </div>
                        </Card>
                    </div>

                    {/* Growth Tier */}
                    <div className="p-col-12 p-md-4">
                        <Card style={{ ...cardStyle, border: '2px solid var(--neon-green)', background: 'rgba(0, 255, 157, 0.05)', position: 'relative', padding: '1rem' }}>
                             <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--neon-green)', color: '#000', padding: '0.1rem 0.8rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.75rem' }}>
                                BEST SELLER
                            </div>
                            <div className="p-text-center">
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--neon-green)', margin: '0' }}>Growth</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', margin: '0.5rem 0' }}>₹199<span style={{ fontSize: '0.9rem', color: '#aebac1' }}>/mo</span></div>
                                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#e9edef', lineHeight: '1.8', fontSize: '0.95rem' }}>
                                     {[ '1,000 Contacts', 'Priority Messaging', 'read Receipts', 'WhatsApp Support' ].map((item, i) => (
                                        <li key={i}><i className="pi pi-check-circle p-mr-2" style={{ color: 'var(--neon-green)' }}></i> {item}</li>
                                    ))}
                                </ul>
                                <Button label="Choose Growth" className="p-button-success p-button-sm p-mt-2" style={{ width: '100%', fontWeight: 'bold' }} onClick={() => navigate('/signup')} />
                            </div>
                        </Card>
                    </div>

                    {/* Scale Tier */}
                    <div className="p-col-12 p-md-4">
                        <Card style={{ ...cardStyle, borderTop: '4px solid var(--wa-teal)', padding: '1rem' }}>
                            <div className="p-text-center">
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--wa-teal)', margin: '0' }}>Scale</h3>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: '0.5rem 0' }}>₹499<span style={{ fontSize: '0.9rem', color: '#aebac1' }}>/mo</span></div>
                                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#aebac1', lineHeight: '1.8', fontSize: '0.9rem' }}>
                                     {[ 'Unlimited Contacts', 'API Access', 'Multiple Agents', 'Priority Support' ].map((item, i) => (
                                        <li key={i}><i className="pi pi-check p-mr-2" style={{ color: 'var(--wa-teal)' }}></i> {item}</li>
                                    ))}
                                </ul>
                                <Button label="Go Limitless" className="p-button-outlined p-button-info p-button-sm p-mt-2" style={{ width: '100%', color: 'var(--wa-teal)', borderColor: 'var(--wa-teal)' }} onClick={() => navigate('/signup')} />
                            </div>
                        </Card>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="p-text-center p-p-6" style={{ background: 'linear-gradient(180deg, rgba(32, 44, 51, 0) 0%, rgba(18, 140, 126, 0.2) 100%)', padding: '6rem 2rem' }}>
                <h2 className="p-mb-4" style={{ fontSize: '2.5rem' }}>Ready to <span style={{ color: 'var(--neon-green)' }}>Skyrocket</span> Your Reach?</h2>
                <p className="p-mb-5" style={{ fontSize: '1.2rem', color: '#aebac1', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                    Join 5,000+ Indian businesses using WA Broadcast to connect with their customers personally and instantly.
                </p>
                <Button label="Create Free Account" className="p-button-success p-button-lg p-button-rounded" onClick={() => navigate('/signup')} />
            </section>

            {/* Footer */}
            <footer className="p-p-5 p-text-center" style={{ borderTop: '1px solid #333', color: '#666', fontSize: '0.9rem' }}>
                <div className="p-mb-3">
                    <i className="pi pi-twitter p-mr-3" style={{ cursor: 'pointer', fontSize: '1.2rem' }}></i>
                    <i className="pi pi-facebook p-mr-3" style={{ cursor: 'pointer', fontSize: '1.2rem' }}></i>
                    <i className="pi pi-instagram" style={{ cursor: 'pointer', fontSize: '1.2rem' }}></i>
                </div>
                <p>&copy; 2026 WA Broadcast SaaS. Made for India 🇮🇳</p>
            </footer>
        </div>
    );
};

export default Landing;
