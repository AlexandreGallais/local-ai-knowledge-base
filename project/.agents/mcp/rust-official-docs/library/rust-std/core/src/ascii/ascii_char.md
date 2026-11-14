---
title: "core::ascii::ascii_char"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/ascii/ascii_char.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::ascii::ascii_char

This uses the name `AsciiChar`, even though it's not exposed that way right now,
because it avoids a whole bunch of "are you sure you didn't mean `char`?"
suggestions from rustc if you get anything slightly wrong in here, and overall
helps with clarity as we're also referring to `char` intentionally in here.
