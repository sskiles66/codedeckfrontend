import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './SharedComponents/Navbar';
import LandingPage from './Pages/LandingPage/LandingPage';
import LearningPage from './Pages/LearningPage/LearningPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import QueryPage from './Pages/QueryPage/QueryPage';
import axios from "axios";

function App() {

  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<LandingPage />}/>
          <Route path="/learningPage/:id" element={<LearningPage />}/>
          <Route path="/profilePage" element={<ProfilePage />}/>
          <Route path="/queryPage/:searchTerm" element={<QueryPage />}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
