// import logo from './logo.svg';
import './App.scss';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, useLocation, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import star from '../src/assets/star.svg'
import { pages } from './utils/pages';

function App() {

  const [globalCoord, setGlobalCoords] = useState({x: 0, y: 0});
  const [click, setClick] = useState(false);

  useEffect(() => {

    // get global mouse coordinates
    const handleWindowMouseMove = (e) => {
      setGlobalCoords(
        {
          // x: e.screenX,
          // y: e.screenY, 
          x: e.clientX,
          y: e.clientY,
        }
      );
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleWindowMouseMove);
    };

  }, []);

  return (
    <div className='page' onClick={() => {
      console.log("xcoord:", globalCoord.x, " ycoord:", globalCoord.y);
      setClick(true);
      setTimeout(() => {
        setClick(false)
      }, 1000)
    }}>
    <Stars xcoord={globalCoord.x} ycoord={globalCoord.y} click={click} />
      <BrowserRouter>
        <TransitionRoutes />
      </BrowserRouter>
    </div>
  );
}

const Stars = ({xcoord, ycoord, click}) => {
  
  const [currentClick, setCurrentClick] = useState(click);
  //const [style, setStyle] = useState(``);

  // console.log("currentClick:", currentClick);
  // console.log("click:", click);
  // console.log('x', xcoord, 'y', ycoord);

  // const setCoord = (x, y) => {
  //   return (
  //     `position: absolute;
  //     left: ${x}px;
  //     right: ${y}px;`)
  // }

  useEffect(() => { 
    setCurrentClick(click);
    // const newStyle = setCoord(xcoord, ycoord);
    // setStyle(newStyle);
  }, [click, xcoord, ycoord])

  return(
    <>
    {!currentClick ? 
    <></> 
    :
    <>
      <img className="star" alt="star" style={{width: '0.8%', top: (ycoord + 15) + 'px', left: (xcoord -10) + 'px'}} src={star} />
      <img className="star" alt="star" style={{width: '1.25%', top: (ycoord - 15) + 'px', left: (xcoord - 20) + 'px'}} src={star} />
      <img className="star" alt="star" style={{width: '2%', top: ycoord + 'px', left: xcoord + 'px'}} src={star} />
    </>
    }
    </>
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

Stars.propTypes = {
  xcoord: PropTypes.number,
  ycoord: PropTypes.number,
  click: PropTypes.bool,
}


export default App;
