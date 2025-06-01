import { Point2D } from "../Interfaces/figurine";

export function isPointInCircle(
  point: Point2D,
  circleCenter: Point2D,
  radius: number
): boolean {
  const dx = circleCenter.x - point.x;
  const dy = circleCenter.y - point.y;
  return dx * dx + dy * dy <= radius * radius;
}

export function isPointInPolygon(point: Point2D, polygon: Point2D[]): boolean {
  let { x, y } = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x,
      yi = polygon[i].y;
    const xj = polygon[j].x,
      yj = polygon[j].y;

    const intersect =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi + Number.EPSILON) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}
