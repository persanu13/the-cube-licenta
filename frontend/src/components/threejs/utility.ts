import { Shape3D } from "./shape-types";
import * as THREE from "three";
import { Shape3DType } from "./shape-types";
import { number } from "zod";

export function createShapeObject(shape: Shape3D): THREE.Object3D {
  let geometry: THREE.BufferGeometry;
  let groundPositionY: number;
  switch (shape.type) {
    case Shape3DType.Box:
      geometry = new THREE.BoxGeometry(
        shape.options.width,
        shape.options.height,
        shape.options.depth
      );
      groundPositionY = shape.options.height / 2;
      break;

    case Shape3DType.Cone:
      geometry = new THREE.ConeGeometry(
        shape.options.radius,
        shape.options.height,
        shape.options.radialSegments
      );
      groundPositionY = shape.options.height / 2;
      break;

    case Shape3DType.Pyramid:
      geometry = new THREE.CylinderGeometry(
        shape.options.radiusTop,
        shape.options.radiusBottom,
        shape.options.height,
        shape.options.radialSegments
      );
      groundPositionY = shape.options.height / 2;
      break;

    case Shape3DType.Cylinder:
      geometry = new THREE.CylinderGeometry(
        shape.options.radius,
        shape.options.radius,
        shape.options.height,
        shape.options.radialSegments
      );
      groundPositionY = shape.options.height / 2;
      break;

    case Shape3DType.Sphere:
      geometry = new THREE.SphereGeometry(
        shape.options.radius,
        shape.options.widthSegments,
        shape.options.heightSegments
      );
      groundPositionY = shape.options.radius;
      break;

    default:
      throw new Error("Unsupported shape type");
  }

  const group = new THREE.Group();

  if (shape.options.fill) {
    const fillMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(shape.options.fillColor),
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const fillMesh = new THREE.Mesh(geometry.clone(), fillMaterial);
    fillMesh.castShadow = true;
    fillMesh.receiveShadow = true;
    group.add(fillMesh);
  }

  if (shape.options.stroke) {
    const edges = new THREE.EdgesGeometry(geometry);
    const strokeMaterial = new THREE.LineDashedMaterial({
      color: new THREE.Color(shape.options.strokeColor),
      dashSize: 3,
      gapSize: 1,
    });
    const strokeMesh = new THREE.LineSegments(edges, strokeMaterial);
    strokeMesh.computeLineDistances();
    group.add(strokeMesh);
  }

  if (shape.options.shadow) {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.ShadowMaterial({ opacity: 0.3 })
    );
    ground.receiveShadow = true;
    ground.castShadow = true;
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -groundPositionY;
    group.add(ground);
  }

  return group;
}
