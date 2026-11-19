---
name: insecure-defaults
description: "Spots dangerous default settings - debug on, CORS *, TLS checks off, default passwords, wide permissions, verbose errors - in code and config. Use when writing or reviewing configuration, server start-up code, container or CI settings, or when you see verify=False, rejectUnauthorized false, DEBUG=True or Access-Control-Allow-Origin *."
license: MIT
metadata:
  id: SEC-08
  stars: "2"
  nature: reference
  mode: R
  wave: V3
  load: auto
---

# Insecure defaults

**Core rule:** a setting that weakens security is off by default, enabled only for a named environment, and never committed for production.

## Procedure

1. Search the patterns of the table in code and config.
   - Check: each hit is listed with file and line.
2. For each hit, decide: needed for development only, or a real problem.
   - Check: development-only settings are bound to a development profile or variable.
3. Fix real problems with the safe value.
   - Check: tests pass with the safe value.

| Pattern | Risk | Safe default |
| --- | --- | --- |
| `DEBUG = True`, `NODE_ENV` unset, debug endpoints | stack traces, internals exposed | off; on only in the development profile |
| `Access-Control-Allow-Origin: *` with credentials | cross-site access | explicit origin list |
| `verify=False`, `rejectUnauthorized: false`, `-k`, `NODE_TLS_REJECT_UNAUTHORIZED=0` | man-in-the-middle | keep TLS checks; trust the internal CA (`tls-and-corporate-ca`) |
| default or empty passwords, `admin/admin` | takeover | required secret from the environment |
| `chmod 777`, world-writable files | tampering | narrowest mode |
| `--privileged`, root in containers | host access | non-root user, minimal capabilities |
| listening on `0.0.0.0` for local tools | exposure on the network | `127.0.0.1` |
| verbose error pages to users | information leak | generic message, details in logs |

## Stop and ask the human if

- A weak setting is required by an external system you cannot change.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It is only for testing." | Test settings end up in production. Bind them to a profile. |
| "Disable TLS checks to get past the error." | Fix the trust store instead. |

## Definition of done

- [ ] Patterns searched; real problems fixed; development-only settings bound to a profile.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
