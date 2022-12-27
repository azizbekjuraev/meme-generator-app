import React, { useState } from "react";
import memeData from "../memeData";
import cx from "classnames";

export default function () {
  const [content, setContent] = useState({
    topText: "",
    bottomText: "",
    randomImage: "./img/memeimg.png",
  });

  const [allMemes, setAllMemes] = useState(memeData);

  function getMemeImage() {
    const memesArray = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setAllMemes((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  // Value from texts in input field
  const [val, setValue] = useState("");
  const change = (event) => {
    setValue(event.target.value);
  };

  const [val2, setValue2] = useState("");
  const change2 = (event) => {
    setValue2(event.target.value);
  };

  const [isColorBlack, setIsColorBlack] = useState(true);

  function colorChanger() {
    setIsColorBlack((prev) => !prev);
  }

  return (
    <div className="main-container">
      <div className="form">
        <input
          type="text"
          className="input1-el"
          placeholder="Top text"
          onChange={change}
        />
        <input
          type="text"
          className="input2-el"
          placeholder="Buttom text"
          onChange={change2}
        />
        <input type="color" className="input-color" />
        <div className="color-change">
          <button onClick={colorChanger}>Color Switch</button>
        </div>
      </div>
      <div className="get-btn">
        <button onClick={getMemeImage}>Get a new meme image 🌠</button>
        <a href={allMemes.randomImage} download>
          ⬇️
        </a>
      </div>
      <div className="img-holder">
        <img src={allMemes.randomImage} />
        <p
          className={cx("img-text-1", {
            "color-white": !isColorBlack,
          })}
        >
          {val}
        </p>
        <p
          className={cx("img-text-2", {
            "color-white": !isColorBlack,
          })}
        >
          {val2}
        </p>
      </div>
    </div>
  );
}
