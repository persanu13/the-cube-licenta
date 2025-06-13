import { Point2D } from "@/geometry_2d/Interfaces/figurine";
import { getPerpendicularDistance } from "./utility";

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

export function isPointOnThickSegment(
  start: { x: number; y: number },
  end: { x: number; y: number },
  point: { x: number; y: number },
  width: number
): boolean {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared === 0) {
    const dist = Math.hypot(point.x - start.x, point.y - start.y);
    return dist <= width / 2;
  }

  const t =
    ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared;

  if (t < 0 || t > 1) {
    return false;
  }

  const closestX = start.x + t * dx;
  const closestY = start.y + t * dy;

  const dist = Math.hypot(point.x - closestX, point.y - closestY);

  return dist <= width + 1 / 2;
}

export function isPointNearPolyline(
  mouse: Point2D,
  path: Point2D[],
  strokeWidth: number = 5
): boolean {
  for (let i = 0; i < path.length - 1; i++) {
    const dist = getPerpendicularDistance(mouse, path[i], path[i + 1]);
    const withinSegment = isWithinSegmentBounds(
      mouse,
      path[i],
      path[i + 1],
      strokeWidth
    );
    if (dist <= strokeWidth / 2 && withinSegment) return true;
  }
  return false;
}

export function isWithinSegmentBounds(
  p: Point2D,
  a: Point2D,
  b: Point2D,
  buffer: number
): boolean {
  const minX = Math.min(a.x, b.x) - buffer;
  const maxX = Math.max(a.x, b.x) + buffer;
  const minY = Math.min(a.y, b.y) - buffer;
  const maxY = Math.max(a.y, b.y) + buffer;
  return p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;
}
