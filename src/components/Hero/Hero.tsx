import React, { ReactNode } from "react";
import "./Hero.scss";
import { HeroProps } from "../../types";

const Hero: React.FC<HeroProps> = ({ children }) => {
  return (
    <section className="hero-section" data-testid="hero-section">
      <video autoPlay loop muted data-testid="hero-video">
        <source
          src={`${process.env.PUBLIC_URL}/hero-vid.mp4`}
          type="video/mp4"
        />
      </video>
      <div className="content">
        <img
          alt="bell rocket"
          className="bell-rocket"
          src={`${process.env.PUBLIC_URL}/images/space-geezer.png`}
        />
        <div className="hero-copy-box">
          <h1>
            <img
              className="logo"
              alt="AJ Bell"
              src="https://www.ajbell.co.uk/sites/all/themes/ajbyi_patternlab/logo.png"
            />
          </h1>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Hero;
