"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PromptCard } from "@/components/prompt-card"
// Mock data for official prompts
const officialPrompts = [
  {
    id: "1",
    title: "Creative Story Generator",
    description: "Generate creative short stories based on a few keywords or a theme.",
    prompt:
      "You are a creative fiction writer. Write a short story (300-500 words) based on the following theme or keywords: {{theme}}. The story should have a clear beginning, middle, and end. Include vivid descriptions and at least one character with some dialogue.",
    model: "GPT-4",
    category: "Writing",
    tags: ["creative", "story", "fiction"],
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Code Explainer",
    description: "Explain complex code snippets in simple terms with examples.",
    prompt:
      "You are a coding tutor who specializes in explaining code to beginners. Explain the following code snippet in simple terms:\n\n```{{language}}\n{{code}}\n```\n\nYour explanation should:\n1. Describe what the code does overall\n2. Break down each important line or section\n3. Explain any complex concepts or patterns used\n4. Provide a simple example of when this code might be useful",
    model: "GPT-4",
    category: "Coding",
    tags: ["code", "explanation", "tutorial"],
    createdAt: "2023-10-10",
  },
  {
    id: "3",
    title: "Product Description Generator",
    description: "Create compelling product descriptions for e-commerce.",
    prompt:
      "You are a professional copywriter specializing in e-commerce product descriptions. Write a compelling product description for the following item:\n\nProduct: {{product_name}}\nKey Features: {{features}}\nTarget Audience: {{audience}}\n\nThe description should be 100-150 words, highlight the unique selling points, address the target audience's needs, and include a call to action. Use persuasive language that evokes desire for the product.",
    model: "GPT-3.5",
    category: "Marketing",
    tags: ["ecommerce", "copywriting", "product"],
    createdAt: "2023-10-05",
  },
  {
    id: "4",
    title: "Realistic Portrait Generator",
    description: "Generate realistic portrait images with specific characteristics.",
    prompt:
      "Create a realistic portrait photograph of a {{gender}} with {{hair_description}} hair, {{eye_color}} eyes, {{age}} years old, {{additional_characteristics}}. The portrait should be professional quality with studio lighting against a {{background}} background.",
    model: "Midjourney",
    category: "Image Generation",
    tags: ["portrait", "realistic", "photography"],
    createdAt: "2023-09-28",
  },
  {
    id: "5",
    title: "SQL Query Builder",
    description: "Generate SQL queries based on natural language descriptions.",
    prompt:
      "You are a SQL expert. Convert the following natural language request into a proper SQL query:\n\n{{request}}\n\nAssume a standard relational database schema. If there's ambiguity in the request, make reasonable assumptions and explain them. Provide the SQL query and a brief explanation of what it does.",
    model: "GPT-4",
    category: "Coding",
    tags: ["sql", "database", "query"],
    createdAt: "2023-09-20",
  },
  {
    id: "6",
    title: "Email Response Generator",
    description: "Generate professional email responses for various situations.",
    prompt:
      "You are a professional communication expert. Draft a response to the following email, maintaining a {{tone}} tone. The response should be concise but thorough, addressing all points raised in the original email.\n\nOriginal Email:\n{{email_content}}\n\nConsider the context that {{additional_context}}.",
    model: "GPT-3.5",
    category: "Writing",
    tags: ["email", "professional", "communication"],
    createdAt: "2023-09-15",
  },
]

export default function LibraryPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [model, setModel] = useState("all")

  // Filter prompts based on search query, category, and model
  const filteredPrompts = officialPrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = category === "all" || prompt.category === category
    const matchesModel = model === "all" || prompt.model === model

    return matchesSearch && matchesCategory && matchesModel
  })

  // Get unique categories and models for filters
  const categories = ["all", ...new Set(officialPrompts.map((p) => p.category))]
  const models = ["all", ...new Set(officialPrompts.map((p) => p.model))]

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Prompt Library</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Discover high-quality prompts for various AI models and use cases.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              type="search"
              placeholder="Search prompts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m === "all" ? "All Models" : m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="writing">Writing</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="image">Image Generation</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} isAuthenticated={!!user} />
              ))}
            </div>
            {filteredPrompts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">No prompts found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          {["writing", "coding", "image", "marketing"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts
                  .filter((p) => p.category.toLowerCase() === tab)
                  .map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} isAuthenticated={!!user} />
                  ))}
              </div>
              {filteredPrompts.filter((p) => p.category.toLowerCase() === tab).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500 dark:text-slate-400">
                    No prompts found in this category matching your search criteria.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
