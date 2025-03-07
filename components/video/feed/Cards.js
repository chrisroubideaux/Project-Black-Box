// Card component
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

export const Cards = ({ videos }) => {
  const [likeCount, setLikeCount] = useState(videos.like_count);
  const [liked, setLiked] = useState(false);

  // Handle like button click
  const handleLikeClick = async (videoId) => {
    const likeAction = liked ? 'unlike' : 'like';
    const updatedLikeCount = await updateLikeCount(videoId, likeAction);

    if (updatedLikeCount !== null) {
      setLikeCount(updatedLikeCount);
      setLiked(!liked);
    }
  };

  return (
    <div>
      <div className="card p-2 shadow" style={{ width: '400px' }}>
        <div className="rounded-top overflow-hidden">
          <Link className="card-link" href={`/videos/${videos.id}`}>
            <div className="card-overlay-hover">
              <Image
                src={videos.cover}
                className="card-img-top"
                alt="video"
                width={400}
                height={300}
              />
            </div>
          </Link>
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
                <span className="mt-1">{likeCount}</span>
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
              <button
                className="btn btn-sm bg-transparent text-white"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <FaEllipsisV className="fs-6 text-light" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-end"
                style={{
                  zIndex: 1050,
                  maxHeight: 'none',
                  overflow: 'visible',
                  whiteSpace: 'nowrap',
                }}
              >
                <button className="dropdown-item">
                  <FaOutdent className="fs-6 me-2" />
                  Add to Queue
                </button>
                <button className="dropdown-item">
                  <FaReply className="fs-6 me-2" />
                  Watch Later
                </button>
                <button className="dropdown-item">
                  <FaList className="fs-6 me-2" />
                  Save to Playlist
                </button>
                <button className="dropdown-item">
                  <FaShare className="fs-6 me-2" />
                  Share
                </button>
                <hr className="dropdown-divider" />
                <button className="dropdown-item">Not Interested</button>
                <button className="dropdown-item">Report</button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div>
              <Link
                href="#"
                className="badge bg-info bg-opacity-10 text-info me-2"
              >
                <i className="fas fa-circle small fw-bold"></i> Category
                <FaCircle className="small fw-bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;

{
  /*
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

export const Cards = ({ videos }) => {
  const [likeCount, setLikeCount] = useState(videos.like_count);
  const [liked, setLiked] = useState(false);

  // Handle like button click
  const handleLikeClick = async (videoId) => {
    const likeAction = liked ? 'unlike' : 'like';
    const updatedLikeCount = await updateLikeCount(videoId, likeAction);

    if (updatedLikeCount !== null) {
      setLikeCount(updatedLikeCount);
      setLiked(!liked);
    }
  };

  return (
    <div>
      <div className="card p-2 shadow" style={{ width: '400px' }}>
        <div className="rounded-top overflow-hidden">
          <Link className="card-link" href={`/videos/${videos.id}`}>
            <div className="card-overlay-hover">
              <Image
                src={videos.cover}
                className="card-img-top"
                alt="video"
                width={400}
                height={300}
              />
            </div>
          </Link>
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
                <span className="mt-1">{likeCount}</span>
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
              <Link
                href="#"
                className=""
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <FaEllipsisV className="fs-6 text-light" />
              </Link>
              <div
                className="dropdown-menu dropdown-menu-end"
                style={{
                  zIndex: 1050,
                  maxHeight: 'none',
                  overflow: 'visible',
                  whiteSpace: 'nowrap',
                }}
              >
                <Link href="#" className="nav-link">
                  <FaOutdent className="fs-6 me-2" />
                  Add to Queue
                </Link>
                <Link href="#" className="nav-link">
                  <FaReply className="fs-6 me-2" />
                  Watch Later
                </Link>
                <Link href="#" className="nav-link">
                  <FaList className="fs-6 me-2" />
                  Save to Playlist
                </Link>
                <Link href="#" className="nav-link">
                  <FaShare className="fs-6 me-2" />
                  Share
                </Link>
                <hr className="dropdown-divider" />
                <Link href="#" className="dropdown-item">
                  Not Interested
                </Link>
                <Link href="#" className="dropdown-item">
                  Report
                </Link>
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

export default Cards;
*/
}
