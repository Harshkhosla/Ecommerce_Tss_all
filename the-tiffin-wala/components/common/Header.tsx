"use client";
import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { NavDropdown, Tabs, Tab } from 'react-bootstrap';
import { FaShoppingCart, FaStar, FaSearch, FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import axios from 'axios';
import { tssurl } from '@/app/port';
import Sidebar from './Sidebar';
import Login from '../auth/Login';
import { useRouter } from 'next/navigation';

interface NavLink{
  link:string;
  name:string;
}

interface Menu{
  MLink:string;
  Mname:string;
  nav_link?:NavLink[]
}

const Header = () => {
  const [head, setHead] = useState<Menu[]>([]);
  const [logo, setLogo] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const router =  useRouter()

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await axios.get(`${tssurl}/header`);
        const headerData = response.data.header;
        setLogo(headerData?.brand_logo?.url);
        setHead(JSON.parse(headerData?.header) || []);
        
      } catch (error) {
        console.error('Error fetching header:', error);
      }
    };

    fetchHeader();
    setIsLoggedIn(!!localStorage.getItem('authToken'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('MID');
    setIsLoggedIn(false);
    router.push("/")
  };

  const activeKey = () => {
    const mainMenu = head?.find((menu) => menu?.Mname === 'DAILY');
    return mainMenu ? mainMenu.MLink : '';
  };

  return (
    <>
      <div className="mob-head">
        <header>
          <Navbar expand="md" collapseOnSelect>
            <Container fluid>
              <Navbar.Brand href="/">
                <Image src={logo} alt="TSS" fluid />
              </Navbar.Brand>
              <Nav>
                <Nav.Link href="/products" className="px-3">
                  <FaSearch size={15} />
                </Nav.Link>
                {isLoggedIn ? (
                  <NavDropdown
                    title={<FaUser size={15} />}
                    id="basic-nav-dropdown"
                    className="px-3"
                  >
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link className="px-3 mob-head">
                    <Login />
                  </Nav.Link>
                )}
                <Nav.Link href="/wishlist" className="px-3">
                  <FaStar size={15} />
                </Nav.Link>
                <Nav.Link href="/cart/carts" className="px-3">
                  <FaShoppingCart size={15} />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Container className="navbar-tabs">
            {head.length > 0 && (
              <Tabs defaultActiveKey={activeKey()} id="controlled-tab" className="mt-1">
                {head.map((menu) => (
                  <Tab key={menu.MLink} eventKey={menu.MLink} title={menu.Mname}>
                    <Nav className="flex-row">
                      {menu?.nav_link?.map((item, index) => (
                        <Nav.Link
                          key={`${item?.link}-${index}`}
                          href={`/products/${item.link}`}
                          style={{ fontSize: '1.1rem' }}
                        >
                          {item.name}
                        </Nav.Link>
                      ))}
                    </Nav>
                  </Tab>
                ))}
              </Tabs>
            )}
          </Container>
        </header>
      </div>

      <div className="web-head">
        <header>
          <Navbar expand="md">
            <Container fluid>
              <div className="burger-mob">
                <GiHamburgerMenu onClick={() => setShowNav(!showNav)} size={30} />
              </div>
              <Sidebar showNav={showNav} setShowNav={setShowNav} head={head} activeKey={activeKey()} />
              <Navbar.Brand href="/">
                <Image src={logo} alt="TSS" fluid />
              </Navbar.Brand>
              <Nav>
                <Nav.Link href="/cart/carts" className="px-3 cart-mob">
                  <FaShoppingCart size={15} />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
      </div>
    </>
  );
};

export default Header;
