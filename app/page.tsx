import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#e3dede] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#e3dede] text-slate-800 dark:bg-slate-800 dark:text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox. <br />
            <br />
            Storing everything for you and your business needs. All in one place.
          </h1>

          <p className="pb-20">
            Enhance your personal storage with Dropbox, offering a simple and efficient way to upload, organize, and access files from anywhere. Securely store important documents and media, and experience the convenience of easy file management and sharing in one centralized solution.
          </p>

          <Link href="/dashboard" className="flex dark:bg-blue-500 dark:text-slate-800 text-white bg-blue-600 p-5 w-fit rounded-md">
            Try it for free.
            <ArrowRight className="ml-10"></ArrowRight>
          </Link>
        </div>

        <div className="bg-[#e3dede] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
    </main>
  );
}
