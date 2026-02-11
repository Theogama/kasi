import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Center, Decal } from '@react-three/drei';
import * as THREE from 'three';

export default function TShirt({ color }) {
    // Load the GLTF model and scene
    const { scene } = useGLTF('/t-shirt.glb');

    // Load the design texture
    const texture = useTexture('/design.png');

    // Clone the scene so we can modify it without affecting the cached original
    const clonedScene = React.useMemo(() => scene.clone(), [scene]);

    // Ref to the main mesh for decals
    const mainMeshRef = useRef(null);

    useEffect(() => {
        // Traverse the scene to find meshes and apply initial settings
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                // Use the first mesh we find as the "Main" mesh for the decal
                if (!mainMeshRef.current) {
                    mainMeshRef.current = child;
                }

                // Ensure material works with our color logic
                if (child.material) {
                    // Clone material to avoid side effects if shared
                    child.material = child.material.clone();
                    child.material.roughness = 0.7;
                }
            }
        });
    }, [clonedScene]);

    // Smoothly interpolate color on every frame
    useFrame((state, delta) => {
        clonedScene.traverse((child) => {
            if (child.isMesh && child.material) {
                const targetColor = new THREE.Color(color === 'black' ? '#111111' : '#ffffff');
                // We use 'color' property on standard materials
                if (child.material.color) {
                    child.material.color.lerp(targetColor, delta * 2);
                }
            }
        });
    });

    return (
        <Center>
            <primitive object={clonedScene} scale={1.5}>
                {/* If we identified a main mesh, we can try to portal the Decal onto it, 
             but Decals usually need to be children of the mesh in the React tree 
             or use the 'mesh' prop. 
             Since we are using <primitive>, we can't easily nest <Decal> inside the mesh via JSX.
             
             WORKAROUND: We will render the Decal separately and use the 'mesh' prop if possible,
             OR we just stick to the basic color for now to ensure visibility first.
             
             Let's try to attach the decal to the mainMeshRef using a Portal or by just adding it?
             Actually, <Decal> from drei works by being a child of a Mesh. 
             Can we do that with <primitive>? No.
             
             Let's start by just getting the MODEL visible.
          */}
            </primitive>

            {/* 
          To fallback for the Design:
          Since we can't easily put a Drei Decal specifically on a standard gltf primitive without
          re-constructing the JSX, we will skip the decal for this immediate fix 
          to verify the model loads first.
          
          If the user REALLY needs the logo right now, we can try to find the specific Geometry 
          and render a <mesh> instead of <primitive>.
      */}

        </Center>
    );
}

useGLTF.preload('/t-shirt.glb');
