import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Pages */
import LandingPage    from './pages/LandingPage.jsx';
import Dashboard      from './pages/Dashboard.jsx';

/* Boot Sequence */
import WindowsLoading from './components/WindowsLoading.jsx';
import WindowsLogin   from './components/WindowsLogin.jsx';
import WindowsWelcome from './components/WindowsWelcome.jsx';

const PAGE = {
  LAND:        'land',
  XP_LOADING:  'xp_loading',
  XP_LOGIN:    'xp_login',
  XP_WELCOME:  'xp_welcome',
  DASH:        'dash',
};

export default function App() {
  const [page, setPage] = useState(PAGE.LAND);

  const startBoot         = () => { window.scrollTo(0, 0); setPage(PAGE.XP_LOADING); };
  const onLoadingComplete = () => setPage(PAGE.XP_LOGIN);
  const onLogin           = () => setPage(PAGE.XP_WELCOME);
  const onWelcomeComplete = () => setPage(PAGE.DASH);

  return (
    <>
      <AnimatePresence mode="wait">
        {page === PAGE.LAND && (
          <motion.div key="land"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}>
            <LandingPage onEnter={startBoot} onAccessPortal={startBoot} />
          </motion.div>
        )}

        {page === PAGE.XP_LOADING && (
          <WindowsLoading onComplete={onLoadingComplete} />
        )}

        {page === PAGE.XP_LOGIN && (
          <WindowsLogin onLogin={onLogin} />
        )}

        {page === PAGE.XP_WELCOME && (
          <WindowsWelcome onComplete={onWelcomeComplete} />
        )}

        {page === PAGE.DASH && (
          <motion.div key="dash"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
