import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

export default function Authenticated({ children }: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div>
            <Navbar collapseOnSelect fixed="top" bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav className="me-auto">
                            <NavDropdown title={user.name} align="end" id="user-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                {children}
            </Container>
        </div>
    );
}
