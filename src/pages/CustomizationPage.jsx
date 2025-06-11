import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ColorPicker from '../components/ColorPicker';

import TemplateA1 from '/templates/LayoutA/layoutA-template1.png';
import TemplateA2 from '/templates/LayoutA/layoutA-template2.png';
import TemplateA3 from '/templates/LayoutA/layoutA-template3.png';
import TemplateA4 from '/templates/LayoutA/layoutA-template4.png';
import TemplateA5 from '/templates/LayoutA/layoutA-template5.png';
import TemplateA6 from '/templates/LayoutA/layoutA-template6.png';
import TemplateA7 from '/templates/LayoutA/layoutA-template7.png';
import TemplateA8 from '/templates/LayoutA/layoutA-template8.png';
import TemplateA9 from '/templates/LayoutA/layoutA-template9.png';
import Template10 from '/templates/LayoutA/layoutA-template10.png';
import Template11 from '/templates/LayoutA/layoutA-template11.png';
import Template12 from '/templates/LayoutA/layoutA-template12.png';
import Template13 from '/templates/LayoutA/layoutA-template13.png';

import OverlayA1 from '/overlays/LayoutA/layoutA-overlay1.png';
import OverlayA2 from '/overlays/LayoutA/layoutA-overlay2.png';
import OverlayA3 from '/overlays/LayoutA/layoutA-overlay3.png';
import OverlayA4 from '/overlays/LayoutA/layoutA-overlay4.png';
import OverlayA5 from '/overlays/LayoutA/layoutA-overlay5.png';
import OverlayA6 from '/overlays/LayoutA/layoutA-overlay6.png';
import OverlayA7 from '/overlays/LayoutA/layoutA-overlay7.png';
import OverlayA8 from '/overlays/LayoutA/layoutA-overlay8.png';
import OverlayA9 from '/overlays/LayoutA/layoutA-overlay9.png';
import OverlayA10 from '/overlays/LayoutA/layoutA-overlay10.png';

import Preview1 from '/overlays/Preview/stickerPreview1.png';
import Preview2 from '/overlays/Preview/stickerPreview2.png';
import Preview3 from '/overlays/Preview/stickerPreview3.png';
import Preview4 from '/overlays/Preview/stickerPreview4.png';
import Preview5 from '/overlays/Preview/stickerPreview5.png';
import Preview6 from '/overlays/Preview/stickerPreview6.png';
import Preview7 from '/overlays/Preview/stickerPreview7.png';
import Preview8 from '/overlays/Preview/stickerPreview8.png';
import Preview9 from '/overlays/Preview/stickerPreview9.png';
import Preview10 from '/overlays/Preview/stickerPreview10.png';
import Null from '/overlays/Preview/stickerPreviewNull.png';

import FontPreview1 from '/overlays/Preview/FontPreview1.png';
import FontPreview2 from '/overlays/Preview/FontPreview2.png';
import FontPreview3 from '/overlays/Preview/FontPreview3.png';
import FontPreview4 from '/overlays/Preview/FontPreview4.png';
import FontPreview5 from '/overlays/Preview/FontPreview5.png';
import FontPreview6 from '/overlays/Preview/FontPreview6.png';
import FontPreview7 from '/overlays/Preview/FontPreview7.png';


const allTemplate = {
  A: [
    { background: TemplateA1 },
    { background: TemplateA2 },
    { background: TemplateA3 },
    { background: TemplateA4 },
    { background: TemplateA5 },
    { background: TemplateA6 },
    { background: TemplateA7 },
    { background: TemplateA8 },
    { background: TemplateA9 },
    { background: Template10},
    { background: Template11},
    { background: Template12},
    { background: Template13 },

  ],
};

const presetColors = [
  // Light Pastels
  '#ffffff', '#F2D7D5', '#FAD7A0', '#F9E79F', '#D7BDE2',
  '#A3E4D7', '#AED6F1', '#E8DAEF', '#FDEBD0', '#E8F8F5',

  // Vivid/Bright
  '#FF6B6B', '#F39C12', '#5DADE2', '#58D68D', '#AF7AC5',

  // Neutral Tones
  '#D5DBDB', '#BFC9CA', '#AAB7B8', '#85929E',

  // Dark Colors
  '#000000', '#2C3E50', '#1C2833', '#4D5656', '#212F3D', '#17202A',
];

const presetTextColors = [
  // Light Pastels
  '#ffffff', '#AED6F1',
  // Vivid/Bright
  '#FF6B6B', '#F39C12',
  // Neutral Tones
  '#D5DBDB', '#BFC9CA',
  // Dark Colors
  '#000000', '#2C3E50',,
];

const allOverlays = {
  A: [
    { overlay: null},
    { overlay: OverlayA1},
    { overlay: OverlayA2},
    { overlay: OverlayA3},
    { overlay: OverlayA4},
    { overlay: OverlayA5},
    { overlay: OverlayA6},
    { overlay: OverlayA7},
    { overlay: OverlayA8},
    { overlay: OverlayA9},
    { overlay: OverlayA10},
  ]
}

const preview = [
  { preview: Null },
  { preview: Preview1 },
  { preview: Preview2 },
  { preview: Preview3 },
  { preview: Preview4 },
  { preview: Preview5 },
  { preview: Preview6 },
  { preview: Preview7 },
  { preview: Preview8 },
  { preview: Preview9 },
  { preview: Preview10 },
]

const fonts = {
  Fredoka: 'bold 20px Fredoka, sans-serif',
  Bungee: 'bold 20px Bungee, sans-serif',
  Chewy: 'bold 20px Chewy, sans-serif',
  Luckiest: 'bold 20px Luckiest Guy, sans-serif',
  Boogaloo: 'bold 20px Boogaloo, sans-serif',
  Monoton: 'bold 20px Monoton, cursive',
}

const fontPreviews = [
  { preview: FontPreview1, font: fonts.Fredoka },
  { preview: FontPreview2, font: fonts.Bungee },
  { preview: FontPreview3, font: fonts.Chewy },
  { preview: FontPreview4, font: fonts.Luckiest },
  { preview: FontPreview5, font: fonts.Boogaloo },
  { preview: FontPreview7, font: fonts.Monoton },
];


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

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const drawPhotos = () => {
    const boxes = [
      { x: 20, y: 20, width: 260, height: 165 },
      { x: 20, y: 200, width: 260, height: 165 },
      { x: 20, y: 380, width: 260, height: 165 },
    ];

    photos.forEach((photo, index) => {
      ctx.drawImage(photo, boxes[index].x, boxes[index].y, boxes[index].width, boxes[index].height);
    });

    // Draw overlay if selected
    if (overlay) {
      const overlayImage = new Image();
      overlayImage.src = overlay;
      overlayImage.onload = () => {
        ctx.drawImage(overlayImage, 0, 0, canvasWidth, canvasHeight - 80);

        // Draw logo/text on top of the overlay
        ctx.fillStyle = textColor;
        ctx.font = customFont
        ctx.textAlign = 'center';
        ctx.fillText('P!CPAC', canvasWidth / 2, canvasHeight - 110);
      };
    } else {
      // No overlay, just draw text
      ctx.fillStyle = textColor;
      ctx.font = customFont;
      ctx.textAlign = 'center';
      ctx.fillText('P!CPAC', canvasWidth / 2, canvasHeight - 110);
    }

    const now = new Date();

    if (showDate) {
      ctx.fillStyle = textColor;
      ctx.font = '14px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(now.toLocaleDateString(), 50, canvasHeight - 10);
    }

    if (showTime) {
      ctx.fillStyle = textColor;
      ctx.font = '14px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(now.toLocaleTimeString(), 250, canvasHeight - 10);
    }
  };

  const photos = [new Image(), new Image(), new Image()];
  photos.forEach(photo => (photo.src = '/sampleImage.png'));

  let loadedCount = 0;
  const totalToLoad = photos.length;

  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount === totalToLoad) {
      if (bgMode === 'color') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        drawPhotos();
      } else if (bgMode === 'image') {
        const bgImage = new Image();
        bgImage.src = selectedFrame?.background;
        bgImage.onload = () => {
          ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);
          drawPhotos();
        };
      }
    }
  };

  photos.forEach(photo => (photo.onload = checkAllLoaded));
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

        </div>
      </div>
    </div>
  );
}

export default CustomizationPage;
