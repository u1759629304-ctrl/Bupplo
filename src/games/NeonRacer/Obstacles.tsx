import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useNeonRacerStore } from "./useNeonRacerStore";
import { audioSynth } from "./AudioSynth";

interface ObstacleData {
  id: number;
  x: number;
  z: number;
  width: number;
  passed: boolean;
}

export default function Obstacles() {
  const [obstacles, setObstacles] = useState<ObstacleData[]>([]);
  const nextSpawnDistance = useRef(40);
  const totalTraveled = useRef(0);
  const obsCounter = useRef(0);
  
  const speed = useNeonRacerStore((state) => state.speed);
  const gameState = useNeonRacerStore((state) => state.gameState);
  const prevGameState = useRef(gameState);
  const setGameState = useNeonRacerStore((state) => state.setGameState);
  const score = useNeonRacerStore((state) => state.score);
  const incrementScore = useNeonRacerStore((state) => state.incrementScore);
  const increaseSpeed = useNeonRacerStore((state) => state.increaseSpeed);
  const carX = useNeonRacerStore((state) => state.carX);

  const CAR_WIDTH = 1.5;
  const CAR_LENGTH = 3;
  const OBS_DEPTH = 1;

  useFrame((_, delta) => {
    if (gameState === "start" || (prevGameState.current === "gameover" && gameState === "playing")) {
        setObstacles([]);
        totalTraveled.current = 0;
        nextSpawnDistance.current = 40;
    }
    prevGameState.current = gameState;

    if (gameState !== "playing") {
        return;
    }

    const moveAmount = speed * delta;
    totalTraveled.current += moveAmount;

    // Spawn logic
    if (totalTraveled.current > nextSpawnDistance.current) {
        // Spawn an obstacle
        const rowObstacles = Math.floor(Math.random() * 2) + 1; // 1 or 2 blocks
        const newObs: ObstacleData[] = [];
        const lanes = [-4, -2, 0, 2, 4];
        
        // Pick unique lanes for this row
        const shuffledLanes = [...lanes].sort(() => 0.5 - Math.random());

        for (let i = 0; i < rowObstacles; i++) {
            newObs.push({
                id: obsCounter.current++,
                x: shuffledLanes[i],
                z: -100, // spawn far away
                width: 1.8, // fits tightly in 2 unit lane
                passed: false
            });
        }
        
        setObstacles((prev) => [...prev, ...newObs]);
        nextSpawnDistance.current = totalTraveled.current + 30 + Math.random() * 40; // distance to next obstacle
    }
    
    // Move obstacles and check collisions
    setObstacles((prev) => {
      let collided = false;
      let shouldIncreaseSpeed = false;
      const next = prev.map(obs => {
        const newZ = obs.z + moveAmount;
        
        // Collision check
        // Car is at z=0 (approx z bounds: -1.5 to 1.5)
        if (newZ > -1.5 && newZ - OBS_DEPTH < 1.5) {
            // Z overlaps, check X
            if (Math.abs(carX - obs.x) < (CAR_WIDTH / 2 + obs.width / 2)) {
                collided = true;
            }
        }

        // Score check
        if (!obs.passed && newZ > 1.5) {
            incrementScore();
            shouldIncreaseSpeed = true;
            audioSynth.playScore();
            return { ...obs, z: newZ, passed: true };
        }

        return { ...obs, z: newZ };
      });
      
      if (collided) {
          setGameState("gameover");
          audioSynth.playCrash();
      }
      
      if (shouldIncreaseSpeed) {
          increaseSpeed();
      }

      // Cleanup
      return next.filter(obs => obs.z < 20);
    });
  });

  return (
    <group>
      {obstacles.map((obs) => (
        <mesh key={obs.id} position={[obs.x, 0.5, obs.z]}>
          <boxGeometry args={[obs.width, 1, OBS_DEPTH]} />
          <meshStandardMaterial color="#111" />
          <mesh position={[0, 0, 0]}>
             <boxGeometry args={[obs.width + 0.1, 1.1, OBS_DEPTH + 0.1]} />
             <meshBasicMaterial color="#10B981" wireframe toneMapped={false} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}
