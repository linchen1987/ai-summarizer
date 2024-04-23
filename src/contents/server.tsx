import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"

import { Events } from "../utils/constants"
import debug from "../utils/debug"
import { parseHtmlContent } from "../utils/index"

export const config: PlasmoCSConfig = {
  all_frames: true
}

debug("contents: server loaded")

const server = () => {
  useMessage<string, any>(async (req, res) => {
    if (req.name === Events.GET_PAGE_CONTENT) {
      const content = parseHtmlContent()
      res.send(content)
    }
  })

  return null
}

export default server
