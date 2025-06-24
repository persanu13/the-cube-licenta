import { Point2D } from "../../Interfaces/figurine";

export function polygonCentroid(points: Point2D[]): Point2D {
  let A = 0;
  let Cx = 0;
  let Cy = 0;

  const n = points.length;
  for (let i = 0; i < n; i++) {
    const current = points[i];
    const next = points[(i + 1) % n];
    const cross = current.x * next.y - next.x * current.y;

    A += cross;
    Cx += (current.x + next.x) * cross;
    Cy += (current.y + next.y) * cross;
  }

  A /= 2;
  Cx /= 6 * A;
  Cy /= 6 * A;

  return { x: Cx, y: Cy };
}

type Point = { x: number; y: number };

export function getPerpendicularDistance(
  pt: Point,
  lineStart: Point,
  lineEnd: Point
): number {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;

  const area = Math.abs(dx * (lineStart.y - pt.y) - (lineStart.x - pt.x) * dy);
  const length = Math.sqrt(dx * dx + dy * dy);
  return area / length;
}

export function simplifyDouglasPeucker(
  points: Point[],
  epsilon: number
): Point[] {
  if (points.length < 3) return points;

  let dmax = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = getPerpendicularDistance(
      points[i],
      points[0],
      points[points.length - 1]
    );
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }

  if (dmax > epsilon) {
    const left = simplifyDouglasPeucker(points.slice(0, index + 1), epsilon);
    const right = simplifyDouglasPeucker(points.slice(index), epsilon);
    return left.slice(0, -1).concat(right);
  } else {
    return [points[0], points[points.length - 1]];
  }
}

function chaikinSmoothing(points: Point[], iterations: number): Point[] {
  let result = points;
  for (let iter = 0; iter < iterations; iter++) {
    const newPoints: Point[] = [result[0]];
    for (let i = 0; i < result.length - 1; i++) {
      const p0 = result[i];
      const p1 = result[i + 1];

      const Q = {
        x: 0.75 * p0.x + 0.25 * p1.x,
        y: 0.75 * p0.y + 0.25 * p1.y,
      };
      const R = {
        x: 0.25 * p0.x + 0.75 * p1.x,
        y: 0.25 * p0.y + 0.75 * p1.y,
      };

      newPoints.push(Q, R);
    }
    newPoints.push(result[result.length - 1]);
    result = newPoints;
  }
  return result;
}

export function processFreehandPath(
  points: Point[],
  epsilon: number = 2,
  smoothIterations: number = 2
): Point[] {
  const simplified = simplifyDouglasPeucker(points, epsilon);

  if (simplified.length <= 12) {
    return simplified;
  }

  const smoothed = chaikinSmoothing(simplified, smoothIterations);
  return smoothed;
}

export function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function darkenColor(hex: string, factor: number = 0.8): string {
  const r = Math.floor(parseInt(hex.slice(1, 3), 16) * factor);
  const g = Math.floor(parseInt(hex.slice(3, 5), 16) * factor);
  const b = Math.floor(parseInt(hex.slice(5, 7), 16) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}
