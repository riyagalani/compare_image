// ImageCompare.jsx
import React, { useState } from "react";
// import "./ImageCompare.css";
import {
  FaPlus,
  FaMinus,
  FaSyncAlt,
  FaArrowsAltH,
  FaArrowsAltV
} from "react-icons/fa";

const ImageCompare = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const [beforeZoom, setBeforeZoom] = useState(1);
  const [afterZoom, setAfterZoom] = useState(1);

  const [beforeFlipped, setBeforeFlipped] = useState(false);
  const [afterFlipped, setAfterFlipped] = useState(false);

  const [beforeVFlipped, setBeforeVFlipped] = useState(false);
  const [afterVFlipped, setAfterVFlipped] = useState(false);

  const handleBeforeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeforeImage(URL.createObjectURL(file));
    }
  };

  const handleAfterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAfterImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container">
      <h2>Before / After Comparison</h2>

      <div className="input-section">
        <div>
          <label><strong>Before Image:</strong></label>
          <input type="file" accept="image/*" onChange={handleBeforeChange} />
        </div>
        <div>
          <label><strong>After Image:</strong></label>
          <input type="file" accept="image/*" onChange={handleAfterChange} />
        </div>
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
              <button onClick={() => setBeforeZoom(beforeZoom + 0.1)} title="Zoom In"><FaPlus /></button>
              <button onClick={() => setBeforeZoom(Math.max(0.1, beforeZoom - 0.1))} title="Zoom Out"><FaMinus /></button>
              <button onClick={() => setBeforeFlipped(!beforeFlipped)} title="Flip Horizontally"><FaArrowsAltH /></button>
              <button onClick={() => setBeforeVFlipped(!beforeVFlipped)} title="Flip Vertically"><FaArrowsAltV /></button>
              <button onClick={() => {
                setBeforeZoom(1);
                setBeforeFlipped(false);
                setBeforeVFlipped(false);
              }} title="Reset"><FaSyncAlt /></button>
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
              <button onClick={() => setAfterZoom(afterZoom + 0.1)} title="Zoom In"><FaPlus /></button>
              <button onClick={() => setAfterZoom(Math.max(0.1, afterZoom - 0.1))} title="Zoom Out"><FaMinus /></button>
              <button onClick={() => setAfterFlipped(!afterFlipped)} title="Flip Horizontally"><FaArrowsAltH /></button>
              <button onClick={() => setAfterVFlipped(!afterVFlipped)} title="Flip Vertically"><FaArrowsAltV /></button>
              <button onClick={() => {
                setAfterZoom(1);
                setAfterFlipped(false);
                setAfterVFlipped(false);
              }} title="Reset"><FaSyncAlt /></button>
            </div>
          </div>
        </div>
      ) : (
        <p>Please upload both "Before" and "After" images to compare.</p>
      )}
    </div>
  );
};

export default ImageCompare;
