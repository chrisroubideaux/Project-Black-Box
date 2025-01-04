// Cover component
import { useEffect, useRef, useState } from 'react';

const Cover: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!dimensions) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawStatic = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = (Math.random() * 0xffffffff) | 0xff000000; 
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const interval = setInterval(drawStatic, 50); 
    return () => clearInterval(interval);
  }, [dimensions]);

  if (!dimensions) {
    return null;
  }

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background Section */}
      <section
        style={{
          backgroundImage: 'url(/images/cover.png)',
          height: '100%',
          backgroundSize: 'cover',
          borderRadius: '10px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1,
        }}
      ></section>

      {/* Static Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          zIndex: 2,
        }}
        width={dimensions.width}
        height={dimensions.height}
      ></canvas>

      {/* Centered Text with Static Glitch Effect */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          textAlign: 'center',
        }}
        className="glitch-container"
      >
        <h1 className="sixtyfour typewriter" data-text="Black Box">
          Black Box
        </h1>
      </div>

      <style jsx>{`
        .glitch-container {
          position: relative;
        }

        .glitch {
          font-size: 4rem;
          font-weight: bold;
          color: white;
          position: relative;
          display: inline-block;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: none;
          color: white;
          pointer-events: none;
        }

        .glitch::before {
          text-shadow: -2px 0 cyan, 2px 0 red;
        }

        .glitch::after {
          text-shadow: 2px 0 red, -2px 0 cyan;
        }
      `}</style>
    </div>
  );
};

export default Cover;






{
  /*
import { useEffect, useRef, useState } from 'react';

const Cover: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!dimensions) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawStatic = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = (Math.random() * 0xffffffff) | 0xff000000; // Random white/black pixels
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const interval = setInterval(drawStatic, 50); // Refresh static every 50ms
    return () => clearInterval(interval); // Cleanup interval
  }, [dimensions]);

  if (!dimensions) {
    return null;
  }

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
     
      <section
        style={{
          backgroundImage: 'url(/images/cover.png)',
          height: '100%',
          backgroundSize: 'cover',
          borderRadius: '10px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1,
        }}
      ></section>

    
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          zIndex: 2,
        }}
        width={dimensions.width}
        height={dimensions.height}
      ></canvas>

    
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          textAlign: 'center',
        }}
      >
        <h1
          className="text-white"
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          Black Box
        </h1>
      </div>
    </div>
  );
};

export default Cover;

*/
}
