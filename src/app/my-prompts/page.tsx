"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptCard } from "@/components/prompt-card"
import { useAuth } from "@/hooks/use-auth"
import { Search, Plus, FolderTree, Tag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreatePromptForm } from "@/components/create-prompt-form"
import { UserPrompt } from "@/types/prompt"

// Mock data for user's saved prompts
const mockUserPrompts = [
  {
    id: "user_1",
    title: "Personal Blog Post Generator",
    description: "Generate engaging blog post content based on a topic and outline.",
    prompt:
      "You are a professional blog writer with expertise in {{topic}}. Write a comprehensive blog post based on the following outline:\n\n{{outline}}\n\nThe blog post should be approximately 800-1000 words, include engaging headings and subheadings, and maintain a conversational yet informative tone. Include a compelling introduction that hooks the reader and a conclusion that summarizes the key points.",
    model: "GPT-4",
    category: "Writing",
    tags: ["blog", "content", "writing"],
    createdAt: "2023-10-20",
  },
  {
    id: "user_2",
    title: "Weekly Report Template",
    description: "Generate a structured weekly report based on key metrics and achievements.",
    prompt:
      "You are a business analyst. Create a professional weekly report for the {{department}} department covering the week of {{date_range}}. Include the following sections:\n\n1. Executive Summary\n2. Key Performance Indicators\n   - {{kpi_1}}: {{value_1}}\n   - {{kpi_2}}: {{value_2}}\n   - {{kpi_3}}: {{value_3}}\n3. Major Achievements\n   - {{achievement_1}}\n   - {{achievement_2}}\n4. Challenges and Solutions\n5. Next Week's Priorities\n\nThe report should be concise, data-driven, and highlight both successes and areas for improvement. Use professional business language.",
    model: "GPT-3.5",
    category: "Business",
    tags: ["report", "business", "template"],
    createdAt: "2023-10-18",
  },
  {
    id: "user_3",
    title: "Product Feature Comparison",
    description: "Generate a detailed comparison table between similar products or features.",
    prompt:
      "You are a product analyst. Create a detailed comparison between the following products/features:\n\nProducts to compare:\n1. {{product_1}}\n2. {{product_2}}\n3. {{product_3}} (optional)\n\nAspects to compare:\n- Pricing structure\n- Key features\n- Target audience\n- Pros and cons\n- Use case scenarios\n\nFormat the comparison as a markdown table followed by a brief analysis (200-300 words) highlighting the key differences and which product might be better for different types of users or scenarios.",
    model: "GPT-4",
    category: "Business",
    tags: ["comparison", "analysis", "product"],
    createdAt: "2023-10-15",
  },
]

export default function MyPromptsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [userPrompts, setUserPrompts] = useState<UserPrompt[]>(mockUserPrompts)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Filter prompts based on search query
  const filteredPrompts = userPrompts.filter((prompt) => {
    return (
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const handleRemovePrompt = (id: string) => {
    setUserPrompts(userPrompts.filter((prompt) => prompt.id !== id))
  }

  const handleCreatePrompt = (newPrompt: UserPrompt) => {
    const promptWithId = {
      ...newPrompt,
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUserPrompts([promptWithId, ...userPrompts])
    setIsCreateDialogOpen(false)
  }

  if (!user) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Prompts</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your personal collection of prompts.</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Create Prompt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Prompt</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new prompt in your personal library.
                </DialogDescription>
              </DialogHeader>
              <CreatePromptForm onSubmit={handleCreatePrompt} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              type="search"
              placeholder="Search your prompts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" title="Organize by Folders">
              <FolderTree className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Manage Tags">
              <Tag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All Prompts</TabsTrigger>
            <TabsTrigger value="recent">Recently Used</TabsTrigger>
            <TabsTrigger value="saved">Saved from Library</TabsTrigger>
            <TabsTrigger value="created">Created by Me</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    isAuthenticated={true}
                    isSaved={true}
                    onRemove={() => handleRemovePrompt(prompt.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">No prompts found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          {["recent", "saved", "created"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">This view is coming soon. Check back later!</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
