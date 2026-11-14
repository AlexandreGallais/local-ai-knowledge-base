---
title: "std::sys::sync::futex::unix"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/futex/unix.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::futex::unix

## type Futex

```rust
pub type Futex = Atomic<Primitive>
```

An atomic for use as a futex that is at least 32-bits but may be larger

## type Primitive

```rust
pub type Primitive = u32
```

Must be the underlying type of Futex

## type SmallFutex

```rust
pub type SmallFutex = Atomic<SmallPrimitive>
```

An atomic for use as a futex that is at least 8-bits but may be larger.

## type SmallPrimitive

```rust
pub type SmallPrimitive = u32
```

Must be the underlying type of SmallFutex

## fn futex_wait

```rust
pub fn futex_wait(futex: &Atomic<u32>, expected: u32, timeout: Option<Duration>) -> bool
```

Waits for a `futex_wake` operation to wake us.

Returns directly if the futex doesn't hold the expected value.

Returns false on timeout, and true in all other cases.

## fn futex_wake

```rust
pub fn futex_wake(futex: &Atomic<u32>) -> bool
```

Wakes up one thread that's blocked on `futex_wait` on this futex.

Returns true if this actually woke up such a thread,
or false if no thread was waiting on this futex.

On some platforms, this always returns false.

## fn futex_wake_all

```rust
pub fn futex_wake_all(futex: &Atomic<u32>)
```

Wakes up all threads that are waiting on `futex_wait` on this futex.
