"use client";

import { useEffect, useRef, useState } from "react";

import { GCanvasManager } from "../lib/canvas-manager";
import { useCallback } from "react";
import { throttle } from "lodash";
import { IShape } from "../Interfaces/figurine";
import { useCanvasStore } from "../canvas-context";
import { GPoint } from "../Interfaces/gpoint";
import { v4 as uuidv4 } from "uuid";

export default function Canvas() {
  //console.log("rerender canvas2D");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasManager = useRef<GCanvasManager | null>(null);

  const [hovered, setHovered] = useState<IShape | null>(null);

  const action = useCanvasStore((s) => s.action);

  const shapes = useCanvasStore((s) => s.shapes);
  const setShapes = useCanvasStore((s) => s.setShapes);
  const addShape = useCanvasStore((s) => s.addShape);

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
      setHovered(canvasManager.current?.vericate(shapes, mouseP)!);
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
      const newPoint = new GPoint(
        uuidv4(),
        "A",
        "#F83B3B",
        5,
        newPointCoordonate
      );
      newPoint.setIsInViewBox(viewBox.getBounding());
      newPoint.setRealForm(canvasManager.current);
      addShape(newPoint);
    }
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
    if (action === "add_point") return "pointer";
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
