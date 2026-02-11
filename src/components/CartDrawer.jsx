import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Minus, Plus, Truck, CreditCard, ChevronLeft, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [shippingMethod, setShippingMethod] = useState('paxi'); // 'paxi' | 'courier'
    const [yocoLoaded, setYocoLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const yocoRef = useRef(null);

    const shippingCost = shippingMethod === 'paxi' ? 60 : 120;
    const finalTotal = cartTotal + shippingCost;

    // Load Yoco SDK
    useEffect(() => {
        if (window.YocoSDK) {
            setYocoLoaded(true);
            return;
        }

        const script = document.createElement('script');
        // Using the modern loader which pulls the latest SDK versions
        script.src = "https://js.yoco.com/sdk/v1/yoco-sdk-loader.js";
        script.async = true;
        script.onload = () => {
            console.log("Yoco SDK Loader Ready");
            setYocoLoaded(true);
        };
        document.body.appendChild(script);
    }, []);

    // Initialize Yoco Inline
    useEffect(() => {
        if (showPayment && yocoLoaded && window.YocoSDK) {
            const timer = setTimeout(() => {
                try {
                    const yoco = new window.YocoSDK({
                        publicKey: import.meta.env.VITE_YOCO_PUBLIC_KEY
                    });

                    const inline = yoco.inline({
                        amountInCents: Math.round(finalTotal * 100),
                        currency: 'ZAR'
                    });

                    inline.mount('#yoco-card-frame');
                    yocoRef.current = inline;
                } catch (err) {
                    console.error("Yoco Initialization Error:", err);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [showPayment, yocoLoaded, finalTotal]);

    const handlePayment = () => {
        if (!yocoRef.current) return;
        setIsProcessing(true);

        yocoRef.current.createToken().then((result) => {
            if (result.error) {
                alert("Payment Error: " + result.error.message);
                setIsProcessing(false);
            } else {
                console.log("Token generated:", result.id);
                setTimeout(() => {
                    clearCart();
                    toggleCart();
                    setShowPayment(false);
                    alert("KASI™ Order Confirmed! 🇿🇦");
                    setIsProcessing(false);
                }, 1500);
            }
        }).catch((err) => {
            alert("Error: " + err.message);
            setIsProcessing(false);
        });
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 1000
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            height: '100%',
                            width: '100%',
                            maxWidth: '450px',
                            background: '#fff',
                            zIndex: 1001,
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {showPayment && (
                                    <button onClick={() => setShowPayment(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                        <ChevronLeft size={24} />
                                    </button>
                                )}
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    {showPayment ? 'Checkout' : `KASI™ Cart (${cartItems.length})`}
                                </h2>
                            </div>
                            <button onClick={toggleCart} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {showPayment ? (
                                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                                    {/* Brand / Trust Signal */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f5f5', padding: '8px 16px', borderRadius: '100px' }}>
                                            <Lock size={14} color="#22c55e" />
                                            <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px' }}>SECURE PAYMENT</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <div style={{ padding: '4px 8px', border: '1px solid #eee', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 900 }}>VISA</div>
                                            <div style={{ padding: '4px 8px', border: '1px solid #eee', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 900 }}>MC</div>
                                        </div>
                                    </div>

                                    {/* Payment Box */}
                                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                        <div style={{ background: '#111', color: '#fff', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>CARD DETAILS</span>
                                            <CreditCard size={18} opacity={0.5} />
                                        </div>
                                        <div style={{ padding: '2rem' }}>
                                            {/* Yoco Mount point */}
                                            <div id="yoco-card-frame" style={{ minHeight: '140px' }}></div>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '0.7rem', color: '#888', lineHeight: '1.6' }}>
                                            By confirming, you authorize KASI™ to process this payment via Yoco.
                                            Your data is protected and never stored on our servers.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ padding: '2rem' }}>
                                    {cartItems.length === 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: '#999', gap: '1.5rem' }}>
                                            <ShoppingBag size={64} strokeWidth={1} />
                                            <p style={{ fontWeight: 500 }}>Empty.</p>
                                            <button onClick={toggleCart} style={{ color: '#111', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Shop Drops</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                            {cartItems.map((item) => (
                                                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                                    <div style={{ width: '90px', height: '90px', background: '#f8f8f8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <img src="/logo-dark.png" alt="" style={{ width: '40%', opacity: 0.1 }} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                                            <div>
                                                                <h4 style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>KASI™ Tee</h4>
                                                                <p style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>{item.size} / {item.color}</p>
                                                            </div>
                                                            <button onClick={() => removeFromCart(item.id)} style={{ color: '#ccc', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>ZAR {item.price}</div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #eee', borderRadius: '4px', padding: '4px 8px' }}>
                                                                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} disabled={(item.quantity || 1) <= 1} style={{ border: 'none', background: 'none', cursor: 'pointer', opacity: (item.quantity || 1) <= 1 ? 0.3 : 1 }}><Minus size={14} /></button>
                                                                <span style={{ fontSize: '0.8rem', fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{item.quantity || 1}</span>
                                                                <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sticky Footer */}
                        {cartItems.length > 0 && (
                            <div style={{ padding: '2rem', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
                                {!showPayment && (
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.25rem', color: '#aaa', letterSpacing: '2px' }}>SHIPPING</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: `1px solid ${shippingMethod === 'paxi' ? '#111' : '#eee'}`, borderRadius: '8px', cursor: 'pointer', background: shippingMethod === 'paxi' ? '#fafafa' : '#fff' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <input type="radio" name="shipping" checked={shippingMethod === 'paxi'} onChange={() => setShippingMethod('paxi')} style={{ accentColor: '#111' }} />
                                                    <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>PAXI (7-9 DAYS)</span>
                                                </div>
                                                <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>R60</span>
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: `1px solid ${shippingMethod === 'courier' ? '#111' : '#eee'}`, borderRadius: '8px', cursor: 'pointer', background: shippingMethod === 'courier' ? '#fafafa' : '#fff' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <input type="radio" name="shipping" checked={shippingMethod === 'courier'} onChange={() => setShippingMethod('courier')} style={{ accentColor: '#111' }} />
                                                    <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>COURIER (1-3 DAYS)</span>
                                                </div>
                                                <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>R120</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div style={{ background: '#111', color: '#fff', padding: '2rem', borderRadius: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 900, fontSize: '1.4rem' }}>
                                        <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>TOTAL</span>
                                        <span>ZAR {finalTotal.toFixed(2)}</span>
                                    </div>

                                    <button
                                        onClick={showPayment ? handlePayment : () => setShowPayment(true)}
                                        disabled={isProcessing || (!yocoLoaded && showPayment)}
                                        style={{
                                            width: '100%',
                                            padding: '1.25rem',
                                            background: '#fff',
                                            color: '#111',
                                            border: 'none',
                                            fontWeight: 900,
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            borderRadius: '8px',
                                            opacity: (isProcessing || (!yocoLoaded && showPayment)) ? 0.7 : 1,
                                            marginTop: '1rem'
                                        }}
                                    >
                                        {isProcessing ? 'PROCESSING...' : (showPayment ? 'CONFIRM & PAY' : 'CHECKOUT')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
