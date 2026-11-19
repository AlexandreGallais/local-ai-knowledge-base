# SEED: state-management  (FE-04, 3 stars, V3)

## Final frontmatter (do not change)

```yaml
name: state-management
description: "Manages UI state the way the project does - store, context, signals or services - without duplicated or derived state stored twice. Use when adding state to a component or app, when two parts of the UI disagree, when choosing where data lives, or when a store grows messy."
metadata:
  id: FE-04
  stars: "3"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Detect the state solution of the project (signals, NgRx or other store, React context, Vue store) and its version.
- [ ] Where each kind of state lives (local, shared, server cache, URL).
- [ ] Derived state computed, not stored.
- [ ] Updating immutably and testing the store.

## Known pitfalls to confirm or drop

- Copying server data into several stores.
- Storing derived values that go stale.

## MCP servers and example queries

- js-official-docs: Angular signals computed, NgRx signal store, React useReducer, Pinia
