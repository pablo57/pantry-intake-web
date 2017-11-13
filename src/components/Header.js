import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


export class Header extends React.Component {
    render = () => {
        return (
            <header>
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <NavLink
                      to="/"
                      activeClassName="is-active"
                      exact={true}
                    >
                        Pantry Intake App
                    </NavLink>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  <NavItem
                    componentClass={Link}
                    href="/dashboard"
                    to="/dashboard"
                    active={location.pathname === '/dashboard'}>
                      Dashboard
                    </NavItem>
                  <NavItem
                    componentClass={Link}
                    href="/weigh-out"
                    to="/weigh-out"
                    active={location.pathname === '/weigh-out'}>
                      Weight Out
                    </NavItem>
                </Nav>
              </Navbar>
            </header>
        );
    }
}

export default Header;
