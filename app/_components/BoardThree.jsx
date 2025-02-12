"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const BoardThree = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 5); // Adjusted to better fit model

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true, // Transparent background
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true; // Auto-rotate for better effect
    controls.autoRotateSpeed = 1.0;
    controls.enableZoom = true; // Allow zoom
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Balanced lighting
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(
      "/images/stylized_cream_cake_and_headphones.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Compute bounding box to fit model inside container
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Adjust camera to fit model
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 120);
        let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
        camera.position.set(center.x, center.y, cameraZ);

        model.position.sub(center); // Center the model
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    // Animation loop
    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    // Handle window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "40vw",
        height: "90vh",
        minHeight: "90vh",
        margin: "",
        padding: "",
        position: "relative",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default BoardThree;
