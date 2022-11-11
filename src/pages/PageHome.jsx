import React, { useEffect, useState } from "react";
import "./PageHome.scss";

import name from "../assets/name.svg"
import character1 from "../assets/character/character1.png"
import character2 from "../assets/character/character2.png"
import character3 from "../assets/character/character3.png"
import character4 from "../assets/character/character4.png"

import { contacts } from "../utils/about";

let characterFrames = [
  character1, 
  character2,
  character3, 
  character4,
]

const PageHome = () => {

    return (
        <>
        <div className="home-page">
          <HomeLanding />
        </div>
        </>
    );
};

const HomeLanding = () => {
  return (
    <>
      <div className="home-landing display-only-desktop">
        <div className="home-landing-connect">
          <img className="home-landing-name" src={name} alt="Natalie Chan" />
          <div className="contact-bar">
            {contacts.map((contact) => {
              return (
                <div className="home-contact-icon-div" key={contact.label}>
                  <a href={contact.link} target="_blank" rel="noreferrer">
                    <img className="home-contact-icon" src={contact.icon} alt={contact.label} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <CharacterAnimation />
      </div>
    
    </>
  );
}




const CharacterAnimation = () => {

  const [frameNum, setFrameNum] = useState(0); // this is the frame in the array

  useEffect(() => {

    console.log(frameNum);

    if (frameNum === 0) {
      setTimeout(() => {
        setFrameNum(frameNum + 1);
      }, 5000)
    } else if (frameNum === characterFrames.length - 1) {
      setTimeout(() => {
        setFrameNum(0);
      }, 300)
    } else {
      setTimeout(() => {
        setFrameNum(frameNum + 1);
      }, 50)
    }
    
  }, [frameNum]);

  return(
    <>
      <div className="home-character">
        <img className="home-character-img" src={characterFrames[frameNum]} alt="character" />
      </div>
    </>
  )
}

export { PageHome }