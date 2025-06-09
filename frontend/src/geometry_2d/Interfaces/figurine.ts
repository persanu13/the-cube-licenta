import { GCanvasManager } from "../lib/canvas-manager";
import { ViewBox } from "../lib/viewbox";

export type Point2D = {
  x: number;
  y: number;
};

export type Bounding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export enum ShapeType {
  POINT = "POINT",
  POLYGON = "POLYGON",
}

export type TShape = {
  id: string;
  type: ShapeType;
  name: string;
  color: string;
};

export interface IShape extends TShape {
  isSelected: boolean;
  isInViewBox: boolean;
  bounding: Bounding;

  toJson: () => TShape;
  setRealForm: (manager: GCanvasManager, viewBox: ViewBox) => void;
  setVirtualForm: (manager: GCanvasManager) => void;
  setBounding: (dx: number, dy: number) => void;
  moveFig: (dx: number, dy: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  isHovered: (mousePoint: Point2D) => boolean;
  setIsInViewBox: (viewBoxBounding: Bounding) => boolean;
}
