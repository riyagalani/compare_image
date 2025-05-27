import React, { useState } from "react";
import ReactCompareImage from "react-compare-image";
import "./ImageCompare.css";

const imagePairs = [
  {
    before: "/images/img1.jpg",
    after: "/images/img2.jpg",
    label: "Comparison 1",
  },
  {
    before: "/images/img3.jpg",
    after: "/images/img4.jpg",
    label: "Comparison 2",
  },
  {
    before: "/images/img5.jpg",
    after: "/images/img6.jpg",
    label: "Comparison 3",
  },
];

const ImageCompare = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const { before, after, label } = imagePairs[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imagePairs.length);
    setZoom(1);
  };

  const handlePrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? imagePairs.length - 1 : prev - 1
    );

  const zoomIn = () => setZoom((prev) => prev + 0.2);
  const zoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.2));

  return (
    <div className="slider-container">
      <h2>{label}</h2>

      <div className="compare-wrapper">
        <ReactCompareImage
          leftImage={before}
          rightImage={after}
          leftImageCss={{
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease",
          }}
          rightImageCss={{
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      <div className="controls">
        <div className="zoom-buttons">
          <button onClick={zoomOut}>➖ Zoom Out</button>
          <button onClick={zoomIn}>➕ Zoom In</button>
        </div>
        <div className="switch-buttons">
          <button onClick={handlePrev}>⬅ Previous</button>
          <button onClick={handleNext}>Next ➡</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCompare;
