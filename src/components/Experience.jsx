import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, Float, ContactShadows } from '@react-three/drei';
import TShirt from './TShirt';

export default function Experience({ color }) {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
                <color attach="background" args={['#f5f5f5']} />

                {/* Soft studio lighting environment */}
                <Environment preset="city" intensity={0.8} />

                <Suspense fallback={null}>
                    <Float
                        speed={2}
                        rotationIntensity={0.5}
                        floatIntensity={1}
                        floatingRange={[-0.1, 0.1]}
                    >
                        <TShirt color={color} />
                    </Float>

                    <ContactShadows
                        position={[0, -1.5, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2.5}
                        far={4}
                    />
                </Suspense>

                <OrbitControls
                    enableZoom={true}
                    minDistance={2}
                    maxDistance={6}
                    autoRotate
                    autoRotateSpeed={0.5}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
