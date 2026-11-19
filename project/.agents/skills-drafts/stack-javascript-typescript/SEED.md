# SEED: stack-javascript-typescript  (STK-06, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: stack-javascript-typescript
description: "Works with JavaScript and TypeScript projects - npm or pnpm through the internal registry, ESM and CommonJS, tsconfig, Vitest or Jest, ESLint. Use when working in a project with package.json or tsconfig.json, running npm or pnpm scripts, fixing module resolution, type or test errors."
metadata:
  id: STK-06
  stars: "4"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed node, npm or pnpm versions; .nvmrc or engines.
- [ ] Install command with the lockfile (npm ci or pnpm install --frozen-lockfile).
- [ ] Module system of the project (type module, ESM versus CommonJS) and tsconfig module settings.
- [ ] Test runner and how to run one file or one test.
- [ ] Lint and format commands.

## Known pitfalls to confirm or drop

- Mixing require and import across ESM and CommonJS.
- npm install changing the lockfile when npm ci was meant.
- tsconfig paths not resolved at run time without a resolver.

## MCP servers and example queries

- js-official-docs: package.json type module, tsconfig moduleResolution, npm ci, vitest run
