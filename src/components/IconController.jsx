import { Smile } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "@/context/UpdateStorageContext";
import IconList from "./IconList";

function IconController() {
  const storageValue = JSON.parse(localStorage.getItem("value"));

  const [size, setSize] = useState(storageValue ? storageValue?.iconSize : 280);
  const [rotate, setRotate] = useState(
    storageValue ? storageValue?.iconRotate : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue?.iconColor : "#fff"
  );
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  const [icon, setIcon] = useState(storageValue?.icon || "Smile");

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon: icon,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, color, icon]);

  return (
    <div>
      <div>
        <IconList selectedIcon={(icon) => setIcon(icon)} />
        {/* size slider */}
        <div className="py-2">
          <label className="py-2 flex justify-between items-center">
            Size
            <span>{size}px</span>
          </label>
          <Slider
            defaultValue={[size]}
            max={512}
            step={1}
            onValueChange={(e) => setSize(e[0])}
          />
        </div>
        {/* rotate slider */}
        <div className="py-2">
          <label className="py-2 flex justify-between items-center">
            Rotate
            <span>{rotate}°</span>
          </label>
          <Slider
            defaultValue={[rotate]}
            max={512}
            step={1}
            onValueChange={(e) => setRotate(e[0])}
          />
        </div>
        {/* color picker slider */}
        <div className="py-2 pb-20">
          <label className="py-2 flex justify-between items-center">
            Icon Color
          </label>
          <ColorPickerController
            hideController={true}
            selectedColor={(color) => setColor(color)}
          />
        </div>
      </div>
    </div>
  );
}

export default IconController;
