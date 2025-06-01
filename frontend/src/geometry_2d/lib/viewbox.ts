"use client";
import { Bounding, Point2D } from "../Interfaces/figurine";

export class ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  private bounding: Bounding;

  public constructor(
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0,
    scale: number = 1
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.bounding = {
      top: y,
      right: x + width,
      bottom: y - height,
      left: x,
    };
  }

  private setBounding = (): void => {
    this.bounding = {
      top: this.y + 10 * this.scale,
      right: this.x + this.width + 10 * this.scale,
      bottom: this.y - this.height - 10 * this.scale,
      left: this.x - 10 * this.scale,
    };
  };

  public getBounding = (): Bounding => {
    return { ...this.bounding };
  };

  public setViewBox = (
    realWidth: number,
    realHeight: number,
    scale: number
  ): void => {
    this.scale = scale;
    this.width = realWidth * scale;
    this.height = realHeight * scale;
    this.x = -this.width / 2;
    this.y = this.height / 2;
    this.setBounding();
  };

  public resizeViewBox = (realWidth: number, realHeight: number): void => {
    this.width = realWidth * this.scale;
    this.height = realHeight * this.scale;
    this.setBounding();
  };

  public zoom = (delta: number, centerX: number, centerY: number): void => {
    this.scale *= delta;

    this.x = centerX - (centerX - this.x) * delta;
    this.y = centerY - (centerY - this.y) * delta;
    this.width *= delta;
    this.height *= delta;
    this.setBounding();
  };

  public move = (dx: number, dy: number): void => {
    this.x -= dx * this.scale;
    this.y += dy * this.scale;
    this.setBounding();
  };
}
