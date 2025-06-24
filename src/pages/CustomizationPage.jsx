import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';


import ColorPicker from '../components/ColorPicker';
import { allTemplate, allOverlays, preview, fontPreviews, presetColors, presetTextColors } from '../data/customization';



function CustomizationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const capturedPhotos = location.state?.capturedPhotos || [];
  const layoutId = location.state?.layoutId || 'A';

  const [layoutType, setLayoutType] = useState(layoutId);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const selectedFrame = allTemplate[layoutType][selectedFrameIndex];
  const [textColor, setTextColor] = useState('#337CCF');

  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgMode, setBgMode] = useState('color');

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [modal, setModal] = useState({
  show: false,
  message: '',
  onConfirm: null,
});


  const [overlay, setOverlay] = useState(0);

  const [customFont, setCustomFont] = useState('bold 20px Fredoka, sans-serif');

  useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  const canvasWidth = 300;
  const canvasHeight = 700;

  const layoutWidth = {
    A: 300,
    B: 300,
    C: 300,
    D: 550,
  };

  canvas.width = layoutWidth[layoutType] || 300;
  canvas.height = canvasHeight;

  const drawImageInBox = (img, box, ctx) => {
  const imgRatio = img.width / img.height;
  const boxRatio = box.width / box.height;

  let drawWidth, drawHeight;

  if (imgRatio > boxRatio) {
    drawHeight = box.height;
    drawWidth = imgRatio * box.height;
  } else {
    drawWidth = box.width;
    drawHeight = box.width / imgRatio;
  }

  const offsetX = (box.width - drawWidth) / 2;
  const offsetY = (box.height - drawHeight) / 2;

  ctx.drawImage(
    img,
    0, 0, img.width, img.height,
    offsetX, offsetY,
    drawWidth,
    drawHeight
  );
};


  const drawPhotos = () => {
    const boxes = {
      A: [
        { x: 20, y: 20, width: 260, height: 165 },
        { x: 20, y: 200, width: 260, height: 165 },
        { x: 20, y: 380, width: 260, height: 165 },
      ],
      B: [
        { x: 20, y: 20, width: 260, height: 130 },
        { x: 20, y: 160, width: 260, height: 130 },
        { x: 20, y: 300, width: 260, height: 130 },
        { x: 20, y: 440, width: 260, height: 130 },
      ],
      C: [
        { x: 20, y: 20, width: 260, height: 250 },
        { x: 20, y: 300, width: 260, height: 250 },
      ],
      D: [
        { x: 20, y: 20, width: 250, height: 165 },
        { x: 280, y: 20, width: 250, height: 165 },
        { x: 20, y: 195, width: 250, height: 165 },
        { x: 280, y: 195, width: 250, height: 165 },
        { x: 20, y: 370, width: 250, height: 165 },
        { x: 280, y: 370, width: 250, height: 165 },
      ],
    }[layoutType] || [];

    photos.forEach((photo, index) => {
      const box = boxes[index];
      if (box) {
        ctx.save();
        ctx.translate(box.x + box.width, box.y);
        ctx.scale(-1, 1); // mirror effect
        ctx.beginPath();
        ctx.rect(0, 0, box.width, box.height);
        ctx.clip();
        drawImageInBox(photo, box, ctx);
        ctx.restore();
      }
    });

    const textPositions = {
      A: canvasHeight - 110,
      B: canvasHeight - 60,
    };

    const textY = textPositions[layoutType] || canvasHeight - 75;

    const dateTextX = {
      A: 150,
      B: 150,
      C: 150,
      D: 275,
    }

    const dateX = dateTextX[layoutType] || 150;

    //overlay adjustment
    const overlayPlacement = {
      A: { x: 10, y: 10, width: 280, height: 605 },
      B: { x: 15, y: 15, width: 270, height: 605 },
      C: { x: 20, y: 5, width: 260, height: 615 },
      D: { x: -7, y: -20, width: 570, height: 675 },
    };

    if (overlay) {
      const overlayImage = new Image();
      const now = new Date();
      overlayImage.src = overlay;

      overlayImage.onload = () => {
        const placement = overlayPlacement[layoutType];

        if (placement) {
          ctx.drawImage(
            overlayImage,
            placement.x,
            placement.y,
            placement.width,
            placement.height
          );
        }

        // Draw text/logo after overlay
        ctx.fillStyle = textColor;
        ctx.font = customFont;
        ctx.textAlign = 'center';
        ctx.fillText('P!CPAC', layoutWidth[layoutType] / 2, canvasHeight - 65);

          if (showDate) {
          ctx.fillStyle = '#6A6A6A';
          ctx.font = '12px Fredoka, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(now.toLocaleDateString(), dateX, canvasHeight - 40);
        }
      };
    } else {
      // No overlay, draw text/logo directly
      const now = new Date();

      ctx.fillStyle = textColor;
      ctx.font = customFont;
      ctx.textAlign = 'center';
      ctx.fillText('P!CPAC', layoutWidth[layoutType] / 2, textY);

        if (showDate) {
        ctx.fillStyle = '#6A6A6A';
        ctx.font = '12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(now.toLocaleDateString(), dateX, canvasHeight - 50);
        }
    }   

  };

  const photos = capturedPhotos.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  let loadedCount = 0;
  const totalToLoad = photos.length;

  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount === totalToLoad) {
      if (bgMode === 'color') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, layoutWidth[layoutType], canvasHeight);
        drawPhotos();
      } else if (bgMode === 'image') {
        const bgImage = new Image();
        bgImage.src = selectedFrame?.background;
        bgImage.onload = () => {
          drawImageInBox(bgImage, {
            x: 0,
            y: 0,
            width: layoutWidth[layoutType],
            height: canvasHeight,
          }, ctx);
          drawPhotos();
        };
      }
    }
  };

  photos.forEach((photo) => (photo.onload = checkAllLoaded));
}, [bgColor, selectedFrame, bgMode, textColor, customFont, overlay, showDate]);

  const exportHDCanvas = () => {
    const displayCanvas = canvasRef.current;
    const scale = 2; // Change to 3 for ultra-HD
    const layoutWidth = {
      A: 300,
      B: 300,
      C: 300,
      D: 550,
    };
    const canvasWidth = layoutWidth[layoutType];
    const canvasHeight = 700;

    // Create an off-screen canvas
    const hdCanvas = document.createElement("canvas");
    hdCanvas.width = canvasWidth * scale;
    hdCanvas.height = canvasHeight * scale;
    const ctx = hdCanvas.getContext("2d");

    // Scale drawing context
    ctx.scale(scale, scale);

    // Reuse the same drawing logic
    const clone = canvasRef.current;
    ctx.drawImage(clone, 0, 0);

    // Export image
    hdCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "p!cpac_photo_hd.png";
      link.href = url;
      link.click();
    }, "image/png", 1);
  };




  return (
    <div className="bg-[#D1E9F6] min-h-screen p-8 sm:p-6">
  <h1 className="text-2xl text-gray-500 font-bold tracking-wider text-center mt-4">
    customize your photo
  </h1>

  {/* Layout container: column on small, row on lg+ */}
  <div className="flex flex-col lg:flex-row gap-8 mt-6 items-start justify-start ">
    
    {/* Canvas Preview */}
    <div className="w-full lg:w-auto flex justify-center">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-300 shadow-lg tracking-widest max-w-full h-auto"
      />
    </div>

    {/* Customization Controls */}
    <div className="w-full lg:w-[980px] flex flex-col gap-4 mt-4 lg:mt-0 font-semibold tracking-wide">
      
      {/* Frame color */}
      <h1 className="text-md text-gray-500">Frame Color:</h1>
      <div className="flex flex-wrap gap-2 justify-start">
        <ColorPicker bgColor={bgColor} setBgColor={setBgColor} setBgMode={setBgMode} />
        {presetColors.map((color, index) => (
          <button
            key={index}
            onClick={() => {
              setBgColor(color);
              setBgMode('color');
            }}
            className={`w-13 h-13 rounded-lg border-2 ${
              bgColor === color && bgMode === 'color'
                ? 'border-indigo-500'
                : 'border-gray-300'
            } cursor-pointer`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Frame background templates */}
      <h1 className="text-md text-gray-500">Frame Background:</h1>
      <div className="flex flex-wrap gap-2 justify-start">
        {allTemplate[layoutType].map((frame, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedFrameIndex(index);
              setBgMode('image');
            }}
            className={`w-13 h-13 rounded-lg border-2 ${
              selectedFrameIndex === index && bgMode === 'image'
                ? 'border-indigo-500'
                : 'border-gray-300'
            } cursor-pointer`}
            style={{
              backgroundImage: `url(${frame.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* Overlays */}
      <h1 className='text-md text-gray-500'>Stickers:</h1>
      <div className="flex flex-wrap gap-2 justify-start">
        {preview[layoutType].map((overlayItem, index) => (
          <button
            key={index}
            onClick={() => setOverlay(allOverlays[layoutType][index]?.overlay || null)}
            className={`w-13 h-13 rounded-lg border-2 bg-white ${
              overlay === allOverlays[layoutType][index]?.overlay
                ? 'border-indigo-500'
                : 'border-gray-300'
            } cursor-pointer`}
            style={{
              backgroundImage: overlayItem.preview
                ? `url(${overlayItem.preview})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            disabled={!overlayItem.preview}
          >
            {/* Optional: fallback or icon if null */}
            {!overlayItem.preview && (
              <span className="text-xs text-gray-400">None</span>
            )}
          </button>
        ))}

      </div>

      {/* Text color and font */}
      <h1 className='text-md text-gray-500'>Logo Style:</h1>
      <div className="flex flex-wrap gap-2 justify-start">
        <ColorPicker bgColor={textColor} setBgColor={setTextColor} setBgMode={() => {}} />
        {presetTextColors.map((color, index) => (
          <button
            key={index}
            onClick={() => setTextColor(color)}
            className={`w-13 h-13 rounded-lg border-2 ${
              textColor === color ? 'border-indigo-500' : 'border-gray-300'
            } cursor-pointer`}
            style={{ backgroundColor: color }}
          />
        ))}
        {fontPreviews.map((fontItem, index) => (
          <button
            key={index}
            onClick={() => setCustomFont(fontItem.font)}
            className={`w-13 h-13 rounded-lg border-2 ${
              customFont === fontItem.font ? 'border-indigo-500' : 'border-gray-300'
            } cursor-pointer`}
            style={{
              backgroundImage: `url(${fontItem.preview})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* Date and Time Toggles */}
      <div className="flex gap-4 flex-wrap items-center">
        <label className="flex items-center cursor-pointer space-x-2">
          <span className="text-sm text-gray-700">Add Date</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={showDate}
              onChange={() => setShowDate(!showDate)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-indigo-500 transition-colors duration-300"></div>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5"></div>
          </div>
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4 justify-end">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition cursor-pointer"
        >
          Retake
        </button>

        <button
          onClick={() =>
            setModal({
              show: true,
              message: "Are you sure you want to download your customized photo?",
              onConfirm: exportHDCanvas,              
            })
          }
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Download Photo
        </button>
      </div>

      {/* Modal */}
      <Modal
        show={modal.show}
        title="📸 Confirm Download"
        message="Are you sure you want to download your customized photo?"
        confirmText="Yes, Download"
        cancelText="Cancel"
        onConfirm={modal.onConfirm}
        onClose={() => setModal({ ...modal, show: false })}
      />
    </div>
  </div>
</div>

  );
}

export default CustomizationPage;
