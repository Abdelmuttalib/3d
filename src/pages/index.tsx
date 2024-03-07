import { Suspense } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import { OrbitControls, Loader } from "@react-three/drei";
// import { OBJLoader } from "three/addons/loaders/OBJLoader";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import ServerModel from "@/components/server-model";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col h-full p-24 ${inter.className}`}
    >
      {/* <ServerModel /> */}
      <Model />
    </main>
  );
}

const Model = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      className="h-full"
      style={{
        width: "100%",
        height: "100%",
        // position: "absolute",
        // top: 0,
        // left: 0,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <M />

      <OrbitControls />
    </Canvas>
  );
};

const ModelObject = () => {
  const objPath = "/Cottage_FREE.obj";
  const mtlPath = "/Cottage_FREE.mtl"; // Make sure to adjust the path

  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  const materials = useLoader(MTLLoader, mtlPath);

  objLoader.setMaterials(materials);

  const obj = useLoader(OBJLoader, objPath);

  // Debugging statements
  console.log("Loaded object:", obj);
  console.log("Loaded materials:", materials);

  return <primitive object={obj} />;
};
const M = () => {
  const serverPath = "http://170.64.201.209/objects";
  const objPath = `${serverPath}/BlockABYBA/BlockABYBA.obj`;
  const mtlPath = `${serverPath}/BlockABYBA/BlockABYBA.mtl`;
  // const objPath = "/Cottage_FREE.obj";
  // const mtlPath = "/Cottage_FREE.mtl"; // Make sure to adjust the path

  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();

  const materials = useLoader(MTLLoader, mtlPath);

  objLoader.setMaterials(materials);

  const obj = useLoader(OBJLoader, objPath);

  // Debugging statements
  console.log("Loaded object:", obj);
  console.log("Loaded materials:", materials);

  return <primitive object={obj} />;
};
