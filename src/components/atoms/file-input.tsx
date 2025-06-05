import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import { CircleCheck, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileInputProps = {
  showFiles?: boolean
} & React.ComponentProps<"input">

export default function FileInput({ showFiles, ...props }: FileInputProps) {
  const [hover, setHover] = useState(false)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024**2, // 10mb
    onDragEnter: () => {
      setHover(true)
    },
    onDragLeave: () => {
      setHover(false)
    },
    onDropAccepted: () => {
      setHover(false)
    }
  });

  const files = acceptedFiles.map(file => (
    <span key={file.path}>
      {file.name} ({toSizeString(file.size)})
    </span>
  ));

  if (acceptedFiles.length > 0) {
    const cns = cn(props.className, "bg-green-700/70 outline-none hover:bg-green-700/90")
    props = {
      ...props,
      className: cns
    }
  }

  if (hover) {
    props = {
      ...props,
      className: cn(props.className, "bg-input")
    }
  }

  return (
    <section className="container hover:cursor-pointer">
      <div {...getRootProps(props)}>
        <Input {...getInputProps()} />
        {!hover ?
          acceptedFiles.length > 0 ?
            <div className='flex flex-row gap-4'>
              <span>{files}</span>
              <CircleCheck />
            </div> :
            <p>Arrastra y suelta el archivo para cargarlo, o haz click aquí</p>
          :
          <div className='flex flex-col items-center'>
            <Plus />
            <p>Suelte el archivo para cargarlo</p>
          </div>
      }
      </div>
      {showFiles &&
        <aside>
          <h4>Archivos</h4>
          <ul>{files}</ul>
        </aside>
      }
    </section>
  );
}

function toSizeString(num: number): string {
  if (num < 1024) {
    return `${num} bytes`
  } else if (num < 1024 ** 2) {
    return `${Math.round(num / 1024)} kb`
  } else if (num < 1024 ** 3) {
    return `${Math.round(num / 1024 ** 2)} mb`
  }
  return num.toString()
}
