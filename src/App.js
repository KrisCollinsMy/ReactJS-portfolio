import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import "./App.css";
import { Scene } from "./js/Scene";
import "./components/menu/menu.css";
import Menu from "./components/menu/menu";
import Transition from "./components/transition/transition";
import gsap from "gsap";
import SectionContainer from "./components/section-container/section-container";

import Projects from "./containers/projects/projects";
import Contact from "./containers/contact/contact";
import About from "./containers/about/about";
import BackArrow from "./assets/images/back-arrow.svg";
import { init } from "ityped";

function App() {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [currentScene, setCurrentScene] = useState("scene 1");
  const [showMenu, setShowMenu] = useState(false);
  const [showBackArrow, setShowBackArrow] = useState(false);
  const [currentSelectedMenuItem, setCurrentSelectedMenuItem] = useState(null);
  const [mainScene, setMainScene] = useState(null);
  const [viewPosition, setViewPosition] = useState(null);
  const [viewRotation, setViewRotation] = useState(null);

  const [mainCamera, setMainCamera] = useState(null);
  const [hoveredSection, setHoveredSection] = useState("");
  const [clickedSection, setClickedSection] = useState("");
  const [showSection, setShowSection] = useState(false);
  const [sectionScrollY, setSectionScrollY] = useState(0);
  const [fullscreenGallery, setFullscreenGallery] = useState(false);

  const hoveredGroup = useRef(null);
  const hoveredGroupAux = useRef(null);

  const [currentCameraPosition, setCurrentCameraPosition] = useState([
    1200, 160, 220,
  ]);

  const sceneSetup = useRef(new Scene("canvas"));
  window.addEventListener("wheel", (event) => {
    if (event.deltaY < 0) {
      console.log("scrolling up");
      setCurrentScene("scene 1");

      gsap.to(sceneSetup.current.camera.position, {
        duration: 3,
        ease: "power3",
        x: 100,
        y: -10,
        z: 150,
        onStart: function () {
          setShowMenu(true);
        },
      });
    } else if (event.deltaY > 0) {
      console.log("scrolling down");
      setCurrentScene("scene 2");
      gsap.to(sceneSetup.current.camera.position, {
        duration: 3,
        ease: "power3",
        x: 0.25,
        y: 0.9,
        z: 2,
        onStart: function () {
          setShowMenu(false);
        },
      });
    }
    console.log(currentScene);
  });

  useEffect(() => {
    if (sceneSetup.current.camera) {
      console.log(sceneSetup.current.camera.position);
      const [x, y, z] = currentCameraPosition;
      sceneSetup.current.camera.position.set(x, y, z);
      sceneSetup.current.animate();
    }
  }, [currentCameraPosition]);

  useEffect(() => {
    console.log(sceneSetup);
    sceneSetup.current.initialize();
    sceneSetup.current.animate();
    // sceneSetup.current.camera.position.set(1200, 160, 220);

    const cubeObject = new THREE.Object3D();
    const icosahedronObject = new THREE.Object3D();
    const officeObject = new THREE.Object3D();

    let loadedModel;

    const manager = new THREE.LoadingManager();
    manager.onLoad = function () {
      setSceneLoaded(true);
      const objectGroup = loadedModel.children[0];

      //returns a clone of this object and optionally all descendants.
      const objectGroupBase = objectGroup.clone();
      objectGroupBase.traverse((node) => {
        if (!node.isMesh) return;
        node.material = new THREE.MeshBasicMaterial({
          color: 0xffd580,
        });
      });

      //turns the mesh to black so that it contrasts with the background
      objectGroup.traverse((node) => {
        if (!node.isMesh) return;

        if (node.material.name == "PlasticBlack") {
          console.log(node.material);
        }

        //Monitor_PlasticBlack_0
        if (node.material.name != "PlasticBlack") {
          node.material = new THREE.MeshBasicMaterial({
            antialias: true,
            color: "#000",
            wireframe: true,
            transparent: true,
          });
        } else {
          node.material = new THREE.MeshBasicMaterial({
            antialias: true,
            color: "#000",
            wireframe: true,
            // transparent: true,
            // opacity: 1,
          });
        }
      });

      officeObject.add(objectGroupBase);
      officeObject.add(objectGroup);

      sceneSetup.current.scene.add(officeObject);

      sceneSetup.current.scene.add(cubeObject);
      sceneSetup.current.scene.add(icosahedronObject);

      const icosahedronGeometry = new THREE.IcosahedronGeometry(15, 1);
      const boxGeometry = new THREE.BoxGeometry(2, 2, 2);

      const meshMaterial = new THREE.MeshBasicMaterial({
        color: "#000",
        antialias: true,
        transparent: true,
        wireframe: true,
      });

      const styledCube = new THREE.Mesh(boxGeometry, meshMaterial);
      styledCube.scale.x = styledCube.scale.y = styledCube.scale.z = 0.3;
      cubeObject.add(styledCube);

      const styledIcosahedron = new THREE.Mesh(
        icosahedronGeometry,
        meshMaterial
      );
      styledIcosahedron.scale.x =
        styledIcosahedron.scale.y =
        styledIcosahedron.scale.z =
          0.1;
      icosahedronObject.add(styledIcosahedron);

      // cubeObject.position.x = 70;
      // cubeObject.position.y = -80;
      // cubeObject.position.z = -200;
      // cubeObject.scale.set(5, 5, 5);

      // icosahedronObject.position.x = 70;
      // icosahedronObject.position.y = -80;
      // icosahedronObject.position.z = -200;
      // icosahedronObject.scale.set(5, 5, 5);

      // officeObject.position.x = 250;
      // officeObject.position.y = -160;
      // officeObject.position.z = 120;

      officeObject.position.x = 250;
      officeObject.position.y = -150;
      officeObject.position.z = 280;

      cubeObject.position.x = 60;
      cubeObject.position.y = -20;
      cubeObject.position.z = -30;
      cubeObject.scale.set(5, 5, 5);

      icosahedronObject.position.x = 60;
      icosahedronObject.position.y = -20;
      icosahedronObject.position.z = -30;
      icosahedronObject.scale.set(5, 5, 5);

      const initPos2 = [
        2.815255628617398, 2.317359635567619, 0.6678043001467961,
      ];
      const initRotation2 = [
        -0.5379590106574698, 0.999354090194259, 0.46513659438111615,
      ];

      // gsap.to(sceneSetup.current.camera.position, {
      //   duration: 3,
      //   x: -50,
      //   y: 160,
      //   z: 220,
      // });

      // gsap.to(sceneSetup.current.camera.position, {
      //   duration: 3,
      //   x: 100,
      // y: -10,
      // z: 150,
      // });

      gsap.to(sceneSetup.current.camera.position, {
        duration: 3,
        x: 100,
        y: -10,
        z: 150,
        onComplete: function () {
          setShowMenu(true);
          const typingdemo = document.querySelector("#typing-demo");
          init(typingdemo, {
            typeSpeed: 70,
            disableBackTyping: true,
            strings: [
              "Hey, I’m Kris Collins.I am a graphic designer, UI/UX designer & junior front-end developer.",
            ],
          });
        },
      });
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files."
      );
    };

    manager.onError = function (url) {
      console.log("There was an error loading " + url);
    };

    const glftLoader = new GLTFLoader(manager);
    glftLoader.load("/models/office/office2.gltf", (officeModel) => {
      loadedModel = officeModel.scene;
      setHoveredSection("projects");
    });

    var counter = 0;
    const animate = () => {
      if (loadedModel) {
        //sceneSetup.current.camera.position.x += 1;
        //sceneSetup.current.camera.position.z -= 1;
        //sceneSetup.current.camera.position.y -= 1;
        cubeObject.rotation.x -= 0.002;
        cubeObject.rotation.y += 0.003;

        icosahedronObject.rotation.x -= 0.001;
        icosahedronObject.rotation.y += 0.002;

        //animation to move vertically
        if (counter <= 100) {
          icosahedronObject.position.y -= 0.2;
          cubeObject.position.y -= 0.2;
          counter++;
        }

        if (counter > 100) {
          icosahedronObject.position.y += 0.2;
          cubeObject.position.y += 0.2;
          counter++;
        }

        if (counter > 200) {
          counter = 0;
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  // <div
  //         onClick={() => {
  //           setCurrentCameraPosition([10, 10, 10]);
  //           console.log(sceneSetup.current.camera.position);
  //           gsap.to(sceneSetup.current.camera.position, {
  //             duration: 3,
  //             x: 0.25,
  //             y: 0.9,
  //             z: 2,
  //           });
  //         }}
  //         className="menu-section"
  //       >
  //         Projects
  //       </div>
  //       <div
  //         onClick={() => {
  //           //setCurrentCameraPosition([300, 700, 25]);
  //           setCurrentCameraPosition([10, 10, 10]);
  //           gsap.to(sceneSetup.current.camera.position, {
  //             duration: 3,
  //             x: 0,
  //             y: 10,
  //             z: -50,
  //           });
  //         }}
  //         className="menu-section"
  //       >
  //         Contact
  //       </div>
  //       <div
  //         onClick={() =>
  //           gsap.to(sceneSetup.current.camera.position, {
  //             duration: 3,
  //             x: -10,
  //             y: 15,
  //             z: 100,
  //           })
  //         }
  //         className="menu-section"
  //       >
  //         About Me
  //       </div>

  return (
    <div>
      <div id="scroll-down-animation">
        <span class="mouse">
          <span class="move"></span>
        </span>
        <h2>Scroll down</h2>
      </div>
      <Transition loaded={sceneLoaded} />
      <Menu
        setCurrentSelectedMenuItem={setCurrentSelectedMenuItem}
        setShowBackArrow={setShowBackArrow}
        showMenu={showMenu}
        sceneSetup={sceneSetup}
        setShowMenu={setShowMenu}
        setShowSection={setShowSection}
        setCurrentCameraPosition={setCurrentCameraPosition}
      />

      {/* Main webpage component */}
      <canvas id="canvas" />
      <div
        className={`back-arrow-container ${showBackArrow ? "" : "hide"}`}
        onClick={() => {
          setShowSection(false);
          setFullscreenGallery(false);
          setShowMenu(true);
          setShowBackArrow(false);
          gsap.to(sceneSetup.current.camera.position, {
            duration: 3,
            x: -49.99,
            y: 160,
            z: 220,
          });
        }}
      >
        <img src={BackArrow} alt="Go back" />
      </div>
      {/* <SectionContainer
        show={showSection}
        setScrollY={(scrollY) => setSectionScrollY(scrollY)}
      >
        {currentSelectedMenuItem == "projects" && (
          <Projects
            fullscreenGallery={fullscreenGallery}
            setFullscreenGallery={setFullscreenGallery}
          />
        )}
        {currentSelectedMenuItem == "contact" && (<Contact/>)}
        {currentSelectedMenuItem == "about-me" && (<About/>)}
      </SectionContainer> */}
    </div>
  );
}

export default App;
