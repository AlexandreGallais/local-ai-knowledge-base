---
title: "core::time (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/time.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::time

Temporal quantification.

#### Examples:

There are multiple ways to create a new `Duration`:

```rust
let five_seconds = Duration::from_secs(5);
assert_eq!(five_seconds, Duration::from_millis(5_000));
assert_eq!(five_seconds, Duration::from_micros(5_000_000));
assert_eq!(five_seconds, Duration::from_nanos(5_000_000_000));

let ten_seconds = Duration::from_secs(10);
let seven_nanos = Duration::from_nanos(7);
let total = ten_seconds + seven_nanos;
assert_eq!(total, Duration::new(10, 7));
```

## struct Duration

```rust
pub struct Duration
```

A `Duration` type to represent a span of time, typically used for system
timeouts.

Each `Duration` is composed of a whole number of seconds and a fractional part
represented in nanoseconds. If the underlying system does not support
nanosecond-level precision, APIs binding a system timeout will typically round up
the number of nanoseconds.

`Duration`s implement many common traits, including `Add`, `Sub`, and other
`ops` traits. It implements `Default` by returning a zero-length `Duration`.

# Examples

```rust
use std::time::Duration;

let five_seconds = Duration::new(5, 0);
let five_seconds_and_five_nanos = five_seconds + Duration::new(0, 5);

assert_eq!(five_seconds_and_five_nanos.as_secs(), 5);
assert_eq!(five_seconds_and_five_nanos.subsec_nanos(), 5);

let ten_millis = Duration::from_millis(10);
```

# Formatting `Duration` values

`Duration` intentionally does not have a `Display` impl, as there are a
variety of ways to format spans of time for human readability. `Duration`
provides a `Debug` impl that shows the full precision of the value.

The `Debug` output uses the non-ASCII "µs" suffix for microseconds. If your
program output may appear in contexts that cannot rely on full Unicode
compatibility, you may wish to format `Duration` objects yourself or use a
crate to do so.

## Duration::ZERO

```rust
pub const ZERO: Duration = Duration::from_nanos(0)
```

A duration of zero time.

# Examples

```rust
use std::time::Duration;

let duration = Duration::ZERO;
assert!(duration.is_zero());
assert_eq!(duration.as_nanos(), 0);
```

## Duration::MAX

```rust
pub const MAX: Duration = Duration::new(u64::MAX, NANOS_PER_SEC - 1)
```

The maximum duration.

May vary by platform as necessary. Must be able to contain the difference between
two instances of `Instant` or two instances of `SystemTime`.
This constraint gives it a value of about 584,942,417,355 years in practice,
which is currently used on all platforms.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::MAX, Duration::new(u64::MAX, 1_000_000_000 - 1));
```

## Duration::new

```rust
pub const fn new(secs: u64, nanos: u32) -> Duration
```

Creates a new `Duration` from the specified number of whole seconds and
additional nanoseconds.

If the number of nanoseconds is greater than 1 billion (the number of
nanoseconds in a second), then it will carry over into the seconds provided.

# Panics

This constructor will panic if the carry from the nanoseconds overflows
the seconds counter.

# Examples

```rust
use std::time::Duration;

let five_seconds = Duration::new(5, 0);
```

## Duration::from_secs

```rust
pub const fn from_secs(secs: u64) -> Duration
```

Creates a new `Duration` from the specified number of whole seconds.

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_secs(5);

assert_eq!(5, duration.as_secs());
assert_eq!(0, duration.subsec_nanos());
```

## Duration::from_millis

```rust
pub const fn from_millis(millis: u64) -> Duration
```

Creates a new `Duration` from the specified number of milliseconds.

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_millis(2_569);

assert_eq!(2, duration.as_secs());
assert_eq!(569_000_000, duration.subsec_nanos());
```

## Duration::from_micros

```rust
pub const fn from_micros(micros: u64) -> Duration
```

Creates a new `Duration` from the specified number of microseconds.

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_micros(1_000_002);

assert_eq!(1, duration.as_secs());
assert_eq!(2_000, duration.subsec_nanos());
```

## Duration::from_nanos

```rust
pub const fn from_nanos(nanos: u64) -> Duration
```

Creates a new `Duration` from the specified number of nanoseconds.

Note: Using this on the return value of `as_nanos()` might cause unexpected behavior:
`as_nanos()` returns a u128, and can return values that do not fit in u64, e.g. 585 years.
Instead, consider using the pattern `Duration::new(d.as_secs(), d.subsec_nanos())`
if you cannot copy/clone the Duration directly.

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_nanos(1_000_000_123);

assert_eq!(1, duration.as_secs());
assert_eq!(123, duration.subsec_nanos());
```

## Duration::from_nanos_u128

```rust
pub const fn from_nanos_u128(nanos: u128) -> Duration
```

Creates a new `Duration` from the specified number of nanoseconds.

# Panics

Panics if the given number of nanoseconds is greater than `Duration::MAX`.

# Examples

```rust
use std::time::Duration;

let nanos = 10_u128.pow(24) + 321;
let duration = Duration::from_nanos_u128(nanos);

assert_eq!(10_u64.pow(15), duration.as_secs());
assert_eq!(321, duration.subsec_nanos());
```

## Duration::from_hours

```rust
pub const fn from_hours(hours: u64) -> Duration
```

Creates a new `Duration` from the specified number of hours.

For this function, one hour is defined as 60 minutes, or 3,600 seconds.

# Panics

Panics if the given number of hours overflows the `Duration` size.

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_hours(6);

assert_eq!(6 * 60 * 60, duration.as_secs());
assert_eq!(0, duration.subsec_nanos());
```

## Duration::from_mins

```rust
pub const fn from_mins(mins: u64) -> Duration
```

Creates a new `Duration` from the specified number of minutes.

For this function, one minute is defined as 60 seconds.

# Panics

Panics if the given number of minutes overflows the `Duration` size.

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_mins(10);

assert_eq!(10 * 60, duration.as_secs());
assert_eq!(0, duration.subsec_nanos());
```

## Duration::is_zero

```rust
pub const fn is_zero(&self) -> bool
```

Returns true if this `Duration` spans no time.

# Examples

```rust
use std::time::Duration;

assert!(Duration::ZERO.is_zero());
assert!(Duration::new(0, 0).is_zero());
assert!(Duration::from_nanos(0).is_zero());
assert!(Duration::from_secs(0).is_zero());

assert!(!Duration::new(1, 1).is_zero());
assert!(!Duration::from_nanos(1).is_zero());
assert!(!Duration::from_secs(1).is_zero());
```

## Duration::as_secs

```rust
pub const fn as_secs(&self) -> u64
```

Returns the number of _whole_ seconds contained by this `Duration`.

The returned value does not include the fractional (nanosecond) part of the
duration, which can be obtained using `subsec_nanos`.

# Examples

```rust
use std::time::Duration;

let duration = Duration::new(5, 730_023_852);
assert_eq!(duration.as_secs(), 5);
```

To determine the total number of seconds represented by the `Duration`
including the fractional part, use `as_secs_f64` or `as_secs_f32`

## Duration::subsec_millis

```rust
pub const fn subsec_millis(&self) -> u32
```

Returns the fractional part of this `Duration`, in whole milliseconds.

This method does **not** return the length of the duration when
represented by milliseconds. The returned number always represents a
fractional portion of a second (i.e., it is less than one thousand).

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_millis(5_432);
assert_eq!(duration.as_secs(), 5);
assert_eq!(duration.subsec_millis(), 432);
```

## Duration::subsec_micros

```rust
pub const fn subsec_micros(&self) -> u32
```

Returns the fractional part of this `Duration`, in whole microseconds.

This method does **not** return the length of the duration when
represented by microseconds. The returned number always represents a
fractional portion of a second (i.e., it is less than one million).

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_micros(1_234_567);
assert_eq!(duration.as_secs(), 1);
assert_eq!(duration.subsec_micros(), 234_567);
```

## Duration::subsec_nanos

```rust
pub const fn subsec_nanos(&self) -> u32
```

Returns the fractional part of this `Duration`, in nanoseconds.

This method does **not** return the length of the duration when
represented by nanoseconds. The returned number always represents a
fractional portion of a second (i.e., it is less than one billion).

# Examples

```rust
use std::time::Duration;

let duration = Duration::from_millis(5_010);
assert_eq!(duration.as_secs(), 5);
assert_eq!(duration.subsec_nanos(), 10_000_000);
```

## Duration::as_millis

```rust
pub const fn as_millis(&self) -> u128
```

Returns the total number of whole milliseconds contained by this `Duration`.

# Examples

```rust
use std::time::Duration;

let duration = Duration::new(5, 730_023_852);
assert_eq!(duration.as_millis(), 5_730);
```

## Duration::as_micros

```rust
pub const fn as_micros(&self) -> u128
```

Returns the total number of whole microseconds contained by this `Duration`.

# Examples

```rust
use std::time::Duration;

let duration = Duration::new(5, 730_023_852);
assert_eq!(duration.as_micros(), 5_730_023);
```

## Duration::as_nanos

```rust
pub const fn as_nanos(&self) -> u128
```

Returns the total number of nanoseconds contained by this `Duration`.

# Examples

```rust
use std::time::Duration;

let duration = Duration::new(5, 730_023_852);
assert_eq!(duration.as_nanos(), 5_730_023_852);
```

## Duration::abs_diff

```rust
pub const fn abs_diff(self, other: Duration) -> Duration
```

Computes the absolute difference between `self` and `other`.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::new(100, 0).abs_diff(Duration::new(80, 0)), Duration::new(20, 0));
assert_eq!(Duration::new(100, 400_000_000).abs_diff(Duration::new(110, 0)), Duration::new(9, 600_000_000));
```

## Duration::checked_add

```rust
pub const fn checked_add(self, rhs: Duration) -> Option<Duration>
```

Checked `Duration` addition. Computes `self + other`, returning `None`
if overflow occurred.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 0).checked_add(Duration::new(0, 1)), Some(Duration::new(0, 1)));
assert_eq!(Duration::new(1, 0).checked_add(Duration::new(u64::MAX, 0)), None);
```

## Duration::saturating_add

```rust
pub const fn saturating_add(self, rhs: Duration) -> Duration
```

Saturating `Duration` addition. Computes `self + other`, returning `Duration::MAX`
if overflow occurred.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 0).saturating_add(Duration::new(0, 1)), Duration::new(0, 1));
assert_eq!(Duration::new(1, 0).saturating_add(Duration::new(u64::MAX, 0)), Duration::MAX);
```

## Duration::checked_sub

```rust
pub const fn checked_sub(self, rhs: Duration) -> Option<Duration>
```

Checked `Duration` subtraction. Computes `self - other`, returning `None`
if the result would be negative or if overflow occurred.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 1).checked_sub(Duration::new(0, 0)), Some(Duration::new(0, 1)));
assert_eq!(Duration::new(0, 0).checked_sub(Duration::new(0, 1)), None);
```

## Duration::saturating_sub

```rust
pub const fn saturating_sub(self, rhs: Duration) -> Duration
```

Saturating `Duration` subtraction. Computes `self - other`, returning `Duration::ZERO`
if the result would be negative or if overflow occurred.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 1).saturating_sub(Duration::new(0, 0)), Duration::new(0, 1));
assert_eq!(Duration::new(0, 0).saturating_sub(Duration::new(0, 1)), Duration::ZERO);
```

## Duration::checked_mul

```rust
pub const fn checked_mul(self, rhs: u32) -> Option<Duration>
```

Checked `Duration` multiplication. Computes `self * other`, returning
`None` if overflow occurred.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 500_000_001).checked_mul(2), Some(Duration::new(1, 2)));
assert_eq!(Duration::new(u64::MAX - 1, 0).checked_mul(2), None);
```

## Duration::saturating_mul

```rust
pub const fn saturating_mul(self, rhs: u32) -> Duration
```

Saturating `Duration` multiplication. Computes `self * other`, returning
`Duration::MAX` if overflow occurred.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::new(0, 500_000_001).saturating_mul(2), Duration::new(1, 2));
assert_eq!(Duration::new(u64::MAX - 1, 0).saturating_mul(2), Duration::MAX);
```

## Duration::checked_div

```rust
pub const fn checked_div(self, rhs: u32) -> Option<Duration>
```

Checked `Duration` division. Computes `self / other`, returning `None`
if `other == 0`.

# Examples

```rust
use std::time::Duration;

assert_eq!(Duration::new(2, 0).checked_div(2), Some(Duration::new(1, 0)));
assert_eq!(Duration::new(1, 0).checked_div(2), Some(Duration::new(0, 500_000_000)));
assert_eq!(Duration::new(2, 0).checked_div(0), None);
```

## Duration::as_secs_f64

```rust
pub const fn as_secs_f64(&self) -> f64
```

Returns the number of seconds contained by this `Duration` as `f64`.

The returned value includes the fractional (nanosecond) part of the duration.

# Examples
```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.as_secs_f64(), 2.7);
```

## Duration::as_secs_f32

```rust
pub const fn as_secs_f32(&self) -> f32
```

Returns the number of seconds contained by this `Duration` as `f32`.

The returned value includes the fractional (nanosecond) part of the duration.

# Examples
```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.as_secs_f32(), 2.7);
```

## Duration::from_secs_f64

```rust
pub fn from_secs_f64(secs: f64) -> Duration
```

Creates a new `Duration` from the specified number of seconds represented
as `f64`.

# Panics
This constructor will panic if `secs` is negative, overflows `Duration` or not finite.

# Examples
```rust
use std::time::Duration;

let res = Duration::from_secs_f64(0.0);
assert_eq!(res, Duration::new(0, 0));
let res = Duration::from_secs_f64(1e-20);
assert_eq!(res, Duration::new(0, 0));
let res = Duration::from_secs_f64(4.2e-7);
assert_eq!(res, Duration::new(0, 420));
let res = Duration::from_secs_f64(2.7);
assert_eq!(res, Duration::new(2, 700_000_000));
let res = Duration::from_secs_f64(3e10);
assert_eq!(res, Duration::new(30_000_000_000, 0));
// subnormal float
let res = Duration::from_secs_f64(f64::from_bits(1));
assert_eq!(res, Duration::new(0, 0));
// conversion uses rounding
let res = Duration::from_secs_f64(0.999e-9);
assert_eq!(res, Duration::new(0, 1));
```
