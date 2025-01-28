import { FC, useRef } from "react";
import * as THREE from "three";
import { UnitProps } from "../../types/inventory";
import { useGLTF } from "@react-three/drei";

const Unit: FC<UnitProps> = ({ position, unitId }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/models/ChestCartoon.glb");

  scene.traverse((child) => {
    //@ts-ignore
    if (child.isMesh) {
      child.scale.set(1, 1, 1);
    }
  });

  return (
    <primitive
      object={scene}
      position={position}
      scale={[0.4, 0.4, 0.4]}
      ref={meshRef}
    />
  );
};

export default Unit;
