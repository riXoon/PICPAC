import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { layoutPhotoCount } from "../data/layouts";
import LayoutA from "../components/layouts/LayoutA";
import LayoutB from "../components/layouts/LayoutB";
import LayoutC from "../components/layouts/LayoutC";
import LayoutD from "../components/layouts/LayoutD";

const layoutComponents = {
  A: LayoutA,
  B: LayoutB,
  C: LayoutC,
  D: LayoutD,
};

export default function Photobooth() {
  const location = useLocation();
  const navigate = useNavigate();
  const layoutId = location.state?.layoutId;

  // Redirect if no layoutId is present (e.g., page reload or direct access)
  useEffect(() => {
    if (!layoutId) {
      navigate("/layout-selection");
    }
  }, [layoutId, navigate]);

  const PhotoLayout = layoutComponents[layoutId] || LayoutA;
  const [photoCount, setPhotoCount] = useState(3);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [currentShot, setCurrentShot] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [flash, setFlash] = useState(false);
  const countdownRef = useRef(null);
  const photoTakenRef = useRef(false); //prevent double capture

  useEffect(() => {
    if (layoutId && layoutPhotoCount[layoutId]) {
      setPhotoCount(layoutPhotoCount[layoutId]);
    }
  }, [layoutId]);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Failed to access the camera:", error);
      }
    };
    initCamera();
  }, []);

  const handleVideoReady = () => {
    setIsVideoReady(true);
  };

  useEffect(() => {
    if (currentShot < photoCount && isVideoReady) {
      setCountdown(5);
      photoTakenRef.current = false;

      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownRef.current);
            if (!photoTakenRef.current) {
              photoTakenRef.current = true;
              takePhoto();
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdownRef.current);
  }, [currentShot, isVideoReady, photoCount]);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (canvas.width === 0 || canvas.height === 0) {
      console.warn("Video not ready for capture.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");

    // Show flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 150); // flash duration

    setCapturedPhotos((prev) => [...prev, dataURL]);
    setCurrentShot((prev) => prev + 1);
  };

  const handleRetake = () => {
    setCapturedPhotos([]);
    setCurrentShot(0);
    setCountdown(5);
    photoTakenRef.current = false;
  };

  const handleDone = () => {
    console.log("Final photos:", capturedPhotos);
  };

  // If no layoutId (while redirecting), avoid rendering anything to prevent flicker
  if (!layoutId) return null;

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-row gap-6 items-start">
        <div className="relative w-[800px] h-[500px]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onLoadedMetadata={handleVideoReady}
            className="w-full h-full rounded-lg border-4 border-white object-cover"
          />

          {/* Flash Effect */}
          {flash && (
            <div className="absolute inset-0 bg-white opacity-80 animate-fade-out rounded-lg pointer-events-none"></div>
          )}

          {/* Countdown */}
          {countdown > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-[100px] font-bold drop-shadow-lg animate-pulse">
                {countdown}
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex flex-col gap-2">
          {capturedPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Captured ${index + 1}`}
              className="w-45 h-32 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {capturedPhotos.length === photoCount && (
        <div className="flex gap-4 items-center justify-center mt-6">
          <button
            onClick={handleRetake}
            className="text-lg text-indigo-500 font-semibold border border-2 px-8 py-3 rounded-lg transition-transform transform duration-400 cursor-pointer hover:scale-105 active:scale-95"
          >
            Retake
          </button>
          <button
            onClick={handleDone}
            className="text-lg text-white bg-indigo-500 font-semibold border border-2 px-8 py-3 rounded-lg transition-transform transform duration-400 cursor-pointer hover:scale-105 active:scale-95"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
