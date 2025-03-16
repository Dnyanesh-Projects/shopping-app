import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
  updateCart: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateCart }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.max(0, Number(e.target.value));
    updateCart(item.id, quantity);
  };

  return (
    <Row className="align-items-center mb-3">
      <Col xs={2}>
        <img src={item.image} alt={item.title} className="img-fluid" />
      </Col>
      <Col xs={4}>{item.title}</Col>
      <Col xs={2}>${item.price.toFixed(2)}</Col>
      <Col xs={2}>
        <Form.Control
          type="number"
          value={item.quantity}
          min="0"
          onChange={handleQuantityChange}
        />
      </Col>
      <Col xs={2}>
        <Button
          variant="danger"
          onClick={() => updateCart(item.id, 0)}
        >
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;
