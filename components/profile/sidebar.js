// Sidebar component
import Link from 'next/link';
import {
  FaHome,
  FaPlayCircle,
  FaTv,
  FaSignOutAlt,
  FaUser,
  FaSignInAlt,
} from 'react-icons/fa';

const Sidebar = ({ users }) => {
  const authToken =
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const isLoggedIn = users && Object.keys(users).length > 0 && authToken;

  const handleLogout = async () => {
    try {
      if (!authToken) {
        console.error('No authentication token found in localStorage.');
        alert('No authentication token found.');
        return;
      }

      console.log('Token before logout:', authToken);

      const response = await fetch('http://localhost:5000/user/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logout successful');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        window.location.href = 'http://localhost:3000/login';
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
    <div className="sidebar d-flex flex-column align-items-center p-3">
      <Link href="/" className="nav-link text-center mb-3">
        <h6 className="small">{isLoggedIn ? users?.name : 'Guest'}</h6>
      </Link>
      <hr className="w-100 border-light" />
      <ul className="nav flex-column w-100">
        <a
          href={isLoggedIn ? `/profile/${localStorage.getItem('userId')}` : '#'}
          className="nav-link sidebar-item"
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              alert('Please log in to access your profile.');
            }
          }}
        >
          <FaUser className="icon fs-6" />
          <span>Profile</span>
        </a>
        <Link href="/" className="nav-link sidebar-item">
          <FaHome className="icon fs-5" />
          <span>Home</span>
        </Link>
        <Link href="#" className="nav-link sidebar-item">
          <FaPlayCircle className="icon fs-5" />
          <span>Shorts</span>
        </Link>
        <Link href="#" className="nav-link sidebar-item">
          <FaTv className="icon fs-5" />
          <span>Subs</span>
        </Link>
      </ul>

      <hr className="w-100 border-light mt-auto" />
      {isLoggedIn ? (
        <Link href="#" className="nav-link sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt className="icon fs-5" />
          <span>Log out</span>
        </Link>
      ) : (
        <Link href="/login" className="nav-link sidebar-item">
          <FaSignInAlt className="icon fs-5" />
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;

{
  /*
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
        console.error('No authentication token found in localStorage.');
        alert('No authentication token found.');
        return;
      }

      console.log('Token before logout:', token); // ✅ Debugging step

      const response = await fetch('http://localhost:5000/user/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      console.log('Logout Request Headers:', {
        Authorization: `Bearer ${token}`,
      });

      if (response.ok) {
        console.log('Logout successful'); // ✅ Confirm logout

        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');

        window.location.href = 'http://localhost:3000/login';
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
*/
}
