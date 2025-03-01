// Video by id
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
import VideoPlayer from '@/components/video/VideoPlayer';

export default function Page() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/videos/videos/${id}`)
        .then((response) => {
          setVideo(response.data);
        })
        .catch((error) => {
          console.error('Error fetching video:', error);
        });
    }
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="layout h-100">
        <div className="pt-5 mt-5">
          <div className="d-flex justify-content-center align-items-center">
            <div className="row">
              <div className="col-md-8">
                <VideoPlayer video={video} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
