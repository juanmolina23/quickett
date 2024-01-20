import { Col, Container, Row } from "react-bootstrap";
import { useAppSelector } from "../store/store";
import NavMenu from "./NavMenu";
import Module from "./Module";

const Dashboard = () => {
  const currentUser = useAppSelector((state) => state.user);

  return (
    <>
      <NavMenu />
      <Container fluid className='appContainer bg-off-white h-100vh-54'>
        <p>Welcome to your dashboard, {currentUser.first_name}!</p>
        <Row className='d-flex justify-content-center'>
          <Col lg={10}>
            <Module />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
