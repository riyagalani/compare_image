import React, { useState, useRef } from "react";
import {
  FaSyncAlt,
  FaArrowsAltH,
  FaArrowsAltV,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const ImageZoomOnHover = ({ src, width = 400, height = 300, flippedH = false, flippedV = false }) => {
  const [zoom, setZoom] = React.useState(false);
  const [offset, setOffset] = React.useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const zoomScale = 2;

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setOffset({ x: xPercent, y: yPercent });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
      style={{
        width,
        height,
        overflow: "hidden",
        borderRadius: "10px",
        cursor: "zoom-in",
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
      }}
    >
      <div style={{
        width: "100%",
        height: "100%",
        transform: `
          ${flippedH ? "scaleX(-1)" : ""}
          ${flippedV ? "scaleY(-1)" : ""}
        `,
        transformOrigin: "center",
      }}>
        <img
          src={src}
          alt="Zoomable"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.2s ease",
            transformOrigin: `${offset.x}% ${offset.y}%`,
            transform: `scale(${zoom ? zoomScale : 1})`,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

const ImageCompare = () => {
  const [images, setImages] = useState([]);
  const [beforeIndex, setBeforeIndex] = useState(0);
  const [afterIndex, setAfterIndex] = useState(1);

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

  const beforeImage = images[beforeIndex];
  const afterImage = images[afterIndex];

  return (
    <div className="container">
      <h2>Before / After Comparison</h2>

      <div className="input-section">
        <label>
          <strong>Select Images (Multiple):</strong>
        </label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </div>

      {beforeImage && afterImage ? (
        <div className="comparison">
          {/* Before */}
          <div className="image-box">
            <h3>Before</h3>
            <div className="image-wrapper">
              <ImageZoomOnHover
                src={beforeImage}
                width={400}
                height={300}
                flippedH={beforeFlipped}
                flippedV={beforeVFlipped}
              />
            </div>
            <div className="controls">
              <button onClick={() => changeIndex("before", "prev")} title="Previous">
                <FaArrowLeft />
              </button>
              <button onClick={() => changeIndex("before", "next")} title="Next">
                <FaArrowRight />
              </button>

              <button
                onClick={() => setBeforeFlipped(!beforeFlipped)}
                title="Flip Horizontally"
              >
                <FaArrowsAltH />
              </button>
              <button
                onClick={() => setBeforeVFlipped(!beforeVFlipped)}
                title="Flip Vertically"
              >
                <FaArrowsAltV />
              </button>
              <button
                onClick={() => {
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
              <ImageZoomOnHover
                src={afterImage}
                width={400}
                height={300}
                flippedH={afterFlipped}
                flippedV={afterVFlipped}
              />
            </div>
            <div className="controls">
              <button onClick={() => changeIndex("after", "prev")} title="Previous">
                <FaArrowLeft />
              </button>
              <button onClick={() => changeIndex("after", "next")} title="Next">
                <FaArrowRight />
              </button>

              <button
                onClick={() => setAfterFlipped(!afterFlipped)}
                title="Flip Horizontally"
              >
                <FaArrowsAltH />
              </button>
              <button
                onClick={() => setAfterVFlipped(!afterVFlipped)}
                title="Flip Vertically"
              >
                <FaArrowsAltV />
              </button>
              <button
                onClick={() => {
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