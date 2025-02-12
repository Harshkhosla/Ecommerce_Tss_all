"use client";

import { useState, useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import Login from "../auth/Login";

const ClientAuthControls = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [show, setShow] = useState(false);
    // const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        setIsLoggedIn(!!authToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("jwt");
        localStorage.removeItem("MID");
        setIsLoggedIn(false);
        // toast.success("Sign Out Successful");
        // router.push("/");
    };

    return (
        <>
            {isLoggedIn ? (
                <NavDropdown title={<FaUser size={15} />} id="basic-nav-dropdown" className="px-3">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
                </NavDropdown>
            ) : (
                <Nav.Link className="px-3 mob-head">
                    <div>kvhjbs</div>
                    {/* <Login data={show} handleShow={() => setShow(true)} /> */}
                </Nav.Link>
            )}
        </>
    );
};

export default ClientAuthControls;
