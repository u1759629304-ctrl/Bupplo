import { Canvas } from "@react-three/fiber";
import { KeyboardControls, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import Scene from "./Scene";
import UI from "./UI";

export default function NeonRacerGame() {
  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-hidden relative">
      <KeyboardControls
        map={[
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
        ]}
      >
        <Canvas gl={{ antialias: false, powerPreference: "high-performance" }}>
          <color attach="background" args={["#16082A"]} />
          <PerspectiveCamera makeDefault position={[0, 2, 7]} fov={75} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          
          <Suspense fallback={null}>
            <Scene />
          </Suspense>

          <EffectComposer>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          </EffectComposer>
        </Canvas>
        
        <UI />
      </KeyboardControls>
    </div>
  );
}
