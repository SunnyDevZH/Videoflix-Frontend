import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VideoOffer from './pages/VideoOffer';
import VideoPlayer from './pages/VideoPlayer';
import TextPage from './pages/TextPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AccountActivation from './components/AccountActivation';
import './styles/global.css';
<link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet"></link>

function App() {
  return (
    <Router basename="/videoflix">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/video-offer" element={<VideoOffer />} />
          <Route path="/video/:videoId" element={<VideoPlayer />} />
          <Route path="/text-page" element={<TextPage />} />
          <Route path="/activate/:activationCode" element={<AccountActivation />} /> 
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
