import { PointerLockControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Player: FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const [isOnGrond, setIsOnGrond] = useState(false);
  const { camera } = useThree();

  const { scene } = useGLTF("/models/FinalBaseMesh.glb");

  scene.traverse((child) => {
    //@ts-ignore
    if (child.isMesh) {
      child.scale.set(0.4, 0.4, 0.4);
    }
  });

  const moveSpeed = 0.1;
  const gravity = -0.01;
  const jumpStrenght = 0.2;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (["w", "ц"].includes(event.key)) direction.current.z = 1;
      if (["s", "ы"].includes(event.key)) direction.current.z = -1;
      if (["a", "ф"].includes(event.key)) direction.current.x = 1;
      if (["d", "в"].includes(event.key)) direction.current.x = -1;
      if (event.key === " " && isOnGrond) {
        velocity.current.y = jumpStrenght;
        setIsOnGrond(false);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (["w", "ц", "s", "ы"].includes(event.key)) direction.current.z = 0;
      if (["a", "ф", "d", "в"].includes(event.key)) direction.current.x = 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOnGrond]);

  useFrame(() => {
    if (meshRef.current) {
      // Движение вперед/назад и влево/вправо
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      const right = new THREE.Vector3();
      right.crossVectors(new THREE.Vector3(0, 1, 0), forward);

      const move = new THREE.Vector3();
      move.addScaledVector(forward, direction.current.z * moveSpeed);
      move.addScaledVector(right, direction.current.x * moveSpeed);

      meshRef.current.position.add(move);

      // Синхронизация вращения модели с камерой
      const targetRotation = Math.atan2(forward.x, forward.z);
      meshRef.current.rotation.y = targetRotation;

      // Гравитация
      velocity.current.y += gravity;
      meshRef.current.position.y += velocity.current.y;

      // Проверка нахождения на полу
      if (meshRef.current.position.y <= 0) {
        meshRef.current.position.y = 0;
        velocity.current.y = 0;
        setIsOnGrond(true);
      }

      // Камера следует за игроком
      camera.position.copy(meshRef.current.position);
      camera.position.y += 1.6; // Высота камеры (примерно рост человека)
    }
  });

  return (
    <>
      <PointerLockControls />
      <primitive
        object={scene}
        position={[0, 0.5, 10]}
        ref={meshRef}
        scale={[0.2, 0.2, 0.2]}
      />
    </>
  );
};

export default Player;
