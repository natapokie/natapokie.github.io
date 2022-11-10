import React from "react";
import "./PageHome.scss";

import name from "../assets/name.svg"
import character1 from "../assets/character/character1.png"
import character2 from "../assets/character/character2.png"
import character3 from "../assets/character/character3.png"
import character4 from "../assets/character/character4.png"

import { contacts } from "../utils/about";

const PageHome = () => {

    return (
        <>
        <div className="home-page">
          <HomeLanding />
        </div>
        </>
    );
};

// const PageHomeMobile = () => { 

//     return(
//         <></>
//     );
// }

// const PageHomeDesktop = () => {
//     return(
//         <>
//         <div className="home-landing">

//         </div>
//         </>
//     )
// }

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
        <div className="home-character">
          <img className="home-character-img no-hover" src={character1} alt="character" />
          <img className="home-character-img on-hover" src={character1} alt="character" />
          <img className="home-character-img on-hover" src={character2} alt="character" />
          <img className="home-character-img on-hover" src={character3} alt="character" />
          <img className="home-character-img on-hover" src={character4} alt="character" />
        </div>

      </div>
    
    </>
  );
}

export { PageHome }