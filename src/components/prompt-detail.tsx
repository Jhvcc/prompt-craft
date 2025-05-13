"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { PromptEditor } from "@/components/prompt-editor"
type PromptDetailProps = {
  prompt: {
    id: string
    title: string
    description: string
    prompt: string
    model: string
    category: string
    tags: string[]
    createdAt: string
  }
  isAuthenticated: boolean
}

export function PromptDetail({ prompt, isAuthenticated }: PromptDetailProps) {
  const [activeTab, setActiveTab] = useState("prompt")

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt)
    toast.success("Copied to clipboard", {
      description: "The prompt has been copied to your clipboard.",
    })
  }

  const handleSave = () => {
    toast.success("Prompt saved", {
      description: "The prompt has been saved to your library.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{prompt.model}</Badge>
        <Badge variant="outline">{prompt.category}</Badge>
        {prompt.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="text-sm text-slate-500 dark:text-slate-400">Added on {formatDate(prompt.createdAt)}</div>

      <Tabs defaultValue="prompt" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
          <TabsTrigger value="editor">Edit & Test</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt" className="mt-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-sans">{prompt.prompt}</pre>
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" /> Copy to Clipboard
            </Button>
            {isAuthenticated && (
              <Button onClick={handleSave}>
                <Bookmark className="h-4 w-4 mr-2" /> Save to My Prompts
              </Button>
            )}
          </div>
        </TabsContent>
        <TabsContent value="editor" className="mt-4">
          <PromptEditor initialPrompt={prompt.prompt} />
        </TabsContent>
        <TabsContent value="examples" className="mt-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
            <p className="text-slate-500 dark:text-slate-400 italic">
              Example outputs will be shown here. This feature is coming soon.
            </p>
          </div>
          <div className="mt-4">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" /> Try in ChatGPT
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Usage Tips</h3>
        <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400">
          <li>Replace any placeholder text like {"{{variable}}"} with your specific content.</li>
          <li>This prompt works best with {prompt.model} but may work with similar models.</li>
          <li>For best results, provide clear and specific information when filling in variables.</li>
        </ul>
      </div>
    </div>
  )
}
