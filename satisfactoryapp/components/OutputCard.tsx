import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "./ui/card"

export default function OutputCard() {
        return (
                <Card className="w-full h-full shadow-lg p-6 flex-col">
                        <CardHeader>
                                <CardTitle>Output</CardTitle>
                                <CardDescription>Todas opções de output</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">Conteúdo do Output</CardContent>
                </Card>
        )
}

