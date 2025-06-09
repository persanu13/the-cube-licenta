import { PanelState } from "@/geometry_2d/Interfaces/types";

export default function StylePanel({
  panel,
  onChange,
}: {
  panel: PanelState;
  onChange: (item: PanelState) => void;
}) {
  return (
    <>
      <div className="flex w-full gap-1 items-center">
        <label
          htmlFor="width"
          className="whitespace-nowrap text-[14px] font-jost font-medium text-charade-950"
        >
          Width:
        </label>
        <input
          id="width"
          type="number"
          defaultValue={panel.width}
          className="w-[40px] text-center min-w-0 px-1 py-0.5 border rounded text-[14px] font-inter font-medium text-charade-950 
        outline-tuatara-400  focus:outline-1 focus:outline-carnation-400 focus:border-carnation-400 focus:shadow-glow-carnation"
          onBlur={(e) => {
            const value = e.target.value;
            const newWidth = Math.min(2000, Math.max(200, Number(value)));
            panel.width = newWidth;
            e.target.value = newWidth.toString();
            onChange(panel);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
      </div>
      <div className="flex w-full gap-1 items-center">
        <label
          htmlFor="height"
          className="whitespace-nowrap text-[14px] font-jost font-medium text-charade-950"
        >
          Height:
        </label>
        <input
          id="height"
          type="number"
          defaultValue={panel.height}
          className="w-[40px] text-center min-w-0 px-1 py-0.5 border rounded text-[14px] font-inter font-medium text-charade-950 
        outline-tuatara-400  focus:outline-1 focus:outline-carnation-400 focus:border-carnation-400 focus:shadow-glow-carnation"
          onBlur={(e) => {
            const value = e.target.value;
            const newHeight = Math.min(2000, Math.max(200, Number(value)));
            panel.height = newHeight;
            e.target.value = newHeight.toString();
            onChange(panel);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
      </div>
    </>
  );
}
