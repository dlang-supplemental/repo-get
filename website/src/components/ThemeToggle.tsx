import { Monitor, Moon, Sun } from "lucide-solid"
import { For } from "solid-js"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import type { ThemeMode } from "~/lib/theme"
import { createTheme } from "~/lib/theme"

const options: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor }
]

export function ThemeToggle() {
  const { mode, setTheme } = createTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} variant="ghost" size="sm" class="h-8 px-2 text-muted-foreground">
        <Sun class="size-4 dark:hidden" />
        <Moon class="hidden size-4 dark:block" />
        <span class="sr-only">Theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={mode()} onChange={setTheme}>
          <For each={options}>
            {(option) => (
              <DropdownMenuRadioItem value={option.value}>
                <option.icon class="mr-2 size-4" />
                {option.label}
              </DropdownMenuRadioItem>
            )}
          </For>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
