// Video by id
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
import VideoPlayer from '@/components/video/VideoPlayer';
import Shorts from '@/components/video/Shorts';

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
      <div className="layout m-1">
        <div className=" container-fluid">
          <div className="row pt-5">
            <div className="col-md-8 pt-5">
              <VideoPlayer video={video} />
            </div>

            <div className="col-md-4">
              <div className="row row-cols-3 g-2 pt-5">
                <div className="col pt-5">
                  <Shorts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
