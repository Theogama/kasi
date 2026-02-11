import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Minus, Plus, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PaystackButton } from 'react-paystack';

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [shippingMethod, setShippingMethod] = useState('paxi'); // 'paxi' | 'courier'

    const shippingCost = shippingMethod === 'paxi' ? 60 : 120;
    const finalTotal = cartTotal + shippingCost;

    // Paystack Config
    const config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com", // In a real app, ask for this
        amount: finalTotal * 100, // Amount is in cents (ZAR)
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        currency: "ZAR",
    };

    const handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        clearCart();
        toggleCart();
        alert("Payment Successful! Your order is on the way.");
    };

    const componentProps = {
        ...config,
        text: `PAY ZAR ${finalTotal.toFixed(2)}`,
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: () => console.log('Payment closed'),
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
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase' }}>Your Cart ({cartItems.length})</h2>
                            <button onClick={toggleCart} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                            {cartItems.length === 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999', gap: '1rem' }}>
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p>Your cart is empty.</p>
                                    <button onClick={toggleCart} style={{ color: '#111', fontWeight: 700, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Start Shopping</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {cartItems.map((item) => (
                                        <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <div style={{ width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                {/* Placeholder for item image */}
                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: item.color === 'white' ? '#fff' : '#111', border: '1px solid #ddd' }}></div>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>KASI™ Essential Tee</h4>
                                                <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'capitalize', marginBottom: '0.5rem' }}>
                                                    {item.color} / {item.size || 'L'}
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ fontWeight: 600 }}>ZAR {item.price}</div>

                                                    {/* Quantity Controls */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f5f5f5', borderRadius: '4px', padding: '0.25rem' }}>
                                                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} disabled={(item.quantity || 1) <= 1} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0 4px', opacity: (item.quantity || 1) <= 1 ? 0.3 : 1 }}>
                                                            <Minus size={14} />
                                                        </button>
                                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>{item.quantity || 1}</span>
                                                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0 4px' }}>
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} style={{ color: '#999', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', marginTop: '-0.25rem' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div style={{ padding: '2rem', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>

                                {/* Shipping Selection */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Truck size={16} /> Shipping Method
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <label style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '0.75rem', border: `1px solid ${shippingMethod === 'paxi' ? '#111' : '#ddd'}`,
                                            borderRadius: '8px', cursor: 'pointer', background: '#fff'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'paxi'}
                                                    onChange={() => setShippingMethod('paxi')}
                                                    style={{ accentColor: '#111' }}
                                                />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Paxi (PEP Stores)</span>
                                                    <span style={{ fontSize: '0.75rem', color: '#666' }}>7-9 Business Days</span>
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: 700 }}>R60.00</span>
                                        </label>

                                        <label style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '0.75rem', border: `1px solid ${shippingMethod === 'courier' ? '#111' : '#ddd'}`,
                                            borderRadius: '8px', cursor: 'pointer', background: '#fff'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    checked={shippingMethod === 'courier'}
                                                    onChange={() => setShippingMethod('courier')}
                                                    style={{ accentColor: '#111' }}
                                                />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>The Courier Guy</span>
                                                    <span style={{ fontSize: '0.75rem', color: '#666' }}>1-3 Business Days (Door-to-Door)</span>
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: 700 }}>R120.00</span>
                                        </label>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                    <span>Subtotal</span>
                                    <span>ZAR {cartTotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                                    <span>Shipping</span>
                                    <span>ZAR {shippingCost.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.25rem', borderTop: '1px dashed #ddd', paddingTop: '1rem' }}>
                                    <span>Total</span>
                                    <span>ZAR {finalTotal.toFixed(2)}</span>
                                </div>

                                <PaystackButton
                                    className="btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: '#111',
                                        color: '#fff',
                                        border: 'none',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}
                                    {...componentProps}
                                />
                                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#888' }}>
                                    Secure payments via Paystack
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
