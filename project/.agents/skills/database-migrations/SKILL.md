---
name: database-migrations
description: "Writes database migrations that are reversible, tested both ways and lose no data - expand then contract for renames and drops. Use when changing a database schema, adding, renaming or dropping a column or table, writing a migration file, or when a migration fails."
metadata:
  id: DEV-16
  stars: "2"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Database migrations

**Core rule:** every migration has a working down step, is tested up and down on a copy with data, and never drops data in the same release that stops using it.

## Procedure

1. Use the project's migration tool and its generator for the file.
   - Check: the new migration is listed by the tool's status command.
2. Write up and down; for renames and drops, expand first (add new, copy data, keep old), contract in a later migration.
   - Check: the old code still works after the up step.
3. Test on a disposable database with realistic data: up, check, down, check, up again.
   - Check: data is intact after each step.
4. Check locks and duration on large tables (batch updates, concurrent index creation where supported).
   - Check: the migration's expected duration is noted.

## Stop and ask the human if

- The migration drops or rewrites data, or locks a large table in production.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Down steps are never used." | They are the rollback plan when a release fails. |
| "Rename the column in one step." | Running code breaks between deploy steps. Expand, then contract. |

## Definition of done

- [ ] Up and down tested on data; no data loss; expand and contract for renames and drops.
