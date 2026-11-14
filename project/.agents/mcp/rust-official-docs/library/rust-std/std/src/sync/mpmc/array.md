---
title: "std::sync::mpmc::array"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/mpmc/array.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::mpmc::array

Bounded channel based on a preallocated array.

This flavor has a fixed, positive capacity.

The implementation is based on Dmitry Vyukov's bounded MPMC queue.

Source:
  - <http://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue>
  - <https://docs.google.com/document/d/1yIAYmbvL3JxOKOjuCyon7JhW4cSv1wy5hC0ApeGMV9s/pub>
