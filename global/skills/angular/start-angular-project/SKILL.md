---
name: start-angular-project
description: Use when the user asks for a new Angular application or a new Angular library in an empty folder.
---

# Start an Angular project

## Rules

- Only when the user asks for Angular. For plain TypeScript, load `start-typescript-library`.
- No Material, no CDK, no other UI library. NgRx Signals only for state. Vitest for tests.
- Run the commands yourself. OpenCode asks the user to approve an install: wait for the answer.

## Steps

1. Ask with the question tool: the name (kebab-case) and the component prefix (`app`, or a short team
   prefix).
2. Run, in the project folder, in this order:
   - when `package.json` only holds `@opencode/cli`: `rm package.json package-lock.json` (Angular CLI
     refuses to write over them; `node_modules` stays, so OpenCode keeps running);
   - application: `npx @angular/cli@22 new <name> --directory . --style=scss --ssr=false --skip-git --skip-install`
     (Vitest is the default test runner since Angular 21);
   - library: `npx @angular/cli@22 new <name> --directory . --no-create-application --skip-git --skip-install`,
     then `npx --no -- ng generate library <name>`;
   - `npm install --save-dev --save-exact @opencode/cli@2.2.7`: it installs the project and keeps
     OpenCode in it;
   - `npm install --save-exact @ngrx/signals@22` when the app needs state.
3. Run `npx --no -- ng build` and `npx --no -- ng test --watch=false`. Fix until 0 errors.

## Example

Wrong:

```text
Run this command, then tell me when it is done: npx @angular/cli@22 new pump-panel
```

Right:

```text
I run npx @angular/cli@22 new pump-panel --directory . --skip-install (OpenCode asks you to approve).
```

## Final check

- Did the user ask for Angular, and is there no Material nor CDK?
- Do the build and the tests end at 0 errors?
