import React, { useState, useEffect } from "react";

export default function Form() {
  const [memeData, setmemeData] = useState([]);
  const [formData, setFormData] = useState({
    topText: "",
    bottomText: "",
    memeImage: "",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((resp) => resp.json())
      .then((data) => setmemeData(data.data.memes));
  }, []);

  function GetMemeImage() {
    const randomIndex = Math.floor(Math.random() * memeData.length);
    const url = memeData[randomIndex].url;
    setFormData((prevformData) => ({
      ...prevformData,
      memeImage: url,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prevformData) => ({ ...prevformData, [name]: value }));
  }
  return (
    <div>
      <form>
        <input
          className="margin"
          type="txt"
          placeholder="Top text"
          name="topText"
          onChange={handleChange}
          value={formData.topText}
        />

        <input
          type="txt"
          placeholder="Bottom text"
          name="bottomText"
          onChange={handleChange}
          value={formData.bottomText}
        />
      </form>
      <button onClick={GetMemeImage}>Get New meme image</button>
      <div className="container">
        <div className="image-container">
          <img className="img" src={formData.memeImage} alt="Meme" />
          <h1 className="topText">{formData.topText}</h1>
          <h2 className="bottomText">{formData.bottomText}</h2>
        </div>
      </div>
    </div>
  );
}
