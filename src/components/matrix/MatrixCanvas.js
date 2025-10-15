// MatrixCanvas.js
import { useRef } from 'react';
import useDrawMatrixEffect from '../../hooks/useDrawMatrixEffect';

export default function MatrixCanvas() {
  const canvasRef = useRef(null);
  useDrawMatrixEffect({ canvasRef });

  return <canvas className='matrix-bg' ref={canvasRef} />;
}
