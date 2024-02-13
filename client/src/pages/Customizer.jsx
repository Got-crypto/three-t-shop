import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants"
import state from '../store'

import { fadeAnimation, slideAnimation } from "../config/motion"

import { reader } from "../config/helpers"

import { useState } from 'react'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components"

export default function Customizer() {
    const snap = useSnapshot(state)

    const [file, setFile] = useState("")
    const [prompt, setPrompt] = useState()
    const [generatingImg, setGeneratingImg] = useState()

    const [activeEditorTab, setActiveEditorTab] = useState()
    const [activateFilterTab, setActivateFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    })

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case "aipicker":
                return <AIPicker />
            default:
                return null;
        }
    }

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type]

        state[decalType.stateProperty] = result

        if(!activateFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filter)
        }
    }

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activateFilterTab[tabName]
                break;
            case "stylishShirt":
                state.isFullTexture = !activateFilterTab[tabName]
                break;
        
            default:
                state.isFullTexture = !true
                state.isLogoTexture = true
                break;
        }

        setActivateFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const readFile = (type) => {
        reader(file)
            .then((result) => {
                handleDecals(type, result)
                setActiveEditorTab("")
            })
    }

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
                                <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                            ))}

                            {generateTabContent()}
                        </div>
                    </div>
                </motion.div>

                <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
                    <CustomButton
                        type={"filled"}
                        title={"GO Back"}
                        handleClick={() => state.intro = !snap.intro}
                        customStyles={"w-fit px-4 py-2.5 font-bold tex-sm"}
                    />
                    
                </motion.div>

                <motion.div
                    className="filtertabs-container"
                    {...slideAnimation("up")}
                >
                    {FilterTabs.map((tab) => (
                        <Tab
                            key={tab.name}
                            tab={tab}
                            isFilterTab
                            isActiveTab={activateFilterTab[tab.name]}
                            handleCLick={() => handleActiveFilterTab(tab.name)}
                        />
                    ))}
                </motion.div>
            </>
        )}
    </AnimatePresence>
  )
}
