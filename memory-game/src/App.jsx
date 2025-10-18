import './App.css';
import MemoryGame from './components/MemoryGame';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className={`App ${darkMode ? 'dark-theme' : ''}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <MemoryGame darkMode={darkMode} />
    </div>
  );
}

export default App;
