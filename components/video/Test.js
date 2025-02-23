// test card component
// Card component
import Image from 'next/image';
import Link from 'next/link';
import { FaThumbsUp, FaCircle, FaEllipsisV } from 'react-icons/fa';

export const Card = () => {
  return (
    <div>
      <div className="card p-2 shadow" style={{ width: '400px' }}>
        <div className="rounded-top overflow-hidden">
          <div className="card-overlay-hover">
            <Image
              src="/"
              className="card-img-top"
              alt="video"
              width={400}
              height={300}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item d-flex justify-content-center align-items-center">
                <div className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle">
                  <FaThumbsUp className="fs-6 me-1 " />
                </div>
                <span className="text-light ms-2">9.1k</span>
              </li>
              <li className="list-inline-item d-flex justify-content-center align-items-center">
                <div className="icon-md bg-warning bg-opacity-15 text-warning rounded-circle">
                  <i className="fas fa-star"></i>
                  Views
                </div>
                <span className="text-light ms-2">10.1k</span>
              </li>
            </ul>
            <div className="avatar avatar-sm">
              <Image
                className="avatar-img rounded-circle"
                src="/"
                alt="avatar"
                width={40}
                height={40}
              />
            </div>
          </div>
          <hr className="hr" />

          {/* Video Title & Dropdown Aligned */}
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">
              <Link className="nav-link" href="/">
                Video Title
              </Link>
            </h5>
            {/* Dropdown */}
            <div className="dropdown">
              <a
                href="#"
                className=""
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaEllipsisV className="fs-6 text-light" />
              </a>
              <div className="dropdown-menu dropdown-menu-end ">
                <a href="#" className="dropdown-item">
                  Add to Queue
                </a>
                <a href="#" className="dropdown-item">
                  Watch Later
                </a>
                <a href="#" className="dropdown-item">
                  Save to Playlist
                </a>
                <a href="#" className="dropdown-item">
                  Share
                </a>
                <hr className="hr" />
                <a href="#" className="dropdown-item">
                  Not Interested
                </a>
                <a href="#" className="dropdown-item">
                  Report
                </a>
              </div>
            </div>
          </div>

          {/* Category Section */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div>
              <Link
                href="#"
                className="badge bg-info bg-opacity-10 text-info me-2"
              >
                <i className="fas fa-circle small fw-bold"></i> Category{' '}
                <FaCircle className="small fw-bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
