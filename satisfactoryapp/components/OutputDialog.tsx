import { useOutputStore } from "@/app/api/outputStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import inputData from '../app/api/inputs.json';

export default function OutputDialog() {
        const { addOutput } = useOutputStore();

        return (
                <Dialog>
                        <DialogTrigger asChild>
                                <Button variant="outline">Add Output</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-4xl sm:max-h-[80vh] p-6 bg-primary overflow-y-auto">
                                <DialogHeader>
                                        <DialogTitle>Add Output</DialogTitle>
                                        <DialogDescription>
                                                Add your output of choice.
                                        </DialogDescription>
                                </DialogHeader>

                                {inputData.categories.map((category, index) => (
                                        <div key={index} className="mb-6">
                                                <h3 className="text-lg font-bold mb-4">{category.category}</h3>

                                                <div className="grid grid-cols-4 gap-4 p-4">
                                                        {category.inputs.map((input, i) => (
                                                                <div
                                                                        key={i}
                                                                        className="flex flex-col items-center text-center cursor-pointer"
                                                                        onClick={() => addOutput(input)}
                                                                >
                                                                        <div className="border border-gray-300 rounded-md p-2">
                                                                                <Image
                                                                                        src={input.src}
                                                                                        alt={input.name}
                                                                                        width={100}
                                                                                        height={100}
                                                                                        objectFit="contain"
                                                                                />
                                                                                <span className="mt-2">{input.name}</span>
                                                                        </div>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                ))}
                        </DialogContent>
                </Dialog>
        );
}
