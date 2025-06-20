import logo from './logo.svg';
import './App.css';
import { HashRouter, Routes, Route} from 'react-router-dom'
import Navbar from './SharedComponents/Navbar';
import LandingPage from './Pages/LandingPage/LandingPage';
import LearningPage from './Pages/LearningPage/LearningPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import QueryPage from './Pages/QueryPage/QueryPage';
import axios from "axios";
import returnBaseUrl from './getUrl';

function App() {

  axios.defaults.baseURL = returnBaseUrl();
  axios.defaults.withCredentials = true;

  return (
      <HashRouter>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<LandingPage />}/>
          <Route path="/learningPage/:id" element={<LearningPage />}/>
          <Route path="/profilePage" element={<ProfilePage />}/>
          <Route path="/queryPage/:searchTerm" element={<QueryPage />}/>

        </Routes>
      </HashRouter>
  );
}

export default App;
