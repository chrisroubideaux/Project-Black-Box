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
        className="sidebar d-flex flex-column flex-shrink-0 p-3 "
        style={{ width: '180px' }}
      >
        <Link
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg className="bi pe-none me-2" width="40" height="32">
            <use xlinkHref="#bootstrap" />
          </svg>
          <span className="fs-4">Sidebar</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="">
            <Link href="#" className="nav-link " aria-current="page">
              <FaUser className="fs-6  me-2" />
              Profile
            </Link>
          </li>
          <li className="">
            <Link href="#" className="nav-link " aria-current="page">
              <FaHome className="fs-6 me-2" />
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link ">
              <FaPlayCircle className="fs-6 me-2" />
              Shorts
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link fs-sm">
              <FaTv className="fs-6 me-2" />
              Subs
            </Link>
          </li>
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
