import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import RegisterForm from './pages/Register';
import LoginForm from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} /> 
      </Routes>
    </Router>
  );
}


export default App;
