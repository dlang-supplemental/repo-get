import { createSignal, onCleanup, onMount } from "solid-js"

export type ThemeMode = "light" | "dark" | "system"

const STORAGE_KEY = "repo-get-theme"

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function resolveDark(mode: ThemeMode) {
  return mode === "dark" || (mode === "system" && systemPrefersDark())
}

export function applyTheme(mode: ThemeMode) {
  const dark = resolveDark(mode)
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.dataset.kbTheme = dark ? "dark" : "light"
}

export function readStoredTheme(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark" || stored === "system") return stored
  return "system"
}

export function storeTheme(mode: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, mode)
  applyTheme(mode)
}

export function createTheme() {
  const [mode, setMode] = createSignal<ThemeMode>("system")

  onMount(() => {
    const initial = readStoredTheme()
    setMode(initial)
    applyTheme(initial)

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onSystemChange = () => {
      if (mode() === "system") applyTheme("system")
    }
    media.addEventListener("change", onSystemChange)
    onCleanup(() => media.removeEventListener("change", onSystemChange))
  })

  const setTheme = (next: ThemeMode) => {
    setMode(next)
    storeTheme(next)
  }

  return { mode, setTheme }
}
