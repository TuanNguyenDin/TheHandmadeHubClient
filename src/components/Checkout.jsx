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

const CheckoutFrom = () => {
  const [showModal, setShowModal] = useState(false);
  const [opinion, setOpinion] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
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
  const handleSubmit = async () => {
    try {
      if (!address || !phone) {
        alert('Xin hãy Điền thông tin nhận hàng của bạn');
      } else {
        const res = await userRequest.post("/checkout/payment", {
          userId: currentUser._id,
          email: currentUser.email,
          amount: cart.total * 100,
          products: cart.products,
          contact: phone,
          address: address,
          status: "success",
        });
        history.push("/success", {
          responseData: res.data,
          products: cart,
        });
        console.log('Opinion:', opinion);
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
        Checkout
      </Button>
      <Dialog open={showModal} onClose={handleToggleModal}>
        <DialogTitle>Chọn phương thức thanh toán của bạn:</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked value="agree"
              checked={opinion === 'agree'}
              onChange={handleOptionChange} />} label="Thanh toán khi nhận hàng" />
            <FormControlLabel disabled control={<Checkbox value="disagree"
              checked={opinion === 'disagree'}
              onChange={handleOptionChange} />} label="thanh toán bằng momo(phương thức không hỗ trỡ)" />
            <FormControlLabel disabled control={<Checkbox value="disagree"
              checked={opinion === 'disagree'}
              onChange={handleOptionChange} />} label="thanh toán bằng vnpay(phương thức không hỗ trỡ)" />
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
