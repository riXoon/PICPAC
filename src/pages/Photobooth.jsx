import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { layoutPhotoCount } from "../data/layouts";
import Modal from "../components/Modal";
import LayoutA from "../components/layouts/LayoutA";
import LayoutB from "../components/layouts/LayoutB";
import LayoutC from "../components/layouts/LayoutC";
import LayoutD from "../components/layouts/LayoutD";
import { filters } from "../data/photobooth";


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
  const [selectedPhotoIndexes, setSelectedPhotoIndexes] = useState([]);
  const [retakeMode, setRetakeMode] = useState(false);
  const [retakeQueue, setRetakeQueue] = useState([]);
  const countdownRef = useRef(null);
  const photoTakenRef = useRef(false);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const [dismissed, setDismissed] = useState(false);



  const [modal, setModal] = useState({
    show: false,
    message: "",
    onConfirm: null,
  })

  useEffect(() => {
  const handleResize = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  window.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("orientationchange", handleResize);
  };
}, []);




 
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
    let shouldStartCountdown = false;

    if (hasStarted && isVideoReady) {
      if (retakeQueue.length > 0) {
        shouldStartCountdown = true;
      } else if (currentShot < photoCount) {
        shouldStartCountdown = true;
      }
    }

    if (shouldStartCountdown) {
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
  }, [hasStarted, isVideoReady, currentShot, photoCount, retakeQueue]);



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

    if (retakeQueue.length > 0) {
      const indexToReplace = retakeQueue[0];

      setCapturedPhotos((prev) =>
        prev.map((photo, idx) => (idx === indexToReplace ? dataURL : photo))
      );

      setRetakeQueue((prev) => prev.slice(1));

      if (retakeQueue.length === 1) {
        // All done retaking
        setHasStarted(false);
      }
    } else {
      setCapturedPhotos((prev) => [...prev, dataURL]);
      setCurrentShot((prev) => prev + 1);
    }
  };



  const handleRetake = () => {
    if (!retakeMode) {
      setModal({
        show: true,
        message:
          "Select the photo(s) you want to retake by clicking on them.\nThen press Retake again to begin.",
        onConfirm: () => setRetakeMode(true),
      });
      return;
    }


    if (selectedPhotoIndexes.length === 0) {
      setModal({
        show: true,
        message: "No photo selected.\nPlease select one or more photos to retake.",
      });
      return;
    }


    // Begin retaking process
    setRetakeQueue([...selectedPhotoIndexes]);
    setSelectedPhotoIndexes([]);
    setRetakeMode(false);
    setHasStarted(true);
  };

  const handleRetakeConfirm = () => {
  setModal(false);
  setRetakeMode(true); // enter retake selection mode
};


  const handleDone = () => {
  navigate("/customization", {
    state: {
      capturedPhotos,
      layoutId,
    },
  });
};


  if (!layoutId) return null;



  return (
    
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative">
      <AnimatePresence>
        {isPortrait && window.innerWidth < 768 && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white text-gray-800 rounded-xl shadow-xl p-6 max-w-sm w-full flex flex-col items-center gap-4"
            >
              {/* Animated phone icon */}
              <motion.div
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl"
              >
                📱
              </motion.div>

              <h2 className="text-xl font-bold">Rotate Your Phone</h2>
              <p className="text-sm">For the best experience, you can rotate your device to landscape mode to capture your best shot!</p>

              <button
                onClick={() => setDismissed(true)}
                className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
          {/* Video Feed */}
          <div className="relative w-full max-w-[95vw] sm:w-[600px] md:w-[800px] lg:w-[1200px] aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              onLoadedMetadata={handleVideoReady}
              className="w-full h-full rounded-lg border-4 border-white object-cover -scale-x-100"
              style={{ filter: selectedFilter }}
            />

            {flash && (
              <div className="absolute inset-0 bg-white opacity-80 animate-fade-out rounded-lg pointer-events-none"></div>
            )}

            {countdown > 0 && hasStarted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-[80px] sm:text-[100px] font-bold drop-shadow-lg animate-scale-pulse">
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

          {/* Captured Thumbnails */}
          <div className="flex flex-wrap sm:flex-col gap-2 justify-center items-center sm:items-start sm:max-h-[600px] overflow-y-auto">
            {capturedPhotos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Captured ${index + 1}`}
                className={`w-24 h-20 sm:w-40 sm:h-32 object-cover rounded border cursor-pointer animate-slide-in-right -scale-x-100 ${
                  selectedPhotoIndexes.includes(index)
                    ? "border-indigo-500 border-4"
                    : "border"
                }`}
                onClick={() => {
                  if (!retakeMode) return;
                  setSelectedPhotoIndexes((prev) =>
                    prev.includes(index)
                      ? prev.filter((i) => i !== index)
                      : [...prev, index]
                  );
                }}
              />
            ))}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {capturedPhotos.length === photoCount && (
          <div className="flex gap-4 items-center justify-center mt-6 flex-wrap">
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

        <h1 className="text-lg text-[#6A6A6A] font-semibold tracking-wide mt-6">Choose Filter</h1>
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 px-4 justify-center max-w-full">
          {filters.map((filter) => (
            <button
              key={filter.filterName}
              onClick={() => setSelectedFilter(filter.value)}
              className="cursor-pointer relative w-20 h-20 flex-shrink-0 rounded-2xl border-4 overflow-hidden group transition-all duration-300 focus:outline-none"
              style={{
                borderColor: selectedFilter === filter.value ? "#6366F1" : "#e5e7eb",
              }}
            >
              <img
                src={filter.image}
                alt={filter.filterName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium text-center px-1">
                {filter.filterName}
              </div>
            </button>
          ))}
        </div>

        <Modal
          show={modal.show}
          title="Retake Photos"
          message={modal.message}
          onConfirm={modal.onConfirm}
          onClose={() => setModal((prev) => ({ ...prev, show: false }))}
        />
      </div>

  );
}
