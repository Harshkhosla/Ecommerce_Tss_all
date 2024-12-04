import { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const isUserLoggedIn = () => {
    const authToken = localStorage.getItem('authToken');
    return authToken && authToken !== '';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('MID');
    setIsLoggedIn(false);
    toast.success('Logout successfully');
    navigate('/');
  };

  return (
    <Container fluid>
      <ListGroup className="sidebar">
        <Link to="/profile" className="sidebar-link text-decoration-none">
          <ListGroup.Item className="sidebar-item">
            Profile
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link
          to="/changepassword"
          className="sidebar-link text-decoration-none"
        >
          <ListGroup.Item className="sidebar-item">
            Change Password
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link
          to="/Order-History"
          className="sidebar-link text-decoration-none"
        >
          <ListGroup.Item className="sidebar-item">
            Orders
            <BsChevronRight />
          </ListGroup.Item>
        </Link>

        <Link
          to="/PaymentOptions"
          className="sidebar-link text-decoration-none"
        >
          <ListGroup.Item className="sidebar-item">
            Payment Options
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link
          to="/RewardPoints"
          className="sidebar-link text-decoration-none"
        >
          <ListGroup.Item className="sidebar-item">
            Reward Points
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link
          to="/ContactUs"
          className="sidebar-link text-decoration-none">
          <ListGroup.Item className="sidebar-item">
            Contact Us
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        {isLoggedIn ? (
          <ListGroup.Item className="sidebar-item" onClick={handleLogout}>
            Log Out
            <BsChevronRight />
          </ListGroup.Item>
        ) : (
          <ListGroup.Item className="sidebar-item">
            Log In
            <BsChevronRight />
          </ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default Sidebar;
