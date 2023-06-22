import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { registered } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-5b054.appspot.com/o/register.jpeg?alt=media&token=0c8e213f-b4ae-49df-ac36-2587298edeea")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const[email, setEmail]=useState("");
  const[confirm, setConfirm] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (e) => {
    if (confirm===password){
    e.preventDefault();
    registered(dispatch, { username, password,name,lastName,email });
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Tạo Tài Khoảng Mới</Title>
        <Form>
          <Input placeholder="name"
          onChange={(e)=>setName(e.target.value)} />
          <Input placeholder="last name" 
          onChange={(e)=>setLastName(e.target.value)}/>
          <Input placeholder="username" 
          onChange={(e)=>setUsername(e.target.value)}/>
          <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
          <Input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
          <Input placeholder="confirm password" onChange={(e)=>setConfirm(e.target.value)}/>
          <Agreement>
          Bằng cách tạo một tài khoản, tôi đồng ý với việc xử lý dữ liệu cá nhân của mình theo <b>CHÍNH SÁCH QUYỀN RIÊNG TƯ</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
