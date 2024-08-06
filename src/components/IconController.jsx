import React, { useContext, useEffect, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import ColorPickerController from './ColorPickerController';
import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import IconList from './IconList';

function IconController() {
    let storageValue;

    try {
      storageValue = JSON.parse(localStorage.getItem('value')) || {};
    } catch (error) {
      console.error('Error parsing local storage value:', error);
      storageValue = {}; // Fallback to an empty object if parsing fails
    }

    const [size, setSize] = useState(storageValue?storageValue?.iconSize:280);
    const [rotate, setRotate] = useState(storageValue?storageValue?.iconRotate:0);
    const [color, setColor] = useState(storageValue?storageValue?.iconColor:"#fff");
    const [icon, setIcon] = useState(storageValue?storageValue?.icon: "Smile");
    const {updateStorage, setUpdateStorage} = useContext(UpdateStorageContext)


    useEffect(() => {

        const updatedValue = {
            ...storageValue,
            iconSize:size,
            iconRotate:rotate,
            iconColor:color,
            icon:icon,
        }
        setUpdateStorage(updatedValue);
        localStorage.setItem('value',JSON.stringify(updatedValue))
      
    }, [size, rotate, color,icon])
    
  return (
    <div>
      <div>
        
        {/*...Icon lists... */}

        <IconList selectedIcon={(icon) => setIcon(icon)} />

        {/*...Slider for size...*/}

        <div className='py-2'>

            <label className='p-2 flex items-center justify-between'> Size <span>{size}px</span></label>
            <Slider defaultValue={[size]} max={512} step={1} 
                onValueChange={(event) => setSize(event[0])}
            />

        </div>

        {/*...Rotation of the icon...*/}

        <div className='py-2'>

            <label className='p-2 flex items-center justify-between'> Rotate <span>{rotate}°</span></label>
            <Slider defaultValue={[rotate]} max={360} step={1} 
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
