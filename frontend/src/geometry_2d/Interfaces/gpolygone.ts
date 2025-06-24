"use client";

import { GCanvasManager } from "../lib/canvas-manager";
import { isPointInPolygon } from "../lib/utility/shape-detection";
import { darkenColor, hexToRGBA } from "../lib/utility/utility";
import { Bounding, IShape, Point2D, ShapeType, TShape } from "./figurine";
import { GLine } from "./gline";
import { GPoint, TPoint } from "./gpoint";

export type TPolygon = TShape & {
  strokeWidth: number;
  points: TPoint[];
};

export class GPolygon implements IShape {
  id: string;
  name: string;
  type: ShapeType;
  color: string;

  isSelected: boolean;
  isInViewBox: boolean;
  bounding: Bounding;

  strokeWidth: number;
  points: GPoint[];
  lines: GLine[];

  constructor(polygon: TPolygon) {
    this.id = polygon.id;
    this.name = polygon.name;
    this.type = ShapeType.POLYGON;
    this.color = polygon.color;

    this.isSelected = false;
    this.isInViewBox = false;
    this.bounding = {
      top: Math.max(...polygon.points.map((p) => p.coordonates.y)),
      right: Math.max(...polygon.points.map((p) => p.coordonates.x)),
      bottom: Math.min(...polygon.points.map((p) => p.coordonates.y)),
      left: Math.min(...polygon.points.map((p) => p.coordonates.x)),
    };

    this.strokeWidth = polygon.strokeWidth;
    this.points = [];
    this.lines = [];
    for (let point of polygon.points) {
      const newPoint = new GPoint(point);
      newPoint.setParent(this);
      this.points.push(newPoint);
    }
  }

  public addPoint = (point: TPoint): void => {
    const newPoint = new GPoint(point);
    newPoint.setParent(this);
    this.points.push(newPoint);
  };

  public toJson(): TPolygon {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      color: this.color,
      strokeWidth: this.strokeWidth,
      points: this.points.map((p) => p.toJson()),
    };
  }

  public setRealForm = (manager: GCanvasManager): void => {
    if (!this.isInViewBox) return;
    for (let p of this.points) {
      p.setRealForm(manager);
    }
  };

  public setVirtualForm = (manager: GCanvasManager): void => {
    for (let p of this.points) {
      p.setVirtualForm(manager);
    }
  };

  public updateBounding = (): void => {
    this.bounding.top = Math.max(...this.points.map((p) => p.coordonates.y));
    this.bounding.right = Math.max(...this.points.map((p) => p.coordonates.x));
    this.bounding.bottom = Math.min(...this.points.map((p) => p.coordonates.y));
    this.bounding.left = Math.min(...this.points.map((p) => p.coordonates.x));
  };

  public moveFig = (dx: number, dy: number) => {
    for (let p of this.points) {
      p.moveFig(dx, dy);
    }
  };

  public setIsInViewBox = (viewBoxBounding: Bounding): boolean => {
    this.isInViewBox =
      this.bounding.left < viewBoxBounding.right &&
      this.bounding.right > viewBoxBounding.left &&
      this.bounding.bottom < viewBoxBounding.top &&
      this.bounding.top > viewBoxBounding.bottom;
    for (let p of this.points) {
      p.isInViewBox = this.isInViewBox;
    }
    for (let l of this.lines) {
      l.isInViewBox = this.isInViewBox;
    }
    return this.isInViewBox;
  };

  public isHovered = (mousePoint: Point2D): IShape | null => {
    for (let p of this.points) {
      if (p.isHovered(mousePoint)) return p.isHovered(mousePoint);
    }
    const points = this.points.map((p) => p.realCoordonates);

    if (isPointInPolygon(mousePoint, points)) return this;
    return null;
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    if (!this.isInViewBox) return;

    ctx.beginPath();
    ctx.moveTo(
      this.points[0].realCoordonates.x,
      this.points[0].realCoordonates.y
    );
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(
        this.points[i].realCoordonates.x,
        this.points[i].realCoordonates.y
      );
    }
    ctx.lineTo(
      this.points[0].realCoordonates.x,
      this.points[0].realCoordonates.y
    );
    ctx.closePath();

    if (this.isSelected) {
      ctx.lineWidth = this.strokeWidth + 4;
      ctx.strokeStyle = hexToRGBA(this.color, 0.8);
      ctx.stroke();
    }

    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.fillStyle = hexToRGBA(this.color, 0.6);
    ctx.fill();

    for (let p of this.points) {
      p.draw(ctx);
    }
  };
}
