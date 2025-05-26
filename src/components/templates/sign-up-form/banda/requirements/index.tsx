import Lipsum from "@/components/atoms/lipsum";
import { Button } from "@/components/atoms/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/atoms/ui/dialog";
import { ScrollArea } from "@/components/atoms/ui/scroll-area";

export default function BandRequirements() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ver requisitos</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Requisitos</DialogTitle>
        <DialogDescription>
        </DialogDescription>
        <ScrollArea className="max-h-[500px] py-4">
          <Lipsum />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
