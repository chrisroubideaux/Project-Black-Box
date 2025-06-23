// Cover component
import { useEffect, useRef, useState } from 'react';
import { FaInstagramSquare,FaYoutubeSquare, FaTiktok  } from "react-icons/fa";
import Link from 'next/link';

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
     
      <section
        style={{
          backgroundImage: 'url(/images/cover5.png)',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
      </section>
    
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
        className="glitch-container"
      >
       
        <h1 className="fw-bold  text-center michroma-text fs-1 display-4 mt-5" data-text="Projekt Black Box">
          Projekt Black Box
       </h1>
       <Link
          href="/videos/"
          className="image-link bg-transparent"
          style={{
            backgroundImage: 'url(/images/cover2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            marginTop: '60px',
            height: '150px',
            width: '150px',
            display: 'inline-block',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
            aria-label="Navigate to Your Target Page"
          ></Link>
 
        <div className="w-100 align-center py-3 mt-5 pt-5">
          <h4 className=" typewriter text-center michroma-text" data-text="Projekt Black Box">
          Coming 2026
        </h4>
         
            <p className="nav d-block fs-xs text-center  pb-2 mb-0 text-white">
              &copy;2025, All rights reserved.
              <Link
                className="nav-link d-inline-block p-0"
                href="https://createx.studio/"
                target="_blank"
                rel="noopener"
              >
                Projekt Black Box
              </Link>
            </p>

            <div className=" m-2 ">
              <Link href="#!" className=" me-2">
                <FaInstagramSquare className="social-icons mt-1" />
              </Link>
              <Link href="#!" className=" me-2">
                <FaYoutubeSquare className="social-icons mt-1" />  
              </Link>
              <Link href="#!" className=" me-2">
                <FaTiktok className="social-icons mt-1" />
              </Link>
            </div>
          </div>
      </div>

      
    </div>
  );
};

export default Cover;





