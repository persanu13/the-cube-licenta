import { PanelState } from "@/geometry_2d/Interfaces/types";
import { ContentTypes } from "./content-maker";
import StyleText from "./style-text";
import { TCourseText } from "./text";
import StylePanel from "./style-panel";

export default function StyleMenu({
  selected,
  onChange,
}: {
  selected?: ContentTypes;
  onChange: (item: ContentTypes) => void;
}) {
  const styleMenu = () => {
    if (selected)
      switch (selected.type) {
        case "TEXT":
          const text = selected as TCourseText;

          return <StyleText key={text.id} text={text} onChange={onChange} />;

        case "PANEL":
          const panel = selected as PanelState;
          return (
            <StylePanel key={panel.id} panel={panel} onChange={onChange} />
          );
          break;
      }
  };

  return (
    <div className="flex flex-col shrink-0 gap-3 w-[160px] bg-bej-50 h-full px-3 py-3 border-l-2 border-tuatara-900">
      <h1 className="font-jost text-[18px]  font-medium text-tuatara-900">
        Style
      </h1>
      <div className="flex flex-col w-full gap-1">{styleMenu()}</div>
    </div>
  );
}
