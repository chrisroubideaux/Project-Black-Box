// Sidebar component
import Link from 'next/link';
import {
  FaHome,
  FaPlayCircle,
  FaTv,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';

const Sidebar = () => {
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
          <h4 className="fs-4">Sidebar</h4>
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
        <Link href="#" className="nav-link">
          <FaSignOutAlt className="fs-6 me-2" />
          Log out
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
