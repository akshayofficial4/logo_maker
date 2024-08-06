import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { icons, Smile } from 'lucide-react'
import { iconList } from '@/constants/icons'
  
function IconList({selectedIcon}) {
    let storageValue;

    try {
      storageValue = JSON.parse(localStorage.getItem('value')) || {};
    } catch (error) {
      console.error('Error parsing local storage value:', error);
      storageValue = {}; // Fallback to an empty object if parsing fails
    }
    const [ icon, setIcon ] = useState(storageValue?storageValue?.icon:'Smile')
    const [openDialog, setOpenDialog] = useState(false);

    const Icon = ({ name, color, size, }) => {
        const LucidIcon = icons[name];
        if(!LucidIcon){
            return;
        }
        return <LucidIcon color={color} size={size} />
    }

  return (
    <div>
        <div>
            <label>Icon</label>
            <div className='p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex my-2 items-center justify-center ' onClick={()=>setOpenDialog(true) } >
                <Icon name={icon} color={'#000'} size={20} />
            </div>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
        
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Pick Your Favorite Icon</DialogTitle>
            <DialogDescription>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 h-[400px] overflow-auto p-6 ' >
                    {iconList.map((icon, index) =>(
                        <div className='border p-3 flex rounded-sm items-center justify-center cursor-pointer'onClick={()=> {selectedIcon(icon); setOpenDialog(false);
                        setIcon(icon)} }>
                            <Icon name={icon} color={'#000'} size={20} />
                        </div>
                    ))}
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default IconList
