import { Center, Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import CameraRig from "./CameraRig"
import Shirt from "./Shirt"

export default function CanvasModel() {
  return (
    <Canvas>
      <ambientLight intensity={.5} />
      <Environment preset="city" />

      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}
