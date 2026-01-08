import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import backgroundImage from './assets/bg.png';

// Import game mode images
import soloImg from './assets/solo.png';
import soloHover from './assets/solohover.png';
import escapeImg from './assets/scape.png';
import escapeHover from './assets/scapehover.png';
import onlineImg from './assets/online.png';
import onlineHover from './assets/onlinehover.png';

// Firebase
import { auth, provider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

// GLOBAL USER CONTEXT
import { UserContext } from './UserContext';

const Home = () => {
  const { user } = useContext(UserContext); // ✅ GLOBAL USER

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      // user state handled globally by UserContext
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // user state handled globally by UserContext
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="home-page">
      {/* Background layer */}
      <div
        className="bg-overlay"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="content-wrapper">
        {/* Navigation Bar */}
        <nav className="game-nav">
          <div className="nav-spacer"></div>

          <div className="nav-links">
            {['HOME', 'ABOUT GAME', 'FEATURES', 'TEACHER', 'COMMUNITY', 'SUPPORT'].map((item) =>
              item === 'TEACHER' ? (
                <Link key={item} to="/teacher">{item}</Link>
              ) : (
                <a
                  key={item}
                  href="#"
                  className={item === 'HOME' ? 'active' : ''}
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* LOGIN / LOGOUT */}
          <div className="nav-login">
            <div
              className="login-pill"
              onClick={user ? handleLogout : handleLogin}
              style={{ cursor: 'pointer' }}
            >
              <div className="login-avatar">
                {user ? (
                  <img
                    src={user.photoURL}
                    alt="Avatar"
                    className="avatar-img"
                  />
                ) : (
                  '👧'
                )}
              </div>
              <span className="login-text">
                {user ? 'Logout' : 'Login'}
              </span>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <div className="glass-card">
            <h1 className="game-title">
              JOHNPAUL COLLEGE:<br />CAMPUS CASE
            </h1>

            <div className="cta-section">
              <button className="download-button">
                DOWNLOAD GAME NOW
              </button>
              <p className="sub-text">
                Available for Windows, macOS, and Linux
              </p>
            </div>

            {/* Game Modes */}
            <div className="modes-grid">
              <GameModeCard img={soloImg} hoverImg={soloHover} />
              <GameModeCard img={escapeImg} hoverImg={escapeHover} />
              <GameModeCard img={onlineImg} hoverImg={onlineHover} />
            </div>
          </div>
        </main>

        <footer className="game-footer">
          <p>© 2026 Johnpaul College. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Mode Card Component
const GameModeCard = ({ img, hoverImg }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="wood-card"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="emoji-box"
        style={{
          backgroundImage: `url(${isHover ? hoverImg : img})`
        }}
      />
    </div>
  );
};

export default Home;
