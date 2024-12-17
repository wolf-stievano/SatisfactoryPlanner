import { useOutputStore } from "@/app/api/outputStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import Image from "next/image";
import OutputDialog from "./OutputDialog";

export default function OutputCard() {
        const { selectedOutputs, updateQuantity, removeOutput } = useOutputStore();

        return (
                <Card className="w-full h-full shadow-lg p-6 flex-col rounded-none rounded-b-lg">
                        <CardHeader>
                                <CardTitle>Input</CardTitle>
                                <CardDescription>Todas opções de input</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                                <OutputDialog />

                                {selectedOutputs.length > 0 && (
                                        <div className="mt-4">
                                                {selectedOutputs.map((input, index) => (
                                                        <div key={index} className="flex items-center justify-between p-2 border-b">
                                                                <div className="flex items-center">
                                                                        <Image src={input.src} alt={input.name} width={40} height={40} />
                                                                        <span className="ml-4">{input.name}</span>
                                                                </div>
                                                                <input
                                                                        type="number"
                                                                        value={input.quantity}
                                                                        min="1"
                                                                        onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
                                                                        className="w-20 border rounded p-1 text-black"
                                                                />
                                                                <button
                                                                        className="ml-4 text-red-500 hover:text-red-700"
                                                                        onClick={() => removeOutput(index)}
                                                                >
                                                                        Deletar
                                                                </button>
                                                        </div>
                                                ))}
                                        </div>
                                )}
                        </CardContent>
                </Card>
        );
}
