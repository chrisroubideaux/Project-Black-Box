// Menu page
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
//import Sidebar from '@/components/profile/Sidebar';
import Tab from '@/components/profile/Tab';
import Cards from '@/components/video/Cards';

export const Page = () => {
  const [videos, setVideos] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="layout h-100">
        <Tab />
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <div className="sticky-top pt-5">
                {/* Sidebar 
                <Sidebar />
                */}
              </div>
            </div>

            <div className="container">
              {videos.slice(0, 4).map((videos, index) => (
                <div
                  key={videos.id || `video-${index}`}
                  className=" col-lg-8 col-xxl-9"
                >
                  <Cards videos={videos} />
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
