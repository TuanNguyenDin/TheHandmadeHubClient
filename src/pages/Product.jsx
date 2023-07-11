import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 1%;
  box-shadow: 5px 10px #888888;
  margin: 50px;
  display: flex;
  ${mobile({ margin: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  box-shadow: 5px 3px #888888;
  border-radius: 1%;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InforContainer = styled.div`
  flex: 1;
  padding: 10px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  margin: 10px;
  font-weight: 700;
`;

const Desc = styled.p`
  font-size: 20px;
  margin: 10px;
  text-align: justify;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 28px;
`;


const AddContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;

const Amount = styled.span`
  width: 10vw;
  height: 65px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: teal;
    color: white;
  }
`;
const Titleproducts = styled.h2`
  font-size: 20px;
  margin-top: 60px;
  font-weight: 600;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch { }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InforContainer>
          <Title>{product.title}</Title>
          <Titleproducts>Mô tả sản phẩm</Titleproducts>
          <Desc>{product.desc}</Desc>
          <Price>Giá Tiền: {product.price} VND</Price>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InforContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
