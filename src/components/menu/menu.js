import React from "react";
import "./menu.css";
import gsap from "gsap";


const Menu = ({
  showMenu,
  sceneSetup,
  setShowMenu,
  setShowSection,
  setShowBackArrow,
  setCurrentCameraPosition,
  setCurrentSelectedMenuItem,
}) => {


  return (
    <>
      <div className={`menu-container ${showMenu ? "" : "hide"}`}>
        {/* <div className="title">
          Hi. I’m Kris, nice to meet you. Please take a look around!
        </div>
        <div>
          I am passionate about building excellent software that improves the
          lives of those around me. I specialize in creating software for
          clients ranging from individuals and small-businesses all the way to
          large enterprise corporations. What would you do if you had a software
          expert available at your fingertips?
        </div> */}
          <span id="typing-demo"></span>
        {/* <div
          onClick={() => {
            setCurrentSelectedMenuItem("projects");
            console.log(sceneSetup.current.camera.position);
            gsap.to(sceneSetup.current.camera.position, {
              duration: 2,
              x: 0.25,
              y: 0.9,
              z: 2,
              onComplete: function () {
                setShowSection(true);
                setShowMenu(false);
                setShowBackArrow(true);
              },
            });
          }}
          className="menu-section"
        >
          Projects
        </div>
        <div
          onClick={() => {
            //setCurrentCameraPosition([300, 700, 25]);
            setCurrentSelectedMenuItem("contact");
            setCurrentCameraPosition([10, 10, 10]);
            gsap.to(sceneSetup.current.camera.position, {
              duration: 2,
              x: 0,
              y: 10,
              z: -50,
              onComplete: function () {
                setShowSection(true);
                setShowMenu(false);
                setShowBackArrow(true);
              },
            });
          }}
          className="menu-section"
        >
          Contact
        </div>
        <div
          onClick={() =>{
            setCurrentSelectedMenuItem("about-me");
            gsap.to(sceneSetup.current.camera.position, {
              duration: 2,
              x: -10,
              y: 15,
              z: 100,
              onComplete: function () {
                setShowSection(true);
                setShowMenu(false);
                setShowBackArrow(true);
              },
            })
          }}
          className="menu-section"
        >
          About Me
        </div> */}
      </div>
    </>
  );
};

export default Menu;
