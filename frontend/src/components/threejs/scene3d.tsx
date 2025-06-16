"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import {
  DefaultBox3D,
  DefaultCone3D,
  Shape3D,
  Shape3DType,
} from "./shape-types";
import { createShapeObject } from "./utility";
import { TContentType } from "@/lib/models/types";

export type Scene3DState = {
  id: string;
  type: TContentType;
  width: number;
  height: number;
  shape: Shape3D;
};

export default function Scene3D({ scene }: { scene: Scene3DState }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shape3DRef = useRef<THREE.Object3D | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationRef = useRef<number>(0);
  const guiRef = useRef<GUI | null>(null);
  const rotateEnable = useRef(true);
  const rotateFactor = useRef<number>(0);
  const [text, setText] = useState("Start Rotate");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initThreeJS = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvas,
      });
      rendererRef.current = renderer;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      initCamera();

      const controls = new OrbitControls(
        cameraRef.current!,
        canvasRef.current!
      );
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controlsRef.current = controls;

      initGui();
      updateShapeFromOptions();

      initLight();
      renderer.render(scene, cameraRef.current!);
    };

    const initCamera = () => {
      const fov = 60;
      const aspect =
        canvasRef.current!.clientWidth / canvasRef.current!.clientHeight;
      const near = 1;
      const far = 1000;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 20, 75);
      camera.rotation.x = -Math.PI / 12;
      cameraRef.current = camera;
    };

    const initLight = () => {
      const color = 0xffffff;
      const intensity = 30;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(50, 100, 50);
      light.castShadow = true;

      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;

      light.shadow.camera.near = 1;
      light.shadow.camera.far = 500;
      light.shadow.camera.left = -100;
      light.shadow.camera.right = 100;
      light.shadow.camera.top = 100;
      light.shadow.camera.bottom = -100;

      sceneRef.current!.add(light);
    };

    const resizeRendererToDisplaySize = () => {
      const canvas = rendererRef.current!.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width = Math.floor(canvas.clientWidth * pixelRatio);
      const height = Math.floor(canvas.clientHeight * pixelRatio);
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        rendererRef.current!.setSize(width, height, false);
      }
      return needResize;
    };

    const disposeShape = () => {
      if (shape3DRef.current) {
        sceneRef.current?.remove(shape3DRef.current);

        shape3DRef.current.traverse((child) => {
          if ((child as THREE.Mesh).geometry) {
            (child as THREE.Mesh).geometry.dispose();
          }
          if ((child as THREE.Mesh).material) {
            const material = (child as THREE.Mesh).material;
            if (Array.isArray(material)) {
              material.forEach((m) => m.dispose());
            } else {
              material.dispose();
            }
          }
        });
      }
    };

    const updateShapeFromOptions = () => {
      disposeShape();
      const shapeObject = createShapeObject(scene.shape);
      sceneRef.current?.add(shapeObject);
      shape3DRef.current = shapeObject;
    };

    const initGui = () => {
      const gui = new GUI({ container: containerRef.current as HTMLElement });
      gui.close();

      for (const key in scene.shape.options) {
        const typedKey = key as keyof typeof scene.shape.options;
        const value = scene.shape.options[typedKey];

        const colorKeys = ["color", "strokeColor", "fillColor"] as const;
        if (colorKeys.includes(key as any) && typeof value === "string") {
          gui
            .addColor(
              scene.shape.options,
              typedKey as keyof typeof scene.shape.options
            )
            .onChange(updateShapeFromOptions);
        } else if (typeof value === "number") {
          gui
            .add(
              scene.shape.options,
              typedKey as keyof typeof scene.shape.options,
              1,
              100
            )
            .step(1)
            .onChange(updateShapeFromOptions);
        } else if (typeof value === "boolean") {
          gui
            .add(
              scene.shape.options,
              typedKey as keyof typeof scene.shape.options
            )
            .onChange(updateShapeFromOptions);
        }
      }

      gui.domElement.style.position = "absolute";
      gui.domElement.style.top = "0";
      gui.domElement.style.right = "0";
      guiRef.current = gui;
    };

    const animate = (time: number) => {
      if (rotateEnable.current) {
        rotateFactor.current += 0.01;
      }

      if (resizeRendererToDisplaySize()) {
        const canvas = rendererRef.current!.domElement;
        cameraRef.current!.aspect = canvas.clientWidth / canvas.clientHeight;
        cameraRef.current!.updateProjectionMatrix();
      }

      if (shape3DRef.current) {
        shape3DRef.current.rotation.y = rotateFactor.current;
      }

      rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
      animationRef.current = requestAnimationFrame(animate);
    };

    initThreeJS();
    animationRef.current = requestAnimationFrame(animate);
    controlsRef.current?.update();

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect =
          canvasRef.current!.clientWidth / canvasRef.current!.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(
          canvasRef.current!.clientWidth,
          canvasRef.current!.clientHeight,
          false
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);

      disposeShape();

      rendererRef.current?.dispose();
      controlsRef.current?.dispose();
      guiRef.current?.destroy();
    };
  }, [scene.shape]);

  return (
    <div
      ref={containerRef}
      className="border-charade-950 rounded-md  bg-bej-50 border-2 mt-2 relative "
      style={{
        width: scene.width,
        height: scene.height,
        clipPath: "border-box",
      }}
    >
      <canvas ref={canvasRef} className="flex w-full h-full items-center" />
      <div className="flex absolute bottom-2 w-full  justify-center ">
        <button
          className="flex items-center justify-center gap-1 px-3  bg-carnation-400  rouded-2  w-[120px]
          border-bej-50 outline-2 outline-tuatara-900 text-spring-white font-hanuman font-medium text-[16px] 
          cursor-pointer hover:bg-carnation-500 transition-colors duration-200 py-[2px] rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          onClick={() => {
            rotateEnable.current = !rotateEnable.current;
            if (rotateEnable.current) {
              setText("Stop Rotate");
            } else {
              setText("Start Rotate");
            }
          }}
        >
          {text}
        </button>
      </div>
    </div>
  );
}
