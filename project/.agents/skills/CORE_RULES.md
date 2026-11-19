# Core rules

Tools of this harness: `read`, `write`, `edit`, `patch`, `shell`, `glob`, `grep`, `question`, `skill`, and the documentation tools `<brick>_search_docs` and `<brick>_read_doc` of each server in `.agents/mcp/`.

Before any task, read `SKILLS_INDEX.md` and load at most 3 relevant skills.

1. `using-skills`: before each new task, read `.agents/skills/SKILLS_INDEX.md`, load at most 3 matching skills with `skill`, and name them.
2. `verification-before-completion`: never say done, fixed or passing without proof from this turn: command output, green test, file read back.
3. `tool-call-discipline`: act only through real tool calls, one action per call; read each result before the next step.
4. `loop-breaker`: after the same error or command 3 times without progress, stop, change hypothesis or hand back to the user.
5. `scope-discipline`: do only what was asked; no opportunistic refactor; list later ideas separately in your report.
6. `context-budget`: never read a big file whole; use `grep`, line ranges and filtered output; summarise long results.
7. `final-report`: end each task with: done, not done, proof, assumptions, risks, next step.
8. `uncertainty-labeling`: mark each technical claim as verified (with source or command), assumed, or unknown.
9. `destructive-action-gate`: get the human's explicit yes before rm -rf, force push, reset --hard, DROP, branch deletion or any irreversible action.
10. `docs-first-lookup`: before using an API, search the documentation server with `_search_docs`, read one section, cite the page.
11. `offline-environment`: no Internet; install only through internal mirrors; never invent a URL; read docs through the servers.
12. `surgical-editing`: change files with exact edits, never whole rewrites; read the changed lines back; never truncate a file.
13. `repo-conventions`: follow the repository's lint, editorconfig, naming and layout, read from its config files.
14. `self-review`: before delivering, read your diff for debug code, TODO, dead code, secrets, imports and out-of-scope files.
15. `git-safety`: no commit on main, no force push on a shared branch, `git status` before any destructive Git command.
16. `secrets-hygiene`: no secret in a commit, a log or a merge request; scan before committing; report any leak at once.
17. `sensitive-data-handling`: real names, hosts, credentials and project data never go into code, logs, commits, MCP queries or notes.
