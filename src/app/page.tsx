import Image from "next/image";
import Social from "@components/socials";
import Credential from "@components/creds"; // Ensure Credential is imported correctly
import MsLearnProgress from "@components/progress";
import Skills from "@components/skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8">
        <main className="flex flex-col gap-12 items-center">
          {/* Profile Section */}
          <div className="w-full max-w-4xl">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-xl border border-slate-200">
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
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                      Stephen Freerking
                    </h1>
                    <p className="text-lg text-sky-600 font-medium mb-4">
                      IT Professional
                    </p>
                    <p className="text-slate-600 leading-relaxed max-w-2xl">
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Certifications</h2>
              <p className="text-slate-600">Professional credentials and achievements</p>
            </div>
            <Credential />
          </div>

          {/* Skills Section */}
          <div className="w-full max-w-7xl">
            <Skills />
          </div>

          {/* Microsoft Learn Progress */}
          <div className="w-full max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Learning Progress</h2>
              <p className="text-slate-600">Microsoft Learn achievements and progress</p>
            </div>
            <div className="flex justify-center">
              <MsLearnProgress />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-slate-600">
            Made with <span className="text-red-500">♥️</span> by Stephen F • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
