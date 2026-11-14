---
title: "std::sys::sync::mutex::windows7"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/mutex/windows7.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::mutex::windows7

System Mutexes

The Windows implementation of mutexes is a little odd and it might not be
immediately obvious what's going on. The primary oddness is that SRWLock is
used instead of CriticalSection, and this is done because:

1. SRWLock is several times faster than CriticalSection according to
   benchmarks performed on both Windows 8 and Windows 7.

2. CriticalSection allows recursive locking while SRWLock deadlocks. The
   Unix implementation deadlocks so consistency is preferred. See #19962 for
   more details.

3. While CriticalSection is fair and SRWLock is not, the current Rust policy
   is that there are no guarantees of fairness.
