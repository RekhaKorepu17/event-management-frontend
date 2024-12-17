import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterForm from "./pages/authentication/Register";
import LoginForm from "./pages/authentication/Login";
import DashBoard from "./pages/dashboard/DashBoard";
import { StateProvider } from "./GlobalContext/globalContext";
import Event from "./pages/event-creation/Event";
import EventDetails from "./pages/event-details/EventDetails";

function App() {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/event" element={<Event />} />
          <Route path="/EventDetails" element={<EventDetails />} />
        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;
