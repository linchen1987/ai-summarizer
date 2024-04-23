import { Readability } from "@mozilla/readability"

export const parseHtmlContent = () => {
  const document = window.document.cloneNode(true) as Document
  const engine = new Readability(document, {
    // nbTopCandidates: 10,
    // charThreshold: 5000,
    // debug: true,
  })

  const article = engine.parse()

  return article
}
