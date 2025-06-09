import { TCourseText } from "./text";

export default function StyleText({
  text,
  onChange,
}: {
  text: TCourseText;
  onChange: (item: TCourseText) => void;
}) {
  return (
    <>
      <div className="flex w-full gap-1 items-center">
        <label
          htmlFor="font-size"
          className="whitespace-nowrap text-[14px] font-jost font-medium text-charade-950"
        >
          Font Size:
        </label>
        <input
          id="font-size"
          type="number"
          defaultValue={text.size}
          className="w-[40px] text-center min-w-0 px-1 py-0.5 border rounded text-[14px] font-inter font-medium text-charade-950 
          outline-tuatara-400  focus:outline-1 focus:outline-carnation-400 focus:border-carnation-400 focus:shadow-glow-carnation"
          onBlur={(e) => {
            const value = e.target.value;
            const newSize = Math.min(100, Math.max(8, Number(value)));
            text.size = newSize;
            e.target.value = newSize.toString();
            onChange(text);
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
          htmlFor="text-color"
          className="whitespace-nowrap text-[14px] font-jost font-medium text-charade-950"
        >
          Color:
        </label>
        <input
          id="text-color"
          type="color"
          defaultValue={text.color}
          className="w-[40px] text-center min-w-0 px-1 py-0.5  rounded text-[14px] font-inter font-medium text-charade-950"
          onChange={(e) => {
            const value = e.target.value;
            text.color = value;
            onChange(text);
          }}
        />
      </div>
    </>
  );
}
