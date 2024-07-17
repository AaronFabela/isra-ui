import React, { useEffect } from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { isAuthenticated } from '../services/authService';

const MainLayout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
        navigate(ROUTES.LOGIN);
        }
    }, [navigate]);
  return (
    <div>
      {/* Header/Navbar */}
      <Navbar color="dark" dark expand="md">
        <Container>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to={ROUTES.ADMIN_DASHBOARD}>Admin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={ROUTES.ATLETA_DASHBOARD}>Atletas</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>

      {/* Main content area */}
      <Container className="mt-4">
        <Row>
          <Col>
            <Outlet /> {/* Renderiza el componente correspondiente a la ruta actual */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainLayout;
