// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import { BrowserRouter, useLocation, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { pages } from './utils/pages';

function App() {
  return (

    <>
      <BrowserRouter>
        <TransitionRoutes />
      </BrowserRouter>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

const TransitionRoutes = () => {

  const location = useLocation();

  return (
    <TransitionGroup>
      {/* <ScrollToTop /> */}
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          {[
            ...pages.main,
          ].map((page) => {
            return (
              <Route
                path={page.path}
                key={page.path}
                element={
                  <div style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}>
                    <div style={{ minHeight: '100vh' }}>{page.component}</div>
                  </div>
                }
              />
            );
          })}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};


export default App;
