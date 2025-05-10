import React, { useEffect, useState } from 'react';
import { fetchCats } from './services/CatServices';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import config from './config';
import './App.css';

const App = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalUrl, setModalUrl] = useState(null);
  const [limit, setLimit] = useState(() => {
    const saved = localStorage.getItem('catImageLimit');
    return saved ? parseInt(saved, 10) : config.IMAGE_LIMIT;
  });
  const hasApiKey = !!process.env.REACT_APP_API_KEY;

  const increaseLimit = () => setLimit((prev) => Math.min(prev + 1, 20));
  const decreaseLimit = () => setLimit((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    localStorage.setItem('catImageLimit', limit.toString());
  }, [limit]);

  useEffect(() => {
    document.body.style.overflow = modalUrl ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalUrl]);

  const loadCats = async () => {
    setLoading(true);
    try {
      const data = await fetchCats(limit);
      setCats(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadCats();
    }, 400);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <div className="app">
      {hasApiKey ? (
        <div className="counter-control">
          <button onClick={decreaseLimit}>−</button>
          <span>{limit}</span>
          <button onClick={increaseLimit}>＋</button>
        </div>
      ) : (
        <div className="counter-control disabled">
          <span style={{ color: '#FF0000', marginTop: "10px" }}>API key not set</span>
        </div>
      )}
      <button className="sticky-refresh" onClick={loadCats}>Refresh cats</button>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <Gallery images={cats} onImageClick={setModalUrl} />
      )}
      <Modal imageUrl={modalUrl} onClose={() => setModalUrl(null)} />
    </div>
  );
};

export default App;
