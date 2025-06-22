// Video by id
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
import VideoPlayer from '@/components/Video/Feed/VideoPlayer';
import Shorts from '@/components/Video/Shorts/Shorts';
import Watched from '@/components/Video/History/Watched';
import Sidebar from '@/components/Profile/Sidebar';

export default function Page() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);

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
  useEffect(() => {
    axios
      .get('http://localhost:5000/user/users', { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row pt-5">
          {/* Sidebar - Always visible */}
          <div className="col-lg-3 col-xxl-3 d-none d-lg-block">
            <div className="sticky-top pt-5">
              <Sidebar users={user} />
            </div>
          </div>

          {/* Main Content - Video and Description */}
          <div className="col-lg-9 col-xxl-9">
            <div className="d-flex flex-column gap-3">
              <div className="row">
                <div className="col-md-8 pt-5">
                  <VideoPlayer video={video} />
                </div>

                <div className="col-md-2">
                  <div className="row row-cols-3 g-2 pt-5">
                    <div className=" pt-5">
                      <Shorts />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description and Watched Components */}
              <div className="row pt-5">
                <div className="col-md-8 pt-5">Description</div>

                <div className="col-md-4">
                  <div className="row row-cols-3 g-2 pt-5">
                    <div className="col pt-5">
                      <Watched />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
