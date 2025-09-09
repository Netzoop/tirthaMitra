"use client"

import { AppShell } from "@/components/app-shell"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const router = useRouter()

  function login() {
    if (email === "admin@demo.com" && pass === "demo123") {
      localStorage.setItem("tm_admin", "1")
      router.push("/admin/dashboard")
    } else {
      alert("Invalid credentials. Use admin@demo.com / demo123")
    }
  }

  return (
    <AppShell>
      <h1 className="text-lg font-semibold text-[#2E5AAC] mb-3">Admin Login</h1>
      <div className="border rounded p-3 space-y-2">
        <input
          className="w-full border rounded p-2 text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border rounded p-2 text-sm"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={login} className="px-3 py-2 rounded bg-[#2E5AAC] text-white text-sm">
          Login
        </button>
      </div>
    </AppShell>
  )
}
