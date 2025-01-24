import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import EyeHealthRemedies from './pages/EyeHealthRemedies';


export default function App() {
  return (
    <BrowserRouter>
      {/* Header Component */}
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/EyeHealthRemedies" element={<EyeHealthRemedies />} />
          
      </Routes>
    </BrowserRouter>
  );
}
