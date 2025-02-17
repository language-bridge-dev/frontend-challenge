import { JSX, useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.clientWidth;
      canvas.height = videoRef.current.clientHeight;
    }
  }, [isCameraActive]);

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
      // Create a temporary canvas to combine video and drawing
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");
      if (tempContext) {
        // Set the temporary canvas dimensions to match the video
        tempCanvas.width = videoRef.current.videoWidth;
        tempCanvas.height = videoRef.current.videoHeight;

        // draw video frame
        tempContext.drawImage(
          videoRef.current,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height
        );

        // draw canvas content
        const drawingContext = canvasRef.current.getContext("2d");
        if (drawingContext) {
          tempContext.drawImage(
            canvasRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
            0,
            0,
            tempCanvas.width,
            tempCanvas.height
          );
        }

        const imageUrl = tempCanvas.toDataURL("image/png");
        dispatch(addImageToGallery(imageUrl));
      }
    }
  };

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const stopDrawing = () => setIsDrawing(false);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setStartPos({ x, y });
    setIsDrawing(true);
  };

  const drawOnCamera = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const width = x - startPos.x;
    const height = y - startPos.y;

    context.strokeStyle = "yellow"; // Outline color
    context.lineWidth = 3;
    context.strokeRect(startPos.x, startPos.y, width, height);
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
          <canvas
            ref={canvasRef}
            style={{ display: isCameraActive ? "" : "none" }}
            className="canvas"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={drawOnCamera}
          />
        </div>
      )}
    </div>
  );
};

export default Camera;
