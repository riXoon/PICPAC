import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { layoutPhotoCount } from "../data/layouts";
import LayoutA from "../components/layouts/LayoutA";
import LayoutB from "../components/layouts/LayoutB";
import LayoutC from "../components/layouts/LayoutC";
import LayoutD from "../components/layouts/LayoutD";

//filters import 
import Filter1 from "../assets/filters/filter-none.png"
import Filter2 from "../assets/filters/filter-gray.png"
import Filter3 from "../assets/filters/filter-blur.png"
import Filter4 from "../assets/filters/filter-brightness.png"
import Filter5 from "../assets/filters/filter-sepia.png"
import Filter6 from "../assets/filters/filter-contrast.png"
import Filter7 from "../assets/filters/filter-vintage.png"
import Filter8 from "../assets/filters/filter-peachy.png"
import Filter9 from "../assets/filters/filter-dreamy.png"
import Filter10 from "../assets/filters/filter-golderhour.png"
import Filter11 from "../assets/filters/filter-indiekid.png"
import Filter12 from "../assets/filters/filter-polaroid.png"
import Filter13 from "../assets/filters/filter-retro.png"
import Filter14 from "../assets/filters/filter-washedout.png"


const layoutComponents = {
  A: LayoutA,
  B: LayoutB,
  C: LayoutC,
  D: LayoutD,
};

const filters = [
  {filterName: 'None', value: 'none', image: Filter1},
  {filterName: 'Vintage', value: 'sepia(0.6) contrast(1.2) brightness(0.9)', image: Filter7},
  {filterName: 'Gray', value: 'grayscale(1)', image: Filter2},
  {filterName: 'Noir', value: 'grayscale(1) contrast(1.3)', image: Filter8},
  {filterName: 'Blur', value: 'blur(3px)', image: Filter3},
  {filterName: 'Washed Out', value: 'brightness(1.2) contrast(0.8)', image: Filter14},
  {filterName: 'Brightness', value: 'brightness(1.4)', image: Filter4},
  {filterName: 'Sepia', value: 'sepia(1)', image: Filter5},
  {filterName: 'Contrast', value: 'contrast(1.5)', image: Filter6},
  {filterName: "Polaroid", value: "sepia(0.3) contrast(0.8) brightness(1.05)", image: Filter12},
  {filterName: "Retro", value: "sepia(0.3) contrast(0.9) brightness(1.1)", image: Filter13 },
  {filterName: "Indie Kid", value: "saturate(1.3) hue-rotate(30deg) contrast(1.1)", image: Filter11 },
  {filterName: "Dreamy", value: "brightness(1.1) blur(1px) contrast(0.9)", image: Filter9 },
  {filterName: "Muted", value: "saturate(0.6) contrast(0.9)",  },
  {filterName: "Golden Hour", value: "sepia(0.4) brightness(1.1) contrast(1.05)",image: Filter10 },
  {filterName: "Peachy", value: "sepia(0.2) hue-rotate(-10deg) brightness(1.2)", image: Filter8 },
  
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

      <h1 className="text-lg text-[#6A6A6A] font-semibold tracking-wide mt-3">Choose Filter</h1>
    <div className="mt-4 grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto max-w-full px-2 items-center justify-center">
           {filters.map((filter) => (
            <button
              key={filter.filterName}
              onClick={() => setSelectedFilter(filter.value)}
              className="cursor-pointer relative w-17 h-17 flex-shrink-0 rounded-2xl border-3 overflow-hidden group transition-all duration-300 focus:outline-none"
              style={{
                borderColor: selectedFilter === filter.value ? "#6366F1" : "#e5e7eb",
              }}
            >
              <img
                src={filter.image}
                alt={filter.filterName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[12px] font-medium">
                {filter.filterName}
              </div>
            </button>
          ))}
          </div>
    </div>
  );
}
