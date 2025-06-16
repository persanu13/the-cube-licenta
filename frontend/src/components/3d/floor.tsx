export default function Floor({
  color1,
  color2,
}: {
  color1: string;
  color2: string;
}) {
  return (
    <div
      className="select-none absolute w-[20em] h-[20em]  top-0 translate-x-[-50%] translate-y-[-50%] rotate-x-90   [background-size:100%,_2em_2em] transform-3d "
      style={{
        backgroundImage: `radial-gradient(${color1}00, ${color1} 50%),
        repeating-conic-gradient(
          from 0deg,
          ${color1} 0deg 90deg,
          ${color2} 90deg 180deg
        )`,
      }}
    ></div>
  );
}
