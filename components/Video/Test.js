// test card component
import { useState } from 'react';
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
  FaTimes,
} from 'react-icons/fa';

const updateLikeCount = async (videoId, likeAction) => {
  try {
    const response = await fetch(
      `http://localhost:5000/videos/videos/${videoId}/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likeAction }),
      }
    );
    const data = await response.json();
    return data.like_count;
  } catch (error) {
    console.error('Error updating like count:', error);
    return null;
  }
};

export const Cards = ({ videos, user }) => {
  const [likeCount, setLikeCount] = useState(videos.like_count);
  const [liked, setLiked] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleLikeClick = async (videoId) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    const likeAction = liked ? 'unlike' : 'like';
    const updatedLikeCount = await updateLikeCount(videoId, likeAction);

    if (updatedLikeCount !== null) {
      setLikeCount(updatedLikeCount);
      setLiked(!liked);
    }
  };

  return (
    <div>
      <Link className="card-link" href={`/videos/${videos.id}`}>
        <div className="card p-2 shadow" style={{ width: '400px' }}>
          <div className="rounded-top overflow-hidden">
            <div className="card-overlay-hover">
              <Image
                src={videos.cover}
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
                <FaThumbsUp
                  className={`pt-1 cursor-pointer ${
                    liked ? 'text-dark' : 'text-light'
                  }`}
                  onClick={() => handleLikeClick(videos.id)}
                />
                <li className="list-inline-item d-flex justify-content-center align-items-center">
                  <span className="mt-1 no-text-decoration">{likeCount}</span>
                </li>
                <h6 className="pt-3 text-light fw-normal">Views</h6>
                <li className="list-inline-item d-flex justify-content-center align-items-center">
                  <span className="text-light fs-6 mt-1 me-1">
                    {videos.views}
                  </span>
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
                    <FaOutdent className="fs-6 me-2 " />
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

        {showLoginPrompt && (
          <div className=" fixed-top end-0 p-3">
            <div
              id="liveToast"
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header ">
                <strong className="me-auto">
                  Please log in or create an account.
                </strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                  onClick={() => setShowLoginPrompt(false)}
                >
                  <FaTimes className="text-light" />
                </button>
              </div>
              <div className="toast-body ">
                <p className="text-light">
                  Must be logged in to like or comment on a video.
                </p>
                <Link
                  className="btn btn-sm w-25 align-self-center"
                  href="/login"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default Cards;
