---
title: "std::sys::thread_local::key::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/key/windows.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::key::windows

Implementation of `LazyKey` for Windows.

Windows has no native support for running destructors so we manage our own
list of destructors to keep track of how to destroy keys. We then install a
callback later to get invoked whenever a thread exits, running all
appropriate destructors (see the `guard` module documentation).

This will likely need to be improved over time, but this module attempts a
"poor man's" destructor callback system. Once we've got a list of what to
run, we iterate over all keys, check their values, and then run destructors
if the values turn out to be non null (setting them to null just beforehand).
We do this a few times in a loop to basically match Unix semantics. If we
don't reach a fixed point after a short while then we just inevitably leak
something.

The list is implemented as an atomic single-linked list of `LazyKey`s and
does not support unregistration. Unfortunately, this means that we cannot
use racy initialization for creating the keys in `LazyKey`, as that could
result in destructors being missed. Hence, we synchronize the creation of
keys with destructors through `INIT_ONCE` (`std`'s
`Once` cannot be used since it might use TLS itself).
For keys without destructors, racy initialization suffices.

## fn run_dtors

```rust
pub unsafe fn run_dtors()
```

This will and must only be run by the destructor callback in `guard`.
