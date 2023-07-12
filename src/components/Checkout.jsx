import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { Dialog, DialogTitle, DialogContent, DialogActions, } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { resetCart } from '../redux/cartRedux';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const CheckoutFrom = () => {
  const [showModal, setShowModal] = useState(false);
  const [opinion, setOpinion] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleOptionChange = (e) => {
    setOpinion(e.target.value);
  };
  const handleAdrressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
  const Info = styled.div`
flex: 3;
`;
  const Product = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

  const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
  const handleSubmit = async () => {
    try {
      if (!address || !phone) {
        alert('Xin hãy Điền thông tin nhận hàng của bạn');
        console.log(cart.products)
      } else {
        const res = await userRequest.post("/checkout/payment", {
          userId: currentUser._id,
          email: currentUser.email,
          cart: cart,
          amount: cart.total,
          products: cart.products,
          contact: phone,
          address: address,
          status: opinion,
        });
        history.push("/success", {
          responseData: res.data,
          products: cart,
        });
        dispatch(resetCart())
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleToggleModal}>
        Thanh toán
      </Button>
      <Dialog open={showModal} onClose={handleToggleModal}>
        
        <DialogTitle>Chọn phương thức thanh toán của bạn:</DialogTitle>
        <DialogContent>

        <Info>
          <h5>Ththông tin sản phẩm</h5>
          {cart.products.map((product) => (
            <Product key={uuidv4()}>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Sản phẩm:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>Mã sản phẩm:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
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
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked value="pending"
              checked={opinion === 'pending'}
              onChange={handleOptionChange} />} label="Thanh toán khi nhận hàng" />
            <FormControlLabel control={<Checkbox value="success"
              checked={opinion === 'success'}
              onChange={handleOptionChange} />} label="Thanh toán qua momo 0837106263" />
            {/* <FormControlLabel disabled control={<Checkbox value="disagree"
              checked={opinion === 'disagree'}
              onChange={handleOptionChange} />} label="thanh toán bằng vnpay(phương thức không hỗ trỡ)" /> */}
          </FormGroup>
          <TextField
            required
            fullWidth
            id="required"
            label="Điền địa chỉ nhận hàng của bạn (bắt buộc)"
            onChange={handleAdrressChange} />
          <TextField
            required
            fullWidth
            id="required"
            label="Điền số điện thoại của bạn(bắt buộc)"
            onChange={handlePhoneChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Thanh toán
          </Button>
          <Button onClick={handleToggleModal} color="primary">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckoutFrom;
