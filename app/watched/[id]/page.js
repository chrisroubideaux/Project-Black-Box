// Watched page
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/Video/History/Tab';
import WatchedCard from '@/components/Video/History/WatchedCard';

export default function Page() {
  const { id } = useParams();
  // const [user, setUser] = useState([]);
  const [history, setHistory] = useState([]);

  // Fetch user data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user:', error));
  }, [id]);

  // Fetch watched history
  useEffect(() => {
    axios
      .get(`http://localhost:5000/history/user/history`, {
        params: { user_id: id },
      })
      .then((response) => setHistory(response.data))
      .catch((error) => console.error('Error fetching history:', error));
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="layout h-100">
        <div className="pt-5 mt-5">
          <h4>Watched</h4>
        </div>
        <div className="container-fluid py-3 pt-3">
          <div className="row">
            <div className="col-lg-3 col-xxl-3">
              <div className="sticky-top pt-5">Sidebar</div>
            </div>
            <div className="col-lg-8 col-xxl-8">
              <Tab />
              <div>
                {history.map((video) => (
                  <WatchedCard key={video.video_id} video={video} />
                ))}
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
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
import Tab from '@/components/video/history/Tab';
//import Sidebar from '@/components/profile/Sidebar';
import WatchedCard from '@/components/video/history/WatchedCard';
export default function Page() {
  const { id } = useParams();
  //const [user, setUser] = useState([]);

  // user
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="layout h-100">
        <div className="pt-5 mt-5">
          <h4>Watched</h4>
        </div>
        <div className="container-fluid py-3 pt-3">
          <div className="row">
            <div className="col-lg-3 col-xxl-3">
              <div className="sticky-top pt-5">Sidebar</div>
            </div>
            <div className="col-lg-8 col-xxl-8">
              <Tab />
              <div className="">
                <WatchedCard />
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
