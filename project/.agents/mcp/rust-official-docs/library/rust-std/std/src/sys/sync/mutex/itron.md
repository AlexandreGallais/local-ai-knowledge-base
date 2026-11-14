---
title: "std::sys::sync::mutex::itron"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/mutex/itron.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::mutex::itron

Mutex implementation backed by μITRON mutexes. Assumes `acre_mtx` and
`TA_INHERIT` are available.
