// History card component
import Image from 'next/image';
import Link from 'next/link';

export const History = () => {
  return (
    <div>
      <div className="card action-trigger-hover " style={{ width: '200px' }}>
        <Image
          src=""
          className="card-img-top"
          alt="course image"
          width={250}
          height={50}
        />
        <div className="ribbon mt-3">
          <span>Free</span>
        </div>
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between mb-3">
            <span className="hstack gap-2">
              <a href="#" className="badge text-bg-dark">
                Duration
              </a>
            </span>
            <Link href="#">
              <i className="far fa-bookmark text-light"></i>
            </Link>
          </div>
          <h5 className="">
            <a
              href="#"
              className="nav-link fs-6"
              style={{ fontSize: '0.8rem' }}
            >
              Video Title
            </a>
          </h5>
          <h6 className="" style={{ fontSize: '0.8rem' }}>
            <a href="#" className="nav-link ">
              {' '}
              Name
            </a>
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

export default History;
