"use client";

import { GCanvasManager } from "../lib/canvas-manager";
import { isPointOnThickSegment } from "../lib/utility/shape-detection";

import { Bounding, IShape, Point2D, ShapeType, TShape } from "./figurine";
import { GPoint, TPoint } from "./gpoint";

export type TLine = TShape & {
  strokeWidth: number;
  start: TPoint;
  end: TPoint;
};

export class GLine implements IShape {
  id: string;
  name: string;
  type: ShapeType;
  color: string;

  isSelected: boolean;
  isInViewBox: boolean;
  bounding: Bounding;

  strokeWidth: number;
  start: GPoint;
  end: GPoint;

  constructor(line: TLine) {
    this.id = line.id;
    this.name = line.name;
    this.type = ShapeType.LINE;
    this.color = line.color;

    this.isSelected = false;
    this.isInViewBox = false;
    this.bounding = {
      top: Math.max(line.start.coordonates.y, line.end.coordonates.y),
      right: Math.max(line.start.coordonates.x, line.end.coordonates.x),
      bottom: Math.min(line.start.coordonates.y, line.end.coordonates.y),
      left: Math.min(line.start.coordonates.x, line.end.coordonates.x),
    };

    this.strokeWidth = line.strokeWidth;
    this.start = new GPoint(line.start);
    this.end = new GPoint(line.end);
    this.start.setParent(this);
    this.end.setParent(this);
  }

  public toJson(): TLine {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      color: this.color,
      strokeWidth: this.strokeWidth,
      start: this.start.toJson(),
      end: this.end.toJson(),
    };
  }

  public setRealForm = (manager: GCanvasManager): void => {
    if (!this.isInViewBox) return;
    this.start.realCoordonates = manager.toScreenPoint(this.start.coordonates);
    this.end.realCoordonates = manager.toScreenPoint(this.end.coordonates);
    return;
  };

  public setVirtualForm = (manager: GCanvasManager): void => {
    this.start.setVirtualForm(manager);
    this.end.setVirtualForm(manager);
  };

  public updateBounding = (): void => {
    this.bounding.top = Math.max(
      this.start.coordonates.y,
      this.end.coordonates.y
    );
    this.bounding.right = Math.max(
      this.start.coordonates.x,
      this.end.coordonates.x
    );
    this.bounding.bottom = Math.min(
      this.start.coordonates.y,
      this.end.coordonates.y
    );
    this.bounding.left = Math.min(
      this.start.coordonates.x,
      this.end.coordonates.x
    );
  };

  public moveFig = (dx: number, dy: number) => {
    this.start.moveFig(dx, dy);
    this.end.moveFig(dx, dy);
  };

  public setIsInViewBox = (viewBoxBounding: Bounding): boolean => {
    this.isInViewBox =
      this.bounding.left < viewBoxBounding.right &&
      this.bounding.right > viewBoxBounding.left &&
      this.bounding.bottom < viewBoxBounding.top &&
      this.bounding.top > viewBoxBounding.bottom;
    this.start.isInViewBox = this.isInViewBox;
    this.end.isInViewBox = this.isInViewBox;

    return this.isInViewBox;
  };

  public isHovered = (mousePoint: Point2D): IShape | null => {
    if (this.start.isHovered(mousePoint)) return this.start;
    if (this.end.isHovered(mousePoint)) return this.end;
    if (
      isPointOnThickSegment(
        this.start.realCoordonates,
        this.end.realCoordonates,
        mousePoint,
        this.strokeWidth
      )
    )
      return this;
    return null;
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    if (!this.isInViewBox) return;
    ctx.beginPath();
    ctx.moveTo(this.start.realCoordonates.x, this.start.realCoordonates.y);
    ctx.lineTo(this.end.realCoordonates.x, this.end.realCoordonates.y);
    ctx.closePath();

    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = "#000";
    ctx.stroke();

    this.start.draw(ctx);
    this.end.draw(ctx);
  };
}
