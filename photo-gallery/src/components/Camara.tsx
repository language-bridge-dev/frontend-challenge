import { JSX, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImageToGallery } from "../redux/slices/imageSlice";
import Button from "./Button";
import { RootState } from "../redux/store";

/**
 * Camera component that allows the user to start the camera and take photos.
 * The captured photo is saved to the gallery in the Redux store.
 *
 * @returns The Camera component.
 */
const Camera = (): JSX.Element => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();
  const imageToShow = useSelector(
    (state: RootState) => state.gallery.imageToShow
  );

  /**
   * Starts the camera by accessing the user's media devices.
   * Sets the camera stream to the video element.
   */
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setIsCameraActive(false);
      alert("Unable to access the camera");
    }
  };

  /**
   * Captures a photo from the video stream and saves it to the gallery.
   * Draws the current frame of the video onto a canvas and dispatches the image data URL.
   */
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current?.videoWidth || 0;
        canvasRef.current.height = videoRef.current?.videoHeight || 0;
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
    <div className="camera">
      {imageToShow ? (
        <img src={imageToShow} alt="Captured" />
      ) : (
        <div className="video-wrapper">
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
            text={isCameraActive ? "Take Photo" : "Start Camera"}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
};

export default Camera;
