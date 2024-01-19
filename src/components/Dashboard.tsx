import { Container } from "react-bootstrap";
import { useAppSelector } from "../store/store";

const Dashboard = () => {
  const currentUser = useAppSelector((state) => state.user);

  return (
    <Container className='appContainer'>
      <p>Welcome to your dashboard, {currentUser.first_name}!</p>
    </Container>
  );
};

export default Dashboard;
