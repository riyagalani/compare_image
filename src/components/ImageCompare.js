import React, { useState } from "react";
import {FaPlus,FaMinus,FaSyncAlt,FaArrowsAltH,FaArrowsAltV,FaArrowLeft,FaArrowRight,} from "react-icons/fa";

const ImageCompare = () => {
  const [images, setImages] = useState([]);
  const [beforeIndex, setBeforeIndex] = useState(0);
  const [afterIndex, setAfterIndex] = useState(1);

  const [beforeZoom, setBeforeZoom] = useState(1);
  const [afterZoom, setAfterZoom] = useState(1);

  const [beforeFlipped, setBeforeFlipped] = useState(false);
  const [afterFlipped, setAfterFlipped] = useState(false);

  const [beforeVFlipped, setBeforeVFlipped] = useState(false);
  const [afterVFlipped, setAfterVFlipped] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls.slice(-10)); // Limit to last 10 images
    setBeforeIndex(0);
    setAfterIndex(1);
  };

  const beforeImage = images[beforeIndex];
  const afterImage = images[afterIndex];

  const changeIndex = (type, direction) => {
    if (type === "before") {
      setBeforeIndex((prev) =>
        direction === "prev"
          ? (prev - 1 + images.length) % images.length
          : (prev + 1) % images.length
      );
    } else {
      setAfterIndex((prev) =>
        direction === "prev"
          ? (prev - 1 + images.length) % images.length
          : (prev + 1) % images.length
      );
    }
  };

  return (
    <div className="container">
      <h2>Before / After Comparison</h2>

      <div className="input-section">
        <label><strong>Select Images (Multiple):</strong></label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </div>

      {beforeImage && afterImage ? (
        <div className="comparison">
          {/* Before */}
          <div className="image-box">
            <h3>Before</h3>
            <div className="image-wrapper">
              <img
                src={beforeImage}
                alt="Before"
                style={{
                  transform: `scale(${beforeZoom}) ${beforeFlipped ? "scaleX(-1)" : ""} ${beforeVFlipped ? "scaleY(-1)" : ""}`,
                }}
              />
            </div>
            <div className="controls">
              <button onClick={() => changeIndex("before", "prev")} title="Previous"><FaArrowLeft /></button>
              <button onClick={() => changeIndex("before", "next")} title="Next"><FaArrowRight /></button>
              <button onClick={() => setBeforeZoom(beforeZoom + 0.1)} title="Zoom In"><FaPlus /></button>
              <button onClick={() => setBeforeZoom(Math.max(0.1, beforeZoom - 0.1))} title="Zoom Out"><FaMinus /></button>
              <button onClick={() => setBeforeFlipped(!beforeFlipped)} title="Flip Horizontally"><FaArrowsAltH /></button>
              <button onClick={() => setBeforeVFlipped(!beforeVFlipped)} title="Flip Vertically"><FaArrowsAltV /></button>
              <button
                onClick={() => {
                  setBeforeZoom(1);
                  setBeforeFlipped(false);
                  setBeforeVFlipped(false);
                }}
                title="Reset"
              >
                <FaSyncAlt />
              </button>
            </div>
          </div>

          {/* After */}
          <div className="image-box">
            <h3>After</h3>
            <div className="image-wrapper">
              <img
                src={afterImage}
                alt="After"
                style={{
                  transform: `scale(${afterZoom}) ${afterFlipped ? "scaleX(-1)" : ""} ${afterVFlipped ? "scaleY(-1)" : ""}`,
                }}
              />
            </div>
            <div className="controls">
              <button onClick={() => changeIndex("after", "prev")} title="Previous"><FaArrowLeft /></button>
              <button onClick={() => changeIndex("after", "next")} title="Next"><FaArrowRight /></button>
              <button onClick={() => setAfterZoom(afterZoom + 0.1)} title="Zoom In"><FaPlus /></button>
              <button onClick={() => setAfterZoom(Math.max(0.1, afterZoom - 0.1))} title="Zoom Out"><FaMinus /></button>
              <button onClick={() => setAfterFlipped(!afterFlipped)} title="Flip Horizontally"><FaArrowsAltH /></button>
              <button onClick={() => setAfterVFlipped(!afterVFlipped)} title="Flip Vertically"><FaArrowsAltV /></button>
              <button
                onClick={() => {
                  setAfterZoom(1);
                  setAfterFlipped(false);
                  setAfterVFlipped(false);
                }}
                title="Reset"
              >
                <FaSyncAlt />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Please select at least two images for comparison.</p>
      )}
    </div>
  );
};

export default ImageCompare;