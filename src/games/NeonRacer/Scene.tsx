import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import Car from "./Car";
import Track from "./Track";
import Obstacles from "./Obstacles";

export default function Scene() {
  const cameraTarget = new THREE.Vector3(0, 1, 0);

  useFrame((state) => {
    // A slight camera shake or follow effect could go here
    state.camera.lookAt(cameraTarget);
  });

  return (
    <>
      <Track />
      <Obstacles />
      <Car />
    </>
  );
}
