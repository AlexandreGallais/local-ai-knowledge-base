---
name: config-and-env
description: "Handles configuration through environment variables, .env files and profiles (dev, test, prod), with no sensitive value in code. Use when adding a setting, a URL, a port, a feature switch or a credential, when reading process.env, os.environ or IConfiguration, or when a value differs between environments."
metadata:
  id: DEV-09
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Config and environment

**Core rule:** every value that changes between environments comes from configuration, is validated at start-up, and has no secret default in code.

## Procedure

1. Find how the project reads configuration: `grep -rn -E 'process\.env|os\.environ|getenv|IConfiguration|@Value|dotenv' src | head`.
   - Check: you use the same mechanism.
2. Name the setting in the project's style (`APP_<AREA>_<NAME>` by default) and document it beside the others (`.env.example` or the config docs).
   - Check: the example file lists the new key with a fake value.
3. Read it once at start-up, convert its type, validate it; fail fast with a clear message if missing or invalid.
   - Check: starting without it prints which key is missing and exits non-zero.
4. Give safe defaults only for non-secret values that are the same in every environment.
   - Check: no secret, host or password has a default in code.
5. Keep `.env` out of Git.
   - Check: `git check-ignore -v .env` prints a rule.

## Stop and ask the human if

- The value is a secret and the project has no secret store or variable for it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Read the variable where it is used." | Scattered reads fail late. Read and validate once. |
| "Commit a .env with dev values." | It ends up with real values one day. Commit `.env.example` only. |

## Definition of done

- [ ] New setting read once, typed, validated, documented in the example file.
- [ ] No secret default; `.env` ignored by Git.
