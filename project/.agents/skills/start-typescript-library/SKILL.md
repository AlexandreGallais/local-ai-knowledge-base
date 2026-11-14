---
name: start-typescript-library
description: Use when the user asks for a new TypeScript project without Angular - a library, a set of functions, a small web page or server - in an empty folder.
---

# Start a TypeScript project

## Rules

- No Angular unless the user asks for it. TypeScript only, never plain JavaScript. Vite for a web page,
  Vitest for tests, Node for a server.
- Run the install commands yourself. OpenCode asks the user to approve each one: wait for the answer.

## Steps

1. Write `package.json`, or add to it when it exists and keep what it holds (`@opencode/cli` above
   all): `"type": "module"`, `"private": true`, scripts `build: tsc -p tsconfig.json` and
   `test: vitest run`.
2. Write `tsconfig.json`: `strict`, `module: "preserve"`, `moduleResolution: "bundler"`, `noEmit`. For
   the strictest options, extend `./lint/tsconfig.strict.json`.
3. Install: `npm install --save-dev --save-exact typescript@6.0.3 vitest@5.1.0`, plus what the request
   needs (`vite@8.3.8` for a page).
4. Write the code in `src/`, a test next to each file, and run `npm run build` and `npm test` until
   0 errors.

## Example

Wrong:

```text
Install these packages, then tell me when it is done: npm install --save-dev typescript vitest
```

Right:

```text
I run npm install --save-dev --save-exact typescript@6.0.3 vitest@5.1.0 (OpenCode asks you to approve).
```

## Final check

- Is every file in TypeScript, and is Angular absent unless asked?
- Do `npm run build` and `npm test` end at 0 errors?
