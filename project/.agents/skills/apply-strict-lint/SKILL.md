---
name: apply-strict-lint
description: Use when the user asks for the strict format and lint of the base in this project, and only then - choose its lint profile, apply it, install its packages, then format and lint every file.
---

# Apply the strict format and lint

The strict format and lint are optional. Never apply them unless the user asks for them.

## Rules

- Choose the lint profile from what the project is, and confirm it with the user:

  | The project | Profile |
  | --- | --- |
  | An Angular application | `angular-app` |
  | An Angular library | `angular-lib` |
  | A TypeScript library of business code | `ts-lib` |
  | A TypeScript library of pure functions: no class, no mutation, one function per file | `ts-pure-lib` |

- Copy the copyright line the files of the project already start with, when they have one.
- Run every command yourself. OpenCode asks the user to approve the install: wait for the answer.

## Steps

1. Read `package.json` and two source files. Propose the profile and the copyright line with the question tool.
2. Run `node /opt/local-ai-base/tools/apply-lint.ts --profile <profile> --copyright "<line>"`.
   Add `--prefix <prefix>` for an Angular project whose selectors start with a prefix.
3. Run `node /opt/local-ai-base/tools/missing-packages.ts`. It prints one `npm install` command: run it.
4. Run `node /opt/local-ai-base/tools/format-file.ts --all`, then `node /opt/local-ai-base/tools/lint-file.ts --all`.
5. Fix every lint error left. Search the id of a rule you do not know with the `docs` tools. Repeat until 0 errors.
6. Run the build and the tests of the project.

## Example

Wrong: the user asks for a new function, and you apply the strict lint to the project on your own.

Right: the user asks "apply the strict lint"; you propose `ts-lib` with the copyright line of the
existing files, apply it, install the packages, then format, lint, build and test to 0 errors.

## Final check

- Did the user ask for the strict lint, and confirm the profile?
- Did you run the install yourself?
- Do format, lint, build and tests end at 0 errors?
