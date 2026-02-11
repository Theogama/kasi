import React from 'react';
import { motion } from 'framer-motion';
import { Star, Check, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Interface({ color, setColor }) {
    const { addToCart } = useCart();
    const [size, setSize] = React.useState('L');

    const handleAddToCart = () => {
        addToCart({
            id: 'kasi-tee-001',
            name: 'KASI™ Essential Tee',
            price: 499.00,
            color: color,
            size: size
        });
    };

    return (
        <section className="interface" style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
            textAlign: 'center'
        }}>

            {/* Product Heading (Small reference) */}
            <div style={{ marginBottom: '1rem' }}>
                <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: '#666'
                }}>KASI™ Essential Tee</h2>
            </div>

            {/* Price & Rating Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-2px' }}>ZAR 499.00</span>
                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="#fbbf24" />)}
                    </div>
                </div>
                <div style={{ color: '#888', fontSize: '0.9rem', fontWeight: 500 }}>
                    5.0 • 120+ Verified Reviews
                </div>
            </div>

            {/* Color Selector */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '1rem 0' }}>
                <button onClick={() => setColor('black')} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    opacity: color === 'black' ? 1 : 0.4,
                    transition: 'opacity 0.3s'
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: '#111',
                        border: '2px solid #ccc', padding: '2px',
                        boxShadow: color === 'black' ? '0 0 0 2px #111' : 'none'
                    }}></div>
                    <span style={{ fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase' }}>Black</span>
                </button>

                <button onClick={() => setColor('white')} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    opacity: color === 'white' ? 1 : 0.4,
                    transition: 'opacity 0.3s'
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: '#fff',
                        border: '1px solid #ccc',
                        boxShadow: color === 'white' ? '0 0 0 2px #999' : 'none'
                    }}></div>
                    <span style={{ fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase' }}>White</span>
                </button>
            </div>

            {/* Size Selector */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1rem 0', flexWrap: 'wrap' }}>
                {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                    <button
                        key={s}
                        onClick={() => setSize(s)}
                        style={{
                            background: size === s ? '#111' : 'transparent',
                            color: size === s ? '#fff' : '#111',
                            border: '1px solid #ddd',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '40px', height: '40px',
                            fontWeight: 700, fontSize: '0.9rem',
                            transition: 'all 0.2s',
                            borderRadius: '4px'
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Buying Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <button onClick={handleAddToCart} className="btn-primary" style={{ width: '100%', maxWidth: '400px', fontSize: '1.25rem', padding: '1.25rem' }}>
                    Add to Cart
                </button>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    fontSize: '0.9rem',
                    color: '#444',
                    fontWeight: 600
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={18} color="#10b981" /> Premium Cotton</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={18} color="#10b981" /> True-to-Size</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={18} color="#10b981" /> Global Shipping</span>
                </div>
            </div>

            {/* Urgency Section */}
            <div style={{
                marginTop: '1rem',
                padding: '1.5rem',
                background: 'rgba(0,0,0,0.03)',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                width: 'fit-content',
                margin: '1rem auto'
            }}>
                <AlertTriangle size={24} color="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800, color: '#111' }}>Limited Production Run</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>Next dispatch: 48 hours</div>
                </div>
            </div>

        </section>
    );
}
