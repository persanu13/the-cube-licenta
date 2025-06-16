import Cube from "@/components/3d/cube";
import Floor from "@/components/3d/floor";
import Paralelipiped from "@/components/3d/paralelipiped";
import Pedestal from "@/components/3d/piedestal";
import Scene from "@/components/3d/scene";
import Title from "@/components/3d/title";
import { LogoutButton } from "@/components/auth/logout-button";
import Logo from "@/components/common/logo";
import Scene3D from "@/components/threejs/scene3d";
import Panel from "@/geometry_2d/components/panel";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="flex flex-col h-screen w-screen  overflow-hidden bg-bej-100 items-center justify-between px-5 pt-6 ">
      <nav className="flex  w-[clamp(300px,90%,1400px)] items-center  justify-between">
        <Logo></Logo>
        <div className="flex gap-4 items-center justify-center">
          <Link
            href={"auth?tab=login"}
            className="font-hanuman text-[22px] font-bold text-charade-950 hover:text-carnation-400 transition-colors duration-200"
          >
            LOGIN
          </Link>
          <Link
            href={"auth?tab=register"}
            className="font-hanuman text-[22px] font-bold text-charade-950 hover:text-carnation-400 transition-colors duration-200"
          >
            REGISTER
          </Link>
        </div>
      </nav>
      <Title />
      <Scene className="text-[50px] w-[20em] h-[12em] bg-bej-100">
        <Floor color1="#f2eee3" color2="#6b665a" />
        <Cube size={2}></Cube>
      </Scene>
    </main>
  );
}
