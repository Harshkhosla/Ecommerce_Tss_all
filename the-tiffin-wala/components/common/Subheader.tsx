"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { NavDropdown, Tabs, Tab } from 'react-bootstrap';
import { FaShoppingCart, FaStar, FaSearch, FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Sidebar from './Sidebar';
import Login from '../auth/Login';



interface NavLink {
  link: string;
  name: string;
}

interface Menu {
  MLink: string;
  Mname: string;
  nav_link?: NavLink[]
}
interface Header {
  brand_logo: { url: string },
  header: string
}
interface Headers {
  header: Header
}

const Subheader: React.FC<Headers> = ({ header }) => {
  const [head] = useState<Menu[]>(JSON.parse(header.header));
  const [logo] = useState<string>(header.brand_logo.url);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const router = useRouter()


  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('authToken'));
  }, [header])


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('MID');
    setIsLoggedIn(false);
    router.refresh();
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
                <Nav.Link href="/cart" className="px-3">
                  <FaShoppingCart size={15} />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Container className="navbar-tabs">
            {head.length > 0 && (
              <Tabs defaultActiveKey={activeKey()} id="controlled-tab" className="mt-1">
                {head.map((menu,index) => (
                  <Tab key={menu.MLink || `menu-${index}`} eventKey={menu.MLink} title={menu.Mname}>
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
                <Nav.Link href="/cart" className="px-3 cart-mob">
                  <FaShoppingCart size={15} />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
      </div>
    </>
  )
}


export default Subheader;