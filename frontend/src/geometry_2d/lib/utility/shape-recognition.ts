import { Point2D } from "@/geometry_2d/Interfaces/figurine";

export type ShapeType = "circle" | "triangle" | "rectangle" | "none";

function perpendicularDistance(
  p: Point2D,
  lStart: Point2D,
  lEnd: Point2D
): number {
  const doubleArea = Math.abs(
    (lEnd.x - lStart.x) * (lStart.y - p.y) -
      (lStart.x - p.x) * (lEnd.y - lStart.y)
  );
  const distance = Math.sqrt(
    Math.pow(lEnd.x - lStart.x, 2) + Math.pow(lEnd.y - lStart.y, 2)
  );

  return doubleArea / distance;
}

function simplifyRDP(points: Point2D[], epsilon: number): Point2D[] {
  let dMax = 0;
  let index = 0;
  let end = points.length - 1;

  for (let i = 1; i < end; i++) {
    let d = perpendicularDistance(points[i], points[0], points[end]);
    if (d > dMax) {
      index = i;
      dMax = d;
    }
  }

  if (dMax > epsilon) {
    const left = simplifyRDP(points.slice(0, index + 1), epsilon);
    const right = simplifyRDP(points.slice(index), epsilon);

    return left.slice(0, -1).concat(right);
  } else {
    return [points[0], points[points.length - 1]];
  }
}

function computeEpsilon(points: Point2D[]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    len += Math.hypot(dx, dy);
  }
  return len / 25;
}

function subtract(p1: Point2D, p2: Point2D): Point2D {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function centroid(points: Point2D[]): Point2D {
  const cx = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const cy = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  return { x: cx, y: cy };
}

function add(p: Point2D, v1: Point2D, v2?: Point2D): Point2D {
  return {
    x: p.x + v1.x + (v2 ? v2.x : 0),
    y: p.y + v1.y + (v2 ? v2.y : 0),
  };
}

function multiply(v: Point2D, scalar: number): Point2D {
  return { x: v.x * scalar, y: v.y * scalar };
}

function normalize(v: Point2D): Point2D {
  const length = Math.hypot(v.x, v.y);
  return { x: v.x / length, y: v.y / length };
}

function getPerfectRectangle(points: Point2D[]): Point2D[] {
  const center = centroid(points);

  const edge1 = subtract(points[1], points[0]);
  const axisX = normalize(edge1);
  const axisY = { x: -axisX.y, y: axisX.x };

  const projections = points.map((p) => {
    const v = subtract(p, center);
    return {
      x: v.x * axisX.x + v.y * axisX.y,
      y: v.x * axisY.x + v.y * axisY.y,
    };
  });

  const xs = projections.map((p) => p.x);
  const ys = projections.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return [
    add(center, multiply(axisX, minX), multiply(axisY, minY)),
    add(center, multiply(axisX, maxX), multiply(axisY, minY)),
    add(center, multiply(axisX, maxX), multiply(axisY, maxY)),
    add(center, multiply(axisX, minX), multiply(axisY, maxY)),
    add(center, multiply(axisX, minX), multiply(axisY, minY)),
  ];
}

function angleBetween(p1: Point2D, p2: Point2D, p3: Point2D): number {
  const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.hypot(v1.x, v1.y);
  const mag2 = Math.hypot(v2.x, v2.y);
  const cosTheta = dot / (mag1 * mag2);

  const angleRad = Math.acos(Math.min(Math.max(cosTheta, -1), 1));
  return angleRad * (180 / Math.PI);
}

function calculateShapeAngle(points: Point2D[]) {
  let sumAngle = 0;
  const n = points.length - 1;

  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];
    const angle = angleBetween(prev, curr, next);
    sumAngle += angle;
  }

  return sumAngle;
}

function isRectangle(points: Point2D[], angleTolerance = 15): boolean {
  if (points.length !== 5) return false;
  for (let i = 0; i < 4; i++) {
    const prev = points[(i + 3) % 4];
    const curr = points[i];
    const next = points[(i + 1) % 4];
    const angle = angleBetween(prev, curr, next);

    if (Math.abs(angle - 90) > angleTolerance) return false;
  }
  return true;
}

function isCircle(points: Point2D[], tolerance = 5): boolean {
  if (points.length < 4) return false;
  const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  const distances = points.map((p) => Math.hypot(p.x - centerX, p.y - centerY));
  const avg = distances.reduce((a, b) => a + b, 0) / distances.length;
  const maxDiff = Math.max(...distances.map((d) => Math.abs(d - avg)));
  if (maxDiff > tolerance) return false;
  const segments = Math.round(tolerance * 8);
  points.length = 0;
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    points.push({
      x: centerX + avg * Math.cos(angle),
      y: centerY + avg * Math.sin(angle),
    });
  }
  points.push({ x: points[0].x, y: points[0].y });
  return true;
}

function isTriangle(points: Point2D[], angleTolerance = 5): boolean {
  if (points.length !== 4) return false;
  const angle = calculateShapeAngle(points);
  if (Math.abs(angle - 180) > angleTolerance) return false;
  return true;
}

function normalizePoints(points: Point2D[], tolerance = 2): boolean {
  if (points.length < 4) return false;
  const a = points[0];
  const b = points[points.length - 1];
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  if (d > tolerance) return false;
  const punctMijloc = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  points[points.length - 1] = { ...punctMijloc };
  points[0] = { ...punctMijloc };
  return true;
}

export function classifyShape(points: Point2D[]) {
  if (points.length < 2) return null;
  const epsilon = computeEpsilon(points);

  if (isCircle(points, epsilon)) return points;

  const simplified = simplifyRDP(points, epsilon);
  if (simplified.length == 2) return simplified;
  if (!normalizePoints(simplified, epsilon)) return null;
  if (isTriangle(simplified)) return simplified;
  if (isRectangle(simplified)) return getPerfectRectangle(simplified);
  if (Math.abs(calculateShapeAngle(simplified) - 360) < 5) return simplified;
  return null;
}
