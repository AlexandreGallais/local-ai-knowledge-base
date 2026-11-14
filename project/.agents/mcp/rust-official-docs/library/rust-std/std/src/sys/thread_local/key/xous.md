---
title: "std::sys::thread_local::key::xous"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/key/xous.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::key::xous

Thread Local Storage

Currently, we are limited to 1023 TLS entries. The entries
live in a page of memory that's unique per-process, and is
stored in the `$tp` register. If this register is 0, then
TLS has not been initialized and thread cleanup can be skipped.

The index into this register is the `key`. This key is identical
between all threads, but indexes a different offset within this
pointer.

#### Dtor registration (stolen from Windows)

Xous has no native support for running destructors so we manage our own
list of destructors to keep track of how to destroy keys. When a thread
or the process exits, `run_dtors` is called, which will iterate through
the list and run the destructors.

Currently unregistration from this list is not supported. A destructor can be
registered but cannot be unregistered. There's various simplifying reasons
for doing this, the big ones being:

1. Currently we don't even support deallocating TLS keys, so normal operation
   doesn't need to deallocate a destructor.
2. There is no point in time where we know we can unregister a destructor
   because it could always be getting run by some remote thread.

Typically processes have a statically known set of TLS keys which is pretty
small, and we'd want to keep this memory alive for the whole process anyway
really.

Perhaps one day we can fold the `Box` here into a static allocation,
expanding the `LazyKey` structure to contain not only a slot for the TLS
key but also a slot for the destructor queue on windows. An optimization for
another day!
