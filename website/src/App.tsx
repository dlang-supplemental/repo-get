import { For } from "solid-js"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { ThemeToggle } from "~/components/ThemeToggle"
import { applyTheme, readStoredTheme } from "~/lib/theme"

applyTheme(readStoredTheme())

const features = [
  "SDL-defined VCS profiles (git, svn, hg, jj, darcs, fossil, bzr, cvs, Perforce-style URLs)",
  "VCSProvider interface: clone, pull, status, availability checks",
  "Bootstrap downloads via libequivalence rules in bootstrap.sdl",
  "Platform facts for matcher rules on Windows, Linux, and macOS"
]

const entryPoints = [
  { name: "getProvider(url)", desc: "Resolve a VCSProvider from a URL" },
  { name: "getManager() / ProfileManager", desc: "Load profiles; optional remote refresh" },
  { name: "BootstrapDownloader.download", desc: "Fetch files using curl, wget, or PowerShell" }
]

function App() {
  return (
    <div class="mx-auto flex min-h-svh max-w-2xl flex-col px-3 py-5 sm:px-4">
      <header class="mb-8 flex items-start justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-widest text-muted-foreground">dlang-supplemental</p>
          <h1 class="mt-1 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">repo-get</h1>
          <p class="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
            Multi-VCS repository fetching for D. Pick a backend from URL patterns and run clone, pull, and status
            using declarative SDL profiles.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <main class="flex flex-1 flex-col gap-8 text-sm">
        <section>
          <h2 class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Features</h2>
          <ul class="mt-3 space-y-2 text-foreground/90">
            <For each={features}>
              {(item) => (
                <li class="flex gap-2 leading-relaxed">
                  <span class="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              )}
            </For>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Entry points</h2>
          <dl class="mt-3 space-y-3">
            <For each={entryPoints}>
              {(ep) => (
                <div>
                  <dt class="font-mono text-xs text-foreground">{ep.name}</dt>
                  <dd class="mt-0.5 text-muted-foreground">{ep.desc}</dd>
                </div>
              )}
            </For>
          </dl>
        </section>

        <Separator />

        <section>
          <h2 class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Use as a dependency</h2>
          <p class="mt-3 leading-relaxed text-muted-foreground">
            Add <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">repo-get</code> to your{" "}
            <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">dub.json</code>, then import{" "}
            <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">repoget</code> and{" "}
            <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">repoget.platform</code>.
          </p>
          <pre class="mt-3 overflow-x-auto rounded-md border bg-muted/40 p-3 font-mono text-xs leading-relaxed">
{`{
  "dependencies": {
    "repo-get": {
      "repository": "git+https://github.com/dlang-supplemental/repo-get.git",
      "version": "main"
    }
  }
}`}
          </pre>
        </section>

        <section class="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">BSL-1.0</Badge>
          <Badge variant="outline">DUB library</Badge>
        </section>
      </main>

      <footer class="mt-10 flex flex-wrap items-center gap-2 border-t pt-5 text-xs text-muted-foreground">
        <Button as="a" href="https://github.com/dlang-supplemental/repo-get" variant="outline" size="sm">
          GitHub
        </Button>
        <Button as="a" href="https://github.com/dlang-supplemental/repo-get/releases" variant="ghost" size="sm">
          Releases
        </Button>
        <span class="ml-auto">D compiler + DUB required</span>
      </footer>
    </div>
  )
}

export default App
