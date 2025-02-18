"use client";
import Link from 'next/link';
 import { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar: React.FC = () => {
  const navigate = useNavigate;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const isUserLoggedIn = (): boolean => {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null && authToken !== '';
  };

  const handleLogout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('MID');
    setIsLoggedIn(false);
    toast.success('Logout successfully');
    // navigate('/');
  };

  return (
    <Container fluid>
      <ListGroup className="sidebar">
        <Link href="/profile" className="sidebar-link text-decoration-none">
          <ListGroup.Item className="sidebar-item">
            Profile
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link href="/changePassword" className="sidebar-link text-decoration-none">
          <ListGroup.Item className="sidebar-item">
            Change Password
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link href="/Order-History" className="sidebar-link text-decoration-none">
          <ListGroup.Item className="sidebar-item">
            Orders
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link href="/paymentOptions" className="sidebar-link text-decoration-none">
          <ListGroup.Item className="sidebar-item">
            Payment Options
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link href="/RewardPoints" className="sidebar-link text-decoration-none">
          <ListGroup.Item className="sidebar-item">
            Reward Points
            <BsChevronRight />
          </ListGroup.Item>
        </Link>
        <Link href="/ContactUs" className="sidebar-link text-decoration-none">
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
