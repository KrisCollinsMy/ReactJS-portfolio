import React from "react";
import "./about.css";
import { getCopy } from "../../languages/languages";

const About = props => {
  return (
    <div className="about-container">
      <div className="about-image">
        <img src={"/images/profile2.png"} alt="me" />
        <div className="about-links">
        </div>
      </div>
      <div className="about-text">
        <div className="about-title">{`Software Engineer \n& Front-End DEV`}</div>
        <div className="colored-b">{getCopy("about0")}</div> {getCopy("about1")}
        <br />
        <br />
        {getCopy("about2")} <div className="colored-b">{getCopy("about3")}</div>{" "}
        {getCopy("about4")} <div className="colored-b">{getCopy("about5")}</div>
        <br />
        <br />
        {getCopy("about6")} <div className="colored-b">{getCopy("about7")}</div>{" "}
        {getCopy("about8")}
      </div>
    </div>
  );
};

export default About;
