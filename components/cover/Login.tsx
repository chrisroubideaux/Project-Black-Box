// Cover component
//import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {  FaFacebookSquare, FaGoogle  } from "react-icons/fa";
import Link from 'next/link';

const Login: React.FC = () => {
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
          backgroundImage: 'url(/images/login.png)',
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
      <div className="static-effect">
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
      </div>
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
         <h1 className=" text-white text-center" data-text="Black Box">
           Login
        </h1>
        <Link
    href="/videos/"
    className="image-link bg-transparent mt-3"
   
    aria-label="Navigate to Your Target Page"
  ></Link>
  <div className="container-fluid">
      <div className="text-center py-5">
        <Link href="/" className="nav-item"style={{
     backgroundImage: 'url(/images/cover2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100px',
    width: '100px',
    display: 'inline-block',
  }}>
     
        </Link>
        <h2 className="fw-bold">Login to your account</h2>
        <form className="form text-center" >
          <input
            className="form-control m-2 fw-bold"
            required
            type="email"
            name="email"
            placeholder="Enter Email"
           
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="password"
            name="password"
            placeholder="Enter Password"
          
          />
          <button className="w-75 btn btn-md" type="submit">
            Login
          </button>
          <h6 className="text-muted pt-3">or login with</h6>
          <ul className="nav justify-content-center list-unstyled d-flex pt-2">
            <li className="ms-3">
              <button
                className="text-muted bg-transparent border-0"
               
              >
                <FaGoogle className="social-icons m-2" />
              </button>
            </li>
            <li className="ms-3">
              <button
                className="text-muted bg-transparent border-0"
               
              >
                <FaFacebookSquare className="social-icons m-2" />
              </button>
            </li>
          </ul>
          <p className="pt-1 fw-bold">{"Don't have an account?"}</p>
          <Link className="btn btn-md w-75" href="/register">
            Register
          </Link>
          <p className="mt-1 mb-3 text-muted">&copy; Black Box, 2025</p>
        </form>
      </div>
    </div>
        
      </div>
    </div>
  );
};

export default Login;





