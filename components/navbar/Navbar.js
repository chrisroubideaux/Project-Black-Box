// Navbar component
import Image from 'next/image';
import { FaSearch, FaBars, FaRegHandPeace, FaUser } from 'react-icons/fa';
import Link from 'next/link';

import { FaGear, FaTv } from 'react-icons/fa6';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm mx-auto fixed-top custom-navbar">
      <div className="container-fluid">
        <Link className="nav-link fs-5 pb-2" href="/">
          <Image src="/images/cover2.png" width={60} height={70} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars className="text-light" size={24} />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNavDropdown"
        >
          <div className="d-flex w-100 justify-content-center">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="search"
                className="form-control search-input w-100"
                id="searchInput"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item fs-6">
              <Link className="nav-link" href="#"></Link>
            </li>
            <li className="nav-item">
              <div className="dropdown ">
                <Link
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image
                    src="/images/profile-placeholder.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                </Link>
                <ul className="dropdown-menu  text-small">
                  <li>
                    <Link className="nav-link" href="/">
                      <FaUser className="fs-6  me-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="#">
                      <FaGear className="fs-6  me-2" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="#">
                      <FaTv className="fs-6 me-2" />
                      Watched
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="nav-link" href="#">
                      <FaRegHandPeace className="fs-6 me-2" />
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /*
     <FaSearch />
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
export const Navbar = () => {
  return (
    <div className="pt-5">
      <header className=" p-3 mb-3 ">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <a
              href="#"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <Image
                src="/images/cover2.png"
                className="bi me-2"
                width={60}
                height={70}
                alt="Logo"
              />
            </a>

            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="search"
                className="form-control search-input"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>

          
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image
                  src="/"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
              </a>
              <ul className="dropdown-menu text-small">
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
*/
}
