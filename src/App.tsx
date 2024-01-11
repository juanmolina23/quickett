import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NavMenu from "./components/NavMenu";

function App() {
  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path='/' element={<h1 className='lead pt-60px'>Home</h1>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
