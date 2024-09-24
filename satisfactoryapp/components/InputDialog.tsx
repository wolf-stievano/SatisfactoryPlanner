import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

export default function InputDialog() {
        return (
                <Dialog>
                        <DialogTrigger asChild>
                                <Button variant="outline">Add Input</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                        <DialogTitle>Add Input</DialogTitle>
                                        <DialogDescription>
                                                Add your input of choice.
                                        </DialogDescription>
                                </DialogHeader>
                                <div className=" flex items-center space-x-2">
                                        <div className="grid grid-cols-4 flex-1 gap-2">

                                        </div>

                                </div>
                        </DialogContent>
                </Dialog >
        )
}
