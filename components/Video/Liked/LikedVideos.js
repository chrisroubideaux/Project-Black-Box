// Liked videos

import Image from 'next/image';
import Link from 'next/link';
//import Link from 'next/link';

export const LikedVideos = () => {
  return (
    <div>
      <div className="card action-trigger-hover " style={{ width: '200px' }}>
        <div className=" position-relative">
          <Image
            src="/images/videos/demo.png"
            className="card-img-top"
            alt="course image"
            width={250}
            height={200}
          />
          <span
            className="position-absolute bottom-0 end-0 bg-dark text-white px-1 rounded"
            style={{
              fontSize: '0.75rem',
              margin: '4px',
              opacity: 0.8,
            }}
          >
            12:34
          </span>
        </div>
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between mb-3"></div>
          <h5 className="">
            <Link
              href="#"
              className="nav-link fs-6"
              style={{ fontSize: '0.8rem' }}
            >
              Video Title
            </Link>
          </h5>
          <h6 className="" style={{ fontSize: '0.8rem' }}>
            <Link href="#" className="nav-link ">
              {' '}
              Name
            </Link>
          </h6>
          <div className="d-flex justify-content-between mb-2">
            <div className="hstack gap-2">
              <h6 className="text-light m-0" style={{ fontSize: '0.8rem' }}>
                100k views
              </h6>
            </div>
            <div className="hstack gap-2">
              <h6 className="text-light m-0" style={{ fontSize: '0.8rem' }}>
                3 Months ago
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedVideos;
