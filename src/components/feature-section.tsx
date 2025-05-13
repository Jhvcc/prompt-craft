import { BookOpen, Sparkles, History, FolderTree, Share2, Edit3 } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-slate-800 dark:text-slate-200" />,
      title: "Prompt Library",
      description: "Access a curated library of high-quality prompts for various AI models and use cases.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-slate-800 dark:text-slate-200" />,
      title: "AI Optimization",
      description: "Improve your prompts with AI-powered suggestions and rule-based optimization.",
    },
    {
      icon: <Edit3 className="h-10 w-10 text-slate-800 dark:text-slate-200" />,
      title: "Enhanced Editor",
      description: "Write and edit prompts with syntax highlighting, markdown support, and more.",
    },
    {
      icon: <History className="h-10 w-10 text-slate-800 dark:text-slate-200" />,
      title: "Version History",
      description: "Track changes to your prompts and revert to previous versions when needed.",
    },
    {
      icon: <FolderTree className="h-10 w-10 text-slate-800 dark:text-slate-200" />,
      title: "Organization",
      description: "Keep your prompts organized with folders, tags, and powerful search capabilities.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-slate-800 dark:text-slate-200" />,
      title: "Sharing",
      description: "Share your prompts with the community or keep them private for personal use.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
            <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
              Everything you need to create, manage, and optimize your AI prompts.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm dark:border-slate-800"
            >
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
