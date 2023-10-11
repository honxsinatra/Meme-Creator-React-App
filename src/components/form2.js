import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

export default function Form() {
  const [memeData, setMemeData] = useState([]);
  const [formData, setFormData] = useState({
    topText: "",
    bottomText: "",
    memeImage: "",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((resp) => resp.json())
      .then((data) => setMemeData(data.data.memes));
  }, []);

  function GetMemeImage() {
    const randomIndex = Math.floor(Math.random() * memeData.length);
    const url = memeData[randomIndex].url;
    setFormData((prevFormData) => ({
      ...prevFormData,
      memeImage: url,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prevformData) => ({ ...prevformData, [name]: value }));
  }

  // DraggableText component
  function DraggableText({ text, name }) {
    const [, ref] = useDrag({
      type: "text",
      item: { text, name },
    });

    const [, drop] = useDrop({
      accept: "text",
      drop: (item) => {
        handleTextChange(item.name, text);
      },
    });

    return (
      <h1 className="topText" ref={(node) => ref(drop(node))}>
        {text}
      </h1>
    );
  }

  // Handle text changes when dropped
  function handleTextChange(name, text) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: text,
    }));
  }

  return (
    <div>
      <form>
        <input
          className="margin"
          type="text"
          placeholder="Top text"
          name="topText"
          onChange={handleChange}
          value={formData.topText}
        />

        <input
          type="text"
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
          <DraggableText
            text={formData.topText}
            name="topText"
            className="topText"
          />
          <DraggableText
            text={formData.bottomText}
            name="bottomText"
            className="bottomText"
          />
        </div>
      </div>
    </div>
  );
}
