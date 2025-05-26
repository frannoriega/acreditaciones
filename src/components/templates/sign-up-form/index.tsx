import Lipsum from "@/components/atoms/lipsum";
import { Button } from "@/components/atoms/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/atoms/ui/form";
import { Label } from "@/components/atoms/ui/label";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/atoms/ui/select";
import CircularProgress from "@/components/molecules/circular-progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BandSignUpForm from "./banda";

const newUserFormSchema = z.object({
  type: z.enum(['banda', 'gastronomico', 'artesane', 'prensa']),
})

export default function SignUpForm() {
  const [signupType, setSignupType] = useState<string | null>(null)

  return (
    <Card className="min-w-1/2 w-full backdrop-blur-lg bg-card/80">
      <CardHeader className="w-full">
        <CardTitle className="text-center">Inscripción</CardTitle>
        <CardDescription className="sr-only">Formulario de inscripción</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-4">
        <div className="w-fit sticky top-0 h-fit">
          <CircularProgress
            value={20}
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
          {signupType === "banda" && <BandSignUpForm />}
        </div>
      </CardContent>
    </Card>
  )
}
