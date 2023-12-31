import "./App.css";
import { useState, useRef } from "react";

// move from one position to another relatively
const vectorMove = (relativeTo, mouse) => {
  return {
    x: 2 * relativeTo.x - mouse.x,
    y: 2 * relativeTo.y - mouse.y,
  };
};

function App() {
  const [boxPos, setBoxPos] = useState({
    x: 0,
    y: 0,
  });

  const [trigger, setTrigger] = useState(false);

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const appRef = useRef(null);
  const noButtonRef = useRef(null);

  const viewPort = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const wrapPadding = viewPort.width * 0.05;

  const updatePosFromMouse = (e) => {
    // button position
    console.log("viewPort", viewPort);
    console.log("wrapping", wrapPadding);
    const buttonObj = noButtonRef.current.getBoundingClientRect();
    const buttonWidth = buttonObj.width;
    const buttonHeight = buttonObj.height;

    console.log("buttonObj", buttonObj);

    // move middle position relative to mouse position

    console.log("buttonPos", buttonObj);

    const newPos = vectorMove(
      {
        x: buttonObj.x + buttonWidth / 2,
        y: buttonObj.y + buttonHeight / 2,
      },
      { x: e.clientX, y: e.clientY }
    );

    console.log("relativePos", {
      x: buttonObj.x + buttonWidth / 2,
      y: buttonObj.y + buttonHeight / 2,
    });

    console.log("newPos", newPos);

    //middle to button position
    newPos.x -= buttonWidth / 2;
    newPos.y -= buttonHeight / 2;

    // bound button position
    newPos.x = Math.max(newPos.x, 0);
    newPos.y = Math.max(newPos.y, 0);
    newPos.x = Math.min(newPos.x, viewPort.width - buttonWidth);
    newPos.y = Math.min(newPos.y, viewPort.height - buttonHeight);
    console.log("bound newPos", newPos);

    console.log("wrappadding", wrapPadding);

    // button to box position
    const newBoxPos = {
      x: newPos.x - wrapPadding,
      y: newPos.y - wrapPadding,
    };
    // newBoxPos.x = Math.max(newBoxPos.x, 0);
    // newBoxPos.y = Math.max(newBoxPos.y, 0);

    // if cannot move anymore, move to random position
    if (newBoxPos.x === boxPos.x && newBoxPos.y === boxPos.y) {
      newBoxPos.x = Math.floor(Math.random() * (viewPort.width - buttonWidth));
      newBoxPos.y = Math.floor(
        Math.random() * (viewPort.height - buttonHeight)
      );
      console.log("gen");
    }

    console.log("set", newBoxPos);

    setBoxPos(newBoxPos);
    setTrigger(true);
  };

  return (
    <div
      className="App"
      ref={appRef}
      onMouseMove={(e) => {
        setMousePos({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      <header className="App-header">
        <img
          src="https://media.licdn.com/dms/image/D5603AQF2hvfT-W24Ng/profile-displayphoto-shrink_800_800/0/1703645277308?e=1709164800&v=beta&t=0dwHP7uZ5ZpO0__kLp3TWCU7XhJa4e7MSujQkVFSSNs"
          className="App-logo"
          alt="logo"
        />
        <p>
          Would you like to hire me?
          <br />
          <span className="sub">
            Inspired by{" "}
            <a href="http://doyouwannagooutwithme.com/">
              doyouwannagooutwithme.com
            </a>
          </span>
        </p>
        <div className="button">
          <a href="https://www.google.com" className="button-link">
            Yes
          </a>
        </div>

        <br></br>

        <div
          style={{
            left: boxPos.x,
            top: boxPos.y,
            padding: trigger ? wrapPadding : 0,
            position: trigger ? "fixed" : "relative",
          }}
          onMouseMove={updatePosFromMouse}
          className="wrapper"
        >
          <div ref={noButtonRef} className="button">
            <a
              className="button-link"
              href="https://www.google.com"
              // style={{ left: buttonPos.x, top: buttonPos.y }}
            >
              No
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
