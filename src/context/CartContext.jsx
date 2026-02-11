import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [sessionId, setSessionId] = useState(localStorage.getItem('kasi_session_id'));
    const [isLoading, setIsLoading] = useState(false);

    // Initialize Session
    useEffect(() => {
        if (!sessionId) {
            const newSessionId = crypto.randomUUID();
            localStorage.setItem('kasi_session_id', newSessionId);
            setSessionId(newSessionId);
            createCartInSupabase(newSessionId);
        } else {
            fetchCart(sessionId);
        }
    }, [sessionId]);

    const createCartInSupabase = async (sid) => {
        const { error } = await supabase.from('carts').insert([{ session_id: sid }]);
        if (error) console.error('Error creating cart:', error);
    };

    const fetchCart = async (sid) => {
        setIsLoading(true);
        // GET cart_id from session
        const { data: cartData, error: cartError } = await supabase
            .from('carts')
            .select('id')
            .eq('session_id', sid)
            .single();

        if (cartData) {
            // GET items for this cart
            const { data: items, error: itemsError } = await supabase
                .from('cart_items')
                .select('*')
                .eq('cart_id', cartData.id);

            if (items) setCartItems(items);
        } else if (!cartError) {
            // If no cart found for session, create one
            createCartInSupabase(sid);
        }
        setIsLoading(false);
    };

    const addToCart = async (product) => {
        // Optimistic Update
        const tempId = crypto.randomUUID();
        const newItem = { ...product, id: tempId, quantity: 1 };
        setCartItems(prev => [...prev, newItem]);
        setIsCartOpen(true);

        try {
            // 1. Get Cart ID
            const { data: cartData } = await supabase
                .from('carts')
                .select('id')
                .eq('session_id', sessionId)
                .single();

            if (!cartData) throw new Error("No cart found");

            // 2. Insert Item
            const { data: insertedItem, error } = await supabase
                .from('cart_items')
                .insert([{
                    cart_id: cartData.id,
                    product_id: product.id || 'kasi-tee-001',
                    quantity: 1,
                    color: product.color,
                    price: product.price,
                    size: product.size || 'L'
                }])
                .select()
                .single();

            if (error) throw error;

            // 3. Replace temp ID with real DB ID
            setCartItems(prev => prev.map(item => item.id === tempId ? insertedItem : item));

        } catch (err) {
            console.error("Failed to add to cart:", err);
            // Rollback on error
            setCartItems(prev => prev.filter(item => item.id !== tempId));
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        // Optimistic Update
        setCartItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));

        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('id', itemId);

        if (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        // Optimistic
        setCartItems(prev => prev.filter(item => item.id !== itemId));

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId);

        if (error) console.error("Error deleting item:", error);
    };

    const clearCart = async () => {
        setCartItems([]);
        // Get Cart ID first
        const { data: cartData } = await supabase.from('carts').select('id').eq('session_id', sessionId).single();
        if (cartData) {
            await supabase.from('cart_items').delete().eq('cart_id', cartData.id);
        }
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            isCartOpen,
            toggleCart,
            cartTotal,
            clearCart,
            isLoading,
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}
