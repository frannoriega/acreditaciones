import React from 'react';
import { Input } from '@/components/atoms/ui/input';
import { Label } from '@/components/atoms/ui/label';
import { ControllerProps, FieldPath, FieldValues, useController } from 'react-hook-form';

export type DynamicFieldListProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label: string;
  className?: string;
  placeholder?: string;
  renderField?: (value: string, index: number, onChange: (value: string) => void) => React.ReactNode;
} & Omit<ControllerProps<TFieldValues, TName>, 'render'>;

export function DynamicFieldList<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  renderField,
  placeholder = "Ingrese un valor...",
  className = "",
}: DynamicFieldListProps<TFieldValues, TName>) {
  const { field } = useController({
    name,
    control,
  });

  // Asegurar que values sea un array de strings
  const values = (field.value as string[]) || [];
  const displayValues = values.length === 0 ? [''] : values;

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...displayValues];
    newValues[index] = value;
    
    // Si el campo actual no está vacío y es el último, agregar un nuevo campo vacío
    const isEmpty = value.trim() === '';
    
    if (!isEmpty && index === displayValues.length - 1) {
      newValues.push('');
    }
    
    // Remover campos vacíos al final (excepto el último si hay al menos un campo con contenido)
    const nonEmptyValues = newValues.filter(val => val.trim() !== '');
    const finalValues = [...nonEmptyValues, ''];
    
    field.onChange(finalValues);
  };

  const defaultRenderField = (value: string, index: number, onChange: (value: string) => void) => (
    <Input
      key={index}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full"
    />
  );

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label>{label}</Label>
      <div className="space-y-2">
        {displayValues.map((value: string, index: number) => (
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