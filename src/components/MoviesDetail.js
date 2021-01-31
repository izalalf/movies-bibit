import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, Form, FormControl, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

const MoviesDetail = () => {
    const state = useSelector((state) => state.counter);
    return (
        <React.Fragment>
            <Navbar variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home"><strong>Movies Bibit</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Tv Series</Nav.Link>
                            <Nav.Link href="#link">Bioskop21</Nav.Link>
                            <NavDropdown title="Genre" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Scify</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Romantic</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Comedy</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Card className="text-center">
                <Card.Header>Detail Movies</Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={state.data.Poster} style={{ height: '500px', width: '500px', marginBottom: '20px' }} />
                    <Card.Title>{state.data.Title}</Card.Title>
                    <Card.Text>
                        {state.data.Writer}
                    </Card.Text>
                    <Card.Text>
                        {state.data.Plot}
                    </Card.Text>
                    <Link to='/movies'> <Button variant="success">Back To List</Button></Link>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </React.Fragment>
    )
}

export default MoviesDetail
