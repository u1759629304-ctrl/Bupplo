import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNeonRacerStore } from "./useNeonRacerStore";

export default function Car() {
  const carRef = useRef<THREE.Group>(null);
  const gameState = useNeonRacerStore((state) => state.gameState);
  const setCarX = useNeonRacerStore((state) => state.setCarX);

  const targetX = useRef(0);

  const score = useNeonRacerStore((state) => state.score);

  useEffect(() => {
    if (score === 0) {
      targetX.current = 0;
      if (carRef.current) {
        carRef.current.position.x = 0;
        carRef.current.rotation.z = 0;
      }
    }
  }, [score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
       if (gameState !== 'playing') return;
       if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          targetX.current = Math.max(-4, targetX.current - 2);
       }
       if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          targetX.current = Math.min(4, targetX.current + 2);
       }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  useFrame((_, delta) => {
    if (gameState !== "playing" || !carRef.current) return;

    carRef.current.position.x = THREE.MathUtils.lerp(
      carRef.current.position.x,
      targetX.current,
      15 * delta
    );

    // Save actual position to store for collision
    setCarX(carRef.current.position.x);

    // Add some tilt based on movement
    carRef.current.rotation.z = THREE.MathUtils.lerp(
      carRef.current.rotation.z,
      (targetX.current - carRef.current.position.x) * -0.2,
      10 * delta
    );
  });

  return (
    <group ref={carRef} position={[0, 0.5, 0]}>
      {/* Car Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.5, 3]} />
        <meshStandardMaterial color="#222222" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Neon Accents */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[1.6, 0.1, 3.1]} />
        <meshBasicMaterial color="#8B5CF6" toneMapped={false} />
      </mesh>
      {/* Headlights */}
      <mesh position={[-0.5, 0, -1.5]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh position={[0.5, 0, -1.5]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      {/* Taillights */}
      <mesh position={[-0.5, 0, 1.5]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff0000" toneMapped={false} />
      </mesh>
      <mesh position={[0.5, 0, 1.5]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff0000" toneMapped={false} />
      </mesh>
    </group>
  );
}
