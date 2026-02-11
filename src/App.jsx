import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Interface from './components/Interface'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import About from './components/About'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './context/CartContext'
import './index.css'

function App() {
  const [color, setColor] = useState('black')

  return (
    <CartProvider>
      <div className="app-container">
        <CartDrawer />
        <Header />
        <main style={{ position: 'relative' }}>
          {/* Interactive Hero System */}
          <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', marginBottom: '8rem' }}>

            {/* Background Composition */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <Hero color={color} />
            </div>

            {/* About Us Section */}
            <About />

          </div>

          {/* Product Details Section (Moved from Hero Overlay) */}
          <div style={{ position: 'relative', zIndex: 10, background: '#ececec', padding: '4rem 0' }}>
            <Interface color={color} setColor={setColor} />
          </div>

          {/* Content Below Fold */}
          <div style={{ position: 'relative', zIndex: 20, background: 'white', borderTop: '1px solid #eee' }}>
            <Footer />
          </div>
        </main>
      </div>
    </CartProvider>
  )
}

export default App
