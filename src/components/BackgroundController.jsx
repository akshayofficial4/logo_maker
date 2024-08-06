import React, { useContext, useEffect, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import ColorPickerController from './ColorPickerController';
import { UpdateStorageContext } from '@/context/UpdateStorageContext';

function BackgroundController() {

    { /*...Local storage for the color... */ }

    let storageValue;

    try {
        storageValue = JSON.parse(localStorage.getItem('value')) || {};  
    } catch (error) {
        console.error('Error parsing local storage value:', error);
        storageValue = {}; // Fallback to an empty object if parsing fails... 
    }

    const [ rounded, setRounded ] = useState(storageValue?storageValue?.bgRounded:0);
    const [ padding, setPadding ] = useState(storageValue?storageValue?.bgPadding:0);
    const [ color, setColor ] = useState( storageValue?storageValue?.bgColor:'#000');
    const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
    
    

    

    useEffect(() => {
        const updatedValue = {
            ...storageValue,
            bgRounded : rounded,
            bgPadding : padding,
            bgColor : color
        }
        setUpdateStorage(updatedValue);
        localStorage.setItem('value', JSON.stringify(updatedValue));
    },[rounded, padding, color])

  return (
    <div>

        {/*...Slider for rounded... */}

        <div className='py-2'>

            <label className='p-2 flex items-center justify-between'> Rounded <span>{rounded} px</span></label>
            <Slider defaultValue={[rounded]} max={512} step={1} 
                onValueChange={(event) => setRounded(event[0])}
            />

        </div>

        {/*...Slider for padding... */}
      
        <div className='py-2'>

            <label className='p-2 flex items-center justify-between'> Padding <span>{padding} px</span></label>
            <Slider defaultValue={[padding]} max={100} step={1} 
                onValueChange={(event) => setPadding(event[0])}
            />

        </div>

        { /*...Color Picker...*/ }

        <div className='py-2 pb-20'>

            <label className='p-2 flex items-center justify-between'>Icon Color</label>
            <ColorPickerController hideController={false} selectedColor={(color)=>setColor(color)}/>

        </div>

    </div>
  )
}

export default BackgroundController
