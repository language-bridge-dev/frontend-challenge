/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react';

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CanvasDrawerProps {
  rectangles: Rectangle[];
  setRectangles: React.Dispatch<React.SetStateAction<Rectangle[]>>;
}

const CanvasDrawer = ({ rectangles, setRectangles }: CanvasDrawerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  // redibujar todos los rectangulos en el canvas
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach((rect) => {
      ctx.strokeStyle = '#FF0000';
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
  };

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas && ctxRef.current) {
      isDrawing.current = true;
      const rect = canvas.getBoundingClientRect();
      // obtener las coordenadas iniciales del rectangulo
      startX.current = e.clientX - rect.left;
      startY.current = e.clientY - rect.top;
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing.current || !canvasRef.current || !ctxRef.current) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    const rect = canvas.getBoundingClientRect();
    // obtener las coordenadas finales
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    // calcular el ancho y alto
    const width = endX - startX.current;
    const height = endY - startY.current;

    // limpiar el canvas y redibujar
    redrawCanvas();

    // dibujar el rectángulo actual
    ctx.strokeStyle = '#FF0000';
    ctx.strokeRect(startX.current, startY.current, width, height);
  };

  const stopDrawing = (e: React.MouseEvent) => {
    if (!isDrawing.current || !canvasRef.current || !ctxRef.current) return;

    isDrawing.current = false;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    // coordenadas finales del rectangulo
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    // calcular el ancho y alto del rectangulo
    const width = endX - startX.current;
    const height = endY - startY.current;

    // sobreescribir el array de rectangulos
    setRectangles([{ x: startX.current, y: startY.current, width, height }]);
  };

  // actualizar el tamaño del canvas
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      redrawCanvas(); // redibujar el contenido del canvas
    }
  };

  // efecto para inicializar el canvas y escuchar el evento resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      updateCanvasSize();
      ctxRef.current = canvas.getContext('2d');
    }
    // escuchar el evento de redimensionamiento de la ventana
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // efecto para redibujar el canvas cuando cambia la lista de rectangulos
  useEffect(() => {
    redrawCanvas();
  }, [rectangles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-30"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};

export default CanvasDrawer;
