---
name: caching-strategies
description: "Decides when and how to cache - what to cache, the key, expiry and invalidation - and measures the gain. Use when a slow computation or call repeats with the same inputs, when adding a cache, or when users see stale data after an update."
metadata:
  id: OBS-04
  stars: "1"
  nature: reference
  mode: A
  wave: V4
  load: auto
---

# Caching strategies

**Core rule:** cache only after measuring a repeated cost, with a key that includes every input and an explicit invalidation rule.

## Procedure

1. Measure the repeated cost and the hit rate you can expect.
   - Check: numbers before caching.
2. Define the key from every input that changes the result (including user and version).
   - Check: two different inputs never share a key.
3. Choose invalidation with the table.
   - Check: the rule is written next to the cache.
4. Bound the cache (size or time) and measure again.
   - Check: the gain is measured; memory stays bounded.

| Data | Invalidation |
| --- | --- |
| Never changes for a key | no expiry, bounded size |
| Changes rarely, staleness acceptable | time-based expiry |
| Must be fresh after a write | delete or update the entry on write |

## Stop and ask the human if

- Stale data would be harmful and the write paths are not all known.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Cache everything." | Unbounded caches leak memory and serve stale data. |
| "The key is the ID." | Results often depend on more inputs (user, options). |

## Definition of done

- [ ] Gain measured; complete key; invalidation rule; bounded size.
