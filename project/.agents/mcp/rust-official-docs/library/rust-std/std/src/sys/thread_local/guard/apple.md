---
title: "std::sys::thread_local::guard::apple"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/guard/apple.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::guard::apple

macOS allows registering destructors through _tlv_atexit. But since calling
it while TLS destructors are running is UB, we still need to keep our own
list of destructors.
