import React from "react";
import "./PageHome.scss";

import name from "../assets/name.svg"
import character from "../assets/character/character1.png"

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
                <div key={contact.label}>
                  <a href={contact.link} target="_blank" rel="noreferrer">
                    <img className="home-contact-icon" src={contact.icon} alt={contact.label} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="character">
          <img src={character} alt="character" />
        </div>

      </div>
    
    </>
  );
}

export { PageHome }