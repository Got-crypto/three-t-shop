import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants"
import state from '../store'

import { fadeAnimation, slideAnimation } from "../config/motion"

import { downloadCanvasToImage, reader } from "../config/helpers"

import { useState } from 'react'
import { download } from '../assets'
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
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />
            default:
                return null;
        }
    }

    const handleSubmit = async (type) => {
        if(!prompt) return alert("Please enter a prompt")
        try {
            setGeneratingImg(true)

            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt})
            })

            const data = await response.json()



            handleDecals(type, `data:image/png;base64,${data.photo}`)

        } catch (error) {
            alert(error)
        } finally {
            setGeneratingImg(false)
            setActiveEditorTab("")
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
                            handleClick={() => handleActiveFilterTab(tab.name)}
                        />
                    ))}
                </motion.div>

                <button className='download-btn' onClick={downloadCanvasToImage}>
                    <img
                        src={download}
                        alt='download_image'
                        className='w-3/5 h-3/5 object-contain'
                    />
                </button>
            </>
        )}
    </AnimatePresence>
  )
}
