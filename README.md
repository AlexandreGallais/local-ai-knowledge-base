# Knowledge base for a local AI

Rules, skills, agents, documentation and tools that help a small local language model write
production front-end code (Angular, TypeScript, HTML, CSS) inside OpenCode CLI 2.2.7.

## Status

- Version 0.2.0: front-end work only, for four kinds of project: Angular application, Angular library,
  TypeScript business library, library of pure TypeScript functions. Changes: [CHANGELOG.md](CHANGELOG.md).
- Version 0.1 is archived in [`archive/v0.1/`](archive/v0.1/README.md), unchanged, with its history.

## How it works

Two bases, so that project repositories stay clean:

- **The global base** is installed once per machine, read-only, and shared by every dev container:
  documentation, MCP servers, common rules, skills, templates, optional lint and format configs, and
  the OpenCode configuration.
- **The project kit** is the only thing a project holds: `AGENTS.md`, owned by the team, and the folder
  `.agents/` (project skills).

In a session, one agent works directly, with no sub-agent and no per-project setup: `AGENTS.md` tells it
where the documentation, the MCP tools, the skills and the templates are. It installs the packages it
needs itself, after the user approves the command. "Done" comes after build and tests at zero errors.

## From the export to the first conversation

1. **Find the part size that pastes.** The export is in `export/`, in five part sizes (500 KB to 10 MB);
   follow [guides/paste-export.md](guides/paste-export.md), part 1.
2. **Install the global base.** Paste every `global-NNN.txt` of that size and `import-base.ts` into an
   empty folder, then run `node <that folder>/import-base.ts` from where you want the base. It lands
   in `./local-ai-base` there.
3. **Mount it in the dev containers.** Follow [guides/install.md](guides/install.md): the base at
   `/opt/local-ai-base`, read-only; its OpenCode folder at `/etc/opencode`; OpenCode kept at 2.2.7 with
   updates off; the context window of the model declared. To try it first on one machine, with a
   project with the base and the same project without it, follow
   [guides/compare-with-and-without.md](guides/compare-with-and-without.md).
4. **Check the container.** In a recreated dev container, run the commands of `install.md`, part 4.
5. **Equip a project.** Paste every `project-NNN.txt` and `import-project.ts` into an empty folder,
   then run `node <that folder>/import-project.ts` from the root of the project. It writes `AGENTS.md`
   and `.agents/`, and keeps what the team already wrote.
6. **Work.** Open OpenCode at the root of the project (`npx opencode`) and describe what you want.
7. **Measure it.** Play the ten tasks of the evaluation without a base, with the 0.1 and with the 0.2:
   [guides/run-evaluation.md](guides/run-evaluation.md).

Other trials: heavy files
([guides/try-heavy-files.md](guides/try-heavy-files.md)), update a tool of the documentation
([guides/update-a-tool.md](guides/update-a-tool.md)).

## Layout

| Folder | Content |
| --- | --- |
| `global/` | The global base, copied as is to the machine. |
| `global/opencode/` | Mounted as `/etc/opencode`: config, common skills, plugin. |
| `global/rules/` | Common rules loaded in every session. |
| `global/docs/` | Documents written for the AI, by topic, with `topics.json` (topic → profiles). |
| `global/library/` | Official documentation brought from the web, cleaned, one file of 16 KB at most. |
| `global/skills/` | Skills of the profiles, by group (`angular`, `typescript`), with `groups.json`. |
| `global/servers/` | MCP servers, one TypeScript file each, run by `node` without packages. |
| `global/tools/` | Scripts: format, lint, apply a lint profile on demand, read heavy files. |
| `global/lint/` | Format and lint configs of the four profiles, copied into a project on demand. |
| `global/kit/` | Tested pure functions (maths, geometry) and the generated types of the symbols. |
| `global/templates/` | Tested templates: stores, component, pure function. |
| `global/evaluation/` | Ten evaluation tasks, their starting projects, the runner and the summary. |
| `project/` | The project kit: `AGENTS.md` and `.agents/`. |
| `scripts/` | Build tools of this repository: checks, export, imports, generators, tests. |
| `guides/` | Guides for people: install, paste the export, trials, evaluation. |
| `notes/` | Notes for maintainers: what the base relies on in OpenCode, measures, review. |
| `samples/` | Example projects, one per profile, used by the tests. |
| `export/` | The export of the last delivery, in five part sizes. |
| `archive/v0.1/` | Version 0.1, unchanged. |

## Run the checks

From the root of this repository, after `npm install --prefix samples` for the tests that run the real
format, lint and test passes:

```sh
node --test 'scripts/*.test.ts'
node scripts/check-base.ts
node scripts/export.ts
```

## License

MIT, see [LICENSE](LICENSE). Third-party documentation in `global/library/` keeps its own license,
listed in `global/THIRD_PARTY_NOTICES.md` with its copyright; the license files of each source are
copied unchanged in `global/licenses/<tool>/` by `node scripts/fetch-licenses.ts`. MDN Web Docs
content stays under CC BY-SA 2.5 in its own folders. The archive of version 0.1 has the same files in
`archive/v0.1/`.
