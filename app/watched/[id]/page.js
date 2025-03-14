// Watched page
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
import Tab from '@/components/video/history/Tab';
import Sidebar from '@/components/profile/Sidebar';
export default function Page() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

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
          <Tab />
        </div>
        <div className="container-fluid py-3 pt-3">
          <div className="row">
            <div className="col-lg-3 col-xxl-3">
              <div className="sticky-top pt-5">
                <Sidebar users={user} />
              </div>
            </div>
            <div className="col-lg-8 col-xxl-8">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-light">History</h4>
                <button className="btn btn-outline-light btn-sm">
                  View All
                </button>
              </div>
              <div className="row row-cols-1 row-cols-sm-1 row-cols-lg-4 row-cols-xxl-3 py-5">
                <h1>Testing</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
