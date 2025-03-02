// Watched card component
import Image from 'next/image';
import Link from 'next/link';
import {
  FaEllipsisV,
  FaList,
  FaShare,
  FaReply,
  FaOutdent,
} from 'react-icons/fa';

export const Watched = () => {
  return (
    <div className="card rounded overflow-hidden shadow">
      <div className="row g-0">
        <div className="col-md-4 position-relative">
          <div className="position-relative">
            <Image
              src="/images/videos/demo.png"
              alt="card image"
              width={100}
              height={100}
              className="img-fluid w-100 h-auto"
            />

            <span
              className="position-absolute bottom-0 end-0 bg-dark text-white px-1 rounded"
              style={{
                fontSize: '0.75rem',
                margin: '4px',
                opacity: 0.8,
              }}
            >
              12:34
            </span>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="card-title mb-1">
                  <Link className="nav-link" href="#">
                    Video Title
                  </Link>
                </h6>
                <h6 className="card-title mb-0 text-muted">
                  <Link className="nav-link" href="#">
                    Artist Name
                  </Link>
                </h6>
              </div>

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
            <ul className="list-inline mb-0 mt-2">
              <small className="list-inline-item text-white">1.2m views</small>
              <small className="list-inline-item text-white">
                • Time stamp
              </small>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watched;

{
  /*
// Watched card component
import Image from 'next/image';
import Link from 'next/link';
import {
  FaEllipsisV,
  FaList,
  FaShare,
  FaReply,
  FaOutdent,
} from 'react-icons/fa';

export const Watched = () => {
  return (
    <div className="card rounded overflow-hidden shadow">
      <div className="row g-0">
        <div className="col-md-4">
          <Image
            src="/images/videos/demo.png"
            alt="card image"
            width={100}
            height={100}
            className="img-fluid"
          />
         
          <span
            className="position-absolute bottom-0 end-0 bg-dark text-white px-1 rounded"
            style={{
              fontSize: '0.75rem',
              margin: '4px',
              opacity: 0.8,
            }}
          >
            12:34
          </span>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="card-title mb-1">
                  <Link className="nav-link" href="#">
                    Video Title
                  </Link>
                </h6>
                <h6 className="card-title mb-0 text-muted">
                  <Link className="nav-link" href="#">
                    Artist Name
                  </Link>
                </h6>
              </div>

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
            <ul className="list-inline mb-0 mt-2">
              <small className="list-inline-item text-white">1.2m views</small>
              <small className="list-inline-item text-white">
                • Time stamp
              </small>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watched;


*/
}
