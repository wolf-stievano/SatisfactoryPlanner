import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "./ui/card"
import Flow from "./Flow"

export default function RightCard() {
        return (
                <Card className="w-full h-full p-6 shadow-lg flex flex-col ">

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
        )
}
