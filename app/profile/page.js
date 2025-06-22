// Profile page
'use client';
import Navbar from '@/components/Nav/Navbar';
import Tab from '@/components/Profile/Tab';
import Sidebar from '@/components/Profile/Sidebar';

export default function Profile() {
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
                <Sidebar />
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
                {/* History component can be added here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
