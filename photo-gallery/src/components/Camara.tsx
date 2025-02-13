import { useRef, useState } from "react";
import Button from "./Button";

const Camara = () => {
  const text = "Start camara";
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setIsCameraActive(false);
      alert("Unable to access the camera");
    }
  };

  return (
    <div className="camara-wrapper">
      {isCameraActive && (
        <video ref={videoRef} autoPlay width="100%" height="auto" />
      )}

      <Button onClick={startCamera} text={text} />
    </div>
  );
};

export default Camara;
