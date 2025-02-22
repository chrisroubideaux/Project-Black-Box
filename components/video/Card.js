// Card component

export const Card = () => {
  return (
    <div>
      <div className="card p-2 shadow" style={{ width: '400px' }}>
        <div className="rounded-top overflow-hidden">
          <div className="card-overlay-hover">
            <img
              src="assets/images/course/4by3/23.jpg"
              className="card-img-top"
              alt="course image"
            />
          </div>

          <div className="card-img-overlay">
            <div className="card-element-hover d-flex justify-content-end">
              <a
                href="#"
                className="icon-md bg-white rounded-circle text-center"
              >
                <i className="fas fa-shopping-cart text-danger"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-between">
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item d-flex justify-content-center align-items-center">
                <div className="icon-md bg-orange bg-opacity-10 text-orange rounded-circle">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <span className="text-dark ms-2">9.1k</span>
              </li>

              <li className="list-inline-item d-flex justify-content-center align-items-center">
                <div className="icon-md bg-warning bg-opacity-15 text-warning rounded-circle">
                  <i className="fas fa-star"></i>
                </div>
                <span className="text-dark ms-2">4.5</span>
              </li>
            </ul>

            <div className="avatar avatar-sm">
              <img
                className="avatar-img rounded-circle"
                src="assets/images/avatar/09.jpg"
                alt="avatar"
              />
            </div>
          </div>

          <hr />

          <h5 className="card-title">
            <a href="#">This is a test</a>
          </h5>

          <div className="d-flex justify-content-between align-items-center mb-0">
            <div>
              <a
                href="#"
                className="badge bg-info bg-opacity-10 text-info me-2"
              >
                <i className="fas fa-circle small fw-bold"></i> Personal
                Development{' '}
              </a>
            </div>

            <h3 className="text-success mb-0">Testing</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
