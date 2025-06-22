// Menu page
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Nav/Navbar';
import Sidebar from '@/components/Profile/Sidebar';
import Tab from '@/components/Profile/Tab';
//import Cards from '@/components/Video/Feed/Cards';

export default function Page() {
  // const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  {
    /*
  useEffect(() => {
    axios
      .get('http://localhost:5000/videos/videos')
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching videos', error);
      });
  }, []);
*/
  }

  // Fetch user data (if logged in)
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

  return (
    <>
      <Navbar />
      <div className="layout h-100">
        <Tab />
        <div className="container-fluid py-3">
          <div className="row">
            {/* Sidebar - Fixed Width */}
            <div className="col-lg-3 col-xxl-3">
              <div className="sticky-top pt-5">
                <Sidebar users={user} />
              </div>
            </div>

            {/* Video Feed - Takes Remaining Space */}
            <div className="col-lg-9 col-xxl-9">
              <div className="d-flex flex-wrap gap-3">
                {/*
                {videos.slice(0, 9).map((video, index) => (
                  <div
                    key={video.id || `video-${index}`}
                    className="video-card pt-4"
                  >
                    <Cards videos={video} userId={user?.id} />
                  </div>
                ))}
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /*
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/profile/Sidebar';
import Tab from '@/components/profile/Tab';
import Cards from '@/components/video/feed/Cards';

export const Page = () => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(' http://localhost:5000/videos/videos')
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching videos', error);
      });
  }, []);

  // Fetch user data (if logged in)
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

  return (
    <>
      <Navbar />
      <div className="layout h-100">
        <Tab />
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <div className="sticky-top pt-5">
                <Sidebar users={user} />
              </div>
            </div>
            <div className="container">
              {videos.slice(0, 4).map((videos, index) => (
                <div
                  key={videos.id || `video-${index}`}
                  className=" col-lg-8 col-xxl-9"
                >
                  <Cards videos={videos} user={user} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
*/
}
