# SEED: stack-frontend-framework  (STK-07, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: stack-frontend-framework
description: "Gives the patterns, pitfalls and tools of the front-end framework this project uses (Angular, React or Vue), at the installed version. Use when writing or reviewing code of the project's front-end framework, when unsure of the idiomatic way in that framework, or when upgrading it."
metadata:
  id: STK-07
  stars: "3"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Detect the framework and its major version; write the skill for that framework only.
- [ ] Project structure and generators (ng generate, the project's scripts).
- [ ] State, data fetching and routing patterns the project uses.
- [ ] Testing tools of that framework in the project.
- [ ] Build and serve commands.

## Known pitfalls to confirm or drop

- Using APIs of another major version (Angular modules versus standalone, React class components).
- Framework-specific change detection or re-render traps.

## MCP servers and example queries

- js-official-docs: Angular standalone components signals, React hooks rules, Vue composition API
