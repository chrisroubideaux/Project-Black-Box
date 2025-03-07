// Watched card component
'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaEllipsisV,
  FaList,
  FaShare,
  FaReply,
  FaOutdent,
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { Tooltip } from 'bootstrap';

export const WatchedCard = () => {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);
  return (
    <div
      className="card rounded overflow-hidden shadow"
      style={{ width: '650px' }}
    >
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
          <div className="card-body pt-4">
            <div className="d-flex justify-content-between align-items-start">
              <div className="pt-4">
                <h4 className="card-title mb-1">
                  <Link className="nav-link" href="#">
                    Video Title
                  </Link>
                </h4>
                <h4 className="card-title mb-0 text-muted">
                  <Link className="nav-link" href="#">
                    Artist Name
                  </Link>
                </h4>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm bg-transparent text-white"
                  data-bs-toggle="tooltip"
                  title="Remove from Watch History"
                >
                  <FaX size={15} />
                </button>

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

export default WatchedCard;

{
  /*
import Image from 'next/image';
import Link from 'next/link';
import {
  FaEllipsisV,
  FaList,
  FaShare,
  FaReply,
  FaOutdent,
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

export const WatchedCard = () => {
  return (
    <div
      className="card rounded overflow-hidden shadow"
      style={{ width: '650px' }}
    >
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
          <div className="card-body pt-4">
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
              <span className="text-muted">
                <button className="btn btn-sm bg-transparent text-white">
                  <FaX size={20} />
                </button>
              </span>
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

export default WatchedCard;
*/
}
