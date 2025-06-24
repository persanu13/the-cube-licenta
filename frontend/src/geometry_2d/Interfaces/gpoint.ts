"use client";

import { GCanvasManager } from "../lib/canvas-manager";
import { isPointInCircle } from "../lib/utility/shape-detection";
import { darkenColor, hexToRGBA } from "../lib/utility/utility";

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
  parent?: IShape;

  constructor(point: TPoint) {
    this.id = point.id;
    this.name = point.name;
    this.type = ShapeType.POINT;
    this.color = point.color;

    this.isSelected = false;
    this.isInViewBox = false;
    this.bounding = {
      top: point.coordonates.y,
      right: point.coordonates.x,
      bottom: point.coordonates.y,
      left: point.coordonates.x,
    };

    this.size = point.size;
    this.coordonates = point.coordonates;
    this.realCoordonates = { x: 0, y: 0 };
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

  public setParent(parent: IShape): void {
    this.parent = parent;
  }

  public setRealForm = (manager: GCanvasManager): void => {
    if (!this.isInViewBox) return;
    this.realCoordonates = manager.toScreenPoint(this.coordonates);
  };

  public setVirtualForm = (manager: GCanvasManager): void => {
    const newCoodonates = manager.toVirtualPoint(this.realCoordonates);
    const difX = newCoodonates.x - this.coordonates.x;
    const difY = newCoodonates.y - this.coordonates.y;
    this.bounding.top += difY;
    this.bounding.right += difX;
    this.bounding.bottom += difY;
    this.bounding.left += difX;
    this.coordonates = newCoodonates;
    if (this.parent) {
      this.parent.updateBounding();
    }
  };

  public updateBounding = (): void => {};

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

  public isHovered = (mousePoint: Point2D): IShape | null => {
    if (isPointInCircle(mousePoint, this.realCoordonates, this.size + 3))
      return this;
    return null;
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
    if (this.isSelected) {
      ctx.lineWidth = 6;
      ctx.strokeStyle = hexToRGBA(this.color, 0.6);
      ctx.stroke();
    }

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.font = "15px Inter";
    ctx.fillStyle = darkenColor(this.color, 0.6);
    ctx.fillText(
      this.name,
      this.realCoordonates.x + this.size,
      this.realCoordonates.y - this.size
    );
  };
}
