import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/ui/card";
import { Label } from "@/components/atoms/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/ui/select";
import CircularProgress from "@/components/molecules/circular-progress";
import { useState } from "react";
import BandSignUpForm from "./banda";

export default function SignUpForm() {
  const [signupType, setSignupType] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  function onProgress({ step, total }: { step: number, total: number}) {
    setProgress(Math.ceil((step / total)*100))
  }

  return (
    <Card className="min-w-1/2 w-full backdrop-blur-lg bg-card/80">
      <CardHeader className="w-full">
        <CardTitle className="text-center">Inscripción</CardTitle>
        <CardDescription className="sr-only">Formulario de inscripción</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-4">
        <div className="w-fit sticky top-0 h-fit">
          <CircularProgress
            value={progress}
            showLabel
            renderLabel={(progress) => `${progress}%`}
            labelClassName="text-xl font-bold"
            className="stroke-[#F229D9]/25"
            progressClassName="stroke-[#F229D9]"
          />
        </div>
        <div className="flex flex-col w-full gap-4 relative">
          <div className="grid gap-2">
            <Label>Seleccione el tipo de acreditación</Label>
            <Select onValueChange={(val) => setSignupType(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de acreditación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="banda">Banda</SelectItem>
                <SelectItem value="gastronomico">Gastronómico</SelectItem>
                <SelectItem value="artesane">Artesane</SelectItem>
                <SelectItem value="prensa">Prensa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {signupType === "banda" && <BandSignUpForm onProgress={onProgress} />}
        </div>
      </CardContent>
    </Card>
  )
}
