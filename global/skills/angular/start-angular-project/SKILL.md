---
name: start-angular-project
description: Use when the user asks for a new Angular application or a new Angular library in an empty folder.
---

# Start an Angular project

## Rules

- The user runs every command that installs or downloads: give the command, wait for their answer.
- No Material, no CDK, no other UI library. NgRx Signals only for state. Vitest for tests.

## Steps

1. Read `.agents/profile.json`: the welcome wrote the profile (`angular-app` or `angular-lib`), the
   subject and the copyright. If it is missing, load the skill `welcome` first.
2. Ask with the question tool: the name (kebab-case) and the component prefix (`app`, or a short team
   prefix).
3. Give the user the command to run in the project folder, and wait:
   - application: `npx @angular/cli@22 new <name> --directory . --style=scss --ssr=false --skip-git`
     (Vitest is the default test runner since Angular 21);
   - library: `npx @angular/cli@22 new <name> --directory . --no-create-application --skip-git`,
     then `npx --no -- ng generate library <name>`.
4. Ask the user to install `@ngrx/signals` at the version of Angular (`npm install @ngrx/signals@22`)
   and the packages of the profile listed in `/opt/local-ai-base/packages.md`.
5. Run `node /opt/local-ai-base/tools/apply-profile.ts --profile <profile> --subject "<subject>"
   --prefix <prefix>`: it refreshes the lint configs and keeps the team's files.
6. Run the check commands of `.agents/profile.json` on the generated project. Fix until 0 errors.

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
- Did `apply-profile.ts` end with "Profile <profile> applied", and do the checks end at 0 errors?
