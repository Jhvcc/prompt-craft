"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { Sparkles, ArrowRight, Check, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"

export default function OptimizePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizedPrompt, setOptimizedPrompt] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("rule-based")

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleOptimize = () => {
    if (!prompt.trim()) {
      toast.error("Empty prompt", {
        description: "Please enter a prompt to optimize.",
      })
      return
    }

    setIsOptimizing(true)
    setOptimizedPrompt("")
    setSuggestions([])

    // Mock optimization - in a real app, this would call an AI API
    setTimeout(() => {
      // Rule-based optimization
      if (activeTab === "rule-based") {
        const newSuggestions = []

        if (!prompt.includes("specific") && !prompt.includes("detailed")) {
          newSuggestions.push("Add more specific instructions about the desired output format or level of detail.")
        }

        if (!prompt.includes("example")) {
          newSuggestions.push("Consider including examples to clarify your expectations.")
        }

        if (prompt.length < 50) {
          newSuggestions.push("Your prompt is quite short. Consider adding more context or instructions.")
        }

        if (!prompt.includes("tone") && !prompt.includes("style")) {
          newSuggestions.push("Specify the desired tone or style for better results.")
        }

        setSuggestions(newSuggestions)

        // If no suggestions, it's already good
        if (newSuggestions.length === 0) {
          setSuggestions(["Your prompt looks good! No major improvements needed."])
        }
      }
      // AI-based optimization
      else {
        // Mock AI optimization
        const improved = prompt
          .replace(/write/gi, "craft a detailed")
          .replace(/make/gi, "create")
          .replace(/good/gi, "high-quality")
          .replace(/list/gi, "comprehensive list")

        setOptimizedPrompt(
          improved +
          "\n\nPlease ensure the output is well-structured, detailed, and addresses all aspects of the request.",
        )
      }

      setIsOptimizing(false)
    }, 2000)
  }

  const handleApplyOptimization = () => {
    setPrompt(optimizedPrompt)
    toast.success("Optimization applied", {
      description: "The optimized prompt has been applied.",
    })
  }

  if (!user) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Prompt Optimizer</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Improve your prompts with AI-powered suggestions and rule-based optimization.
          </p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Optimization Tips</AlertTitle>
          <AlertDescription>
            The best prompts are specific, provide context, and clearly state the desired output format.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Your Prompt</CardTitle>
            <CardDescription>Enter the prompt you want to optimize</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your prompt here..."
              className="min-h-[200px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={handleOptimize} disabled={isOptimizing || !prompt.trim()}>
                {isOptimizing ? (
                  <>Optimizing...</>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" /> Optimize
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rule-based">Rule-Based Suggestions</TabsTrigger>
            <TabsTrigger value="ai-based">AI Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="rule-based">
            <Card>
              <CardHeader>
                <CardTitle>Suggestions</CardTitle>
                <CardDescription>Rule-based suggestions to improve your prompt</CardDescription>
              </CardHeader>
              <CardContent>
                {isOptimizing ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : suggestions.length > 0 ? (
                  <ul className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {suggestion.includes("looks good") ? (
                          <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        )}
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 py-4">
                    Click &quot;Optimize&quot; to get suggestions for improving your prompt.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-based">
            <Card>
              <CardHeader>
                <CardTitle>AI-Optimized Prompt</CardTitle>
                <CardDescription>An improved version of your prompt generated by AI</CardDescription>
              </CardHeader>
              <CardContent>
                {isOptimizing ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : optimizedPrompt ? (
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                      <pre className="whitespace-pre-wrap font-sans">{optimizedPrompt}</pre>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        <span>AI-optimized version</span>
                      </div>
                      <Button onClick={handleApplyOptimization}>Apply Optimization</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 py-4">
                    Click &quot;Optimize&quot; to get an AI-optimized version of your prompt.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
