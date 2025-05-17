import Logo from "@/components/shared/logo";
import SignIn from "@/components/sign-in";

export default function Home() {
  return (
    <div className="overflow-scroll flex flex-col h-full bg-gradient-to-b from-[#FFFA20] to-[#F229D9] items-center justify-between py-16">
      <div className="w-full min-h-min h-full flex flex-col items-center justify-center">
        <Logo className="fill-white p-8 my-auto" />
      </div>
      <div className="min-h-min h-full flex flex-col p-8 items-center gap-8">
        <div className="h-min flex flex-col items-center gap-8 p-8 bg-slate-800/40 backdrop-blur-xs rounded-lg">
          <h1 className="text-4xl text-center font-semibold text-slate-200">Sistema de Acreditaciones</h1>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
