import { useEffect, useState } from 'react';

const sparkles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 31 + 7) % 96}%`,
  top: `${(index * 47 + 4) % 84}%`,
  delay: `${(index % 6) * 0.24}s`,
  size: `${12 + (index % 4) * 5}px`,
}));

const floatingHearts = [
  { id: 1, left: '6%', top: '9%', size: '24px', delay: '.2s', duration: '5.8s', opacity: '.42', symbol: '♡' },
  { id: 2, left: '15%', top: '26%', size: '15px', delay: '1.1s', duration: '4.7s', opacity: '.48', symbol: '♥' },
  { id: 3, left: '24%', top: '6%', size: '18px', delay: '2.3s', duration: '5.3s', opacity: '.37', symbol: '♡' },
  { id: 4, left: '34%', top: '19%', size: '12px', delay: '.7s', duration: '4.2s', opacity: '.55', symbol: '♥' },
  { id: 5, left: '43%', top: '8%', size: '21px', delay: '1.6s', duration: '6.1s', opacity: '.36', symbol: '♡' },
  { id: 6, left: '54%', top: '25%', size: '14px', delay: '2.8s', duration: '4.9s', opacity: '.46', symbol: '♥' },
  { id: 7, left: '63%', top: '12%', size: '16px', delay: '.4s', duration: '5.5s', opacity: '.4', symbol: '♡' },
  { id: 8, left: '71%', top: '31%', size: '13px', delay: '1.8s', duration: '4.5s', opacity: '.48', symbol: '♥' },
  { id: 9, left: '80%', top: '7%', size: '25px', delay: '2.5s', duration: '6.2s', opacity: '.36', symbol: '♡' },
  { id: 10, left: '91%', top: '21%', size: '16px', delay: '.9s', duration: '5.1s', opacity: '.44', symbol: '♥' },
  { id: 11, left: '3%', top: '43%', size: '15px', delay: '2s', duration: '5.7s', opacity: '.29', symbol: '♡' },
  { id: 12, left: '95%', top: '46%', size: '20px', delay: '1.3s', duration: '4.8s', opacity: '.3', symbol: '♡' },
];

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

      <div className="heart-field" aria-hidden="true">
        {floatingHearts.map((heart) => (
          <span
            className="floating-heart"
            key={heart.id}
            style={{
              left: heart.left,
              top: heart.top,
              fontSize: heart.size,
              opacity: heart.opacity,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          >
            {heart.symbol}
          </span>
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
