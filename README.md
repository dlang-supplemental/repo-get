# repo-get

Multi-VCS repository fetch library for [D](https://dlang.org) — SDL profiles for git, svn, hg, fossil, and more.

[![CI](https://github.com/dlang-supplemental/repo-get/actions/workflows/ci.yml/badge.svg)](https://github.com/dlang-supplemental/repo-get/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/badge/docs-DLang%20Supplemental-22c55e)](https://dlang-supplemental.github.io/repo-get/)

## Installation

Add to `dub.json` or `dub.sdl`, then `import repoget` and `repoget.platform`.

```json
{
  "dependencies": {
    "repo-get": {
      "repository": "git+https://github.com/dlang-supplemental/repo-get.git",
      "version": "main"
    }
  }
}
```

## Usage

- `getProvider(url)` — resolve a VCS backend from a URL
- `getManager()` — load VCS SDL profiles
- `getForge(hostOrUrl)` — resolve forge metadata profiles (GitHub, GitLab)
- `BootstrapDownloader.download` — HTTP fetch via bootstrap rules

Full documentation: [README.adoc](README.adoc) and [Antora component](docs/).

## License

[BSL-1.0](https://opensource.org/licenses/BSL-1.0)
