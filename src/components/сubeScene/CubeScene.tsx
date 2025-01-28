import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import Unit from "../unit/Unit";
import Player from "../player/Player";
import { UnitProps } from "../../types/inventory";

const CubeScene: FC = () => {
  const unitsList: UnitProps[] = [
    {
      position: [-3, 0, -3],
      unitId: "unit1",
    },
    {
      position: [0, 0, 0],
      unitId: "unit2",
    },
    {
      position: [0, 0, 0],
      unitId: "unit3",
    },
  ];

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sky sunPosition={[100, 20, 100]} />
      {/* Пол */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <Player />
      {unitsList.map((u) => (
        <Unit {...u} key={u.unitId} />
      ))}
    </Canvas>
  );
};

export default CubeScene;
