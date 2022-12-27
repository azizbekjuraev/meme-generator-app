import React, { useState, useRef } from "react";
import memeData from "../memeData";
import cx from "classnames";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";

export default function () {
  const [content, setContent] = useState({
    topText: "",
    bottomText: "",
    randomImage: "./img/memeimg.png",
  });

  const [allMemes, setAllMemes] = useState(memeData);

  const editorRef = useRef(null);

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

  const handleCaptureClick = async () => {
    if (editorRef.current) {
      const canvas = await html2canvas(editorRef.current, {
        logging: true,
        letterRendering: 1,
        useCORS: true,
      });
      const dataURL = canvas.toDataURL("image/png");
      downloadjs(dataURL, "meme.png", "image/png");
    }
  };
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
        <a href="#" onClick={handleCaptureClick}>
          ⬇️
        </a>
      </div>
      <div ref={editorRef} className="img-holder">
        <img src={allMemes.randomImage} />
        <div className="text-content">
          <p
            className={cx("img-text", {
              "color-white": !isColorBlack,
            })}
          >
            {val}
          </p>
          <p
            className={cx("img-text", {
              "color-white": !isColorBlack,
            })}
          >
            {val2}
          </p>
        </div>
      </div>
    </div>
  );
}
