---
name: i18n
description: "Internationalises a UI - string extraction, translation keys, plurals, date and number formats with Intl. Use when adding user-visible text, supporting another language, formatting dates, numbers or currencies for display, or when a text is hard-coded in a component."
metadata:
  id: FE-07
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Internationalisation

**Core rule:** no user-visible text in code: every string goes through the project's translation mechanism, and dates and numbers through locale-aware formatters.

## Procedure

1. Find the project's i18n mechanism (library, key files, extraction command).
   - Check: you can add one key and see it rendered.
2. Replace hard-coded strings with keys; name keys by meaning (`orders.empty.title`).
   - Check: `grep` finds no new literal user text in templates.
3. Handle plurals and variables with the mechanism's syntax (ICU `{count, plural, one {...} other {...}}` where supported).
   - Check: 0, 1 and many render correctly.
4. Format dates, numbers and currencies with `Intl.DateTimeFormat`, `Intl.NumberFormat` or the library equivalent.
   - Check: output changes with the locale.
5. Run the extraction or the missing-key check if the project has one.
   - Check: no missing key.

## Stop and ask the human if

- Translations are needed for languages you cannot write reliably.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Concatenate strings with variables." | Word order differs between languages. Use placeholders. |
| "`count + ' items'`" | Plural rules differ by language. |

## Definition of done

- [ ] No hard-coded user text; plurals and formats locale-aware; no missing keys.
