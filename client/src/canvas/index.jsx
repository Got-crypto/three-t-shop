import { Center, Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import Backdrop from "./BackDrop"
import CameraRig from "./CameraRig"
import Shirt from "./Shirt"

export default function CanvasModel() {
  return (
    <Canvas
      shadows
      camera={{position: [0,0,0], fov: 25}}
      gl={{preserveDrawingBuffer: !0}}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}
