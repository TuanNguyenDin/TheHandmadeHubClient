import styled from "styled-components";

import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  margin-left: 5vw;
  margin-right: 5vw;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;
const Category = styled.div`
display: flex;
flex-direction: column;
background-color: rgb(192,192,192, 0.1);
`;

const Categories = () => {
  return (
    <Category>
      <div>
        <h1>Categories</h1>
      </div>
      <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
    </Category>
  );
};

export default Categories;
