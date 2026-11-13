# OpenCode CLI 2.2.7: the features this base uses

What the base relies on in OpenCode CLI 2.2.7, and where each fact comes from. Source: the
documentation and the code of the tag `v2.2.7` of the OpenCode repository (commit `fedc6f2`,
2026-11-10), read on 2026-11-13. Paths below are files of that tag. Nothing here was run on a
workstation yet: each line marked "to try" is checked during the trial session.

Version 2.3.0 (2026-11-13) runs every subagent in the background, which breaks "one subagent at a
time". The base pins 2.2.7 and switches updates off.

## Features used

| Feature | What the base does with it | Where it is set | Source (tag v2.2.7) |
| --- | --- | --- | --- |
| System config folder | Common config, agents, commands, skills and plugins, mounted read-only from the global base | `/etc/opencode/` | `config.mdx` lines 28 to 109 |
| Global config | `update: "disable"` only; it is read nowhere else | `~/.config/opencode/opencode.jsonc` | `config.mdx` line 171 |
| Project config | Generated `.opencode/opencode.json` for the profile, kept out of Git | `.opencode/` | `config/discovery.ts` lines 12, 82 |
| `.agents/skills/` | Project skills, found without any setting | project | `config/discovery.ts` lines 143 to 166 |
| `AGENTS.md` | The project's own short rules, loaded at every request | project root | `instructions.mdx` line 42 |
| `instructions` | The common rules of the base, by absolute path; a missing file is skipped silently | system config | `instructions.mdx` lines 101 to 128 |
| Agents | Orchestrator (primary) and specialised subagents, one Markdown file each | `/etc/opencode/agents/` | `agents.mdx` |
| `subagent` tool | Fresh session; waits for the end; returns the last message; a subagent cannot start another | built in | `subagent.ts` line 58, `tools.mdx` line 218 |
| `question` tool | Multiple-choice questions; first option marked "(Recommended)" | built in, permission `question` | `schema/src/question.ts` lines 6 to 16 |
| Compaction | Starts at 170,000 tokens by default for a 200,000 window; `buffer` moves it earlier; the summary template is fixed | `compaction` | `session/compaction.ts` lines 173 to 245, 1163 to 1171 |
| Formatter | Runs the base's format script after `write`, `edit`, `patch`; returns nothing to the model; built-ins switched off | `formatter` | `formatters.mdx`, `formatter.ts` lines 60 to 95 |
| Plugin hooks | `execute.after` adds the lint errors of a written file; `execute.before` rejects a second subagent | `/etc/opencode/plugins/` | `plugin/hooks.ts` line 23 |
| Permissions | Ordered rules, last match wins, `ask` when nothing matches; an agent's rules come last | `permissions` | `permissions.mdx` line 56, `config/plugin/agent.ts` lines 62 to 113 |
| Policies | Hard denies that no agent rule and no "allow always" can lift | `policies` | `policies.mdx` lines 112 to 152 |
| MCP servers | Local stdio servers run by `node`; `codemode: false` for direct tools | `mcp.servers` | `mcp-servers.mdx` line 30 |
| `tool_output` | Caps every tool result | `tool_output` | `config.mdx` |
| `steps` | Caps the steps of an agent | agent header | `agents.mdx` lines 282 to 290 |
| `opencode run --format json` | Non-interactive runs for the evaluation; tokens per step | command line | `run/noninteractive.ts` |

## Features the base does not use

| Feature | Why |
| --- | --- |
| `todowrite` | Off by default in 2.2.7 and stores nothing: the task list lives in `.agents/work/<subject>/tasks.md` |
| LSP | Accepted in the config but runs nothing in 2.2.7 |
| Code Mode | Small models fail to write its JavaScript (one report); tools are exposed directly instead |
| `webfetch`, `websearch`, `execute` | No web; `execute` offers `fetch` |
| Worktree tools | Work stays on the current branch |
| `general` and `explore` agents | Their descriptions invite parallel work |

## To try on the workstation

- The plugin loads without network: the host provides `@opencode/plugin`.
- The formatter runs after a write in the dev container.
- A second `subagent` call is rejected with a message.
- The MCP servers are there at the first request of `opencode run`.
