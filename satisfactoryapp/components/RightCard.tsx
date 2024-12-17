import { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "./ui/card"
import Flow from "./Flow"

export default function RightCard() {
        const [calculationMode, setCalculationMode] = useState<'normal' | 'maximize'>('normal');

        return (
                <Card className="w-full h-full p-6 shadow-lg flex flex-col">
                        <CardHeader>
                                <CardTitle>Interactive Flow</CardTitle>
                                <CardDescription>
                                        <button
                                                onClick={() => setCalculationMode((prev) => (prev === 'normal' ? 'maximize' : 'normal'))}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                                {calculationMode === 'normal' ? 'Maximizar Produção' : 'Calcular Necessidades'}
                                        </button>
                                </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow h-[40vh] md:h-[50vh]">
                                <Flow calculationMode={calculationMode} />
                        </CardContent>
                </Card>
        );
}
