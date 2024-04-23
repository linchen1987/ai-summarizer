import type { PlasmoMessaging } from "@plasmohq/messaging"
import { sendToContentScript } from "@plasmohq/messaging"

import { genSummary } from "~/utils/ai"
import { Events } from "~/utils/constants"

const handler: PlasmoMessaging.MessageHandler = async (_, res) => {
  try {
    console.log("try to get page content")
    const data = await sendToContentScript({
      name: Events.GET_PAGE_CONTENT,
      body: null
    })

    console.log("generating summary")
    const summary = await genSummary(data.title, data.textContent)

    res.send(summary.choices[0].message.content)
  } catch (error) {
    res.send({
      error: error.message
    })
  }
}

export default handler
