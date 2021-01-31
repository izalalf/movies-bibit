import axios from 'axios'
import React, { Component } from 'react'
import store from '../store/index'
import { Link } from 'react-router-dom'
import { API_URL, API_KEY } from '../service/constants'
import { Col, Card, CardGroup, Form, FormControl,  Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

export default class Movies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            search: '',
        }
    }

    componentDidMount() {
        axios
            .get(API_URL, {
                params: {
                    apikey: API_KEY,
                    s: 'Batman',
                    page: 2
                }
            })
            .then(res => {
                const movies = res.data.Search;
                this.setState({ movies });
            })
            .catch(error => {
                console.log("Error API List Movies", error);
            })
    }

    onchange = e => {
        this.setState({ search: e.target.value });
    };

    detailMovies = (id) => {
        axios.get(API_URL, {
            params: {
                apikey: API_KEY,
                i: id
            }
        })
            .then(function (res) {
                store.dispatch({
                    type: 'Detail Movie',
                    data: res
                });
            })
            .catch(function (error) {
                console.log("Error API Detail Movies", error);
            })
    }

    render() {
        const { movies } = this.state
        const { search } = this.state
        const filteredMovies = movies.filter(movie => {
            return movie.Title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
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
                            <Form inline>
                                <FormControl type="text" placeholder="Search Movie" className="mr-sm-2" onChange={this.onchange} />
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <CardGroup>
                    {movies && filteredMovies.map((movie) => (
                        <Col md={3} xs={6} className="mb-4 mt-4">
                            <Card>
                                <Link to='/movies-detail'><Card.Img variant="top" src={movie.Poster} style={{ height: '500px' }} onClick={() => this.detailMovies(movie.imdbID)} /></Link>
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Card.Text>
                                        {movie.Year}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </CardGroup>
            </React.Fragment>
        )
    }
}
