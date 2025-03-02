// Shorts video component
import Image from 'next/image';
import Link from 'next/link';
import {
  FaEllipsisV,
  FaList,
  FaShare,
  FaReply,
  FaOutdent,
} from 'react-icons/fa';

export default function Shorts() {
  return (
    <>
      <Link className="card-link" href="/">
        <div className="card p-2 shadow" style={{ width: '200px' }}>
          <Image
            src="/shorts.png"
            className="card-img-top"
            alt="shorts"
            width={200}
            height={300}
          />
        </div>
        <div
          className="card-footer d-flex justify-content-between align-items-center"
          style={{ width: '200px' }}
        >
          <div>
            <h5 className="text-white pt-2">Title</h5>
            <small className="text-light">views</small>
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
      </Link>
    </>
  );
}
