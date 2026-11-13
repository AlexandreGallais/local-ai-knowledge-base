---
name: start-angular-project
description: Use when the user asks for a new Angular application or a new Angular library in an empty folder.
---

# Start an Angular project

## Rules

- The user runs every command that installs or downloads: give the command, wait for their answer.
- No Material, no CDK, no other UI library. NgRx Signals only for state. Vitest for tests.

## Steps

1. Ask with the question tool, one question at a time:
   - application or library;
   - the name (kebab-case) and the component prefix (`app`, or a short team prefix);
   - the copyright header of the files, if any.
2. Give the user the command to run, and wait:
   - application: `npx @angular/cli@22 new <name> --style=scss --ssr=false --skip-git` (Vitest is
     the default test runner since Angular 21);
   - library: `npx @angular/cli@22 new <name> --no-create-application --skip-git`, then
     `npx --no ng generate library <name>`.
3. Ask the user to install `@ngrx/signals` at the version of Angular: `npm install @ngrx/signals@22`.
4. Write `.agents/profile.json` with the profile (`angular-app` or `angular-lib`), the prefix and the
   copyright; then ask the user to run `node /opt/local-ai-base/tools/install-lint.ts .` and to install
   the packages of the profile, listed in `/opt/local-ai-base/packages.md`.
5. Run the check commands of `.agents/profile.json` on the generated project. Fix until 0 errors.
6. Write the subject of the project in `AGENTS.md`, in two lines.

## Example

Wrong:

```text
I ran npm install @angular/material and created the project.
```

Right:

```text
Run this command, then tell me when it is done:
npx @angular/cli@22 new pump-panel --style=scss --ssr=false --skip-git
```

## Final check

- Did the user run every install and download?
- Is `.agents/profile.json` written, and do the checks end at 0 errors?
