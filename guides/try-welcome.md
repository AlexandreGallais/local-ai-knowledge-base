# Try the welcome of a project on the workstation

At the first conversation in a project without `.agents/profile.json`, the AI guesses what the project
is, asks you to confirm, then applies the profile. This guide checks it on an empty project and on an
existing one. It takes about 20 minutes.

## Before

- The global base is installed (`guides/install.md`).
- Equip each project with the project kit: paste its export, then `node import-project.ts`.

## 1. An empty project

1. Create an empty folder with `git init`, open it in its dev container, equip it, open OpenCode.
2. Send: "Hello."

Note:

- [ ] The AI runs `detect-project.ts` and finds the kind `empty`.
- [ ] It asks, with choices, the kind (four profiles, `angular-app` first), the subject, the versions and
  the copyright header, in your language.
- [ ] After your answers, `apply-profile.ts` ends with "Profile <kind> applied".
- [ ] It asks you to restart OpenCode, then offers `start-angular-project` or `start-typescript-library`.

## 2. An existing project

Use a copy of an Angular project of the team, or of `samples/angular-app` without its `.agents/` folder.

- [ ] The detected kind, versions, test runner and copyright header are those of the project.
- [ ] `.agents/profile.json` gives the kind and subject you confirmed; `AGENTS.md` gives the subject.
- [ ] `.agents/lint/lint.config.mjs` names the profile, and
  `node /opt/local-ai-base/tools/lint-file.ts --all` runs.
- [ ] `git status --short` shows only `AGENTS.md` and `.agents/`; `.opencode/` stays out of Git.

## 3. A TypeScript library

Equip a TypeScript library without Angular and answer `ts-lib`, then restart OpenCode.

- [ ] Ask "Which skills do you have?": no `write-component`, `write-store` or `write-service`.
- [ ] `opencode debug agents`: `component`, `store`, `service` and `html-css` are switched off.
- [ ] Ask a question on Angular signals: the `docs` tools find no Angular document of the base.

## 4. The welcome again

Add a line of your own to `AGENTS.md` and a project skill in `.agents/skills/`, then ask: "Set the
profile again."

- [ ] Your line of `AGENTS.md`, your skill and your check commands are unchanged.

## 5. A project that is not front-end

Open a folder that holds only a `Cargo.toml` or a `.csproj`.

- [ ] The AI says in one sentence that the base serves Angular and TypeScript front-end projects only,
  and stops.

## What to send back

The ticked boxes; for a wrong guess, the seven lines printed by `detect-project.ts` (without internal
names).
