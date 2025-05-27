import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/ui/card";
import { Separator } from "@/components/atoms/ui/separator";
import AdminInfo from "./admin-info";

export default async function InfoCard({ className }: React.ComponentProps<typeof Card>) {
  return (
    <div className="flex flex-col w-full">
      <h1>La Familia</h1>
      <section className={className}>
        <h2>Estado</h2>
      </section>
      <section className={className}>
        <h2>Empleados</h2>
        <Card className={className}>
          <CardHeader className="flex flex-col w-full">
            <CardTitle>La Familia</CardTitle>
            <CardDescription>Foodtruck</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <AdminInfo />
              <Separator orientation="horizontal" />
              <div>
                Datos de empleados
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className={className}>
        <h2>Pagos</h2>
        <Card className={className}>
          <CardHeader className="flex flex-col w-full">
            <CardTitle>La Familia</CardTitle>
            <CardDescription>Foodtruck</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <AdminInfo />
              <Separator orientation="horizontal" />
              <div>
                Datos de empleados
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
