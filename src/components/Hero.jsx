import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ color }) {
    // Using the high-quality assets uploaded by the user
    const heroImage = "/hero-v2.png";

    return (
        <section style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'radial-gradient(circle at center, #ffffff 0%, #e5e5e5 100%)', // Slightly more contrast
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.05)' // Inner vignette
        }}>

            {/* Hero Image Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1] // Custom ease 'outExpo' feel
                }}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1200px',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '12rem', // Match text clearance for the tall header logo
                    zIndex: 5
                }}
            >
                {/* Floating Animation Wrapper */}
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: '55%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src={heroImage}
                        alt="KASI Premium Tees"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 50px 100px rgba(0,0,0,0.5))' // Stronger dramatic shadow
                        }}
                    />
                </motion.div>
            </motion.div>

        </section>
    );
}
