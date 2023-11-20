"use client"
import ReactMarkdown from "react-markdown"

function Markdown({ text, className }) {

  return (
    <ReactMarkdown className={className}>{text}</ReactMarkdown>
  )
}

export default Markdown