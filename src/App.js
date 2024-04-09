import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './SharedComponents/Navbar';
import LandingPage from './Pages/LandingPage/LandingPage';
import LearningPage from './Pages/LearningPage/LearningPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<LandingPage />}/>
          <Route path="/learningPage" element={<LearningPage />}/>
          <Route path="/profilePage" element={<ProfilePage />}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
