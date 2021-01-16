import React, { useEffect, useState } from "react";
import "./App.css";

const DrumPad = ({ clipId, clip, keyTrigger, keyCode, updateDisplay }) => {
  const play = (clipId) => {
    const audio = document.querySelector(`#${keyTrigger}`);
    audio.play();
    updateDisplay && updateDisplay(clipId);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === keyCode) {
      play(clipId);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    play(clipId);
  };

  return (
    <div id={clipId} className="drum-pad" onClick={handleClick}>
      <audio id={keyTrigger} src={clip} className="clip"></audio>
      {keyTrigger}
    </div>
  );
};

const Pad = ({ sounds, updateDisplay }) => {
  const pad = sounds.map((sound) => (
    <DrumPad
      key={sound.id}
      clipId={sound.id}
      clip={sound.url}
      keyTrigger={sound.keyTrigger}
      keyCode={sound.keyCode}
      updateDisplay={updateDisplay}
    />
  ));

  return <div className="pad">{pad}</div>;
};

const App = () => {
  const sounds = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  const [clipId, setClipId] = useState(" ");

  return (
    <div id="drum-machine">
      <div id="display">{clipId}</div>
      <Pad sounds={sounds} updateDisplay={(v) => setClipId(v)} />
    </div>
  );
};

export default App;
