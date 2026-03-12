import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import { Layout } from './components/Layout';
import { Navbar } from './components/Navbar';
import { MusicPlayer } from './components/MusicPlayer';
import { Home } from './pages/Home';
import { Playlist } from './pages/Playlist';
import { Favorites } from './pages/Favorites';
import { About } from './pages/About';

function AppContent() {
  const { currentMood } = useApp();

  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={currentMood ? <Playlist /> : <Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <MusicPlayer />
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
