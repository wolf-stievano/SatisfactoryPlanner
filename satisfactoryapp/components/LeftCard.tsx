import InputCard from "./InputCard";
import OptionsCard from "./OptionsCard";
import OutputCard from "./OutputCard";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@radix-ui/react-tabs";

export default function LeftCard() {
        return (
                <Tabs defaultValue="input" className="w-[400px] w-full h-full">
                        <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger
                                        value="input"
                                        className="bg-gray-200 text-gray-800 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none rounded-tl-lg"
                                >
                                        Input
                                </TabsTrigger>
                                <TabsTrigger
                                        value="output"
                                        className="bg-gray-200 text-gray-800 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none px-4 py-2"
                                >
                                        Output
                                </TabsTrigger>
                                <TabsTrigger
                                        value="options"
                                        className="bg-gray-200 text-gray-800 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none px-4 py-2 rounded-tr-lg"
                                >
                                        Options
                                </TabsTrigger>
                        </TabsList>
                        <TabsContent value="input">
                                <InputCard />
                        </TabsContent>

                        <TabsContent value="output">
                                <OutputCard />
                        </TabsContent>

                        <TabsContent value="options">
                                <OptionsCard />
                        </TabsContent>
                </Tabs>
        );
}

