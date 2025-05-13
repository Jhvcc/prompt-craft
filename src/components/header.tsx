"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

import { useAuth } from "@/hooks/use-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "./mode-toggle"

export function Header() {
	const pathname = usePathname()
	const { user, signOut } = useAuth()

	const routes = [
		{
			href: "/library",
			label: "Library",
			active: pathname === "/library",
		},
		{
			href: "/my-prompts",
			label: "My Prompts",
			active: pathname === "/my-prompts",
			auth: true,
		},
		{
			href: "/optimize",
			label: "Optimize",
			active: pathname === "/optimize",
			auth: true,
		},
	]

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 container mx-auto px-4 sm:px-6 lg:px-8">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-6 md:gap-10">
					<Link href="/" className="flex items-center space-x-2">
						<Sparkles className="h-6 w-6" />
						<span className="font-bold inline-block">PromptCraft</span>
					</Link>
					<nav className="hidden md:flex gap-6">
						{routes.map((route) => {
							if (route.auth && !user) return null
							return (
								<Link
									key={route.href}
									href={route.href}
									className={`text-sm font-medium transition-colors hover:text-primary ${route.active ? "text-foreground" : "text-foreground/60"
										}`}
								>
									{route.label}
								</Link>
							)
						})}
					</nav>
				</div>
				<div className="flex items-center gap-2">
					<div className="hidden md:flex items-center gap-2">
						{user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="relative h-8 w-8 rounded-full">
										<Avatar className="h-8 w-8">
											<AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										<Link href="/profile" className="w-full">
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href="/settings" className="w-full">
											Settings
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<>
								<Link href="/login">
									<Button variant="ghost" size="sm">
										Log in
									</Button>
								</Link>
								<Link href="/register">
									<Button size="sm">Sign up</Button>
								</Link>
							</>
						)}
					</div>
					<ModeToggle />
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle Menu">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<div className="flex flex-col gap-4 mt-8">
								{routes.map((route) => {
									if (route.auth && !user) return null
									return (
										<Link
											key={route.href}
											href={route.href}
											className={`text-sm font-medium transition-colors hover:text-primary ${route.active ? "text-foreground" : "text-foreground/60"
												}`}
										>
											{route.label}
										</Link>
									)
								})}
								{user ? (
									<>
										<Link
											href="/profile"
											className="text-sm font-medium transition-colors hover:text-primary text-foreground/60"
										>
											Profile
										</Link>
										<Link
											href="/settings"
											className="text-sm font-medium transition-colors hover:text-primary text-foreground/60"
										>
											Settings
										</Link>
										<Button
											variant="ghost"
											className="justify-start p-0 text-sm font-medium text-foreground/60 hover:text-primary"
											onClick={() => signOut()}
										>
											Log out
										</Button>
									</>
								) : (
									<>
										<Link href="/login">
											<Button variant="ghost" className="w-full justify-start">
												Log in
											</Button>
										</Link>
										<Link href="/register">
											<Button className="w-full">Sign up</Button>
										</Link>
									</>
								)}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}
