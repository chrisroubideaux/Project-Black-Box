// Watched page
import Navbar from '@/components/navbar/Navbar';
import WatchedCard from '@/components/video/history/WatchedCard';
import Tab from '@/components/video/history/Tab';

export default function Page() {
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
