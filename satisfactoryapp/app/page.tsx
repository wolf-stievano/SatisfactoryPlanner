"use client";

import Navbar from "../components/Navbar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import LeftCard from "@/components/LeftCard";
import RightCard from "@/components/RightCard";


export default function Home() {
        return (
                <div className="h-screen flex flex-col ">
                        <Navbar />

                        {/* Main content */}
                        <div className="flex-grow flex">

                                <ResizablePanelGroup
                                        direction="horizontal"
                                        className="w-full"
                                >
                                        <ResizablePanel minSize={22} defaultSize={22} className="p-6">
                                                <div className="p-4 h-full">
                                                        <LeftCard />
                                                </div>
                                        </ResizablePanel>

                                        <ResizableHandle withHandle />
                                        <ResizablePanel minSize={30} defaultSize={70}>
                                                <div className="p-4 h-full">
                                                        <RightCard />
                                                </div>
                                        </ResizablePanel>
                                </ResizablePanelGroup>
                        </div>
                </div>
        );
}
