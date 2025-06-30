import React from 'react';
import { Input } from '@/components/atoms/ui/input';
import { Label } from '@/components/atoms/ui/label';

interface DynamicInputListProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function DynamicInputList({
  label,
  values,
  onChange,
  placeholder = "Ingrese un valor...",
  className = ""
}: DynamicInputListProps) {
  // Asegurar que siempre haya al menos un campo vacío
  const displayValues = values.length === 0 ? [''] : values;

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...displayValues];
    newValues[index] = value;
    
    // Si el campo actual no está vacío y es el último, agregar un nuevo campo vacío
    if (value.trim() !== '' && index === displayValues.length - 1) {
      newValues.push('');
    }
    
    // Remover campos vacíos al final (excepto el último si hay al menos un campo con contenido)
    const nonEmptyValues = newValues.filter(val => val.trim() !== '');
    const finalValues = [...nonEmptyValues, ''];
    
    onChange(finalValues);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      <div className="space-y-2">
        {displayValues.map((value, index) => (
          <Input
            key={index}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={placeholder}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
} 