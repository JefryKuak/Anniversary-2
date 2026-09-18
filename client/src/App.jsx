import { useEffect, useState } from 'react';

const sparkles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 31 + 7) % 96}%`,
  top: `${(index * 47 + 4) % 84}%`,
  delay: `${(index % 6) * 0.24}s`,
  size: `${12 + (index % 4) * 5}px`,
}));

function GiftBox({ phase, onOpen }) {
  const isOpening = phase === 'opening';
  const isOpened = phase === 'opened';

  return (
    <button
      className={`gift ${isOpening ? 'gift--opening' : ''} ${isOpened ? 'gift--opened' : ''}`}
      onClick={onOpen}
      disabled={phase !== 'idle'}
      aria-label="Buka hadiah kejutan"
    >
      <span className="gift__shine gift__shine--one" />
      <span className="gift__shine gift__shine--two" />
      <span className="gift__lid">
        <span className="gift__bow gift__bow--left" />
        <span className="gift__bow gift__bow--right" />
        <span className="gift__knot" />
        <span className="gift__ribbon gift__ribbon--lid" />
      </span>
      <span className="gift__box">
        <span className="gift__ribbon gift__ribbon--box" />
        <span className="gift__tag">for Fyoo</span>
      </span>
    </button>
  );
}

function CelebrationModal({ onContinue }) {
  return (
    <section className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="anniversary-title">
      <div className="celebration-card">
        <span className="celebration-card__icon" aria-hidden="true">♡</span>
        <p className="eyebrow">18 September 2024 — 18 September 2026</p>
        <h2 id="anniversary-title">Happy 2nd<br />Anniversary, Fyoo!</h2>
        <p className="celebration-card__message">
          Dua tahun penuh cerita kecil, tawa besar, dan alasan untuk selalu memilihmu lagi.
        </p>
        <button className="primary-button" onClick={onContinue}>
          Mulai perjalanan kita <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

function App() {
  const [phase, setPhase] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  function openGift() {
    if (phase !== 'idle') return;
    setPhase('opening');
  }

  useEffect(() => {
    if (phase !== 'opening') return undefined;

    const timer = window.setTimeout(() => {
      setPhase('opened');
      setShowModal(true);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const syncPathWithBrowser = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', syncPathWithBrowser);

    return () => window.removeEventListener('popstate', syncPathWithBrowser);
  }, []);

  function continueToGallery() {
    // Rute galeri akan dibuat pada tahap berikutnya. Menyimpan tujuan ini di URL
    // membuat alur antarhalaman sudah siap tanpa memaksa pengguna me-refresh laman.
    window.history.pushState({}, '', '/gallery');
    setCurrentPath('/gallery');
    setShowModal(false);
  }

  const isGalleryPlaceholder = currentPath === '/gallery';

  if (isGalleryPlaceholder) {
    return (
      <main className="next-chapter">
        <div className="next-chapter__bubble">♡</div>
        <p className="eyebrow">Chapter berikutnya</p>
        <h1>Galeri kenangan kita<br />sedang disiapkan.</h1>
        <p>Landing page sudah selesai—berikutnya kita akan mengisinya dengan foto-foto dan cerita bulanan kalian.</p>
        <button className="text-button" onClick={() => window.history.back()}>← Kembali ke hadiah</button>
      </main>
    );
  }

  return (
    <main className={`landing ${phase === 'opened' ? 'landing--opened' : ''}`}>
      <div className="cloud cloud--one" />
      <div className="cloud cloud--two" />
      <div className="cloud cloud--three" />

      <div className="sparkle-field" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span
            className="sparkle"
            key={sparkle.id}
            style={{ left: sparkle.left, top: sparkle.top, animationDelay: sparkle.delay, width: sparkle.size, height: sparkle.size }}
          />
        ))}
      </div>

      <header className="landing__header">
        <span className="header-heart">♡</span>
        <p>two years of us</p>
      </header>

      <section className="landing__content" aria-live="polite">
        <p className="eyebrow">A tiny surprise for</p>
        <h1>My dearest<br /><em>Fyoo</em></h1>
        <p className="landing__hint">
          {phase === 'idle' ? 'Ada sesuatu kecil untukmu. Coba dibuka, ya!' : 'Sedikit keajaiban sedang terjadi…'}
        </p>
        <GiftBox phase={phase} onOpen={openGift} />
        {phase === 'idle' && <span className="tap-note">tap the gift <span aria-hidden="true">↓</span></span>}
      </section>

      <footer className="landing__footer">Made with all my love <span aria-hidden="true">✦</span></footer>
      {showModal && <CelebrationModal onContinue={continueToGallery} />}
    </main>
  );
}

export default App;
