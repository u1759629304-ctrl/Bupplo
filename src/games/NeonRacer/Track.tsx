import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNeonRacerStore } from "./useNeonRacerStore";

export default function Track() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const buildingsRef = useRef<THREE.InstancedMesh>(null);
  const speed = useNeonRacerStore((state) => state.speed);
  const gameState = useNeonRacerStore((state) => state.gameState);

  // Generate buildings
  const count = 200;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const buildingData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
        // distribute buildings along the side of the track
        const side = Math.random() > 0.5 ? 1 : -1;
        const x = side * (10 + Math.random() * 80);
        const z = -150 + Math.random() * 200;
        const w = 2 + Math.random() * 4;
        const h = 5 + Math.random() * 25;
        const d = 2 + Math.random() * 4;
        data.push({ x, z, w, h, d });
    }
    return data;
  }, [count]);

  useFrame((_, delta) => {
    if (gameState !== "playing") return;
    
    if (gridRef.current) {
      gridRef.current.position.z += speed * delta;
      if (gridRef.current.position.z > 4) {
        gridRef.current.position.z -= 4;
      }
    }

    if (buildingsRef.current) {
      // Loop buildings to create infinite city effect
      buildingData.forEach((b, i) => {
        b.z += speed * delta;
        if (b.z > 20) {
           b.z -= 170; // move back
        }
        dummy.position.set(b.x, b.h / 2, b.z);
        dummy.scale.set(b.w, b.h, b.d);
        dummy.updateMatrix();
        buildingsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      buildingsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, -20]}>
      {/* Grid */}
      <gridHelper 
        ref={gridRef}
        args={[200, 50, "#8B5CF6", "#3B82F6"]} 
        position={[0, 0, 0]}
      />
      
      {/* City Buildings */}
      <instancedMesh ref={buildingsRef} args={[undefined, undefined, count]} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.1} />
      </instancedMesh>
      
      {/* City skyline/mountains in the distance */}
      <mesh position={[0, 5, -120]}>
        <planeGeometry args={[300, 40]} />
        <meshBasicMaterial color="#110622" depthWrite={false} fog={false}/>
      </mesh>
      
      {/* Sun/Neon Circle */}
      <mesh position={[0, 20, -130]}>
        <circleGeometry args={[25, 32]} />
        <meshBasicMaterial color="#EF4444" toneMapped={false} />
      </mesh>

      {/* Road Base to make the 5 lanes stand out */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
         <planeGeometry args={[10, 200]} />
         <meshBasicMaterial color="#0b0314" />
      </mesh>

      {/* Lane Indicators [-5, -3, -1, 1, 3, 5] bounds the 5 lanes of width 2 */}
      {[-5, -3, -1, 1, 3, 5].map((x) => (
        <mesh key={x} position={[x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
           <planeGeometry args={[0.1, 200]} />
           <meshBasicMaterial color={x === -5 || x === 5 ? "#EF4444" : "#8B5CF6"} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
