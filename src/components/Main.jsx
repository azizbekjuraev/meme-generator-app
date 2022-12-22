import memeData from "../memeData";
export default function () {
  let url;
  function getMemeImage() {
    const memesArr = memeData.data.memes;
    const randomNum = Math.floor(Math.random() * memesArr.length);
    url = memesArr[randomNum].url;

    console.log(url);
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
        <img src="./img/memeimg.png" />
      </div>
    </div>
  );
}
