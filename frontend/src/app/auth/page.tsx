import GithubButton from "@/components/auth/github-button";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { SwichButton } from "@/components/auth/swich-button";
import { getAuth } from "@/lib/auth/get-auth";
import Logo from "@/ui/logo";
import { redirect } from "next/navigation";

export default async function AuthPage(props: {
  searchParams?: Promise<{
    tab?: string;
  }>;
}) {
  const auth = await getAuth();
  if (auth) {
    if (auth.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/client");
    }
  }

  const searchParams = await props.searchParams;
  const tab = searchParams?.tab || "login";
  const swich = tab == "register";
  return (
    <main className="flex flex-col items-center h-screen   ">
      <div className="w-full h-full hidden bg-spring-white sm:block "></div>
      <div className="flex flex-col  bg-spring-white items-center  w-full">
        <div className="flex flex-col pt-6 px-[25px] pb-16  w-[clamp(320px,100%,600px)]">
          <Logo size="md" />
          <h2 className="text-xl mt-3 font-jost">Log in your Account</h2>
          {!swich ? (
            <div className="flex flex-col mt-5 ">
              {/* <GithubButton /> */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t-[1.5px] border-tuatara-400" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-spring-white px-3 font-inter text-charade-950 text-sm">
                    Or continue with email
                  </span>
                </div>
              </div>
              <LoginForm />
            </div>
          ) : (
            <SwichButton tab="login" text="LOG IN" />
          )}
        </div>
      </div>
      <div className="bg-bej-100  w-full  flex flex-col items-center">
        <span className="border-b-2 border-charade-950   w-[clamp(320px,96%,584px)]"></span>

        <div className="flex flex-col pt-6 pb-11 px-[25px] bg-bej-100 w-[clamp(320px,100%,600px)]">
          <h2 className="text-xl mt-3 font-jost">Create a new Account</h2>
          {!swich ? (
            <SwichButton tab="register" text="CREATE ACCOUNT" />
          ) : (
            <p>ceva</p>
            // <RegisterForm />
          )}
        </div>
      </div>
      <div className="h-full w-full bg-bej-100"></div>
    </main>
  );
}
