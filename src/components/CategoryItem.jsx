import styled from "styled-components";
import { Link } from "react-router-dom";

import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;
const Info = styled.div`
  position: absolute;
  width: 44vw;
  top: 45vh;
  background-color: rgb(192,192,192, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;
const Title = styled.h1`
  color: #000000;
  margin: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #000000;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Xem ngay</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
