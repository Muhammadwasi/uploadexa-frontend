import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {BiLinkAlt} from 'react-icons/bi';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import {IconContext} from "react-icons";

const NavBarComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar  className={"nav-bar"} expand="md">
                <NavbarBrand href="/" className={"nav-bar-brand"}>
                    <IconContext.Provider value={{ className:"logo-icon"}}>
                    <BiLinkAlt size={"2.5rem"}/>
                    UploadExa
                    </IconContext.Provider>
                </NavbarBrand>
                <NavbarToggler  onClick={toggle}/>
                <Collapse className={"nav-bar-toggler"} isOpen={isOpen} navbar>
                    <Nav className="ml-auto nav-item-container" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/" className={"nav-item"}>Get Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/about"  className={"nav-item"}>About</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBarComponent;