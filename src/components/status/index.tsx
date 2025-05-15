'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function Status() {
  return (
    <Card className="w-full">
      <CardHeader className="sr-only">
        <CardTitle>La Familia</CardTitle>
        <CardDescription>Foodtruck</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        <div className="w-fit flex flex-col">
          <h1 className="font-semibold text-nowrap">La Familia</h1>
          <h2 className="text-muted-foreground text-nowrap">Foodtruck</h2>
        </div>
        <Timeline />
      </CardContent>
    </Card>
  )
}

function Timeline() {
  const items = [
    "adsa asda",
    2,
    3
  ]
  return (
    <div className="p-4 w-min flex flex-col items-center">
      {items.map((i, e) => (
        <div key={e} className="h-full w-full flex flex-row gap-2 items-center">
          <div className={ `relative w-min h-full flex flex-col items-center justify-center ${ e != items.length - 1 && "after:bg-slate-400 after:absolute after:-translate-x-1/2 after:top-1/2 after:left-1/2 after:w-1 after:h-full after:content-['']" }` }>
            <div className="w-4 rounded-full h-4 bg-slate-400"></div>
          </div>
          <div className="w-full flex flex-row items-center h-10 text-nowrap">
            {i}
          </div>
        </div>
      ))}
    </div>
  )
}
