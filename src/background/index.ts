import "@plasmohq/messaging/background"

import { startHub } from "@plasmohq/messaging/pub-sub"

console.log("background: Live now")
console.log(`background: Starting Hub`)
startHub()

chrome.runtime.onInstalled.addListener(() => {
  console.log("background: Installed!")
})

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))
