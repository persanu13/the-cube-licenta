"use client";
import { GCanvasManager } from "../lib/canvas-manager";
import { isPointInPolygon } from "../lib/shape-detection";
import { polygonCentroid } from "../lib/utility";
import { Bounding, IShape, Point2D } from "./figurine";

export class GPolygon implements IShape {
  id: string;
  name: string;
  type: string;
  color: string;

  isSelected: boolean;
  isInViewBox: boolean;
  bounding: Bounding;

  center: Point2D;
  realCenter: Point2D;
  points: Point2D[];
  realPoints: Point2D[];

  constructor(
    id: string,
    name: string,
    color: string = "#F83B3B",
    points: Point2D[]
  ) {
    this.id = id;
    this.name = name;
    this.type = "Point2D";
    this.color = color;
    this.isSelected = false;
    this.isInViewBox = false;
    this.bounding = {
      top: Math.max(...points.map((point) => point.y)),
      right: Math.max(...points.map((point) => point.x)),
      bottom: Math.min(...points.map((point) => point.y)),
      left: Math.min(...points.map((point) => point.x)),
    };

    this.center = polygonCentroid(points);
    this.realCenter = { x: 0, y: 0 };
    this.points = points;
    this.realPoints = [];
  }

  public setRealForm = (manager: GCanvasManager): void => {
    if (!this.isInViewBox) return;
    this.realCenter = manager.toScreenPoint(this.center);
    this.realPoints.length = 0;
    for (let point of this.points) {
      this.realPoints.push(manager.toScreenPoint(point));
    }
  };

  public setVirtualForm = (manager: GCanvasManager): void => {
    const newCenter = manager.toVirtualPoint(this.realCenter);
    const dx = newCenter.x - this.center.x;
    const dy = newCenter.y - this.center.y;
    for (let point of this.points) {
      point.x += dx;
      point.y += dy;
    }
    this.setBounding(dx, dy);
    this.center = newCenter;
  };

  public setBounding = (dx: number, dy: number): void => {
    this.bounding.top += dy;
    this.bounding.right += dx;
    this.bounding.bottom += dy;
    this.bounding.left += dx;
  };

  public moveFig = (dx: number, dy: number) => {
    this.realCenter.x += dx;
    this.realCenter.y += dy;
    for (let point of this.realPoints) {
      point.x += dx;
      point.y += dy;
    }
  };

  public setIsInViewBox = (viewBoxBounding: Bounding): boolean => {
    return (this.isInViewBox =
      this.bounding.left < viewBoxBounding.right &&
      this.bounding.right > viewBoxBounding.left &&
      this.bounding.bottom < viewBoxBounding.top &&
      this.bounding.top > viewBoxBounding.bottom);
  };

  public isHovered = (mousePoint: Point2D): boolean => {
    return isPointInPolygon(mousePoint, this.realPoints);
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    if (!this.isInViewBox) return;

    ctx.beginPath();
    const { x, y } = this.realPoints[0];
    ctx.moveTo(x, y);
    for (let i = 1; i < this.realPoints.length; i++) {
      const { x, y } = this.realPoints[i];
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#E51D1D";
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#E51D1D";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "400 15px Inter";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#F9F7F3";
    for (let i = 0; i < this.realPoints.length; i++) {
      ctx.strokeText(
        this.name[i],
        this.realPoints[i].x + 8,
        this.realPoints[i].y - 8
      );
    }

    ctx.fillStyle = "#E51D1D";
    for (let i = 0; i < this.realPoints.length; i++) {
      ctx.fillText(
        this.name[i],
        this.realPoints[i].x + 8,
        this.realPoints[i].y - 8
      );
    }
  };
}
