import Image from "next/image";
import HomeWelcomeSection from "./home-welcome-section";

export default function Home() {
  return (
    <>
      <div>
        <div className="p-10 text-center text-3xl text-orange-500">This is Home Page</div>
      </div>
      <div><HomeWelcomeSection /></div>
    </>
  );
}
