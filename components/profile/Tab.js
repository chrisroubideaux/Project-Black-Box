// Tab compoent
import Link from 'next/link';
//import { format } from 'date-fns';
//import { FaCalendarAlt } from 'react-icons/fa';

const Tab = ({}) => {
  //  const today = format(new Date(), 'MM/dd/yyyy');
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h4 className="fw-normal">Profile</h4>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/menu/menu">Feed</Link>
                </li>
                <li
                  className="breadcrumb-item active text-light"
                  aria-current="page"
                >
                  Feed
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <ul className="nav">
          {/*
          <li className="nav-item me-2">
            <form className="d-flex" style={{ width: '10rem' }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="dash-daterange"
                  value={today}
                  readOnly
                />
                <button className="btn btn-sm badge ">
                  <FaCalendarAlt className="social-icon fs-6 " />
                </button>
              </div>
            </form>
          </li>
          */}
          {/*
          <li className="nav-item me-2">
            <a className="btn btn-sm m-1 badge" href="#">
              Notifications
              <FaBell className="m-1" />
              <span className="badge bg-soft-dark text-grey rounded-pill nav-link-badge">
                1
              </span>
            </a>
          </li>
          <li className="nav-item ">
            <a className="btn btn-sm m-1 badge" href="#">
              Calendar
              <FaCalendarAlt className="m-1" />
            </a>
          </li>
          */}
        </ul>
      </div>
    </>
  );
};

export default Tab;
