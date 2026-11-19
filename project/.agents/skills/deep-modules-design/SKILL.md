---
name: deep-modules-design
description: "Designs deep modules - small, simple interfaces hiding much behaviour, low coupling, clear seams for tests. Use when designing or reshaping a module or class interface, when callers must know too much to use a module, when deciding where a seam or boundary goes, or when code is hard to test or to navigate."
license: MIT
metadata:
  id: ARC-02
  stars: "3"
  nature: reference
  mode: R
  wave: V3
  load: auto
---

# Deep modules design

**Core rule:** a module earns its place when its interface is much simpler than what it hides; prefer few, deep modules over many shallow ones.

## Procedure

1. Write the module's interface as callers see it: public functions, types, errors.
   - Check: it fits in about ten lines.
2. List what callers must know to use it correctly (order of calls, internal states, flags).
   - Check: each item is a candidate to hide inside the module.
3. Move that knowledge inside: defaults, validation, sequencing.
   - Check: callers' code gets shorter; tests of callers no longer set up internals.
4. Place the seam for tests at the interface, not inside.
   - Check: the module is tested through its public interface only.
5. Check coupling: `grep` imports of the module's internals from outside.
   - Check: no outside file imports an internal path.

| Sign of a shallow module | Deeper alternative |
| --- | --- |
| Pass-through function that only renames a call | inline it or give it real behaviour |
| Many small classes each with one method | merge into one module with one interface |
| Callers must call A, then B, then C in order | one call that does the sequence |
| Configuration flags that change behaviour widely | separate entry points or sensible defaults |

## Stop and ask the human if

- Deepening would change a public API used outside the repository.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Smaller functions are always better." | Many tiny pieces push complexity onto callers. |
| "Expose internals for tests." | Test through the interface; the seam belongs there. |

## Definition of done

- [ ] Interface simple, knowledge hidden, tests through the interface.
- [ ] No outside import of internals.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
