"use client";

import Navbar from "../components/Navbar";
import Flow from "../components/Flow"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";


export default function Home() {
        return (
                <div className="min-h-screen flex flex-col justify-between">
                        <Navbar />

                        {/* Main content */}
                        <div className="flex-grow w-full">

                                <ResizablePanelGroup
                                        direction="horizontal"
                                        className="min-h-[200px] rounded-lg border]"
                                >
                                        <ResizablePanel minSize={20} defaultSize={30}>
                                                <div className="flex justify-center items-center p-4 h-full">
                                                        <Card className="w-full h-full shadow-lg p-6">
                                                                <CardHeader>
                                                                        <CardTitle> Input </CardTitle>
                                                                        <CardDescription> Todas opcoes de input </CardDescription>
                                                                </CardHeader>
                                                        </Card>
                                                </div>
                                        </ResizablePanel>

                                        <ResizableHandle withHandle />
                                        <ResizablePanel minSize={30} defaultSize={70}>
                                                <div className="flex justify-center items-center p-4 h-full">
                                                        <Card className="w-full h-full p-6 shadow-lg ">
                                                                <CardHeader>
                                                                        <CardTitle>Interactive Flow</CardTitle>
                                                                        <CardDescription>
                                                                                This is an example of a flow component inside a card.
                                                                        </CardDescription>
                                                                </CardHeader>
                                                                <CardContent className="h-[40vh] md:h-[50vh]">
                                                                        <Flow />
                                                                </CardContent>
                                                        </Card>
                                                </div>
                                        </ResizablePanel>
                                </ResizablePanelGroup>
                        </div>
                </div>
        );
}
