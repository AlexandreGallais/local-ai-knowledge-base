---
name: fuzzing
description: "Manual: run only when the user explicitly asks for /fuzzing. Writes fuzzing harnesses for parsers and other code that reads outside input (libFuzzer, AFL++, cargo-fuzz) and triages the crashes."
license: CC-BY-SA-4.0
metadata:
  id: TST-13
  stars: "1"
  nature: process
  mode: R+B
  wave: V4
  load: manual
---

# Fuzzing

**Core rule:** a harness feeds fuzzer bytes to one target API deterministically, runs under AddressSanitizer, and every crash becomes a regression test.

## Procedure

1. Pick a target that parses or decodes outside input.
   - Check: the target function and its input type are named.
2. Write the harness: C and C++ `LLVMFuzzerTestOneInput(const uint8_t *data, size_t size)`, Rust `fuzz_target!` with cargo-fuzz.
   - Check: the harness builds with the fuzzer and ASan flags.
3. Seed a corpus with small valid inputs from the tests.
   - Check: the corpus folder holds a few files.
4. Run for a bounded time: libFuzzer `./fuzz_target corpus/ -max_total_time=300`, cargo `cargo fuzz run <target> -- -max_total_time=300`.
   - Check: the run ends; crashes, if any, are saved as files.
5. For each crash: reproduce it, minimise it, fix the bug, add the input as a regression test.
   - Check: the test fails before the fix and passes after.

## This installation

<!-- FILL: what=fuzzing toolchain installed (clang with -fsanitize=fuzzer, afl-clang-fast, cargo-fuzz with nightly); find=clang --version, command -v afl-fuzz, cargo fuzz --version; verify=a trivial harness builds and runs for 10 seconds -->

## Stop and ask the human if

- The target needs network or files outside the sandbox to run.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Use randomness in the harness." | Non-determinism makes crashes unreproducible. |
| "Fix the crash and move on." | Keep the input as a regression test. |

## Definition of done

- [ ] Deterministic harness under ASan; bounded run; every crash fixed and kept as a test.

## References

- `references/SOURCE.md`: upstream and licence of this skill (CC-BY-SA-4.0: this adaptation keeps that licence).

## Local completion checklist

- [ ] Fuzzing toolchain
