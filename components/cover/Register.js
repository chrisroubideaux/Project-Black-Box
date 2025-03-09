// Register component
'use client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { Tooltip } from 'bootstrap';

const Register = () => {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validatePasswordStrength = (password) => {
    const minLength = 10;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 10 characters long.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    return '';
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError('Passwords must match.');
      } else if (
        name === 'password' &&
        formData.confirmPassword !== '' &&
        value !== formData.confirmPassword
      ) {
        setPasswordError('Passwords must match.');
      } else {
        setPasswordError('');
      }

      if (name === 'password') {
        const passwordStrengthMessage = validatePasswordStrength(value);
        setPasswordStrengthError(passwordStrengthMessage);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords must match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/user/user/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword, // ✅ Include confirmPassword
          photo: formData.photo || '',
        }
      );

      if (response.status === 201) {
        const { token, user } = response.data;

        console.log('Token received after registration:', token); // ✅ Debugging step
        localStorage.setItem('authToken', token); // ✅ Ensure consistency

        if (response.data.redirectTo) {
          router.push(response.data.redirectTo);
        } else {
          router.push(`http://localhost:3000/profile/${user.id}`);
        }

        setSuccessMessage('Registration successful!');
      }
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.response) {
        setErrorMessage(error.response.data.error || 'Registration failed');
      } else {
        setErrorMessage('Internal server error');
      }
    }
  };

  const handleGoogleRegister = () => {
    const googleOAuthURL = 'http://localhost:5000/auth/google/register';
    window.open(
      googleOAuthURL,
      'Google OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };

  const handleFacebookRegister = () => {
    const facebookOAuthURL = 'http://localhost:5000/auth/facebook/register';

    window.open(
      facebookOAuthURL,
      'Facebook OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

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
          className="nav-link bg-transparent mt-3"
          aria-label="Navigate to Your Target Page"
        >
          Go Back
        </Link>
        {/*
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
              <strong>1 number</strong> (e.g., <code>1</code>, <code>2</code>,{' '}
              <code>3</code>).
            </li>
          </ul>
        </ul>
        */}
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
            <h5 className="text-white pt-2">Register</h5>
            <form className="form text-center" onSubmit={handleSubmit}>
              <input
                className="form-control fw-bold "
                required
                type="name"
                name="name"
                placeholder="Enter Full Name"
                data-bs-toggle="tooltip"
                title="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                data-bs-toggle="tooltip"
                title="Enter your email"
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
                className={`form-control  fw-bold ${
                  passwordError || passwordStrengthError ? 'is-invalid' : ''
                }`}
                required
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                data-bs-toggle="tooltip"
                title="Password at least 10 characters with a special character and a number"
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
                className={`form-control fw-bold ${
                  passwordError ? 'is-invalid' : ''
                }`}
                required
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                data-bs-toggle="tooltip"
                title="Passwords must match"
                value={formData.confirmPassword}
                onChange={handleChange}
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
              {passwordError && (
                <p className="text-dark fw-bold">{passwordError}</p>
              )}
              {passwordStrengthError && (
                <p className="text-dark fw-bold">{passwordStrengthError}</p>
              )}
              <button
                className="btn btn-md fw-bold"
                type="submit"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  border: 'none',
                  background:
                    'linear-gradient(135deg,rgb(76, 76, 254),rgb(145, 117, 255))',
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
                    onClick={handleGoogleRegister}
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
                    onClick={handleFacebookRegister}
                  >
                    <FaFacebookSquare
                      className="social-icons m-2"
                      style={{ color: '#fff' }}
                    />
                  </button>
                </li>
              </ul>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              {successMessage && (
                <p className="text-success">{successMessage}</p>
              )}
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
