---
name: deprecation-and-migration
description: "Manual: run only when the user explicitly asks for /deprecation-and-migration. Deprecates an API, a function, a field or a module, migrates every usage, and removes the old one safely, expand then contract."
license: MIT
metadata:
  id: REL-02
  stars: "2"
  nature: process
  mode: R
  wave: V3
  load: manual
---

# Deprecation and migration

**Core rule:** expand, migrate, contract: the new form exists beside the old one until no caller remains, and the build is green at every step.

## Procedure

1. List every usage of the old form (`impact-analysis`).
   - Check: the list is complete, including configs and other repositories named in docs.
2. Expand: add the new form; mark the old one deprecated in the language's way (`@deprecated`, `[Obsolete]`, `#[deprecated]`, `warnings.warn`).
   - Check: build green; the deprecation warning appears where the old form is used.
3. Migrate the usages in batches, one commit per batch.
   - Check: tests green after each batch; the usage count goes down.
4. Contract: remove the old form when no usage remains.
   - Check: `grep` finds no usage; build and tests green.
5. Note it in the changelog with the version (`versioning-and-changelog`).
   - Check: the changelog entry exists.

## Stop and ask the human if

- Users outside the repository depend on the old form: agree on a removal date.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Rename it in one commit." | External and missed callers break. Expand first. |
| "Remove now, users will adapt." | Removal needs zero usages and an announcement. |

## Definition of done

- [ ] Old form deprecated, every usage migrated, then removed; green at each step; changelog noted.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
