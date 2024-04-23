import "~style.css"

import icon from "data-base64:~/assets/icon.png"
import { useCallback, useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import debug from "~/utils/debug"
import ErrorComponent from "~components/error"

debug("sidePanel.tsx: created")

const Status = {
  created: "created",
  summarizing: "summarizing",
  summarized: "summarized"
}

function IndexSidePanel() {
  const [status, setStatus] = useState(Status.created)
  const [data, setData] = useState<any>()
  const [error, setError] = useState<string | null>(null)

  const getSummarize = useCallback(async () => {
    setStatus(Status.summarizing)
    setData(null)
    setError(null)
    try {
      const data = await sendToBackground({
        name: "get-summarize",
        body: null
      })

      debug("getSummarize", data)

      if (data.error) {
        throw new Error(data.error)
      }

      setData(JSON.parse(data))
      setStatus(Status.summarized)
    } catch (error) {
      setError(error.message)
      setStatus(Status.created)
    }
  }, [sendToBackground])

  useEffect(() => {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.url) {
        setStatus(Status.created)
      }
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      // Uncomment to enable auto summarize on load
      // getSummarize()
    }, 800)
  }, [])

  if (status === Status.created) {
    return (
      <div className="flex h-screen justify-center items-center flex-col">
        <img className="w-20 h-20" src={icon} alt="icon" />
        <h1 className="text-xl font-bold mt-4 text-slate-800">Summarizer</h1>
        <button
          onClick={() => getSummarize()}
          className="mt-2 text-blue-400 py-3 px-6 text-base transition-all hover:underline disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          Click to summarize
        </button>
        {error && <ErrorComponent error={error} />}
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mt-4 text-blue-400">Summarizer</h1>
      {status === Status.summarizing && (
        <div className="mt-8 animate-pulse">
          <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
          <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
        </div>
      )}
      {status === Status.summarized && data && (
        <div className="text-base">
          <div className="text-lg font-bold mt-8 mb-4">总结</div>
          <div className="text-slate-500">{data.summary}</div>
          <div className="text-lg font-bold mt-8 mb-4">摘要</div>
          <div className="text-slate-500">{data.abstract}</div>
          <div className="text-lg font-bold mt-8 mb-4">要点</div>
          <ul className="marker:text-blue-400 list-disc pl-5 space-y-3 text-slate-500">
            {(data.keyPoints || []).map((keyPoint: string, index: number) => (
              <li key={index}>{keyPoint}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <ErrorComponent error={error} />}
    </div>
  )
}

export default IndexSidePanel
