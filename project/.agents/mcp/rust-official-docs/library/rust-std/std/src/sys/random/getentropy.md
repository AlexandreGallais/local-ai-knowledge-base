---
title: "std::sys::random::getentropy"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/random/getentropy.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::random::getentropy

Random data generation through `getentropy`.

Since issue 8 (2024), the POSIX specification mandates the existence of the
`getentropy` function, which fills a slice of up to `GETENTROPY_MAX` bytes
(256 on all known platforms) with random data. Unfortunately, it's only
meant to be used to seed other CPRNGs, which we don't have, so we only use
it where `arc4random_buf` and friends aren't available or secure (currently
that's only the case on Emscripten).
