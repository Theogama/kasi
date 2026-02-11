import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <section style={{
            position: 'absolute',
            top: '15rem',
            left: '5%',
            zIndex: 5,
            pointerEvents: 'none',
            textAlign: 'left',
            maxWidth: '350px'
        }}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <h3 style={{
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    letterSpacing: '5px',
                    textTransform: 'uppercase',
                    color: '#000',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span style={{ height: '1px', width: '20px', background: '#000' }}></span>
                    The Origin
                </h3>

                <div style={{
                    fontSize: '1rem',
                    color: '#444',
                    lineHeight: '1.8',
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif"
                }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Born in the heart of the kasi. <br />
                        Built for the global stage.
                    </p>

                    <p style={{
                        fontSize: '0.85rem',
                        color: '#888',
                        borderLeft: '2px solid #eee',
                        paddingLeft: '1.5rem',
                        fontStyle: 'italic'
                    }}>
                        "We don't just make clothes; we export the culture. Every thread carries the soul of the streets that raised us."
                    </p>

                    <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#111', fontWeight: 700 }}>
                        LIMITED RUNS. <br />
                        CULTURAL SIGNIFICANCE. <br />
                        ZERO RESTOCKS.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
