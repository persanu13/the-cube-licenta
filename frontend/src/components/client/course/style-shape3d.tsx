import { Scene3DState } from "@/components/threejs/scene3d";
import NumberInput from "./basic/number-input";
import SearchSelect from "./basic/search-select";
import {
  DefaultBox3D,
  DefaultCone3D,
  DefaultCylinder3D,
  DefaultPyramid3D,
  DefaultSphere3D,
  Shape3DType,
} from "@/components/threejs/shape-types";

export default function StyleShape3D({
  scene,
  onChange,
}: {
  scene: Scene3DState;
  onChange: (item: Scene3DState) => void;
}) {
  const shapeOptions = Object.values(Shape3DType).map((type) => ({
    label: type,
    value: type,
  }));

  return (
    <>
      <NumberInput
        id="width"
        label="Width"
        min={300}
        max={1400}
        defaultValue={scene.width}
        onChange={(newWidth) => {
          scene.width = newWidth;
          onChange(scene);
        }}
      />

      <NumberInput
        id="height"
        label="Height"
        min={300}
        max={1400}
        defaultValue={scene.height}
        onChange={(newHeight) => {
          scene.height = newHeight;
          onChange(scene);
        }}
      />

      <SearchSelect
        defaultValue={scene.shape.type}
        options={shapeOptions}
        onChange={(val) => {
          const shapeType: Shape3DType = val as Shape3DType;
          switch (shapeType) {
            case Shape3DType.Box:
              scene.shape = DefaultBox3D;
              break;

            case Shape3DType.Cone:
              scene.shape = DefaultCone3D;
              break;

            case Shape3DType.Sphere:
              scene.shape = DefaultSphere3D;
              break;
            case Shape3DType.Cylinder:
              scene.shape = DefaultCylinder3D;
              break;
            case Shape3DType.Pyramid:
              scene.shape = DefaultPyramid3D;
              break;
            default:
              console.warn("Unknown shape type selected:", shapeType);
          }

          onChange(scene);
        }}
        placeholder="Select a shape "
      />
    </>
  );
}
