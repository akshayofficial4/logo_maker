import { Smile } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import ColorPickerController from './ColorPickerController';

function IconController() {
    const [size, setSize] = useState(280);
    const [rotate, setRotate] = useState(0);
    const [color, setColor] = useState('#fff');
    
    let storageValue;

    try {
      storageValue = JSON.parse(localStorage.getItem('value')) || {};
    } catch (error) {
      console.error('Error parsing local storage value:', error);
      storageValue = {}; // Fallback to an empty object if parsing fails
    }

    useEffect(() => {

        const updatedValue = {
            ...storageValue,
            iconSize:size,
            iconRotate:rotate,
            iconColor:color,
            icon:"Smile",
        }

        localStorage.setItem('value',JSON.stringify(updatedValue))
      
    }, [size, rotate, color])
    
  return (
    <div>
      <div>
        <label>Icon</label>

        <div className='p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex my-2 items-center justify-center '>
            <Smile />
        </div>

        {/*...Slider for size...*/}

        <div className='py-2'>

            <label className='p-2 flex items-center justify-between'> Size <span>{size}px</span></label>
            <Slider defaultValue={[280]} max={512} step={1} 
                onValueChange={(event) => setSize(event[0])}
            />

        </div>

        {/*...Rotation of the icon...*/}

        <div className='py-2'>

            <label className='p-2 flex items-center justify-between'> Rotate <span>{rotate}°</span></label>
            <Slider defaultValue={[0]} max={360} step={1} 
                onValueChange={(event) => setRotate(event[0])}
            />

        </div>

        {/*...ColorPicker...*/}
        <div className='py-2 pb-20'>

            <label className='p-2 flex items-center justify-between'>Icon Color</label>
            <ColorPickerController hideController={true} selectedColor={(color)=>setColor(color)}/>

        </div>

      </div>
    </div>
  )
}

export default IconController
