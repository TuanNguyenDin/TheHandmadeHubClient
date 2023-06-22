import styled from "styled-components";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import MyOrder from "../components/OrderProducts"

import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { userRequest } from "../requestMethods";
import CheckoutFrom from "../components/Checkout";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const quantity = useSelector((state) => state.cart.quantity);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Giỏ Hàng Của Bạn</Title>
        <Top>
          <Link to="/">
            <TopButton>Tiếp Tục Mua Sắm</TopButton>
          </Link>
          <TopTexts>
            <TopText>Giỏ Hàng({quantity})</TopText>
          </TopTexts>
          <CheckoutFrom />
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={uuidv4()}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>
                    {product.price * product.quantity}VND
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Phụ Thu</SummaryItemText>
              <SummaryItemPrice>{cart.total} VND</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Phí Vận Chuyển Dự Tính</SummaryItemText>
              <SummaryItemPrice>10000 VND</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Phí Được giảm</SummaryItemText>
              <SummaryItemPrice>0 VND</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng Cộng</SummaryItemText>
              <SummaryItemPrice>{cart.total} VND</SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
              name="HandmadeHub"
              image="https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/352375044_531622122360349_785327999950609849_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=msNVL2BDPlUAX91xgQq&_nc_ht=scontent.fsgn8-2.fna&oh=00_AfCZbtxK-UKWFK9IV9tx2U7zTUsPa8HmWngV9ZeL7IuTnw&oe=64863A53"
              billingAddress
              shippingAddress
              description={`Your total is ${cart.total} VND`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>Thanh Toán</Button>
            </StripeCheckout> */}
            <CheckoutFrom />
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
