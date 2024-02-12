import CustomButton from "./CustomButton";

export default function FilePicker({file, setFile, readFile}) {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          type="file"
          accept="image/"
          name=""
          id="file-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label className="filepicker-label capitalize" htmlFor="file-upload">upload file</label>

        <p className="mt-2 text-gray-500 text-xs truncate">{file === "" ? "No file selected" : file.name}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-6">
        <CustomButton
          type={"outline"}
          title={"logo"}
          handleClick={()=> readFile('logo')}
          customStyles={'text-xs'}
        />
        <CustomButton
          type={"filled"}
          title={"full"}
          handleClick={()=> readFile('full')}
          customStyles={'text-xs'}
        />
      </div>
    </div>
  )
}
