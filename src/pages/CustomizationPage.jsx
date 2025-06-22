import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [bgMode, setBgMode] = useState('color'); // 'color' or 'image'\

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

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

    if (overlay) {
      const overlayImage = new Image();
      overlayImage.src = overlay;

      overlayImage.onload = () => {
        drawImageInBox(overlayImage, {
          x: 0,
          y: 0,
          width: layoutWidth[layoutType],
          height: canvasHeight - 80,
        }, ctx);

        ctx.fillStyle = textColor;
        ctx.font = customFont;
        ctx.textAlign = 'center';
        ctx.fillText('P!CPAC', layoutWidth[layoutType] / 2, canvasHeight - 65);
      };
    } else {
      ctx.fillStyle = textColor;
      ctx.font = customFont;
      ctx.textAlign = 'center';
      ctx.fillText('P!CPAC', layoutWidth[layoutType] / 2, textY);
    }

    const now = new Date();

    if (showDate) {
      ctx.fillStyle = textColor;
      ctx.font = '14px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(now.toLocaleDateString(), 50, canvasHeight - 10);
    }

    const timeTextY = {
      A: 255,
      B: 255,
      C: 255,
      D: 505,
    };

    const timeX = timeTextY[layoutType] || 255;

    if (showTime) {
      ctx.fillStyle = textColor;
      ctx.font = '14px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), timeX, canvasHeight - 10);
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
}, [bgColor, selectedFrame, bgMode, textColor, customFont, overlay, showDate, showTime]);



  return (
    <div className="bg-[#D1E9F6] min-h-screen p-8">
      <h1 className="text-2xl text-gray-500 font-bold tracking-wider text-center mt-4">
        customize your photo
      </h1>

      <div className="p-6 flex justify-start items-start">
        <canvas ref={canvasRef} className="border-2 border-gray-300 shadow-lg tracking-widest" />

        {/* Customization controls */}
        <div className="flex flex-col gap-4 justify-start mt-4 ml-12 font-semibold tracking-wide">
          {/* Frame color */}
          <h1 className="text-md text-gray-500">Frame Color:</h1>
          <div className="flex flex-wrap gap-2 justify-start">

            <ColorPicker
              bgColor={bgColor}
              setBgColor={setBgColor}
              setBgMode={setBgMode}
            />

            {presetColors.map((color, index) => (
              <button
                key={index}
                onClick={() => {
                  setBgColor(color);
                  setBgMode('color');
                }}
                className={`w-13 h-13 rounded-lg border-2 ${
                  bgColor === color && bgMode === 'color' ? 'border-indigo-500' : 'border-gray-300'
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

          {/* overlays */}

          <h1 className='text-md text-gray-500'>Stickers:</h1>
          <div className="flex flex-wrap gap-2 justify-start">
            {preview.map((overlayItem, index) => (
              <button
                key={index}
                onClick={() => setOverlay(allOverlays[layoutType][index].overlay)}
                className={`w-13 h-13 rounded-lg border-2 bg-white ${
                  overlay === overlayItem.preview ? 'border-indigo-500' : 'border-gray-300'
                } cursor-pointer`}
                style={{
                  backgroundImage: `url(${overlayItem.preview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>

          {/* text colors */}
          <h1 className='text-md text-gray-500'>Logo Style:</h1>
          <div className ="flex flex-wrap gap-2 justify-start">
            <ColorPicker
              bgColor={textColor}
              setBgColor={setTextColor}
              setBgMode={() => {}} 
            />

            {presetTextColors.map((color, index ) => (
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
          {/* show date and time */}
            <div className="flex gap-4">
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

              <label className="flex items-center cursor-pointer space-x-2">
                <span className="text-sm text-gray-700">Add Time</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showTime}
                    onChange={() => setShowTime(!showTime)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-indigo-500 transition-colors duration-300"></div>
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5"></div>
                </div>
              </label>
            </div>

              {/* save / Back buttons */}
              <div className='mt-6 flex gap-4 justify-end ml-5'>
                <button
                  onClick={() => navigate(-1)}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition cursor-pointer'
                >
                  Retake
                </button>

                <button
                  onClick={() => {
                    const canvas = canvasRef.current;
                    const link = document.createElement('a');
                    link.download = 'p!cpac_photo.jpg';
                    link.href = canvas.toDataURL();
                    link.click();
                  }}
                  className='px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition'
                >
                  Download Photo
                </button>

              </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizationPage;
