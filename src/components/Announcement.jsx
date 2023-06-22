import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Siêu lời, giảm ngay 50000VND cho đơn hàng đầu tiên của bạn</Container>;
};

export default Announcement;
