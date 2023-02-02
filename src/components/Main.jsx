import React, { useState, useRef, useEffect } from "react";
import cx from "classnames";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";

export default function () {
  const [content, setContent] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const change = (event) => {
    const { name, value } = event.target;
    setContent((prevContent) => {
      return { ...prevContent, [name]: value };
    });
  };

  const [allMemes, setAllMemes] = useState([]);

  const editorRef = useRef(null);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  //Mashey ozgarsa kerak
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setContent((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  const [isColorBlack, setIsColorBlack] = useState(false);

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
          name="topText"
          onChange={change}
          //controlled component
          value={content.topText}
        />
        <input
          type="text"
          className="input2-el"
          placeholder="Buttom text"
          name="bottomText"
          onChange={change}
          //controlled component
          value={content.bottomText}
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
        <img src={content.randomImage} />
        <div className="text-content">
          <h1 className={cx("img-text", { "color-white": !isColorBlack })}>
            {content.topText}
          </h1>
          <h1
            className={cx("img-text", {
              "color-white": !isColorBlack,
            })}
          >
            {content.bottomText}
          </h1>
        </div>
      </div>
    </div>
  );
}
