import Image from "next/image";
import Social from "@components/socials";
import Credential from "@components/creds"; // Ensure Credential is imported correctly
import MsLearnProgress from "@components/progress";
import Skills from "@components/skills";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 sm:p-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-12 row-start-2 items-center m-2">
        {/* Profile Section */}
        <div className="w-full max-w-4xl">
          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative">
                <Image
                  className="object-cover w-48 h-48 rounded-2xl shadow-lg"
                  src="/avatar.png"
                  alt="Stephen Freerking"
                  width={400}
                  height={400}
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Stephen Freerking
                  </h1>
                  <p className="text-lg text-sky-600 dark:text-sky-400 font-medium mb-4">
                    IT Professional
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    I love technology and breaking things to see how they work. I
                    have a passion for learning and am always looking for new ways
                    to apply my skills.
                  </p>
                </div>
                <Social />
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="w-full max-w-7xl">
          <Credential />
        </div>

        {/* Skills Section */}
        <div className="w-full max-w-7xl">
          <Skills />
        </div>

        {/* Microsoft Learn Progress */}
        <div className="w-full max-w-7xl">
          <MsLearnProgress />
        </div>
      </main>
      <footer className="row-start-3 flex gap-1 flex-wrap items-center justify-center text-slate-600 dark:text-slate-400">
        Made with <span className="text-red-600 dark:text-red-400">♥️</span> by Stephen F • {new Date().getFullYear()}
      </footer>
    </div>
  );
}
