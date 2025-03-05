// Tab compoent
//import Link from 'next/link';
//import { format } from 'date-fns';
//import { FaCalendarAlt } from 'react-icons/fa';

import { FaTrash } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

const Tab = ({}) => {
  //  const today = format(new Date(), 'MM/dd/yyyy');
  return (
    <>
      <div className="">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-light">Liked Videos</h4>
          <button
            type="button"
            className="badge btn btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Manage Liked
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 text-white"
                    id="exampleModalLabel"
                  >
                    Manage Liked Videos
                  </h1>
                  <button
                    type="button"
                    className="btn-close text-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <FaX />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex flex-column text-white">
                    <p>Are you sure you want to remove all liked videos?</p>
                    <div className="d-flex align-items-center">
                      <FaTrash className="me-2 social-icon" />{' '}
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label text-white"
                          htmlFor="flexCheckDefault"
                        >
                          Delete all liked video
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-transparent">
                  <button
                    type="button"
                    className=" badge btn btn-sm"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>

                  <button type="button" className="btn btn-sm badge">
                    Delete liked videos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
