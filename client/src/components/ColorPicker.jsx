import { useSnapshot } from "valtio"
import state from "../store"

import { SketchPicker } from "react-color"

export default function ColorPicker() {

  const snap = useSnapshot(state)

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker 
        color={snap.color}
        disableAlpha
        onChange={(color) => state.color = color.hex}
        presetColors={[
          "#ccc",
          "#efbd4e",
          "#80c670",
          "#726d38",
          "#353934",
          "#2ccc34",
          "#ff8a65",
          "#7098da",
          "#c19277",
          "#ff96ad",
          "#512314",
          "#5f123d"
        ]}
      />
    </div>
  )
}
