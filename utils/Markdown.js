"use client"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

function Markdown({ text, className }) {

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} className={className}>{text}</ReactMarkdown>
  )
}

export default Markdown