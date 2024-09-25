import { useState } from "react"
import InputDialog from "./InputDialog"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import Image from "next/image"

interface InputItem {
        name: string;
        src: string;
        quantity: number;
}

export default function InputCard() {
        const [selectedInputs, setSelectedInputs] = useState<InputItem[]>([]);

        const handleSelectInput = (input: Omit<InputItem, 'quantity'>) => {
                const existingInputIndex = selectedInputs.findIndex((item) => item.name === input.name);

                if (existingInputIndex !== -1) {
                        const updatedInputs = [...selectedInputs];
                        updatedInputs[existingInputIndex].quantity += 1;
                        setSelectedInputs(updatedInputs);
                } else {
                        setSelectedInputs([...selectedInputs, { ...input, quantity: 1 }]);
                }
        };

        const handleQuantityChange = (index: number, newQuantity: string) => {
                const updatedInputs = [...selectedInputs];
                updatedInputs[index].quantity = parseInt(newQuantity, 10);
                setSelectedInputs(updatedInputs);
        };

        const handleDeleteInput = (index: number) => {
                const updatedInputs = selectedInputs.filter((_, i) => i !== index);
                setSelectedInputs(updatedInputs);
        };

        return (
                <Card className="w-full h-full shadow-lg p-6 flex-col rounded-none rounded-b-lg">
                        <CardHeader>
                                <CardTitle>Input</CardTitle>
                                <CardDescription>Todas opções de input</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                                <InputDialog onSelectInput={handleSelectInput} />

                                {selectedInputs.length > 0 && (
                                        <div className="mt-4">
                                                {selectedInputs.map((input, index) => (
                                                        <div key={index} className="flex items-center justify-between p-2 border-b">
                                                                <div className="flex items-center">
                                                                        <Image src={input.src} alt={input.name} width={40} height={40} />
                                                                        <span className="ml-4">{input.name}</span>
                                                                </div>
                                                                <input
                                                                        type="number"
                                                                        value={input.quantity}
                                                                        min="1"
                                                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                                        className="w-20 border rounded p-1 text-black"
                                                                />
                                                                <button
                                                                        className="ml-4 text-red-500 hover:text-red-700"
                                                                        onClick={() => handleDeleteInput(index)}
                                                                >
                                                                        Deletar
                                                                </button>
                                                        </div>
                                                ))}
                                        </div>
                                )}
                        </CardContent>
                </Card>
        )
}
