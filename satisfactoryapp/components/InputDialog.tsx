import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

import inputData from '../app/api/inputs.json';

interface InputItem {
        name: string;
        src: string;
}

export default function InputDialog({ onSelectInput }: { onSelectInput: (input: InputItem) => void }) {
        return (
                <Dialog>
                        <DialogTrigger asChild>
                                <Button variant="outline">Add Input</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-4xl sm:max-h-[80vh] p-6 bg-primary overflow-y-auto">
                                <DialogHeader>
                                        <DialogTitle>Add Input</DialogTitle>
                                        <DialogDescription>
                                                Add your input of choice.
                                        </DialogDescription>
                                </DialogHeader>

                                {inputData.categories.map((category, index) => (
                                        <div key={index} className="mb-6">
                                                <h3 className="text-lg font-bold mb-4">{category.category}</h3>

                                                <Card className="grid grid-cols-4 gap-4 p-4">
                                                        {category.inputs.map((input, i) => (
                                                                <CardContent
                                                                        key={i}
                                                                        className="flex flex-col items-center text-center cursor-pointer"
                                                                        onClick={() => onSelectInput(input)}
                                                                >
                                                                        <div className="border border-gray-300 rounded-md p-2">
                                                                                <Image
                                                                                        src={input.src}
                                                                                        alt={input.name}
                                                                                        className="w-full h-auto"
                                                                                        layout="responsive"
                                                                                        width={100}
                                                                                        height={100}
                                                                                        objectFit="contain"
                                                                                />
                                                                                {input.name}
                                                                        </div>
                                                                </CardContent>
                                                        ))}
                                                </Card>
                                        </div>
                                ))}
                        </DialogContent>
                </Dialog >
        )
}
