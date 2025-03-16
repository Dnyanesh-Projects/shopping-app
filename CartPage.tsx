import CartItem from "@/components/CartItem";
import { Container } from "react-bootstrap";

const CartPage = ({ cart, updateCart }: any) => {
  const totalPrice = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  return (
    <Container className="py-4">
      <h1>Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty</p> : cart.map((item: any) => <CartItem key={item.id} item={item} updateCart={updateCart} />)}
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
    </Container>
  );
};

export default CartPage;
