---
name: secure-coding
description: "Applies secure defaults from OWASP - validate inputs, parameterise queries, encode outputs, safe deserialisation, authentication and authorisation checks. Use when writing code that handles user input, files, URLs, SQL, shell commands, HTML, JSON or XML from outside, authentication, sessions, permissions or cryptography."
license: MIT
metadata:
  id: SEC-03
  stars: "4"
  nature: reference
  mode: R
  wave: V2
  load: auto
---

# Secure coding

**Core rule:** treat every value from outside the process as hostile: validate it on entry, and never build SQL, shell, HTML or paths by string concatenation.

## Procedure

1. List the inputs from outside: HTTP, files, environment, messages, command-line arguments.
   - Check: each input is listed with its expected type and range.
2. Validate each input at the boundary with an allow-list (type, length, format, range).
   - Check: a test sends one invalid value per input and gets a clean error.
3. Apply the rule of the table for each sink the input reaches.
   - Check: no concatenation of input into a query, a command, HTML or a path.
4. Check authorisation on every action, server side.
   - Check: a test calls the action as a user without the right and is refused.

| Sink | Safe pattern | Never |
| --- | --- | --- |
| SQL | parameterised query or ORM parameters | string concatenation, `format` |
| Shell | argument array (`execFile`, `subprocess.run([...])`), no shell | `shell=True`, `exec` with a string |
| HTML | the framework's auto-escaping; `textContent` | `innerHTML` with input |
| File path | resolve, then check it stays under the allowed root | joining input to a path unchecked |
| Deserialisation | JSON with a schema | `pickle`, Java native serialisation, `BinaryFormatter` on input |
| Redirect | allow-list of targets | redirect to a URL from input |
| Crypto | the platform's library and defaults | home-made crypto, MD5 or SHA-1 for passwords |
| Passwords | Argon2id, scrypt or bcrypt | plain or fast hashes |

## Stop and ask the human if

- The code handles authentication, sessions or cryptography beyond calling a standard library.
- A security requirement conflicts with a functional one.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The front end validates it." | Clients can be bypassed. Validate on the server. |
| "It is an internal tool." | Internal inputs get attacked too. Same rules. |

## Definition of done

- [ ] Each outside input validated at the boundary, with a test of an invalid value.
- [ ] No concatenation into a sink; authorisation checked server side.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
