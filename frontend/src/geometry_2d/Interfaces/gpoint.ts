"use client";

import { GCanvasManager } from "../lib/canvas-manager";
import { isPointInCircle } from "../lib/shape-detection";
import { Bounding, IShape, Point2D, ShapeType, TShape } from "./figurine";

export type TPoint = TShape & {
  coordonates: Point2D;
  size: number;
};

export class GPoint implements IShape {
  id: string;
  name: string;
  type: ShapeType;
  color: string;

  isSelected: boolean;
  isInViewBox: boolean;
  bounding: Bounding;

  size: number;
  coordonates: Point2D;

  realCoordonates: Point2D;

  constructor(
    id: string,
    name: string,
    color: string = "#F83B3B",
    size: number,
    coordonates: Point2D
  ) {
    this.id = id;
    this.name = name;
    this.type = ShapeType.POINT;
    this.isSelected = false;
    this.isInViewBox = false;
    this.bounding = {
      top: coordonates.y,
      right: coordonates.x,
      bottom: coordonates.y,
      left: coordonates.x,
    };
    this.coordonates = coordonates;
    this.realCoordonates = { x: 0, y: 0 };
    this.size = size;
    this.color = color;
  }

  public toJson(): TPoint {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      color: this.color,
      size: this.size,
      coordonates: this.coordonates,
    };
  }

  public setRealForm = (manager: GCanvasManager): void => {
    if (!this.isInViewBox) return;
    this.realCoordonates = manager.toScreenPoint(this.coordonates);
  };

  public setVirtualForm = (manager: GCanvasManager): void => {
    const newCoodonates = manager.toVirtualPoint(this.realCoordonates);
    this.setBounding(
      newCoodonates.x - this.coordonates.x,
      newCoodonates.y - this.coordonates.y
    );
    this.coordonates = newCoodonates;
  };

  public setBounding = (dx: number, dy: number): void => {
    this.bounding.top += dy;
    this.bounding.right += dx;
    this.bounding.bottom += dy;
    this.bounding.left += dx;
  };

  public moveFig = (dx: number, dy: number) => {
    this.realCoordonates.x += dx;
    this.realCoordonates.y += dy;
  };

  public setIsInViewBox = (viewBoxBounding: Bounding): boolean => {
    return (this.isInViewBox =
      this.bounding.left < viewBoxBounding.right &&
      this.bounding.right > viewBoxBounding.left &&
      this.bounding.bottom < viewBoxBounding.top &&
      this.bounding.top > viewBoxBounding.bottom);
  };

  public isHovered = (mousePoint: Point2D): boolean => {
    return isPointInCircle(mousePoint, this.realCoordonates, this.size);
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    if (!this.isInViewBox) return;

    ctx.beginPath();
    ctx.arc(
      this.realCoordonates.x,
      this.realCoordonates.y,
      this.size,
      0,
      2 * Math.PI
    );

    ctx.fillStyle = this.isSelected ? "#383838" : this.color;

    ctx.fill();
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.font = "15px Inter";
    ctx.fillText(
      "A",
      this.realCoordonates.x + this.size,
      this.realCoordonates.y - this.size
    );
  };
}
