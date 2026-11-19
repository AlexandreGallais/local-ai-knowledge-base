---
name: sql-and-query-tuning
description: "Writes and tunes SQL queries - EXPLAIN plans, indexes, the N+1 problem, pagination. Use when a query is slow, when an endpoint makes one query per item, when adding an index, writing a complex query, or when an ORM generates surprising SQL."
metadata:
  id: DEV-17
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# SQL and query tuning

**Core rule:** read the query plan before and after a change; add an index only when the plan shows it is used.

## Procedure

1. Capture the real SQL (ORM logging or the database's slow query log) and its parameters.
   - Check: you have the exact statement.
2. Read the plan: `EXPLAIN` (PostgreSQL `EXPLAIN (ANALYZE, BUFFERS)` on a copy, SQLite `EXPLAIN QUERY PLAN`).
   - Check: you can name the costly step (full scan, sort, nested loop).
3. Fix the cause with the table.
   - Check: the plan improves and the timing drops on the same data.
4. Add or change a test that covers the query's result.
   - Check: results are unchanged.

| Symptom | Fix |
| --- | --- |
| Full scan on a filtered column | index on the filter column(s), most selective first |
| One query per row (N+1) | join, `IN (...)` batch, or the ORM's eager loading |
| Sort on a large result | index matching `ORDER BY`, or limit earlier |
| Deep `OFFSET` pagination | keyset pagination (`WHERE id > last_id ORDER BY id LIMIT n`) |
| Function on an indexed column in `WHERE` | rewrite the condition or index the expression |

## Stop and ask the human if

- An index or a schema change would run on a large production table.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "More indexes, more speed." | Each index slows writes and costs space. |
| "EXPLAIN ANALYZE on production." | It runs the query; use a copy. |

## Definition of done

- [ ] Plan read before and after; cause fixed; results unchanged by test.
