"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bookmark, Copy, Eye, EyeOff } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { PromptDetail } from "@/components/prompt-detail"
type PromptCardProps = {
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
  isSaved?: boolean
  onSave?: () => void
  onRemove?: () => void
}

export function PromptCard({ prompt, isAuthenticated, isSaved = false, onSave, onRemove }: PromptCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt)
    toast.success("Copied to clipboard", {
      description: "The prompt has been copied to your clipboard.",
    })
  }

  const handleSave = () => {
    if (onSave) {
      onSave()
    } else {
      toast.success("Prompt saved", {
        description: "The prompt has been saved to your library.",
      })
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    }
  }

  const truncatedPrompt = prompt.prompt.length > 150 ? prompt.prompt.substring(0, 150) + "..." : prompt.prompt

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{prompt.title}</CardTitle>
              <CardDescription>{prompt.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">{prompt.model}</Badge>
            <Badge variant="outline">{prompt.category}</Badge>
            {prompt.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            {prompt.tags.length > 2 && <Badge variant="secondary">+{prompt.tags.length - 2}</Badge>}
          </div>
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            <pre className="whitespace-pre-wrap font-sans">{isExpanded ? prompt.prompt : truncatedPrompt}</pre>
            {prompt.prompt.length > 150 && (
              <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                  <span className="flex items-center">
                    <EyeOff className="h-3 w-3 mr-1" /> Show less
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" /> Show more
                  </span>
                )}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsDetailOpen(true)}>
              Details
            </Button>
            {isAuthenticated &&
              (isSaved ? (
                <Button variant="outline" size="sm" onClick={handleRemove}>
                  Remove
                </Button>
              ) : (
                <Button variant="default" size="sm" onClick={handleSave}>
                  <Bookmark className="h-4 w-4 mr-2" /> Save
                </Button>
              ))}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{prompt.title}</DialogTitle>
            <DialogDescription>{prompt.description}</DialogDescription>
          </DialogHeader>
          <PromptDetail prompt={prompt} isAuthenticated={isAuthenticated} />
        </DialogContent>
      </Dialog>
    </>
  )
}
