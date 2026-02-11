import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
    const { toggleCart, cartItems } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            transition: 'all 0.3s ease'
        }}>
            {/* Notification Bar */}
            <div style={{
                background: '#000',
                color: '#fff',
                padding: '0.5rem',
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textAlign: 'center',
                borderBottom: '1px solid #222'
            }}>
                Limited Drop: February Edition • Shipping Nationwide
            </div>

            {/* Main Header */}
            <div style={{
                padding: '1rem 3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.01)',
                backdropFilter: 'blur(5px)'
            }}>
                {/* Left Navigation */}
                <nav style={{ flex: 1, display: 'flex', gap: '2rem' }}>
                    <a href="#" style={{ color: '#111', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Shop</a>
                    <a href="#" style={{ color: '#111', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Drops</a>
                </nav>

                {/* Centered Logo */}
                <div className="logo" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        src="/logo-dark.png"
                        alt="KASI Logo"
                        style={{
                            height: '130px',
                            width: 'auto',
                            cursor: 'pointer'
                        }}
                    />
                </div>

                {/* Right Navigation */}
                <nav style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '2rem', alignItems: 'center' }}>
                    <a href="#" style={{ color: '#111', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Story</a>

                    <button
                        onClick={toggleCart}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                            color: '#111'
                        }}
                    >
                        <ShoppingBag size={20} />
                        {cartItems.length > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                background: '#111',
                                color: 'white',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                fontSize: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700
                            }}>
                                {cartItems.length}
                            </span>
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
}
