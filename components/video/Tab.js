// Tab component
import { useState } from 'react';
//import Link from 'next/link';
import Image from 'next/image';
import {
  FaShare,
  FaEllipsisV,
  FaOutdent,
  FaReply,
  FaList,
  FaThumbsUp,
} from 'react-icons/fa';

export const Tab = () => {
  const [likes, setLikes] = useState(120);
  const artist = {
    name: 'Artist',
    views: '1.2M views',
    avatar: 'https://via.placeholder.com/40',
  };

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center text-white p-3 rounded"
      style={{ minWidth: '700px' }}
    >
      <div className="d-flex align-items-center">
        <Image
          src="/"
          alt="Artist"
          className="rounded-circle me-2"
          width={30}
          height={30}
        />
        <div>
          <h6 className="mb-0">{artist.name}</h6>
          <small className="text-light">{artist.views}</small>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-sm text-white d-flex align-items-center"
          onClick={handleLike}
        >
          <FaThumbsUp size={18} className="me-1" /> {likes}
        </button>

        <button className="btn btn-sm text-white">
          <FaShare size={18} />
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
  );
};

{
  /*
export const Tab = () => {
  return (
    <div>
      <h5 className="text-white font-bold mb-2">Video Title</h5>
      
    </div>
  );
};

*/
}
