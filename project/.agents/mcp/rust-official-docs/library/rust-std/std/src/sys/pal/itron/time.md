---
title: "std::sys::pal::itron::time"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/itron/time.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::itron::time

## fn dur2reltims

```rust
pub fn dur2reltims(dur: Duration) -> impl Iterator<Item = abi::RELTIM>
```

Split `Duration` into zero or more `RELTIM`s.

## fn with_tmos

```rust
pub fn with_tmos(dur: Duration, mut f: impl FnMut(abi::TMO) -> abi::ER) -> abi::ER
```

Split `Duration` into one or more API calls with timeout.

## fn with_tmos_strong

```rust
pub fn with_tmos_strong(dur: Duration, mut f: impl FnMut(abi::TMO) -> abi::ER) -> abi::ER
```

Split `Duration` into one or more API calls with timeout. This function can
handle spurious wakeups.
