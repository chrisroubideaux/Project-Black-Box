// Video by id
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar/Navbar';
import VideoPlayer from '@/components/Video/Feed/VideoPlayer';
import Shorts from '@/components/Video/Shorts/Shorts';
//import Watched from '@/components/video/history/Watched';
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
        <div className="pt-5 mt-5">
          <div className="row">
            <div className="col">
              <Sidebar users={user} />
            </div>
            <div className="col-8">
              <VideoPlayer video={video} />
            </div>
            <div className="col">
              <div className="sticky-top pt-5">
                <Shorts />
              </div>
            </div>
          </div>
          <div className=" container-fluid">
            <div className="row pt-5">
              <div className="col-md-8 pt-5">Description</div>

              <div className="col-md-4">
                <div className="row row-cols-3 g-2 pt-5">
                  <div className="col pt-5">{/* <Watched /> */}</div>
                </div>
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
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
import VideoPlayer from '@/components/video/feed/VideoPlayer';
import Shorts from '@/components/video/shorts/Shorts';
import Watched from '@/components/video/history/Watched';

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

      <div className="layout m-1 h-100">
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
    
        <div className=" container-fluid">
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
    </>
  );
}
*/
}
