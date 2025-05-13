import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover, Create, Optimize AI Prompts
              </h1>
              <p className="max-w-[600px] text-slate-500 md:text-xl dark:text-slate-400">
                PromptCraft is your all-in-one platform for managing and improving your AI prompts. Unlock the full
                potential of AI with better prompts.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/library">
                <Button size="lg" variant="outline">
                  Explore Library
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[400px] overflow-hidden rounded-lg border bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-8 w-64 rounded bg-slate-200 dark:bg-slate-800"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-20 rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-10 w-20 rounded bg-slate-200 dark:bg-slate-800"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80"></div>
              <div className="absolute bottom-0 w-full p-6">
                <div className="space-y-2">
                  <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-10 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-10 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-10 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
