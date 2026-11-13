# F3 trial on the workstation

What to play on the workstation to check the three criteria of F3 that only a person can see.
About 30 minutes. Fill the results table at the end.

## 1. Build the example project

1. Create an empty folder, for example `base-trial/`.
2. Copy these 9 files into it, keeping their paths. The export does not exist yet: copy them by
   hand from the `work/` repository.

| Copy from `work/` | To `base-trial/` |
| --- | --- |
| `code/AGENTS.md` | `AGENTS.md` |
| `code/.agents/skills/write-agents-md/SKILL.md` | `.agents/skills/write-agents-md/SKILL.md` |
| `code/.agents/skills/write-skill/SKILL.md` | `.agents/skills/write-skill/SKILL.md` |
| `code/.agents/skills/write-agent/SKILL.md` | `.agents/skills/write-agent/SKILL.md` |
| `code/.agents/skills/write-base-document/SKILL.md` | `.agents/skills/write-base-document/SKILL.md` |
| `code/.agents/skills/write-chat-model/SKILL.md` | `.agents/skills/write-chat-model/SKILL.md` |
| `code/docs/template.md` | `docs/template.md` |
| `code/docs/README.fr.md` | `docs/README.fr.md` |
| `scripts/check-base.ts` | `scripts/check-base.ts` |

3. Check the copy, in a terminal at the root of `base-trial/`, with Node 22.18 or later:

```sh
node scripts/check-base.ts
```

Expected: `Base check passed: 8 file(s), 0 findings.`

4. Keep a clean copy of `base-trial/`. Before each skill test of part 4, start again from it.

## 2. The assistant reads AGENTS.md (criterion 5)

Open the coding assistant on `base-trial/`. Give no other instruction. Ask, one at a time:

| Ask | Expected |
| --- | --- |
| `Which skills can you use in this project?` | The 5 skills: `write-agents-md`, `write-skill`, `write-agent`, `write-base-document`, `write-chat-model`. |
| `Search the web for the latest Angular version.` | It refuses to use the web, as `AGENTS.md` says. |
| `Read docs/README.fr.md and summarise it.` | It says it does not read `.fr.md` files, or asks first. |

If the assistant has a list of skills in its interface, check that the 5 skills are in it.

## 3. Answer language (criterion 6)

In a new session each time, ask the same question in both languages:

| Ask | Expected |
| --- | --- |
| `Comment déclarer une propriété optionnelle dans une interface TypeScript ?` | The whole answer in French. Code in English. |
| `How do I declare an optional property in a TypeScript interface?` | The whole answer in English. |
| `Quelles règles suis-tu dans ce projet ?` | The whole answer in French, though `AGENTS.md` is in English. |

A word of the other language outside code or file names counts as a mix: note it.

## 4. Authoring skills (criterion 7)

One request per skill, each in a new session on a clean copy. After each one, run
`node scripts/check-base.ts`: it must end with `0 findings`. Also check the expected files.

### 4.1 `write-agents-md`

> Add a rule to AGENTS.md: write Angular components as standalone components. Add the check command
> `npm run lint` for TypeScript code.

Expected: `AGENTS.md` has the new rule and a `## Check commands` table; the 5 skill lines and the
`## Index` section are still there.

### 4.2 `write-skill`

> Write a skill that writes a commit message in the Conventional Commits format.

Expected: `.agents/skills/<name>/SKILL.md` with `Use when` in its description, an `## Example`, a
`## Final check`, the step that writes a file between the `files` markers, and a new trigger line
in `AGENTS.md`.

### 4.3 `write-agent`

> Write a code review agent for TypeScript code. It reads the code and lists the problems. It never
> changes a file.

Expected: `.agents/skills/<name>/SKILL.md` with `## Role` in one sentence, `## Answer format`
starting with the result, and a trigger line in `AGENTS.md`.

### 4.4 `write-base-document`

Paste this source text with the request. It is a short test source, written for this trial.

> Write a document of the base from this source.
>
> Source S1: Microsoft, "Object Types", TypeScript Handbook, TypeScript 5.9,
> `https://www.typescriptlang.org/docs/handbook/2/objects.html`, read 2026-11-12, CC BY 4.0.
> Text: A property of an object type can be marked optional by adding a question mark after its
> name, as in `color?: string`. When `strictNullChecks` is on, reading an optional property gives
> the type `string | undefined`, so the code must check for `undefined` before using it. A default
> value can be given in a destructuring pattern, as in `function paint({ color = "red" }: Shape)`.

Expected: `docs/<topic>/<file>.md` with every header field, a `## Sources` section, the index line
in `AGENTS.md` equal to the `summary`, and `docs/<topic>/README.fr.md` with one line in French.

### 4.5 `write-chat-model`

> Write the chat model for the subject "containers and Kubernetes". Knowledge: containers,
> kubernetes. No skill. Access: developers.

Expected: `chat/models/<id>.md` with its header, a first rule that asks to search the knowledge,
and 40 lines or fewer of system prompt.

## Results

Write the version of the assistant and the date. Note what went wrong in your own words.

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| 1. Copy checked |  |  |
| 2. Skills listed |  |  |
| 2. Web refused |  |  |
| 2. `.fr.md` not read |  |  |
| 3. French question, French answer |  |  |
| 3. English question, English answer |  |  |
| 3. Rules question in French |  |  |
| 4.1 `write-agents-md` |  |  |
| 4.2 `write-skill` |  |  |
| 4.3 `write-agent` |  |  |
| 4.4 `write-base-document` |  |  |
| 4.5 `write-chat-model` |  |  |
