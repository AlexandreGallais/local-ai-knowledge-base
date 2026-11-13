# Knowledge base for a local AI

Rules, skills, agents, documentation and tools that help a small local language model write
production front-end code (Angular, TypeScript, HTML, CSS) inside OpenCode CLI 2.2.7.

## Status

- Version 0.2 is in progress. It covers front-end work only: Angular applications, Angular
  libraries and TypeScript libraries.
- Version 0.1 is archived in [`archive/v0.1/`](archive/v0.1/README.md), unchanged, with its history.

## How it works

Two bases, so that project repositories stay clean:

- **The global base** is installed once per machine, read-only, and shared by every dev container.
  It holds the documentation, the MCP servers, the common rules, skills and agents, and the
  OpenCode configuration.
- **The project kit** is the only thing a project holds: `AGENTS.md`, owned by the project, and the
  folder `.agents/` (profile, project rules, project skills, local work files).

## Layout

| Folder | Content |
| --- | --- |
| `global/` | The global base, copied as is to the machine. |
| `global/opencode/` | The OpenCode configuration, mounted as `/etc/opencode`: config, agents, plugins, common skills. |
| `global/rules/` | Common rules loaded in every session. |
| `global/docs/` | Documents written for the AI: what the model gets wrong, with wrong and right examples. |
| `global/library/` | Official documentation brought from the web, cleaned, one file of 16 KB at most. |
| `global/servers/` | MCP servers, one TypeScript file each, run by `node` without packages. |
| `global/tools/` | Scripts the servers and the plugin share: format, lint, detect a profile. |
| `global/profiles/` | One folder per project profile: lint and format configs, skills, OpenCode config. |
| `project/` | The project kit: `AGENTS.md` and `.agents/`. |
| `scripts/` | Build tools of this repository: checks, export, imports, tests. |
| `guides/` | Guides for people: install the base, paste the export, trial sessions. |
| `notes/` | Notes for maintainers: what the base relies on in OpenCode, measures. |
| `samples/` | Example projects, one per profile, used by the tests. |
| `archive/v0.1/` | Version 0.1, unchanged. |

## Run

Version 0.2 has no install yet. The checks of this repository run from its root:

```sh
node --test 'scripts/*.test.ts'
node scripts/check-base.ts
```

## License

MIT, see [LICENSE](LICENSE). Third-party documentation in `global/library/` keeps its own license,
listed in `global/THIRD_PARTY_NOTICES.md`. MDN Web Docs content stays under CC BY-SA 2.5 in its own
folders.
