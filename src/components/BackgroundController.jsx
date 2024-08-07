import { Slider } from "@/components/ui/slider";
import React, { useContext, useEffect, useState } from "react";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";

function BackgroundController() {
  const storageValue = JSON.parse(localStorage.getItem("value"));

  const [rounded, setRounded] = useState(
    storageValue ? storageValue?.bgRounded : 0
  );
  const [padding, setPadding] = useState(
    storageValue ? storageValue?.bgPadding : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue?.bgColor : "#000"
  );
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
      icon: icon,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [rounded, padding, color]);

  return (
    <div>
      {/* rounded slider */}
      <div className="py-2">
        <label className="py-2 flex justify-between items-center">
          Rounded<span>{rounded}px</span>
        </label>
        <Slider
          defaultValue={[rounded]}
          max={200}
          step={1}
          onValueChange={(e) => setRounded(e[0])}
        />
      </div>
      {/* padding slider */}
      <div className="py-2">
        <label className="py-2 flex justify-between items-center">
          Padding<span>{padding}px</span>
        </label>
        <Slider
          defaultValue={[padding]}
          max={180}
          step={1}
          onValueChange={(e) => setPadding(e[0])}
        />
      </div>
      {/* color picker slider */}
      <div className="py-2 pb-20">
        <label className="py-2 flex justify-between items-center">
          Icon Color
        </label>
        <ColorPickerController
          hideController={false}
          selectedColor={(color) => setColor(color)}
        />
      </div>
    </div>
  );
}

export default BackgroundController;
