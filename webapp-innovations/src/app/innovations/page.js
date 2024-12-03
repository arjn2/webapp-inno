"use client";
import { WavyBackground } from "../components/ui/wavy-background";
import Header from "../components/ui/Header";
import SocialHandler from"../components/ui/socialHandles";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status, update } = useSession();

    return (
        <WavyBackground
            className="min-h-screen w-screen"
            backgroundFill="white"
            blur="3"
        >
            <Header></Header>
            <section className="w-full h-[90%] flex flex-col space-y-4 justify-center items-center">
                <div className="text-6xl font-bold text-gray-800 text-center">
                    DUK Innovation Club!
                </div>
                <div className="text-3xl font-medium text-gray-800">
                    Empowering Innovators!
                </div>
                {/* commented on 12-2-24-beta-sheets-google */}
                {/* <div className="flex space-x-4">
                    {!session ? (
                        <Link href={"/login"}>
                            <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
                                View dashboard
                            </button>
                        </Link>
                    ) : (
                        <Link href={"/profile"}>
                            <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
                                View dashboard
                            </button>
                        </Link>
                    )}

                    <div>
                        <button className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear">
                            Explore
                        </button>
                    </div>
                </div> */}
                <SocialHandler></SocialHandler>
            </section>
        </WavyBackground>
    );
}
