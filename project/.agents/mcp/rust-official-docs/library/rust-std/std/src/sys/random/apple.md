---
title: "std::sys::random::apple"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/random/apple.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::random::apple

Random data on Apple platforms.

`CCRandomGenerateBytes` calls into `CCRandomCopyBytes` with `kCCRandomDefault`.
`CCRandomCopyBytes` manages a CSPRNG which is seeded from the kernel's CSPRNG.
We use `CCRandomGenerateBytes` instead of `SecCopyBytes` because it is accessible via
`libSystem` (libc) while the other needs to link to `Security.framework`.

Note that technically, `arc4random_buf` is available as well, but that calls
into the same system service anyway, and `CCRandomGenerateBytes` has been
proven to be App Store-compatible.
