import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/atoms/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

interface Coords {
  x: number;
  y: number;
}

interface StagePoint<T> {
  coords: Coords,
  data: T;
}

interface StageProps<T> {
  width?: number;
  height?: number;
  meter?: number;
  defaultValues: T;
  onPointsChange?: (points: StagePoint<T>[]) => void;
  children?: React.ReactNode;
  renderPoint?: (point: StagePoint<T>, index: number) => React.ReactNode;
  renderModal?: (props: {
    point: StagePoint<T>;
    onSave: (data: T) => void;
    onRemove: () => void;
    onClose: () => void;
  }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Función para determinar el icono basado en los instrumentos
function getInstrumentIcon(instruments: Set<string>): string {
  if (instruments.size === 0) return '🎹'; // Default
  
  if (instruments.size > 1) return '🎵'; // Múltiples instrumentos
  
  const instrument = Array.from(instruments)[0];
  
  // Teclados
  if (['keyboard', 'piano'].includes(instrument)) return '🎹';
  
  // Percusión
  if (['drums', 'percussion'].includes(instrument)) return '🥁';
  
  // Cuerdas (guitarra/bajo)
  if (['guitar', 'bass'].includes(instrument)) return '🎸';
  
  // Cuerdas (violín, cello, viola)
  if (['violin', 'cello', 'viola'].includes(instrument)) return '🎻';
  
  // Viento
  if (['trumpet', 'saxophone', 'flute', 'clarinet', 'trombone'].includes(instrument)) return '🎺';
  
  // Voz
  if (['voice', 'backing_vocals'].includes(instrument)) return '🎤';
  
  return '🎹'; // Default
}

export function Stage<T>({
  width = 1024,
  height = 630,
  meter = 66.4,
  defaultValues,
  onPointsChange,
  children,
  renderPoint,
  renderModal,
  className,
  style,
}: StageProps<T>) {
  const [points, setPoints] = useState<StagePoint<T>[]>([]);
  const [activePoint, setActivePoint] = useState<StagePoint<T> | null>(null);
  const [open, setOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);

  // Sync points with parent when they change
  useEffect(() => {
    onPointsChange?.(points);
  }, [points, onPointsChange]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    // Draw guide lines
    const guideCanvas = guideCanvasRef.current;
    if (!guideCanvas) return;

    const ctx = guideCanvas.getContext('2d');
    if (!ctx) return;

    // Clear previous frame
    ctx.clearRect(0, 0, width, height);

    // Set guide line style
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.font = '18px Arial';
    ctx.fillStyle = '#FFFFFF';

    // Draw vertical guide line (x-axis)
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();

    // Draw horizontal guide line (y-axis)
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    // Draw x coordinate text
    ctx.fillText(`${(x / meter).toFixed(2)}mts`, x + 5, 15);

    // Draw y coordinate text
    ctx.fillText(`${(y / meter).toFixed(2)}mts`, 5, y - 5);
  };

  const handleCanvasMouseLeave = () => {
    setMousePosition(null);
    const guideCanvas = guideCanvasRef.current;
    if (!guideCanvas) return;

    const ctx = guideCanvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!mousePosition) return;

    const { x, y } = mousePosition;

    // Check if we clicked on an existing point
    const clickedPointIndex = points.findIndex(point => {
      return Math.sqrt((point.coords.x - x) ** 2 + (point.coords.y - y) ** 2) < 20;
    });

    if (clickedPointIndex >= 0) {
      setActivePoint(points[clickedPointIndex]);
    } else {
      setActivePoint({
        coords: {
          x,
          y
        },
        data: defaultValues
      });
    };

    setOpen(true);
  }

  const handlePointClick = (point: StagePoint<T>) => {
    setActivePoint(point);
    setOpen(true);
  };

  const handleSavePoint = (updatedData: T) => {
    if (activePoint) {
      setPoints(prev => 
        prev.map(p => 
          p === activePoint 
            ? { ...p, data: updatedData }
            : p
        )
      );
    }
    setOpen(false);
    setActivePoint(null);
  };

  const defaultRenderPoint = (point: StagePoint<T>, index: number) => {
    // Determinar el icono basado en los instrumentos si el data tiene la propiedad instruments
    const pointData = point.data as { instruments?: Set<string> };
    const icon = pointData?.instruments ? 
      getInstrumentIcon(pointData.instruments) : '🎹';

    return (
      <button
        key={`${point.coords.x}-${point.coords.y}-${index}`}
        className='absolute bg-[#F229D9]/70 flex items-center justify-center cursor-pointer text-4xl w-min h-min rounded-full p-2'
        style={{
          position: 'absolute',
          left: point.coords.x,
          top: point.coords.y,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
        title={`Point ${index + 1} (Click to edit)`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handlePointClick(point)
        }}
      >
        {icon}
      </button>
    );
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: `${width}px`,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasMouseLeave}
        style={{
          cursor: 'crosshair',
          zIndex: 5
        }}
      />
      <canvas
        ref={guideCanvasRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {points.map((point, index) => (
        <React.Fragment key={`${point.coords.x}-${point.coords.y}-${index}`}>
          {renderPoint
            ? renderPoint(point, index)
            : defaultRenderPoint(point, index)}
        </React.Fragment>
      ))}

      {open && activePoint && renderModal && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogTitle>Titulo</DialogTitle>
            {renderModal({
              point: activePoint,
              onSave: handleSavePoint,
              onRemove: () => {

              },
              onClose: () => setOpen(false),
            })}
          </DialogContent>
        </Dialog>
      )}

      {children}
    </div>
  );
}
