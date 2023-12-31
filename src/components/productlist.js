import React, { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => (
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);

  const logout = async () => {
    await signOut(auth);
    nav('/login');
  }

  return (
    <Container className="p-2 bg-light border">
      <Navbar bg="light" expand="lg" className="mb-2">
        <Navbar.Brand className="text-black">Product Categories</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedCategory}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedCategory("All")}>
                  All
                </Dropdown.Item>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
          <h2>{user?.email}</h2>
          <Navbar.Text className="m-2">Click on Product to see details</Navbar.Text>
          <Button type="button" className="btn btn-danger" onClick={logout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
      <br/>
      <Row>
        {filteredProducts.map((product) => {
          const { id, title, image, price, category } = product;
          return (
            <Col lg={3} md={4} sm={6} key={id} className="mb-4">
              <NavLink to={`/product/${id}`} className="text-decoration-none">
                <Card style={{ width: "100%", height: "400px" }}>
                  <Card.Img
                    variant="top"
                    src={image}
                    alt={title}
                    style={{ height: "50%", objectFit: "contain", margin: "5px" }}
                    className="image-fluid"
                  />
                  <Card.Body className="text-center text-decoration-none text-sm">
                    <Card.Title className="text-muted">{title}</Card.Title>
                    <Card.Text>Category: {category}</Card.Text>
                    <Card.Text>Price: $ {price}</Card.Text>
                  </Card.Body>
                </Card>
              </NavLink>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProductComponent;
