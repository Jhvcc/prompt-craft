"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type User = {
  id: string
  email: string
  name?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => { },
  signUp: async () => { },
  signOut: () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Mock authentication for demo purposes
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("promptcraft_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication - in a real app, this would call an API
      // For demo, we'll just create a mock user
      const mockUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
      }

      setUser(mockUser)
      localStorage.setItem("promptcraft_user", JSON.stringify(mockUser))
      toast.success("Signed in successfully", {
        description: "Welcome back to PromptCraft!",
      })

      router.push("/my-prompts")
    } catch (error) {
      toast.error("Error signing in", {
        description: "Please check your credentials and try again. " + error,
      })
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      // Mock registration - in a real app, this would call an API
      const mockUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        name,
      }

      setUser(mockUser)
      localStorage.setItem("promptcraft_user", JSON.stringify(mockUser))

      toast.success("Account created successfully", {
        description: "Welcome to PromptCraft!",
      })

      router.push("/my-prompts")
    } catch (error) {
      toast.error("Error creating account", {
        description: "Please try again with a different email." + error,
      })
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("promptcraft_user")
    router.push("/")

    toast.success("Signed out successfully", {
      description: "You have been signed out of your account.",
    })
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}
