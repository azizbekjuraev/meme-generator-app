import React, { useState } from "react";
import memeData from "../memeData";

export default function () {
  const [isGoingOut, setGoingOut] = useState(true);
  const [memeImage, setMemeImage] = useState("");
  const [thingsArr, setThingsArr] = useState("Thing1");
  function getMemeImage() {
    const memesArray = memeData.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    setMemeImage(memesArray[randomNumber].url);
    console.log(memeImage);
  }

  return (
    <div className="main-container">
      <div className="form">
        <input type="text" className="input1-el" placeholder="Top text" />
        <input type="text" className="input2-el" placeholder="Buttom text" />
      </div>
      <div className="get-btn">
        <button onClick={getMemeImage}>Get a new meme image 🌠</button>
      </div>
      <div className="img-holder">
        <img src={memeImage} />
        <p className="img-text-1">I work</p>
        <p className="img-text-2">hard!</p>
      </div>
      <div className="state--value">
        <h1></h1>
      </div>
    </div>
  );
}
