export default function Requirements({ userType }: { userType: string }) {
  const requirements = {
    artesane: [
      "Documento de identidad",
      "Certificado de artesano",
      "Portfolio de trabajos",
      "Descripción del proyecto"
    ],
    banda: [
      "Documento de identidad de todos los integrantes",
      "Demo o material audiovisual",
      "Rider técnico",
      "Descripción del proyecto"
    ],
    foodtruck: [
      "Documento de identidad",
      "Permisos de salubridad",
      "Certificado de manipulación de alimentos",
      "Descripción del proyecto"
    ],
    prensa: [
      "Documento de identidad",
      "Credencial de prensa",
      "Portfolio de trabajos",
      "Descripción del proyecto"
    ]
  };

  const currentRequirements = requirements[userType as keyof typeof requirements] || [];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Requisitos para {userType}</h2>
      <ul className="list-disc list-inside space-y-2">
        {currentRequirements.map((requirement, index) => (
          <li key={index} className="text-sm text-muted-foreground">
            {requirement}
          </li>
        ))}
      </ul>
    </div>
  );
}
