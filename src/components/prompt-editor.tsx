"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Sparkles, Copy, Send } from "lucide-react"
import { toast } from "sonner"
type PromptEditorProps = {
  initialPrompt: string
}

export function PromptEditor({ initialPrompt }: PromptEditorProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResponse, setTestResponse] = useState("")

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    toast.success("Copied to clipboard", {
      description: "The prompt has been copied to your clipboard.",
    })
  }

  const handleOptimize = () => {
    setIsOptimizing(true)

    // Mock optimization - in a real app, this would call an AI API
    setTimeout(() => {
      const optimizedPrompt = prompt.replace(
        "Write a short story",
        "Write a captivating short story with vivid descriptions",
      )
      setPrompt(optimizedPrompt)
      setIsOptimizing(false)

      toast.success("Prompt optimized", {
        description: "Your prompt has been optimized for better results.",
      })
    }, 1500)
  }

  const handleTest = () => {
    setIsTesting(true)
    setTestResponse("")

    // Mock testing - in a real app, this would call an AI API
    setTimeout(() => {
      setTestResponse(
        "This is a simulated response from an AI model based on your prompt. In a real application, this would be the actual response from the selected AI model.",
      )
      setIsTesting(false)
    }, 2000)
  }

  // Highlight variables in the prompt (text between {{ and }})
  const highlightVariables = (text: string) => {
    return text.replace(/\{\{([^}]+)\}\}/g, '<span class="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">{{$1}}</span>')
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="prompt-editor" className="text-sm font-medium">
          Edit Prompt
        </label>
        <Textarea
          id="prompt-editor"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="font-mono min-h-[200px]"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-2" /> Copy
        </Button>
        <Button variant="outline" onClick={handleOptimize} disabled={isOptimizing}>
          <Sparkles className="h-4 w-4 mr-2" />
          {isOptimizing ? "Optimizing..." : "Optimize"}
        </Button>
        <Button onClick={handleTest} disabled={isTesting}>
          <Send className="h-4 w-4 mr-2" />
          {isTesting ? "Testing..." : "Test Prompt"}
        </Button>
      </div>

      {testResponse && (
        <Card className="p-4 mt-4">
          <h3 className="text-lg font-medium mb-2">AI Response</h3>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
            <p className="whitespace-pre-wrap">{testResponse}</p>
          </div>
        </Card>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Variables Detected</h3>
        <div
          className="text-sm text-slate-500 dark:text-slate-400"
          dangerouslySetInnerHTML={{
            __html: highlightVariables(prompt),
          }}
        />
      </div>
    </div>
  )
}
