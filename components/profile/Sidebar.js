// Sidebar component

import Link from 'next/link';
import {
  FaHome,
  FaPlayCircle,
  FaTv,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';

const Sidebar = ({ users }) => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('No authentication token found.');
        return;
      }

      const response = await fetch('http://localhost:5000/user/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', await response.text());
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  return (
    <>
      <div
        className="sidebar fixed d-flex flex-column flex-shrink-0 p-3  "
        style={{ width: '180px' }}
      >
        <Link
          href="/"
          className=" nav-link d-flex align-items-center mb-3 mb-md-0 me-md-auto "
        >
          <h6 className="text-center">{users.name}</h6>
        </Link>
        <hr className="hr" />
        <ul className="nav  flex-column mb-auto">
          <Link href="/profile" className="nav-link " aria-current="page">
            <FaUser className="fs-6  me-2" />
            Profile
          </Link>
          <Link href="#" className="nav-link " aria-current="page">
            <FaHome className="fs-6 me-2" />
            Home
          </Link>
          <Link href="#" className="nav-link ">
            <FaPlayCircle className="fs-6 me-2" />
            Shorts
          </Link>
          <Link href="#" className="nav-link fs-sm">
            <FaTv className="fs-6 me-2" />
            Subs
          </Link>
        </ul>
        <hr />
        <Link href="#" className="nav-link" onClick={handleLogout}>
          <FaSignOutAlt className="fs-6 me-2" />
          Log out
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
