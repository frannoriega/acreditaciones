import React from 'react';
import { Input } from '@/components/atoms/ui/input';
import { Label } from '@/components/atoms/ui/label';
import { Control, useController } from 'react-hook-form';

interface DynamicInputListProps<T> {
  label: string;
  name: string;
  control: Control<any>;
  renderField?: (value: T, index: number, onChange: (value: T) => void) => React.ReactNode;
  placeholder?: string;
  className?: string;
}

export function DynamicInputList<T>({
  label,
  name,
  control,
  renderField,
  placeholder = "Ingrese un valor...",
  className = ""
}: DynamicInputListProps<T>) {
  const { field } = useController({
    name,
    control,
    defaultValue: [] as T[]
  });

  const values = field.value || [];
  
  // Asegurar que siempre haya al menos un campo vacío
  const displayValues = values.length === 0 ? [''] : values;

  const handleInputChange = (index: number, value: T) => {
    const newValues = [...displayValues];
    newValues[index] = value;
    
    // Si el campo actual no está vacío y es el último, agregar un nuevo campo vacío
    const isEmpty = typeof value === 'string' ? value.trim() === '' : false;
    
    if (!isEmpty && index === displayValues.length - 1) {
      newValues.push('');
    }
    
    // Remover campos vacíos al final (excepto el último si hay al menos un campo con contenido)
    const nonEmptyValues = newValues.filter(val => {
      return typeof val === 'string' ? val.trim() !== '' : true;
    });
    const finalValues = [...nonEmptyValues, ''];
    
    field.onChange(finalValues);
  };

  const defaultRenderField = (value: T, index: number, onChange: (value: T) => void) => {
    if (typeof value === 'string') {
      return (
        <Input
          key={index}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          placeholder={placeholder}
          className="w-full"
        />
      );
    }
    
    // Para otros tipos, mostrar un input genérico
    return (
      <Input
        key={index}
        value={String(value)}
        onChange={(e) => onChange(e.target.value as T)}
        placeholder={placeholder}
        className="w-full"
      />
    );
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      <div className="space-y-2">
        {displayValues.map((value: T, index: number) => (
          <div key={index}>
            {renderField 
              ? renderField(value, index, (newValue) => handleInputChange(index, newValue))
              : defaultRenderField(value, index, (newValue) => handleInputChange(index, newValue))
            }
          </div>
        ))}
      </div>
    </div>
  );
} 