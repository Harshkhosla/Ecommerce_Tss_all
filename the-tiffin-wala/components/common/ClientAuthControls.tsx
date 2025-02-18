"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Login from "../auth/Login";
// import Login from "../auth/Login";

const ClientAuthControls = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [show, setShow] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        setIsLoggedIn(!!authToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("jwt");
        localStorage.removeItem("MID");
        setIsLoggedIn(false);
        toast.success("Sign Out Successful");
        router.push("/");
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
                    <Login  />
                </Nav.Link>
            )}
        </>
    );
};

export default ClientAuthControls;
