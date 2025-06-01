import { Point2D } from "../Interfaces/figurine";

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
