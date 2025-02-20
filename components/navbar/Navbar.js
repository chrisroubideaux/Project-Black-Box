// Navbar component
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

export const Navbar = () => {
  return (
    <div>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {/* Logo */}
            <a
              href="#"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <Image
                src="/images/cover2.png"
                className="bi me-2"
                width={50}
                height={50}
                alt="Logo"
              />
            </a>

            {/* Centered Search Bar */}
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="search"
                className="form-control search-input"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="Profile"
                  width="32"
                  height="32"
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
