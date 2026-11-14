---
title: "std::sync::mpmc"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/mpmc/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::mpmc

Multi-producer, multi-consumer FIFO queue communication primitives.

This module provides message-based communication over channels, concretely
defined by two types:

* `Sender`
* `Receiver`

`Sender`s are used to send data to a set of `Receiver`s where each item
sent is delivered to (at most) one receiver. Both sender and receiver are
cloneable (multi-producer) such that many threads can send simultaneously
to receivers (multi-consumer).

These channels come in two flavors:

1. An asynchronous, infinitely buffered channel. The `channel` function
   will return a `(Sender, Receiver)` tuple where all sends will be
   **asynchronous** (they never block for space to become available; see
   `std::sync` for precise guarantees on blocking.) The channel
   conceptually has an infinite buffer.

2. A synchronous, bounded channel. The `sync_channel` function will
   return a `(Sender, Receiver)` tuple where the storage for pending
   messages is a pre-allocated buffer of a fixed size. All sends will be
   **synchronous** by blocking until there is buffer space available. Note
   that a bound of 0 is allowed, causing the channel to become a "rendezvous"
   channel where each sender atomically hands off a message to a receiver.

#### Disconnection

The send and receive operations on channels will all return a `Result`
indicating whether the operation succeeded or not. An unsuccessful operation
is normally indicative of the other half of a channel having "hung up" by
being dropped in its corresponding thread.

Once half of a channel has been deallocated, most operations can no longer
continue to make progress, so `Err` will be returned. Many applications
will continue to `unwrap` the results returned from this module,
instigating a propagation of failure among threads if one unexpectedly dies.

#### Examples

Simple usage:

```rust
#![feature(mpmc_channel)]

use std::thread;
use std::sync::mpmc::channel;

// Create a simple streaming channel
let (tx, rx) = channel();
thread::spawn(move || {
    tx.send(10).unwrap();
});
assert_eq!(rx.recv().unwrap(), 10);
```

Shared usage:

```rust
#![feature(mpmc_channel)]

use std::thread;
use std::sync::mpmc::channel;

thread::scope(|s| {
    // Create a shared channel that can be sent along from many threads
    // where tx is the sending half (tx for transmission), and rx is the receiving
    // half (rx for receiving).
    let (tx, rx) = channel();
    for i in 0..10 {
        let tx = tx.clone();
        s.spawn(move || {
            tx.send(i).unwrap();
        });
    }

    for _ in 0..5 {
        let rx1 = rx.clone();
        let rx2 = rx.clone();
        s.spawn(move || {
            let j = rx1.recv().unwrap();
            assert!(0 <= j && j < 10);
        });
        s.spawn(move || {
            let j = rx2.recv().unwrap();
            assert!(0 <= j && j < 10);
        });
    }
})
```

Propagating panics:

```rust
#![feature(mpmc_channel)]

use std::sync::mpmc::channel;

// The call to recv() will return an error because the channel has already
// hung up (or been deallocated)
let (tx, rx) = channel::<i32>();
drop(tx);
assert!(rx.recv().is_err());
```
