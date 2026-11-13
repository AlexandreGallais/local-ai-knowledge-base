---
name: welcome
description: Use when a project has no .agents/profile.json, or when the user asks to set the profile again - guess the kind of project, confirm it with the user, then apply its profile.
---

# Welcome a project

Do this before any other work. Ask, never guess in silence: the user confirms each answer.

## Steps

1. Run `node /opt/local-ai-base/tools/detect-project.ts`. Read its seven lines.
2. Kind `not-front`: tell the user, in one sentence, that this base serves Angular and TypeScript front-end
   projects only. Stop.
3. Look for what the command cannot see: open `README.md` and the outline of one or two source files
   with the `code` tools. Never read a whole folder.
4. Ask the user with the question tool, in one call, four questions. Put the detected answer first and
   mark it "(Recommended)":
   - Kind: `angular-app`, `angular-lib`, `ts-lib` (business library), `ts-pure-lib` (pure functions).
     An `empty` project: offer the four kinds, `angular-app` first.
   - Subject: one sentence on what the project does, from the README; offer "Write my own".
   - Versions: the detected versions; offer "Other versions".
   - Copyright header: the detected line, or "No header".
5. Run `node /opt/local-ai-base/tools/apply-profile.ts --profile <kind> --subject "<subject>"`, with
   `--copyright "<line>"` when there is one, and `--convention "<rule>"` for each convention the user
   confirmed (for example "File names are in kebab-case.").
6. Tell the user to restart OpenCode: the skills and agents of the profile load at start.
7. An `empty` project: after the restart, offer the skill `start-angular-project` or
   `start-typescript-library`, as the profile says.

## Rules

- Never write `.agents/profile.json` or `.opencode/opencode.json` by hand: the command writes them.
- Running the welcome again keeps `AGENTS.md`, `.agents/skills/` and the check commands of the team.
- Ask in the language of the user; write the subject and the conventions in English.

## Example

Wrong: "This is an Angular app, I set it up." Right: a question "Kind of project?" with
"angular-app (Recommended)", "angular-lib", "ts-lib", "ts-pure-lib", then the command with the answer.

## Final check

- Does `.agents/profile.json` give the confirmed kind and subject?
- Did `apply-profile.ts` end with "Profile <kind> applied"?
