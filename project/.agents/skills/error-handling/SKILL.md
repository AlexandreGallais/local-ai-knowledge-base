---
name: error-handling
description: "Handles errors so they are never swallowed - typed errors, actionable messages, propagation to the layer that can act. Use when writing try, catch, except, Result, error returns or promise rejections, when you see an empty catch or a bare except, or when an error message says nothing useful."
metadata:
  id: DEV-08
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Error handling

**Core rule:** catch an error only where you can act on it; otherwise let it propagate with its context. Never swallow it.

## Procedure

1. For each error, decide where it can be handled: retry, fallback, user message, or abort.
   - Check: the catch block does one of these four things.
2. Add context when rethrowing: what was being done, with which identifier; keep the original cause.
   - Check: the rethrown error carries the cause (`cause`, `from e`, `.context()`, inner exception).
3. Give messages a reader can act on: what failed, the value involved, what to do.
   - Check: the message names the operation and the input.
4. Test the error path: one test per handled error.
   - Check: the test triggers the error and asserts the handling.

## By language

| Language | Do | Not |
| --- | --- | --- |
| TypeScript | `throw new Error('load config', { cause: err })`; `await` every promise | `catch {}`; floating promises |
| Python | `raise ConfigError(...) from err`; catch specific exceptions | `except:`; `except Exception: pass` |
| Rust | `Result` with `?`; add context with the project's error crate | `unwrap()` outside tests |
| C# | specific exception types; `throw;` to rethrow | `catch (Exception) {}`; `throw ex;` |
| Java | specific exceptions; wrap with the cause | empty catch; catching `Throwable` |
| C++ | exceptions or error codes as the project does; RAII for cleanup | ignoring return codes |

## Stop and ask the human if

- The project's policy on error types or error messages to users is not visible in the code.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Log it and continue." | The caller thinks it worked. Return or rethrow. |
| "A generic message is safer." | Nobody can act on "An error occurred". |

## Definition of done

- [ ] No empty catch or bare except added; causes kept.
- [ ] Messages actionable; error paths tested.
