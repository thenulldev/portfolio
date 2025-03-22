import Image from "next/image";
import Social from "@components/socials";
import Credential from "@components/creds"; // Ensure Credential is imported correctly
import XPProgressBar from "@components/progress";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <figure className="mx-auto mt-8 md:flex bg-slate-100 rounded-xl md:p-0 font-[family-name:var(--font-poppins-sans)] 5xl:w-1/2 6xl:1/4 md:h-2/3">
          <Image
            className="object-cover w-full h-56 mx-auto rounded-xl md:h-auto md:w-56"
            src="/avatar.png"
            alt=""
            width={400}
            height={400}
          />
          <div className="flex flex-col items-center p-8 pt-6 space-y-4 md:text-left">
            <span className="flex-grow">
              <p
                className={`font-medium text-md text-slate-800 font-[family-name:var(--font-roboto-sans)]`}
              >
                I love technology and breaking things to see how they work. I
                have a passion for learning and am always looking for new ways
                to apply my skills.
              </p>
            </span>
            <figcaption className="font-medium text-center">
              <div className="font-bold text-sky-500 dark:text-sky-400">
                Stephen Freerking
              </div>
              <div className="text-xs font-normal text-slate-700">
                IT Professional
              </div>
            </figcaption>
            <Social />
          </div>
        </figure>
        <Credential />
        <XPProgressBar />
      </main>
      <footer className="row-start-3 flex gap-1 flex-wrap items-center justify-center">
        Made with <span className="text-red-600">♥️</span> by Stephen F 2025
      </footer>
    </div>
  );
}
