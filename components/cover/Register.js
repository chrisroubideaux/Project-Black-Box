// Register component
import { useEffect, useRef, useState } from 'react';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

const Register = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);

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
          backgroundImage: 'url(/images/cover3.png)',
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
      ></section>
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
        <Link
          href="/videos/"
          className="image-link bg-transparent mt-3"
          aria-label="Navigate to Your Target Page"
        ></Link>
        <div
          className="container-fluid"
          style={{ minWidth: '400px', maxHeight: '600px' }}
        >
          <div
            className="text-center px-2 m-2 p-2"
            style={{
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <ul className="nav justify-content-center list-unstyled d-flex ">
              <ul
                className=" text-light  justify-content-center "
                style={{
                  fontSize: '0.85rem',
                  lineHeight: '1.4rem',
                }}
              >
                <li className="text-light">
                  Password at least <strong>10 characters</strong>.
                </li>
                <li className="text-light">
                  At least <strong>1 special character</strong> (e.g.,{' '}
                  <code>@</code>, <code>#</code>, <code>$</code>).
                </li>
                <li className="text-light">
                  <strong>1 number</strong> (e.g., <code>1</code>,{' '}
                  <code>2</code>, <code>3</code>).
                </li>
              </ul>
            </ul>

            <form className="form text-center ">
              <input
                className="form-control fw-bold "
                required
                type="fullname"
                name="fullname"
                placeholder="Enter Full Name"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  border: 'none',
                  marginBottom: '10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  color: '#fff',
                }}
              />
              <input
                className="form-control fw-bold "
                required
                type="email"
                name="email"
                placeholder="Enter Email"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  border: 'none',
                  marginBottom: '10px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  color: '#fff',
                }}
              />
              <input
                className="form-control fw-bold"
                required
                type="createpassword"
                name="createpassword"
                placeholder="Create Password"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  border: 'none',
                  marginBottom: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  color: '#fff',
                }}
              />
              <input
                className="form-control fw-bold"
                required
                type="confirm-password"
                name="confirm-password"
                placeholder="Confirm Password"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  border: 'none',
                  marginBottom: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(5px)',
                  color: '#fff',
                }}
              />
              <button
                className="btn btn-md fw-bold"
                type="submit"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff7eb3, #ff758c)',
                  color: '#fff',
                  transition: '0.3s',
                  cursor: 'pointer',
                }}
              >
                Register
              </button>
              <h6 className="text-muted pt-3">or register with</h6>
              <ul className="nav justify-content-center list-unstyled d-flex pt-2">
                <li className="ms-3">
                  <button
                    className="text-muted bg-transparent border-0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(5px)',
                      borderRadius: '10px',
                      transition: '0.3s',
                      cursor: 'pointer',
                    }}
                  >
                    <FaGoogle
                      className="social-icons m-2"
                      style={{ color: '#fff' }}
                    />
                  </button>
                </li>
                <li className="ms-3">
                  <button
                    className="text-muted bg-transparent border-0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(5px)',
                      borderRadius: '10px',
                      transition: '0.3s',
                      cursor: 'pointer',
                    }}
                  >
                    <FaFacebookSquare
                      className="social-icons m-2"
                      style={{ color: '#fff' }}
                    />
                  </button>
                </li>
              </ul>
              <p className="pt-1 fw-bold">{'Already have an account?'}</p>
              <Link
                className="btn btn-md w-100 fw-bold"
                href="/login"
                style={{
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #7b2ff7, #b621fe)',
                  color: '#fff',
                  transition: '0.3s',
                  display: 'block',
                }}
              >
                Login
              </Link>
              <p className="mt-1 mb-3 text-light">&copy; Black Box, 2025</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
