import React from 'react';

export default function Gallery() {
    const images = [
        { src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop', alt: 'Model wearing White KASI Tee' },
        { src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop', alt: 'Model wearing Black KASI Tee' }
    ];

    return (
        <section className="gallery-section" style={{ padding: '4rem 2rem', background: 'white' }}>
            <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', fontWeight: 300 }}>
                AS SEEN ON <span style={{ fontWeight: 900 }}>THE STREETS</span>
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {images.map((img, i) => (
                    <div key={i} style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                        <img
                            src={img.src}
                            alt={img.alt}
                            style={{ width: '100%', height: '500px', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.3s' }}
                            onMouseOver={(e) => e.target.style.filter = 'grayscale(0%)'}
                            onMouseOut={(e) => e.target.style.filter = 'grayscale(100%)'}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
