# Knowledge base for a local AI

Rules, skills, agents, documentation and tools that help a small local language model write
production front-end code (Angular, TypeScript, HTML, CSS) inside OpenCode CLI 2.2.7.

## Status

- Version 0.2.0: front-end work only: Angular applications and libraries, TypeScript libraries.
  Changes: [CHANGELOG.md](CHANGELOG.md).
- Version 0.1 is archived in [`archive/v0.1/`](archive/v0.1/README.md), unchanged, with its history.

## How it works

Two bases, so that project repositories stay clean:

- **The global base** is installed once per machine, read-only, and shared by every dev container: the
  documentation, the MCP servers and the tools they run, and the common rules.
- **The project kit** is the only thing a project holds: `AGENTS.md`, owned by the team, and the folder
  `.agents/`: the skills (`.agents/skills/`) and the format and lint configs (`.agents/lint/`), for the
  whole team. The project lints more or less according to the plugins it installs.
- **The OpenCode keys of the base** (`opencode/opencode.jsonc`) go into your own OpenCode configuration:
  common rules, MCP servers, formatter, web lock. The base imposes no rights.

In a session, one agent works directly, with no sub-agent and no per-project setup: `AGENTS.md` tells it
where the documentation, the MCP tools and the skills are. It installs the packages it needs itself.
"Done" comes after lint, build and tests at zero errors.

## From the export to the first conversation

1. **Find the part size that pastes.** The export is in `export/`, in five part sizes (500 KB to 10 MB);
   follow [guides/paste-export.md](guides/paste-export.md), part 1.
2. **Install the global base.** Paste every `global-NNN.txt` of that size and `import-base.ts` into an
   empty folder, then run `node <that folder>/import-base.ts` from where you want the base. It lands
   in `./local-ai-base` there.
3. **Mount it in the dev containers.** Follow [guides/install.md](guides/install.md): the base at
   `/opt/local-ai-base`, read-only; the keys of `setup/opencode/opencode.jsonc` added to your OpenCode
   configuration; OpenCode kept at 2.2.7 with updates off. To try it first on one machine, with a
   project with the base and the same project without it, follow
   [guides/compare-with-and-without.md](guides/compare-with-and-without.md).
4. **Check the container.** In a recreated dev container, run the commands of `install.md`, part 4.
5. **Equip a project.** Paste every `project-NNN.txt` and `import-project.ts` into an empty folder,
   then run `node <that folder>/import-project.ts` from the root of the project. It writes `AGENTS.md`
   and `.agents/`, and keeps what the team already wrote.
6. **Work.** Open OpenCode at the root of the project (`npx opencode`) and describe what you want.

Other trials: heavy files
([guides/try-heavy-files.md](guides/try-heavy-files.md)), update a tool of the documentation
([guides/update-a-tool.md](guides/update-a-tool.md)).

## Layout

| Folder | Content |
| --- | --- |
| `global/` | The global base, copied as is to the machine: documentation and shared code only. |
| `global/rules.md` | The common rules, loaded in every session. |
| `global/docs/` | Short documents written for the AI, by topic. |
| `global/library/` | Official documentation brought from the web, cleaned, one file of 16 KB at most. |
| `global/servers/` | MCP servers, one TypeScript file each, run by `node` without packages. |
| `global/tools/` | The tools the servers and the formatter run: format, lint, read heavy files, search. |
| `project/` | The project kit: `AGENTS.md` and `.agents/` (skills, format and lint configs). |
| `opencode/` | What the base adds to an OpenCode configuration, to copy into yours. |
| `devcontainer/` | The two test dev containers, with and without the base, and the shared user config. |
| `import/` | The two import scripts that travel with the export. |
| `guides/` | Guides for people: install, paste the export, trials. |
| `notes/` | Notes for maintainers: what the base relies on in OpenCode, measures, review. |
| `export/` | The export of the last delivery, in five part sizes. |
| `archive/v0.1/` | Version 0.1, unchanged. |

The tools that build, check and export this repository, and the sample projects of their tests, are
kept outside it.

## License

MIT, see [LICENSE](LICENSE). Third-party documentation in `global/library/` keeps its own license,
listed in `global/THIRD_PARTY_NOTICES.md` with its copyright; the license files of each source are
copied unchanged in `global/licenses/<tool>/`. MDN Web Docs
content stays under CC BY-SA 2.5 in its own folders. The archive of version 0.1 has the same files in
`archive/v0.1/`.
