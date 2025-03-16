// History card component
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCircle } from 'react-icons/fa';
import axios from 'axios';

export const History = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/history/user/history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Get token from localStorage
            },
          }
        );

        const historyData = response.data;

        // Fetch video details for each video_id
        const videoRequests = historyData.map((item) =>
          axios.get(`http://localhost:5000/videos/videos/${item.video_id}`)
        );

        const videoResponses = await Promise.all(videoRequests);
        const videoDetails = videoResponses.map((res) => res.data);

        setHistory(videoDetails);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  return (
    <div className="row">
      {history.length > 0 ? (
        history.map((video) => (
          <div key={video.id} className="col-md-4 mb-3">
            <div className="card p-2 shadow" style={{ width: '300px' }}>
              <div className="rounded-top overflow-hidden">
                <Link className="card-link" href={`/videos/${video.id}`}>
                  <div className="card-overlay-hover">
                    <Image
                      src={video.cover || '/images/videos/demo.png'}
                      className="card-img-top"
                      alt={video.title}
                      width={300}
                      height={200}
                    />
                  </div>
                </Link>
              </div>

              <div className="card-body">
                <h5 className="card-title mb-0">
                  <Link className="nav-link" href={`/videos/${video.id}`}>
                    {video.title}
                  </Link>
                </h5>

                <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                  {video.description}
                </p>

                <div className="d-flex justify-content-between">
                  <small className="text-light">{video.views} views</small>
                  <small className="text-light">
                    Watched at: {new Date(video.watched_at).toLocaleString()}
                  </small>
                </div>

                <hr className="hr" />

                <div className="d-flex justify-content-between align-items-center">
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
        ))
      ) : (
        <p className="text-center">No history found.</p>
      )}
    </div>
  );
};

export default History;

{
  /*
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

export const History = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/history/user/history`,
          {
            headers: {
              Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Ensure you send the auth token
            },
          }
        );

        const historyData = response.data;

        // Fetch video details for each video_id
        const videoRequests = historyData.map((item) =>
          axios.get(`http://localhost:5000/videos/videos/${item.video_id}`)
        );

        const videoResponses = await Promise.all(videoRequests);
        const videoDetails = videoResponses.map((res) => res.data);

        setHistory(videoDetails);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  return (
    <div className="row">
      {history.length > 0 ? (
        history.map((video) => (
          <div key={video.id} className="col-md-4 mb-3">
            <div
              className="card action-trigger-hover"
              style={{ width: '200px' }}
            >
              <div className="position-relative">
                <Image
                  src={video.thumbnail_url || '/images/videos/demo.png'}
                  className="card-img-top"
                  alt={video.title}
                  width={250}
                  height={200}
                />
                <span
                  className="position-absolute bottom-0 end-0 bg-dark text-white px-1 rounded"
                  style={{ fontSize: '0.75rem', margin: '4px', opacity: 0.8 }}
                >
                  {Math.floor(video.duration / 60)}:{video.duration % 60}
                </span>
              </div>

              <div className="card-body">
                <h6 className="mb-1">
                  <Link href={`/videos/${video.id}`} className="nav-link fs-6">
                    {video.title}
                  </Link>
                </h6>
                <h6 className="text-muted" style={{ fontSize: '0.8rem' }}>
                  {video.description}
                </h6>
                <div className="d-flex justify-content-between">
                  <small className="text-light">{video.views} views</small>
                  <small className="text-light">
                    Watched at: {new Date(video.watched_at).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No history found.</p>
      )}
    </div>
  );
};

export default History;


*/
}
