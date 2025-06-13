"use client";

import { useEffect, useRef, useState } from "react";

import { GCanvasManager } from "../lib/canvas-manager";
import { useCallback } from "react";
import { remove, throttle } from "lodash";
import { IShape, Point2D } from "../Interfaces/figurine";
import { useCanvasStore } from "../canvas-context";
import { GPoint, TPoint } from "../Interfaces/gpoint";
import { v4 as uuidv4 } from "uuid";
import { GLine } from "../Interfaces/gline";
import { GPolygon } from "../Interfaces/gpolygone";
import { GPath } from "../Interfaces/gpath";
import { processFreehandPath } from "../lib/utility/utility";

export default function Canvas() {
  //console.log("rerender canvas2D");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasManager = useRef<GCanvasManager | null>(null);

  const addShapeNow = useRef<boolean>(false);

  const [hovered, setHovered] = useState<IShape | null>(null);

  const action = useCanvasStore((s) => s.action);

  const shapes = useCanvasStore((s) => s.shapes);
  const setShapes = useCanvasStore((s) => s.setShapes);
  const addShape = useCanvasStore((s) => s.addShape);
  const removeShape = useCanvasStore((s) => s.removeShape);

  const selectedShapes = useCanvasStore((s) => s.selectedShapes);
  const setSelectedShapes = useCanvasStore((s) => s.setSelectedShapes);

  const viewBox = useCanvasStore((s) => s.viewBox);
  const viewBoxState = useCanvasStore((s) => s.viewBoxState);
  const moveViewBox = useCanvasStore((s) => s.moveViewBox);
  const zoomViewBox = useCanvasStore((s) => s.zoomViewBox);

  useEffect(() => {
    viewBox.setViewBox(
      canvasRef.current?.clientWidth!,
      canvasRef.current?.clientHeight!,
      0.01
    );
    canvasManager.current = new GCanvasManager(canvasRef.current!, viewBox);
    canvasManager.current.resize();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      canvasManager.current?.resize();
      viewBox.resizeViewBox(
        canvasRef.current?.clientWidth!,
        canvasRef.current?.clientHeight!
      );
      moveViewBox(0, 0);
    };

    const observer = new ResizeObserver(handleResize);
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
      handleResize();
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    canvasManager.current!.drawAll(shapes, selectedShapes);
  }, [shapes, selectedShapes]);

  useEffect(() => {
    canvasManager.current?.updateReal(shapes);
    canvasManager.current?.drawAll(shapes, selectedShapes);
  }, [viewBoxState]);

  const handleStartPan = (e: React.MouseEvent) => {
    let lastMouse = { x: e.clientX, y: e.clientY };
    setIsMouseDown(true);
    const handlePan = (e: MouseEvent) => {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      requestAnimationFrame(() => {
        moveViewBox(dx, dy);
      });
      lastMouse = { x: e.clientX, y: e.clientY };
    };

    const handleEndPan = () => {
      window.removeEventListener("mousemove", handlePan);
      window.removeEventListener("mouseup", handleEndPan);
      setIsMouseDown(false);
    };

    window.addEventListener("mousemove", handlePan);
    window.addEventListener("mouseup", handleEndPan);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (action != "move_view_box") return;
    const mousePoint = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const virtual = canvasManager.current?.toVirtualPoint(mousePoint)!;
    const delta = e.deltaY < 0 ? 0.9 : 1.1;
    zoomViewBox(delta, virtual.x, virtual.y);
  };

  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent) => {
      if (isMouseDown || action != "move_select_fig") return;
      const mouseP = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
      setHovered(canvasManager.current?.verificate(shapes, mouseP)!);
    }, 60),
    [action, shapes, isMouseDown]
  );

  const handleStartMoveFig = (e: React.MouseEvent) => {
    setIsMouseDown(true);

    if (hovered) {
      setSelectedShapes([hovered]);
    } else {
      setSelectedShapes([]);
    }

    let lastMouse = { x: e.clientX, y: e.clientY };

    const move = (e: MouseEvent) => {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      requestAnimationFrame(() => {
        if (hovered) {
          hovered.moveFig(dx, dy);
          canvasManager.current?.drawAll(shapes, [hovered]);
        }
      });
      lastMouse = { x: e.clientX, y: e.clientY };
    };

    const end = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);

      if (hovered) canvasManager.current?.updateVirtual([hovered]);

      setShapes([...shapes]);
      setIsMouseDown(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
  };

  const addPoint = (e: React.MouseEvent) => {
    let mouseCoordonate = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    if (canvasManager.current) {
      const newPointCoordonate =
        canvasManager.current.toVirtualPoint(mouseCoordonate);
      const newPoint = new GPoint({
        id: uuidv4(),
        name: "A",
        color: "#F83B3B",
        size: 5,
        coordonates: newPointCoordonate,
      });
      newPoint.setIsInViewBox(viewBox.getBounding());
      newPoint.setRealForm(canvasManager.current);
      addShape(newPoint);
    }
  };

  const addLine = (e: React.MouseEvent) => {
    if (addShapeNow.current) return;
    if (!canvasManager.current) return;
    addShapeNow.current = true;

    let lastMouse = { x: e.clientX, y: e.clientY };
    let mouseCoordonate = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    const newPointCoordonate =
      canvasManager.current.toVirtualPoint(mouseCoordonate);
    const start: TPoint = {
      id: uuidv4(),
      name: "A",
      color: "#F83B3B",
      size: 5,
      coordonates: newPointCoordonate,
    };
    const end: TPoint = {
      id: uuidv4(),
      name: "B",
      color: "#F83B3B",
      size: 5,
      coordonates: newPointCoordonate,
    };

    const newLine = new GLine({
      id: uuidv4(),
      name: "A",
      color: "#000",
      strokeWidth: 2,
      start: start,
      end: end,
    });
    newLine.setIsInViewBox(viewBox.getBounding());
    newLine.setRealForm(canvasManager.current);
    addShape(newLine);

    const mouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      newLine.end.moveFig(dx, dy);
      canvasManager.current?.drawAll(shapes, [newLine]);
      lastMouse = { x: e.clientX, y: e.clientY };
    };

    const mouseClick = (e: MouseEvent) => {
      addShapeNow.current = false;
      newLine.end.setVirtualForm(canvasManager.current!);
      setShapes([...shapes, newLine]);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseClick);
    };

    setTimeout(() => {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mousedown", mouseClick);
    }, 0);
  };

  const addPolygon = (e: React.MouseEvent) => {
    if (addShapeNow.current) return;
    if (!canvasManager.current) return;
    addShapeNow.current = true;

    let lastMouse = { x: e.clientX, y: e.clientY };
    let mouseCoordonate = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    const newPointCoordonate =
      canvasManager.current.toVirtualPoint(mouseCoordonate);

    const start: TPoint = {
      id: uuidv4(),
      name: "A",
      color: "#F83B3B",
      size: 5,
      coordonates: newPointCoordonate,
    };
    const end: TPoint = {
      id: uuidv4(),
      name: "B",
      color: "#F83B3B",
      size: 5,
      coordonates: newPointCoordonate,
    };

    const newPolygon = new GPolygon({
      id: uuidv4(),
      name: "A",
      color: "#000",
      strokeWidth: 2,
      points: [start, end],
    });

    newPolygon.setIsInViewBox(viewBox.getBounding());
    newPolygon.setRealForm(canvasManager.current);
    addShape(newPolygon);

    const mouseMove = (e: MouseEvent) => {
      let mouseCoordonate = {
        x: e.offsetX,
        y: e.offsetY,
      };

      if (
        newPolygon.points.length > 2 &&
        newPolygon.points[0].isHovered(mouseCoordonate, 5)
      ) {
        const target = newPolygon.points.at(0)?.realCoordonates;
        if (target) {
          newPolygon.points.at(-1)!.realCoordonates = {
            x: target.x,
            y: target.y,
          };
        }
      } else {
        newPolygon.points.at(-1)!.realCoordonates.x = mouseCoordonate.x;
        newPolygon.points.at(-1)!.realCoordonates.y = mouseCoordonate.y;
      }

      canvasManager.current?.drawAll(shapes, [newPolygon]);
    };

    const mouseClick = (e: MouseEvent) => {
      if (!canvasManager.current) return;
      let mouseCoordonate = {
        x: e.offsetX,
        y: e.offsetY,
      };

      if (
        newPolygon.points.length > 2 &&
        newPolygon.points[0].isHovered(mouseCoordonate, 5)
      ) {
        addShapeNow.current = false;
        newPolygon.points.pop();
        newPolygon.setVirtualForm(canvasManager.current);
        setShapes([...shapes, newPolygon]);
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mousedown", mouseClick);
        return;
      }

      const newPointCoordonate =
        canvasManager.current.toVirtualPoint(mouseCoordonate);
      const newPoint: TPoint = {
        id: uuidv4(),
        name: "C",
        color: "#F83B3B",
        size: 5,
        coordonates: newPointCoordonate,
      };
      newPolygon.addPoint(newPoint);
      newPolygon.points.at(-1)?.setIsInViewBox(viewBox.getBounding());
      newPolygon.points.at(-1)?.setRealForm(canvasManager.current!);
      canvasManager.current.drawAll(shapes, [newPolygon]);
    };

    setTimeout(() => {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mousedown", mouseClick);
    }, 0);
  };

  const addPath = (e: React.MouseEvent) => {
    if (!canvasManager.current) return;
    setIsMouseDown(true);
    const newPointCoordonate = canvasManager.current.toVirtualPoint({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    const newPath = new GPath({
      id: uuidv4(),
      name: "A",
      color: "#F83B3B",
      strokeWidth: 3,
      points: [newPointCoordonate],
    });
    newPath.setIsInViewBox(viewBox.getBounding());
    newPath.setRealForm(canvasManager.current);
    addShape(newPath);

    const move = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const newPoint: Point2D = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      newPath.realPoints.push(newPoint);
      canvasManager.current?.drawAll(shapes, [newPath]);
    };

    const end = () => {
      if (!canvasManager.current) return;
      setIsMouseDown(false);

      newPath.realPoints = processFreehandPath(newPath.realPoints);
      newPath.points = [];
      for (let p of newPath.realPoints) {
        newPath.points.push(canvasManager.current.toVirtualPoint(p));
      }
      newPath.updateBounding();

      setShapes([...shapes, newPath]);

      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
  };

  const deleteShape = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    const mousePos = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const deleted = canvasManager.current?.verificate(shapes, mousePos);
    if (deleted) removeShape(deleted);

    const move = (e: MouseEvent) => {
      const mousePos = { x: e.offsetX, y: e.offsetY };
      const deleted = canvasManager.current?.verificate(shapes, mousePos);
      if (deleted) removeShape(deleted);
    };

    const end = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);

      setIsMouseDown(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    switch (action) {
      case "move_select_fig":
        handleStartMoveFig(e);
        break;
      case "move_view_box":
        handleStartPan(e);
        break;
      case "add_point":
        addPoint(e);
        break;
      case "add_line":
        addLine(e);
        break;
      case "add_polygon":
        addPolygon(e);
        break;
      case "add_path":
        addPath(e);
        break;
      case "delete":
        deleteShape(e);
        break;
      default:
        console.warn("Action not defined!");
        break;
    }
  };

  const getCursor = () => {
    if (action == "move_select_fig" && hovered) return "pointer";
    if (action == "move_select_fig") return "default";
    if (action === "move_view_box" && isMouseDown) return "grabbing";
    if (action === "move_view_box") return "grab";
    return "default";
  };

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="w-full h-full absolute bg-bej-50 rounded-l-md "
      style={{ cursor: getCursor() }}
    />
  );
}
