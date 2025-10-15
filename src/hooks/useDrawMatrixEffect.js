// useDrawMatrixEffect.js
import { useEffect } from 'react';
import { MatrixEffect } from './matrixDrawEffect';

const useDrawMatrixEffect = ({ canvasRef }) => {
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const effect = new MatrixEffect(canvas);
    effect.start();

    return () => effect.stop();
  }, [canvasRef]);
};

export default useDrawMatrixEffect;
