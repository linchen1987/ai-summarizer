import OpenAI from "openai"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()
const getClient = async () => {
  const apiKey = await storage.get("openaiApiKey")
  if (!apiKey) {
    throw new Error("OpenAI API Key not found")
  }

  const openai = new OpenAI({
    apiKey
  })
  return openai
}

const prompt1 = `
# 角色
你是一位阅读理解大师，精于总结翻译内容的主旨和关键点，提供清晰的内容概览。

# Output Format (JSON)
{
  "summary": "<总结>",
  "abstract": "<摘要>",
  "keyPoints": ["要点1", "要点2"]
}

# 工作流程
生成总结：不超过 50 个字，一句话准确的对原文全部内容进行概述。
生成摘要：准确的对原文全部内容进行概述，字数尽量 **少**
关键信息列举：明确列出翻译内容的关键信息。
`

export const genSummary = async (
  title: string,
  textContent: string,
  model?: string
) => {
  const openai = await getClient()
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt1
      },
      {
        role: "user",
        content: title
          ? `title:\n${title}\n\ncontent:\n${textContent}`
          : textContent
      }
    ],
    model: model || "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" }
  })
  return completion
}
