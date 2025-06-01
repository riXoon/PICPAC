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

const filters = [
  {filterName: 'None', value: 'none'},
  {filterName: 'Gray', value: 'grayscale(1)'},
  {filterName: 'Sepia', value: 'sepia(1)'},
  {filterName: 'Blur', value: 'blur(3px)'},
  {filterName: 'Brightness', value: 'brightness(1.4)'},
  {filterName: 'Contrast', value: 'contrast(1.5)'},
]

export default function Photobooth() {
  const location = useLocation();
  const navigate = useNavigate();
  const layoutId = location.state?.layoutId;

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
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('none')
  const countdownRef = useRef(null);
  const photoTakenRef = useRef(false);

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
    if (hasStarted && currentShot < photoCount && isVideoReady) {
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
  }, [currentShot, isVideoReady, photoCount, hasStarted]);

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
    
    context.filter = selectedFilter;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");

    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    setCapturedPhotos((prev) => [...prev, dataURL]);
    setCurrentShot((prev) => prev + 1);
  };

  const handleRetake = () => {
    setCapturedPhotos([]);
    setCurrentShot(0);
    setCountdown(5);
    setHasStarted(false);
    photoTakenRef.current = false;
  };

  const handleDone = () => {
    console.log("Final photos:", capturedPhotos);
  };

  if (!layoutId) return null;

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative">
      <div className="flex flex-row gap-6 items-start">
        <div className="relative w-full sm:w-[600px] md:w-[800px] lg:w-[1200px] aspect-video">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onLoadedMetadata={handleVideoReady}
            className= 'w-full h-full rounded-lg border-4 border-white object-cover -transform -scale-x-100 '
            style= {{filter:selectedFilter}}
          />


          {flash && (
            <div className="absolute inset-0 bg-white opacity-80 animate-fade-out rounded-lg pointer-events-none"></div>
          )}

          {countdown > 0 && hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-[100px] font-bold drop-shadow-lg animate-scale-pulse">
                {countdown}
              </div>
            </div>
          )}

          {!hasStarted && (
            <button
              onClick={() => setHasStarted(true)}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-white border-4 border-gray-400 shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300"
              aria-label="Start Capture"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          {capturedPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Captured ${index + 1}`}
              className="w-45 h-32 object-cover rounded border animate-slide-in-right -transform -scale-x-100"
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

      <div className="mt-4 flex gap-4 overflow-x-auto max-w-full px-2 items-center justify-center">
            {filters.map((filter) => (
              <button
                key={filter.filterName}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${
                  selectedFilter === filter.value
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {filter.filterName}
              </button>
            ))}
          </div>
    </div>
  );
}
