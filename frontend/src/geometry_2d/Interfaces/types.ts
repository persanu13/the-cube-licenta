import { TContentType } from "@/lib/models/types";
import { TShape } from "./figurine";

export type TAction =
  | "move_view_box"
  | "move_select_fig"
  | "add_point"
  | "add_line"
  | "add_square"
  | "add_polygon"
  | "add_path"
  | "delete";

export type PanelState = {
  id: string;
  type: TContentType;
  name: string;
  width: number;
  height: number;
  shapesData: TShape[];
};
