import "~style.css"

import icon from "data-base64:~/assets/icon.png"

import { useStorage } from "@plasmohq/storage/hook"

function OptionsIndex() {
  const [openaiApiKey, setOpenaiApiKey] = useStorage<string>("openaiApiKey", "")
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="mt-10 relative w-full max-w-[48rem] rounded-xl py-8 border">
        <div className="flex justify-center">
          <img className="w-20 h-20" src={icon} alt="icon" />
        </div>
        <div className="p-6">
          <h1 className="mb-2 flex items-center block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-400 antialiased">
            Summarizer Settings
          </h1>
          <h2 className="text-lg mb-2 mt-6 text-gray-700 font-medium">
            OpenAI API Key
          </h2>
          <input
            className="border h-10 px-2 w-full rounded-sm mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased"
            onChange={(e) => setOpenaiApiKey(e.target.value)}
            value={openaiApiKey}
          />
        </div>
      </div>
    </div>
  )
}

export default OptionsIndex
