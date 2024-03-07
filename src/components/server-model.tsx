import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function ServerModel() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const objPath = "/Cottage_FREE.obj";
        const mtlPath = "/Cottage_FREE.mtl";

        const materials = await new MTLLoader().loadAsync(mtlPath);
        materials.preload();

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

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Set the background color
        renderer.setClearColor(new THREE.Color(0xeeeeee));

        document.body.appendChild(renderer.domElement);

        camera.position.z = 5; // Adjust the camera position

        scene.add(obj as THREE.Object3D<THREE.Object3DEventMap>);
        // Add lights, controls, etc. as needed
        // Attach controls to the canvas
        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        // controls.dampingFactor = 0.25;
        // controls.screenSpacePanning = false;
        // controls.maxPolarAngle = Math.PI / 2;
        // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        // controls.dampingFactor = 0.25;
        // controls.screenSpacePanning = false;
        // controls.maxPolarAngle = Math.PI / 2;

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);

          // Add any custom animations or updates here
          // controls.update();

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
          camera={{ position: [0, 0, 5] }}
          style={{ display: loadingProgress === 100 ? "block" : "none" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {/* <OrbitControls /> */}
        </Canvas>
      )}
    </div>
  );
}
