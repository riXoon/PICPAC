import React from 'react'

function ColorPicker({ bgColor, setBgColor, setBgMode }) {
  return (
    <label className='w-13 h-13 rounded-lg border-2 border-gray-300 cursor-pointer relative'>
              <input 
                type='color'
                value={bgColor}
                onChange = {(e)=> {
                  setBgColor(e.target.value);
                  setBgMode('color');
                }}
                className='absolute inset-0 opacity-0 cursor-pointer w-full h-full rounded-lg'
                aria-label='Custom color picker'
              />
              <div 
                className='w-full h-full rounded-lg'
                style = {{
                  background: 'conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)',
                  filter: 'blur(2px) saturate(1.2)',
                }}
              />
    </label>
  )
}

export default ColorPicker