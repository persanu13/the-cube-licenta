"use client";
import { IShape, Point2D } from "../Interfaces/figurine";
import { ViewBox } from "./viewbox";

export class GCanvasManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  viewBox: ViewBox;

  constructor(canvas: HTMLCanvasElement, viewBox: ViewBox) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.viewBox = viewBox;
  }

  public resize = () => {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;
    this.ctx.scale(dpr, dpr);
  };

  public toVirtualPoint = (realPoint: Point2D): Point2D => {
    return {
      x: this.viewBox.x + realPoint.x * this.viewBox.scale,
      y: this.viewBox.y - realPoint.y * this.viewBox.scale,
    };
  };

  public toScreenPoint = (virtualPoint: Point2D): Point2D => {
    return {
      x: (virtualPoint.x - this.viewBox.x) / this.viewBox.scale,
      y: -(virtualPoint.y - this.viewBox.y) / this.viewBox.scale,
    };
  };

  public deletePaint = () => {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  };

  public drawAll = (figurine: IShape[], selected: IShape[]) => {
    //console.time("paint");
    this.deletePaint();
    for (let i = figurine.length - 1; i >= 0; i--) {
      if (figurine[i].isSelected) continue;
      figurine[i].draw(this.ctx);
    }
    for (let i = selected.length - 1; i >= 0; i--) {
      selected[i].draw(this.ctx);
    }
    //console.timeEnd("paint");
  };

  public updateReal = (figurine: IShape[]) => {
    //console.time("updatereal");
    for (let fig of figurine) {
      fig.setIsInViewBox(this.viewBox.getBounding());
      fig.setRealForm(this, this.viewBox);
    }
    // console.timeEnd("updatereal");
  };

  public updateVirtual = (figurine: IShape[]) => {
    //console.time("updatevirtual");
    for (let fig of figurine) {
      fig.setVirtualForm(this);
      fig.setIsInViewBox(this.viewBox.getBounding());
    }
    //console.timeEnd("updatevirtual");
  };

  public vericate = (figurine: IShape[], mouse: Point2D): IShape | null => {
    //console.time("verificate");
    for (let fig of figurine) {
      if (fig.isHovered(mouse)) {
        //console.timeEnd("verificate");
        return fig;
      }
    }
    // console.timeEnd("verificate");
    return null;
  };
}
