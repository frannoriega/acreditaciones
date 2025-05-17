'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function Status() {
  return (
    <Card className="w-full flex flex-col items-center">
      <CardHeader className="w-full">
        <CardTitle className="text-center text-2xl">La Familia</CardTitle>
        <CardDescription className="text-center text-lg">Estado de su solicitud</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-4">
        <Timeline />
      </CardContent>
    </Card>
  )
}

function Timeline() {
  const items = [
    {
      title: "En proceso de verificación",
      desc: `Su solicitud fue recibida y está pendiente de verificación`,
      date: new Date(),
    },
    {
      title: "Aprobado",
      desc: `Su solicitud fue aprobada. Ya puede cargar los datos de las credenciales`,
      date: new Date(),
    },
    {
      title: "Pendiente de pago",
      desc: `Su solicitud está pendiente de pago. Por favor, cargue los comprobantes correspondientes`,
      date: new Date(),
    },
  ]
  return (
    <div className="px-4 w-full h-full flex flex-col items-center">
      {items.map((i, e) => (
        <div key={e} className="h-full w-full flex flex-row gap-6 items-start justify-center">
          <div className={`relative w-min h-full flex flex-col items-center justify-start mt-1 ${e != items.length - 1 && "after:bg-slate-700 dark:after:bg-slate-400 after:absolute after:-translate-x-1/2 after:top-0 after:left-1/2 after:w-1 after:h-full after:content-['']"}`}>
            <div className="z-10 w-5 rounded-full h-5 bg-slate-700 dark:bg-slate-400 flex flex-col items-center justify-center" >
              <div className={ `w-3 h-3 rounded-full z-10 bg-slate-50 dark:bg-slate-950` }/>
            </div>
          </div>
          <div className="h-full w-full flex flex-col gap-4 items-start">
            <div className="w-full h-full flex flex-row gap-4">
              <h1 className="font-bold">{i.title}</h1>
              <span className="text-muted-foreground">{i.date.toLocaleString("es-AR", { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric" })}</span>
            </div>
            <p className="h-full w-full pb-8 whitespace-pre-line">
              {i.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
