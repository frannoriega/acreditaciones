import React from 'react';
import { Input } from '@/components/atoms/ui/input';
import { Label } from '@/components/atoms/ui/label';
import { FormMessage } from '@/components/atoms/ui/form';
import { ControllerProps, FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form';

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

  const form = useFormContext<TFieldValues>();
  const fieldState = form.getFieldState(name);

  // Asegurar que values sea un array de strings
  const values = (field.value as string[]) || [];
  // Para mostrar en la UI, siempre tener al menos un campo vacío al final
  const displayValues = values.length === 0 ? [''] : [...values, ''];

  const handleInputChange = (index: number, value: string) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues[index] = value;
    
    // Si el campo actual no está vacío y es el último, agregar un nuevo campo vacío
    const isEmpty = value.trim() === '';
    
    if (!isEmpty && index === displayValues.length - 1) {
      newDisplayValues.push('');
    }
    
    // Filtrar solo los valores no vacíos para el formulario
    const cleanValues = newDisplayValues.filter(val => val.trim() !== '');
    
    // Actualizar el campo del formulario solo con valores válidos
    field.onChange(cleanValues);
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