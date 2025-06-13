"use client";

import { GCanvasManager } from "../lib/canvas-manager";
import { isPointNearPolyline } from "../lib/utility/shape-detection";
import { Bounding, IShape, Point2D, ShapeType, TShape } from "./figurine";

export type TPath = TShape & {
  strokeWidth: number;
  points: Point2D[];
};

export class GPath implements IShape {
  id: string;
  name: string;
  type: ShapeType;
  color: string;

  isSelected: boolean;
  isInViewBox: boolean;
  bounding: Bounding;

  strokeWidth: number;
  points: Point2D[];
  realPoints: Point2D[];

  constructor(path: TPath) {
    this.id = path.id;
    this.name = path.name;
    this.type = ShapeType.PATH;
    this.color = path.color;

    this.isSelected = false;
    this.isInViewBox = false;
    this.bounding = {
      top: Math.max(...path.points.map((p) => p.y)),
      right: Math.max(...path.points.map((p) => p.x)),
      bottom: Math.min(...path.points.map((p) => p.y)),
      left: Math.min(...path.points.map((p) => p.x)),
    };
    this.strokeWidth = path.strokeWidth;
    this.points = path.points;
    this.realPoints = [];
  }

  public toJson(): TPath {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      color: this.color,
      strokeWidth: this.strokeWidth,
      points: this.points,
    };
  }

  public setRealForm = (manager: GCanvasManager): void => {
    if (!this.isInViewBox) return;
    this.realPoints = [];
    for (let p of this.points) {
      this.realPoints.push(manager.toScreenPoint(p));
    }
  };

  public setVirtualForm = (manager: GCanvasManager): void => {
    const newCoodonates = manager.toVirtualPoint(this.realPoints[0]);
    const difX = newCoodonates.x - this.points[0].x;
    const difY = newCoodonates.y - this.points[0].y;
    this.bounding.top += difY;
    this.bounding.right += difX;
    this.bounding.bottom += difY;
    this.bounding.left += difX;
    for (let p of this.points) {
      p.x += difX;
      p.y += difY;
    }
  };

  public updateBounding = (): void => {
    this.bounding.top = Math.max(...this.points.map((p) => p.y));
    this.bounding.right = Math.max(...this.points.map((p) => p.x));
    this.bounding.bottom = Math.min(...this.points.map((p) => p.y));
    this.bounding.left = Math.min(...this.points.map((p) => p.x));
  };

  public moveFig = (dx: number, dy: number) => {
    for (let p of this.realPoints) {
      p.x += dx;
      p.y += dy;
    }
  };

  public setIsInViewBox = (viewBoxBounding: Bounding): boolean => {
    return (this.isInViewBox =
      this.bounding.left < viewBoxBounding.right &&
      this.bounding.right > viewBoxBounding.left &&
      this.bounding.bottom < viewBoxBounding.top &&
      this.bounding.top > viewBoxBounding.bottom);
  };

  public isHovered = (mousePoint: Point2D): IShape | null => {
    if (isPointNearPolyline(mousePoint, this.realPoints, this.strokeWidth))
      return this;
    return null;
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    if (!this.isInViewBox) return;

    ctx.beginPath();
    ctx.moveTo(this.realPoints[0].x, this.realPoints[0].y);
    for (let i = 1; i < this.realPoints.length; i++) {
      ctx.lineTo(this.realPoints[i].x, this.realPoints[i].y);
    }
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };
}
