// Card component
import Image from 'next/image';
import Link from 'next/link';
import {
  FaThumbsUp,
  FaCircle,
  FaEllipsisV,
  FaList,
  FaShare,
  FaReply,
  FaOutdent,
} from 'react-icons/fa';

export const Card = ({ videos }) => {
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
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">
              <Link className="nav-link" href="/">
                {videos.title}
              </Link>
            </h5>
            {/* Dropdown */}
            <div className="dropdown">
              <a
                href="#"
                className=""
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <FaEllipsisV className="fs-6 text-light" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                style={{
                  zIndex: 1050,
                  maxHeight: 'none',
                  overflow: 'visible',
                  whiteSpace: 'nowrap',
                }}
              >
                <a href="#" className="nav-link">
                  <FaOutdent className="fs-6 me-2" />
                  Add to Queue
                </a>
                <a href="#" className="nav-link">
                  <FaReply className="fs-6 me-2" />
                  Watch Later
                </a>
                <a href="#" className="nav-link">
                  <FaList className="fs-6 me-2" />
                  Save to Playlist
                </a>
                <a href="#" className="nav-link">
                  <FaShare className="fs-6 me-2" />
                  Share
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  Not Interested
                </a>
                <a href="#" className="dropdown-item">
                  Report
                </a>
              </div>
            </div>
          </div>

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
