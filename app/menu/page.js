// Menu page
import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/profile/Sidebar';
import Tab from '@/components/profile/Tab';
import Card from '@/components/video/Card';

export const Page = () => {
  return (
    <>
      <Navbar />
      <div className="layout h-100">
        <Tab />
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <div className="sticky-top pt-5">
                <Sidebar />
              </div>
            </div>

            <div className="col-lg-8 col-xxl-9">
              <div className="row row-cols-3 g-3 py-5">
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

{
  /*
import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/profile/Sidebar';
import Tab from '@/components/profile/Tab';
import Card from '@/components/video/Card';

export const page = () => {
  return (
    <>
      <Navbar />
      <div className="layout h-100">
        <Tab />
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <div className="sticky-top pt-5">
                <Sidebar />
              </div>
            </div>

            <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-md-4 g-1 py-5">
              <div className="pt-5">
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
*/
}
