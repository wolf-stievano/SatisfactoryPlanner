import InputDialog from "./InputDialog"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

export default function InputCard() {
        return (
                <Card className="w-full h-full shadow-lg p-6 flex-col">
                        <CardHeader>
                                <CardTitle>Input</CardTitle>
                                <CardDescription>Todas opções de input</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                                <InputDialog />
                        </CardContent>
                </Card>
        )
}
