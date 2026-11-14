---
title: "std::time (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/time.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::time (part 2 of 2)

## SystemTime::checked_add

```rust
pub fn checked_add(&self, duration: Duration) -> Option<SystemTime>
```

Returns `Some(t)` where `t` is the time `self + duration` if `t` can be represented as
`SystemTime` (which means it's inside the bounds of the underlying data structure), `None`
otherwise.

In the case that the `duration` is smaller than the time precision of the operating
system, `Some(self)` will be returned.

## SystemTime::checked_sub

```rust
pub fn checked_sub(&self, duration: Duration) -> Option<SystemTime>
```

Returns `Some(t)` where `t` is the time `self - duration` if `t` can be represented as
`SystemTime` (which means it's inside the bounds of the underlying data structure), `None`
otherwise.

In the case that the `duration` is smaller than the time precision of the operating
system, `Some(self)` will be returned.

## const UNIX_EPOCH

```rust
pub const UNIX_EPOCH: SystemTime = SystemTime(time::UNIX_EPOCH)
```

This constant is defined to be "1970-01-01 00:00:00 UTC" on all systems with
respect to the system clock. Using `duration_since` on an existing
`SystemTime` instance can tell how far away from this point in time a
measurement lies, and using `UNIX_EPOCH + duration` can be used to create a
`SystemTime` instance to represent another fixed point in time.

`duration_since(UNIX_EPOCH).unwrap().as_secs()` returns
the number of non-leap seconds since the start of 1970 UTC.
This is a POSIX `time_t` (as a `u64`),
and is the same time representation as used in many Internet protocols.

# Examples

```rust
use std::time::{SystemTime, UNIX_EPOCH};

match SystemTime::now().duration_since(UNIX_EPOCH) {
    Ok(n) => println!("1970-01-01 00:00:00 UTC was {} seconds ago!", n.as_secs()),
    Err(_) => panic!("SystemTime before UNIX EPOCH!"),
}
```

## SystemTimeError::duration

```rust
pub fn duration(&self) -> Duration
```

Returns the positive duration which represents how far forward the
second system time was from the first.

A `SystemTimeError` is returned from the `SystemTime::duration_since`
and `SystemTime::elapsed` methods whenever the second system time
represents a point later in time than the `self` of the method call.

# Examples

```rust
use std::thread::sleep;
use std::time::{Duration, SystemTime};

let sys_time = SystemTime::now();
sleep(Duration::from_secs(1));
let new_sys_time = SystemTime::now();
match sys_time.duration_since(new_sys_time) {
    Ok(_) => {}
    Err(e) => println!("SystemTimeError difference: {:?}", e.duration()),
}
```
