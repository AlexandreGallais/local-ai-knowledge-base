# SEED: frontend-components  (FE-01, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: frontend-components
description: "Writes UI components the way the project's framework expects - state, props or inputs, splitting, reuse, naming. Use when creating or changing a component in Angular, React, Vue or another framework of the project, when a component grows too large, or when deciding where state lives."
metadata:
  id: FE-01
  stars: "4"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Detect the framework and its version from package.json; document only that one.
- [ ] Component structure and file layout used by the project.
- [ ] Inputs and outputs or props and events; state ownership; derived values.
- [ ] Splitting rules: when to extract a child component.
- [ ] Testing a component with the project's tools.

## Known pitfalls to confirm or drop

- Mutating inputs or props inside the child.
- Fetching data in many leaf components instead of one container.
- Angular: subscriptions not cleaned up; prefer signals or the async pipe as the project does.
- React: effects used for derived state.

## MCP servers and example queries

- js-official-docs: Angular component inputs signals, React useEffect, Vue props
