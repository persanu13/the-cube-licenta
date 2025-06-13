import { IShape, ShapeType, TShape } from "@/geometry_2d/Interfaces/figurine";
import { GLine, TLine } from "@/geometry_2d/Interfaces/gline";
import { GPath, TPath } from "@/geometry_2d/Interfaces/gpath";
import { GPoint, TPoint } from "@/geometry_2d/Interfaces/gpoint";
import { GPolygon, TPolygon } from "@/geometry_2d/Interfaces/gpolygone";

export const generateRandomPoint = (id: string): TPoint => {
  const randomX = Math.floor(Math.random() * 600) - 300;
  const randomY = Math.floor(Math.random() * 400) - 200;
  return {
    id: id,
    type: ShapeType.POINT,
    name: "A",
    color: "#F83B3B",
    coordonates: { x: randomX, y: randomY },
    size: 5,
  };
};

export const generateRandomPoints = (num: number): TPoint[] => {
  const points = [];
  for (let i = 0; i < num; i++) {
    const id = `id${i + 1}`;
    points.push(generateRandomPoint(id));
  }
  return points;
};

export const createShapes = (figurine: TShape[]): IShape[] => {
  const returnat: IShape[] = [];
  for (let fig of figurine) {
    switch (fig.type) {
      case ShapeType.POINT:
        const point: TPoint = fig as TPoint;
        returnat.push(new GPoint(point));
        break;
      case ShapeType.LINE:
        const line: TLine = fig as TLine;
        returnat.push(new GLine(line));
        break;
      case ShapeType.POLYGON:
        const polygon: TPolygon = fig as TPolygon;
        returnat.push(new GPolygon(polygon));
        break;
      case ShapeType.PATH:
        const path: TPath = fig as TPath;
        returnat.push(new GPath(path));
        break;

      default:
        continue;
    }
  }
  return returnat;
};
