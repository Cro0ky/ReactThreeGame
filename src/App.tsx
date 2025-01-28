import { HTML5Backend } from "react-dnd-html5-backend";
import { Crosshair, CubeScene, Inventory } from "./components";
import { DndProvider } from "react-dnd";
import "./App.css";
import { EnumEntities } from "./types/inventory";
import { FC } from "react";

const App: FC = () => {
  const handleFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <CubeScene />
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 1,
            width: "300px",
            height: "150px",
            backgroundColor: "#ccc",
          }}
        >
          <Inventory items={[]} type={EnumEntities.PLAYER} />
        </div>
        <Crosshair />
        <button
          onClick={handleFullscreen}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1,
            width: "100px",
            height: "30px",
          }}
        >
          Fullscreen
        </button>
      </div>
    </DndProvider>
  );
};

export default App;
