import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './pages/authentication/Register';
import LoginForm from './pages/authentication/Login';
import DashBoard from './pages/dashboard/DashBoard';
import { StateProvider } from './GlobalContext/globalContext';


function App() {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </StateProvider>
  );
}


export default App;
