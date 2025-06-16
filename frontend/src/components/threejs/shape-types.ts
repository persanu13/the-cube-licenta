export enum Shape3DType {
  Box = "Box",
  Pyramid = "Pyramid",
  Cone = "Cone",
  Sphere = "Sphere",
  Cylinder = "Cylinder",
}

const FILL_COLOR = "#00b3ff";
const STROKE_COLOR = "#000";

export type ColorKeys = "strokeColor" | "fillColor";

type BaseOptions = {
  fillColor: string;
  strokeColor: string;
  fill: boolean;
  stroke: boolean;
  shadow: boolean;
};

export type Box3D = {
  type: Shape3DType.Box;
  options: BaseOptions & {
    width: number;
    height: number;
    depth: number;
  };
};

export const DefaultBox3D: Box3D = {
  type: Shape3DType.Box,
  options: {
    fillColor: FILL_COLOR,
    strokeColor: STROKE_COLOR,
    fill: true,
    stroke: true,
    shadow: true,
    width: 20,
    height: 20,
    depth: 20,
  },
};

export type Cone3D = {
  type: Shape3DType.Cone;
  options: BaseOptions & {
    radius: number;
    height: number;
    radialSegments: number;
  };
};

export const DefaultCone3D: Cone3D = {
  type: Shape3DType.Cone,
  options: {
    fillColor: FILL_COLOR,
    strokeColor: STROKE_COLOR,
    fill: true,
    stroke: true,
    shadow: true,
    radius: 20,
    height: 20,
    radialSegments: 3,
  },
};

export type Sphere3D = {
  type: Shape3DType.Sphere;
  options: BaseOptions & {
    radius: number;
    widthSegments: number;
    heightSegments: number;
  };
};

export const DefaultSphere3D: Sphere3D = {
  type: Shape3DType.Sphere,
  options: {
    fillColor: FILL_COLOR,
    strokeColor: STROKE_COLOR,
    fill: true,
    stroke: true,
    shadow: true,
    radius: 20,
    widthSegments: 20,
    heightSegments: 20,
  },
};

export type Pyramid3D = {
  type: Shape3DType.Pyramid;
  options: BaseOptions & {
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radialSegments: number;
  };
};

export const DefaultPyramid3D: Pyramid3D = {
  type: Shape3DType.Pyramid,
  options: {
    fillColor: FILL_COLOR,
    strokeColor: STROKE_COLOR,
    fill: true,
    stroke: true,
    shadow: true,
    radiusTop: 0,
    radiusBottom: 20,
    height: 20,
    radialSegments: 4,
  },
};

export type Cylinder3D = {
  type: Shape3DType.Cylinder;
  options: BaseOptions & {
    radius: number;
    height: number;
    radialSegments: number;
  };
};

export const DefaultCylinder3D: Cylinder3D = {
  type: Shape3DType.Cylinder,
  options: {
    fillColor: FILL_COLOR,
    strokeColor: STROKE_COLOR,
    fill: true,
    stroke: true,
    shadow: true,
    radius: 10,
    height: 40,
    radialSegments: 8,
  },
};

export type Shape3D = Box3D | Cone3D | Sphere3D | Cylinder3D | Pyramid3D;
