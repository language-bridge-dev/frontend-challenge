import { useRef, useState } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addImageToGallery } from "../redux/slices/imageSlice";

const Camara = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = isCameraActive ? "Take Photo" : "Start Camara";
  const dispatch = useDispatch();

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

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageUrl = canvasRef.current.toDataURL("image/png");
        dispatch(addImageToGallery(imageUrl));
      }
    }
  };

  return (
    <div className="camara-wrapper">
      {isCameraActive && (
        <video
          aria-label="Camera preview"
          ref={videoRef}
          autoPlay
          width="100%"
          height="auto"
        />
      )}
      <Button
        aria-pressed={isCameraActive}
        onClick={isCameraActive ? takePhoto : startCamera}
        text={text}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Camara;
