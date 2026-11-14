---
title: "std::sync::barrier"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/barrier.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::barrier

## struct Barrier

```rust
pub struct Barrier
```

A barrier enables multiple threads to synchronize the beginning
of some computation.

# Examples

```rust
use std::sync::Barrier;
use std::thread;

let n = 10;
let barrier = Barrier::new(n);
thread::scope(|s| {
    for _ in 0..n {
        // The same messages will be printed together.
        // You will NOT see any interleaving.
        s.spawn(|| {
            println!("before wait");
            barrier.wait();
            println!("after wait");
        });
    }
});
```

## struct BarrierWaitResult

```rust
pub struct BarrierWaitResult(bool)
```

A `BarrierWaitResult` is returned by `Barrier::wait()` when all threads
in the `Barrier` have rendezvoused.

# Examples

```rust
use std::sync::Barrier;

let barrier = Barrier::new(1);
let barrier_wait_result = barrier.wait();
```

## Barrier::new

```rust
pub const fn new(n: usize) -> Barrier
```

Creates a new barrier that can block a given number of threads.

A barrier will block all threads which call `wait()` until the `n`th thread calls `wait()`,
and then wake up all threads at once.

# Examples

```rust
use std::sync::Barrier;

let barrier = Barrier::new(10);
```

## Barrier::wait

```rust
pub fn wait(&self) -> BarrierWaitResult
```

Blocks the current thread until all threads have rendezvoused here.

Barriers are re-usable after all threads have rendezvoused once, and can
be used continuously.

A single (arbitrary) thread will receive a `BarrierWaitResult` that
returns `true` from `BarrierWaitResult::is_leader()` when returning
from this function, and all other threads will receive a result that
will return `false` from `BarrierWaitResult::is_leader()`.

# Examples

```rust
use std::sync::Barrier;
use std::thread;

let n = 10;
let barrier = Barrier::new(n);
thread::scope(|s| {
    for _ in 0..n {
        // The same messages will be printed together.
        // You will NOT see any interleaving.
        s.spawn(|| {
            println!("before wait");
            barrier.wait();
            println!("after wait");
        });
    }
});
```

## BarrierWaitResult::is_leader

```rust
pub fn is_leader(&self) -> bool
```

Returns `true` if this thread is the "leader thread" for the call to
`Barrier::wait()`.

Only one thread will have `true` returned from their result, all other
threads will have `false` returned.

# Examples

```rust
use std::sync::Barrier;

let barrier = Barrier::new(1);
let barrier_wait_result = barrier.wait();
println!("{:?}", barrier_wait_result.is_leader());
```
