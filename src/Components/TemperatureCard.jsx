import React, { useState, useRef } from "react";

function WebcamCapture() {
  const [imageSrc, setImageSrc] = useState("");
  const videoRef = useRef(null);

  const handleStartCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/jpeg"); // or "image/png" for PNG format
    setImageSrc(dataURL);
    
  };
  console.log(imageSrc)
  return (
    <div>
      <div>
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
      <div>
        <button onClick={handleStartCapture}>Start Webcam</button>
        <button onClick={handleCapture}>Capture Photo</button>
      </div>
      {imageSrc && (
        <div>
          <h2>Captured Photo:</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </div>
  );
}

export default WebcamCapture;
