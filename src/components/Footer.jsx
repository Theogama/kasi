import React from 'react';
import { Instagram, Twitter, MessageCircle, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{
            padding: '6rem 2rem 3rem',
            background: '#000',
            color: 'white',
            borderTop: '1px solid #222',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Top Section: Branding & Newsletter */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    marginBottom: '5rem'
                }}>

                    {/* Brand Info */}
                    <div style={{ textAlign: 'left' }}>
                        <img src="/logo.png" alt="KASI Logo" style={{
                            height: '200px',
                            width: 'auto',
                            marginBottom: '1rem',
                            marginLeft: '-15px' // Nudge for optical alignment
                        }} />
                        <p style={{
                            color: '#888',
                            lineHeight: 1.6,
                            fontSize: '1.1rem',
                            maxWidth: '400px'
                        }}>
                            From the kasi to the world. <br />
                            Premium streetwear that represents the culture. Limited drops only. No restocks.
                        </p>
                    </div>

                    {/* Newsletter Container */}
                    <div>
                        <h4 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#fff'
                        }}>Join the Culture</h4>
                        <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '1rem' }}>
                            Stay ahead of the drop. Join our elite list.
                        </p>
                        <div style={{ position: 'relative', maxWidth: '400px' }}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                style={{
                                    width: '100%',
                                    padding: '1.25rem 1.5rem',
                                    paddingRight: '4rem',
                                    background: '#111',
                                    border: '1px solid #333',
                                    borderRadius: '50px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                            />
                            <button style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: '#fff',
                                color: '#000',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links & Social */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '3rem',
                    borderTop: '1px solid #111',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}>

                    {/* Secondary Navigation */}
                    <div style={{ display: 'flex', gap: '3rem' }}>
                        <div>
                            <h5 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Support</h5>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '0.75rem' }}><a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Shipping & Returns</a></li>
                                <li style={{ marginBottom: '0.75rem' }}><a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Size Guide</a></li>
                                <li style={{ marginBottom: '0.75rem' }}><a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Legal</h5>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '0.75rem' }}><a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Privacy Policy</a></li>
                                <li style={{ marginBottom: '0.75rem' }}><a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Terms of Service</a></li>
                                <li style={{ marginBottom: '0.75rem' }}><a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Refund Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <a href="#" style={{ color: '#fff', transition: 'transform 0.2s' }}><Instagram size={24} /></a>
                        <a href="#" style={{ color: '#fff', transition: 'transform 0.2s' }}><Twitter size={24} /></a>
                        <a href="#" style={{ color: '#fff', transition: 'transform 0.2s' }}><MessageCircle size={24} /></a>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div style={{
                    marginTop: '4rem',
                    textAlign: 'center',
                    color: '#444',
                    fontSize: '0.85rem',
                    letterSpacing: '0.5px'
                }}>
                    &copy; {new Date().getFullYear()} KASI™ CLOTHING. ALL RIGHTS RESERVED. MADE FOR THE CULTURE.
                </div>
            </div>
        </footer>
    );
}
