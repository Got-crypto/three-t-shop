import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import { EditorTabs, FilterTabs } from "../config/constants"
import state from '../store'

import { fadeAnimtion, slideAnimation } from "../config/motion"

import { CustomButton, Tab } from "../components"

export default function Customizer() {
    const snap = useSnapshot(state)
  return (
    <AnimatePresence>
        {!snap.intro && (
            <>
                <motion.div
                    key="custom"
                    className="absolute top-0 left-0 z-10"
                    {...slideAnimation('left')}
                >
                    <div className="flex items-center min-h-screen">
                        <div className="editortabs-container tabs">
                            {EditorTabs.map((tab) => (
                                <Tab key={tab.name} tab={tab} handleCLick={() => {}} />
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimtion}>
                    <CustomButton
                        type={"filled"}
                        title={"GO Back"}
                        handleClick={() => snap.intro = true}
                        customStyles={"w-fit px-4 py-2.5 font-bold tex-sm"}
                    />
                    
                </motion.div>

                <motion.div
                    className="filterTabs-container"
                    {...slideAnimation("up")}
                >
                    {FilterTabs.map((tab) => (
                        <Tab key={tab.name} tab={tab} isFilterTab isActiveTab="" handleCLick={() => {}} />
                    ))}
                </motion.div>
            </>
        )}
    </AnimatePresence>
  )
}
