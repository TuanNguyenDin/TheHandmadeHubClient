import React, { useState } from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
import { v4 as uuidv4 } from "uuid";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';


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
const MyOrder=()=>{
    const [orders, setOrders] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const getOrders = async () => {
        setLoading(true);
        try {
            const response = await userRequest.get(`/orders/find/${currentUser._id}`);
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }
    const handleVieworder = () => {
        getOrders();
        console.log(orders);
        orders.map((order) =>{console.log(order.products);});
        setShowModal(!showModal);
    }
    const handleVieworderClose = () => {
        setShowModal(!showModal);
    }
    return(
        <div>
        <Button onClick={ handleVieworder} >View Orders</Button>
        <Dialog open={showModal} onClose={handleVieworder}>
        <DialogTitle>Đơn hàng của bạn:</DialogTitle>
        <DialogContent>
          {orders.map((order) => (
              <Product key={uuidv4()}>
                {/* <ProductDetail>
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
                </ProductDetail> */}
                <PriceDetail>
                  <ProductPrice>
                    {order.amount}VND
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVieworderClose} color="primary">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}

export default MyOrder;