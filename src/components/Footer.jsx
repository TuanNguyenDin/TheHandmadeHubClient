import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { IconButton } from '@material-ui/core';

import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
  text-align: justify;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

// const Payment = styled.img`
//   width: 50%;
// `;
const FacebookIcon = () => {
  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100093563133325'); // Chuyển hướng đến trang Facebook
  };

  return (
    <SocialIcon color="3B5999" onClick={handleFacebookClick}>
      <Facebook />
    </SocialIcon>
  );
};

const InstagramIcon = () => {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hubthehandmade/'); // Chuyển hướng đến trang Instagram
  };

  return (
    <SocialIcon color="E4405F" onClick={handleInstagramClick}>
      <Instagram />
    </SocialIcon>
  );
}

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>HandmadeHub</Logo>
        <Desc>
          Chúng tôi cung cấp dịch vụ mua bán và cung cấp các món hàng thủ công và các dịch vụ liên quan đế với chi phí và mức giá tốt nhất cho bạn
        </Desc>
        <SocialContainer>
            <FacebookIcon />
            <InstagramIcon />
        </SocialContainer>
      </Left>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức Thành phố Hồ Chí Minh 700000
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> 070 751 0458
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> thehandmadehub6@gmail.com
        </ContactItem>
        {/* <Payment src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-5b054.appspot.com/o/payment.png?alt=media&token=7b500715-5556-42bd-b9e9-92cdad652f64" /> */}
      </Right>
    </Container>
  );
};

export default Footer;
