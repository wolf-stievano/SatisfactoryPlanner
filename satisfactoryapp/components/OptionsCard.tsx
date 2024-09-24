import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

export default function OptionsCard() {
        return (
                <Card className="w-full h-full shadow-lg p-6 flex-col">
                        <CardHeader>
                                <CardTitle>Options</CardTitle>
                                <CardDescription>Opções diversas</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">Conteúdo de Opções</CardContent>
                </Card>
        )
}
