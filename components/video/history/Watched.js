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
import Image from 'next/image';
import Link from 'next/link';

export const Watched = () => {
  return (
    <div>
      <div class="card rounded overflow-hidden shadow">
        <div class="row g-0">
          <div class="col-md-4">
            <Image
              src="/images/videos/demo.png"
              alt="card image"
              width={100}
              height={100}
            />
          </div>

          <div class="col-md-8">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2 mb-sm-3">
                <h5 class="card-title mb-0">
                  <Link class="nav-link" href="#">
                    Video Title
                  </Link>
                </h5>
                <h6 class="card-title mb-0">
                  <Link class="nav-link" href="#">
                    Artist Name
                  </Link>
                </h6>
              </div>

              <ul class="list-inline mb-2">
                <small class="list-inline-item text-white mb-1 mb-sm-0 ">
                  1.2m views
                </small>
                <small class="list-inline-item text-white mb-1 mb-sm-0">
                  Time stamp
                </small>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watched;

*/
}
