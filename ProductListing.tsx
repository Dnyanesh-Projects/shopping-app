import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductListingProps {
  addToCart: (product: Product) => void;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const ProductListing: React.FC<ProductListingProps> = ({ addToCart }) => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        Error fetching products
      </Alert>
    );
  }

  return (
    <Container className="py-4">
      <Row className="g-4">
        {products?.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductListing;
