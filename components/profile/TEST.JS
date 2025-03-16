<ul className="nav flex-column w-100">
  <a
    href={isLoggedIn ? '/profile' : '#'}
    className="nav-link sidebar-item"
    onClick={(e) => {
      if (!isLoggedIn) {
        e.preventDefault(); // Prevent navigation
        alert('Please log in to access your profile.');
      }
    }}
  >
    <FaUser className="icon" />
    <span>Profile</span>
  </a>
  <Link href="/" className="nav-link sidebar-item">
    <FaHome className="icon" />
    <span>Home</span>
  </Link>
  <Link href="#" className="nav-link sidebar-item">
    <FaPlayCircle className="icon" />
    <span>Shorts</span>
  </Link>
  <Link href="#" className="nav-link sidebar-item">
    <FaTv className="icon" />
    <span>Subs</span>
  </Link>
</ul>;
