// ThreeModel.js
import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

export default function ServerModel() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Replace with the actual server path to your .obj and .mtl files
        const serverPath = "http://170.64.201.209/objects";
        const objPath = `${serverPath}/BlockABYBA/BlockABYBA.obj`;
        const mtlPath = `${serverPath}/BlockABYBA/BlockABYBA.mtl`;

        // Load materials
        const materials = await new MTLLoader().loadAsync(mtlPath);
        materials.preload();

        // Load object
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);

        const obj = await new Promise((resolve, reject) => {
          objLoader.load(
            objPath,
            resolve,
            (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setLoadingProgress(progress);
            },
            reject
          );
        });

        // Create Three.js scene and load the object
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        scene.add(obj);

        // Add lights, controls, etc. as needed

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);

          // Add any custom animations or updates here

          // Render the scene
          renderer.render(scene, camera);
        };

        animate();
      } catch (error) {
        console.error("Error loading the model:", error);
      }
    };

    loadModel();
  }, []);

  return (
    <div>
      {loadingProgress < 100 ? (
        <div>Loading... {loadingProgress}%</div>
      ) : (
        <Canvas
          style={{ display: loadingProgress === 100 ? "block" : "none" }}
        />
      )}
    </div>
  );
}
