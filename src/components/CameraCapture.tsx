import { useState, useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { FiCameraOff } from 'react-icons/fi';
import { Photo } from '../../types';

const CameraCapture = ({ setPhotos }: { setPhotos: React.Dispatch<React.SetStateAction<Photo[]>> }) => {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((error) => console.error('Error playing video:', error));
    }
  }, [isCameraActive]);

  const startCamera = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = userStream;
      setIsCameraActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const maxWidth = 800;
        const scaleFactor = maxWidth / videoRef.current.videoWidth;

        canvas.width = maxWidth;
        canvas.height = videoRef.current.videoHeight * scaleFactor;

        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        const newPhoto: Photo = { id: crypto.randomUUID(), src: compressedDataUrl };
        setPhotos((prevPhotos) => {
          return [newPhoto, ...prevPhotos];
        });
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraActive(false);
      streamRef.current = null;
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-900 h-screen w-screen p-10 min-w-72">
      <div className="flex justify-center items-center rounded-lg bg-slate-700 h-full w-full relative">
        {!isCameraActive ? (
          <button
            onClick={startCamera}
            className="flex items-center gap-1 px-6 py-2 font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:cursor-pointer"
          >
            <FaCamera />
            Start Camera
          </button>
        ) : (
          <div className="w-full h-full ">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-contain" />
            <div className="absolute bottom-2 right-1/128 flex">
              <button
                onClick={takePhoto}
                aria-label="Take Photo"
                className="flex items-center gap-2 px-4 py-1 mx-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:cursor-pointer transition-colors duration-200"
              >
                <FaCamera />
                Take Photo
              </button>
              <button
                onClick={stopCamera}
                aria-label="Stop Camera"
                className="px-4 py-1 bg-red-700 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer transition-colors duration-200"
              >
                <FiCameraOff />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
