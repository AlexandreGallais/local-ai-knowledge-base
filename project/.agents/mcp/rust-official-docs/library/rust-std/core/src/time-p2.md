---
title: "core::time (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/time.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::time (part 2 of 2)

## Duration::from_secs_f32

```rust
pub fn from_secs_f32(secs: f32) -> Duration
```

Creates a new `Duration` from the specified number of seconds represented
as `f32`.

# Panics
This constructor will panic if `secs` is negative, overflows `Duration` or not finite.

# Examples
```rust
use std::time::Duration;

let res = Duration::from_secs_f32(0.0);
assert_eq!(res, Duration::new(0, 0));
let res = Duration::from_secs_f32(1e-20);
assert_eq!(res, Duration::new(0, 0));
let res = Duration::from_secs_f32(4.2e-7);
assert_eq!(res, Duration::new(0, 420));
let res = Duration::from_secs_f32(2.7);
assert_eq!(res, Duration::new(2, 700_000_048));
let res = Duration::from_secs_f32(3e10);
assert_eq!(res, Duration::new(30_000_001_024, 0));
// subnormal float
let res = Duration::from_secs_f32(f32::from_bits(1));
assert_eq!(res, Duration::new(0, 0));
// conversion uses rounding
let res = Duration::from_secs_f32(0.999e-9);
assert_eq!(res, Duration::new(0, 1));
```

## Duration::mul_f64

```rust
pub fn mul_f64(self, rhs: f64) -> Duration
```

Multiplies `Duration` by `f64`.

# Panics
This method will panic if result is negative, overflows `Duration` or not finite.

# Examples

```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.mul_f64(3.14), Duration::new(8, 478_000_000));
assert_eq!(dur.mul_f64(3.14e5), Duration::new(847_800, 0));
```

Note that `f64` does not have enough bits (`f64::MANTISSA_DIGITS`) to represent the full
range of possible `Duration` with nanosecond precision, so rounding may occur even for
trivial operations like multiplying by 1.

```rust
use std::time::Duration;

// This is about 14.9 weeks, remaining precise to the nanosecond:
let weeks = Duration::from_nanos(f64::MAX_EXACT_INTEGER as u64);
assert_eq!(weeks, weeks.mul_f64(1.0));

// A larger value incurs rounding in the floating-point operation:
let weeks = Duration::from_nanos(u64::MAX);
assert_ne!(weeks, weeks.mul_f64(1.0));

// This is over 285 million years, remaining precise to the second:
let years = Duration::from_secs(f64::MAX_EXACT_INTEGER as u64);
assert_eq!(years, years.mul_f64(1.0));

// And again larger values incur rounding:
let years = Duration::from_secs(u64::MAX / 2);
assert_ne!(years, years.mul_f64(1.0));
```

```rust
// In the extreme, rounding can even overflow `Duration`, which panics.
let _ = Duration::from_secs(u64::MAX).mul_f64(1.0);
```

## Duration::mul_f32

```rust
pub fn mul_f32(self, rhs: f32) -> Duration
```

Multiplies `Duration` by `f32`.

Since the significand of `f32` is quite limited compared to the range of `Duration`
-- only about 16.8ms of exact nanosecond precision -- this method currently forwards
to `mul_f64`[Self::mul_f64] for greater accuracy.

# Panics
This method will panic if result is negative, overflows `Duration` or not finite.

# Examples
```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
// Note that this `3.14_f32` argument already has more floating-point
// representation error than a direct `3.14_f64` would, so the result
// is slightly different from the ideal 8.478s.
assert_eq!(dur.mul_f32(3.14), Duration::new(8, 478_000_283));
assert_eq!(dur.mul_f32(3.14e5), Duration::new(847_800, 0));
```

## Duration::div_f64

```rust
pub fn div_f64(self, rhs: f64) -> Duration
```

Divides `Duration` by `f64`.

# Panics
This method will panic if result is negative, overflows `Duration` or not finite.

# Examples

```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.div_f64(3.14), Duration::new(0, 859_872_611));
assert_eq!(dur.div_f64(3.14e5), Duration::new(0, 8_599));
```

Note that `f64` does not have enough bits (`f64::MANTISSA_DIGITS`) to represent the full
range of possible `Duration` with nanosecond precision, so rounding may occur even for
trivial operations like dividing by 1.

```rust
use std::time::Duration;

// This is about 14.9 weeks, remaining precise to the nanosecond:
let weeks = Duration::from_nanos(f64::MAX_EXACT_INTEGER as u64);
assert_eq!(weeks, weeks.div_f64(1.0));

// A larger value incurs rounding in the floating-point operation:
let weeks = Duration::from_nanos(u64::MAX);
assert_ne!(weeks, weeks.div_f64(1.0));

// This is over 285 million years, remaining precise to the second:
let years = Duration::from_secs(f64::MAX_EXACT_INTEGER as u64);
assert_eq!(years, years.div_f64(1.0));

// And again larger values incur rounding:
let years = Duration::from_secs(u64::MAX / 2);
assert_ne!(years, years.div_f64(1.0));
```

```rust
// In the extreme, rounding can even overflow `Duration`, which panics.
let _ = Duration::from_secs(u64::MAX).div_f64(1.0);
```

## Duration::div_f32

```rust
pub fn div_f32(self, rhs: f32) -> Duration
```

Divides `Duration` by `f32`.

Since the significand of `f32` is quite limited compared to the range of `Duration`
-- only about 16.8ms of exact nanosecond precision -- this method currently forwards
to `div_f64`[Self::div_f64] for greater accuracy.

# Panics
This method will panic if result is negative, overflows `Duration` or not finite.

# Examples
```rust
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
// Note that this `3.14_f32` argument already has more floating-point
// representation error than a direct `3.14_f64` would, so the result
// is slightly different from the ideally rounded 0.859_872_611.
assert_eq!(dur.div_f32(3.14), Duration::new(0, 859_872_583));
assert_eq!(dur.div_f32(3.14e5), Duration::new(0, 8_599));
```

## Duration::div_duration_f64

```rust
pub const fn div_duration_f64(self, rhs: Duration) -> f64
```

Divides `Duration` by `Duration` and returns `f64`.

# Examples
```rust
use std::time::Duration;

let dur1 = Duration::new(2, 700_000_000);
let dur2 = Duration::new(5, 400_000_000);
assert_eq!(dur1.div_duration_f64(dur2), 0.5);
```

## Duration::div_duration_f32

```rust
pub const fn div_duration_f32(self, rhs: Duration) -> f32
```

Divides `Duration` by `Duration` and returns `f32`.

# Examples
```rust
use std::time::Duration;

let dur1 = Duration::new(2, 700_000_000);
let dur2 = Duration::new(5, 400_000_000);
assert_eq!(dur1.div_duration_f32(dur2), 0.5);
```

## struct TryFromFloatSecsError

```rust
pub struct TryFromFloatSecsError
```

An error which can be returned when converting a floating-point value of seconds
into a `Duration`.

This error is used as the error type for `Duration::try_from_secs_f32` and
`Duration::try_from_secs_f64`.

# Example

```rust
use std::time::Duration;

if let Err(e) = Duration::try_from_secs_f32(-1.0) {
    println!("Failed conversion to Duration: {e}");
}
```

## Duration::try_from_secs_f32

```rust
pub fn try_from_secs_f32(secs: f32) -> Result<Duration, TryFromFloatSecsError>
```

The checked version of `from_secs_f32`.

This constructor will return an `Err` if `secs` is negative, overflows `Duration` or not finite.

# Examples
```rust
use std::time::Duration;

let res = Duration::try_from_secs_f32(0.0);
assert_eq!(res, Ok(Duration::new(0, 0)));
let res = Duration::try_from_secs_f32(1e-20);
assert_eq!(res, Ok(Duration::new(0, 0)));
let res = Duration::try_from_secs_f32(4.2e-7);
assert_eq!(res, Ok(Duration::new(0, 420)));
let res = Duration::try_from_secs_f32(2.7);
assert_eq!(res, Ok(Duration::new(2, 700_000_048)));
let res = Duration::try_from_secs_f32(3e10);
assert_eq!(res, Ok(Duration::new(30_000_001_024, 0)));
// subnormal float:
let res = Duration::try_from_secs_f32(f32::from_bits(1));
assert_eq!(res, Ok(Duration::new(0, 0)));

let res = Duration::try_from_secs_f32(-5.0);
assert!(res.is_err());
let res = Duration::try_from_secs_f32(f32::NAN);
assert!(res.is_err());
let res = Duration::try_from_secs_f32(2e19);
assert!(res.is_err());

// the conversion uses rounding with tie resolution to even
let res = Duration::try_from_secs_f32(0.999e-9);
assert_eq!(res, Ok(Duration::new(0, 1)));

// this float represents exactly 976562.5e-9
let val = f32::from_bits(0x3A80_0000);
let res = Duration::try_from_secs_f32(val);
assert_eq!(res, Ok(Duration::new(0, 976_562)));

// this float represents exactly 2929687.5e-9
let val = f32::from_bits(0x3B40_0000);
let res = Duration::try_from_secs_f32(val);
assert_eq!(res, Ok(Duration::new(0, 2_929_688)));

// this float represents exactly 1.000_976_562_5
let val = f32::from_bits(0x3F802000);
let res = Duration::try_from_secs_f32(val);
assert_eq!(res, Ok(Duration::new(1, 976_562)));

// this float represents exactly 1.002_929_687_5
let val = f32::from_bits(0x3F806000);
let res = Duration::try_from_secs_f32(val);
assert_eq!(res, Ok(Duration::new(1, 2_929_688)));
```

## Duration::try_from_secs_f64

```rust
pub fn try_from_secs_f64(secs: f64) -> Result<Duration, TryFromFloatSecsError>
```

The checked version of `from_secs_f64`.

This constructor will return an `Err` if `secs` is negative, overflows `Duration` or not finite.

# Examples
```rust
use std::time::Duration;

let res = Duration::try_from_secs_f64(0.0);
assert_eq!(res, Ok(Duration::new(0, 0)));
let res = Duration::try_from_secs_f64(1e-20);
assert_eq!(res, Ok(Duration::new(0, 0)));
let res = Duration::try_from_secs_f64(4.2e-7);
assert_eq!(res, Ok(Duration::new(0, 420)));
let res = Duration::try_from_secs_f64(2.7);
assert_eq!(res, Ok(Duration::new(2, 700_000_000)));
let res = Duration::try_from_secs_f64(3e10);
assert_eq!(res, Ok(Duration::new(30_000_000_000, 0)));
// subnormal float
let res = Duration::try_from_secs_f64(f64::from_bits(1));
assert_eq!(res, Ok(Duration::new(0, 0)));

let res = Duration::try_from_secs_f64(-5.0);
assert!(res.is_err());
let res = Duration::try_from_secs_f64(f64::NAN);
assert!(res.is_err());
let res = Duration::try_from_secs_f64(2e19);
assert!(res.is_err());

// the conversion uses rounding with tie resolution to even
let res = Duration::try_from_secs_f64(0.999e-9);
assert_eq!(res, Ok(Duration::new(0, 1)));
let res = Duration::try_from_secs_f64(0.999_999_999_499);
assert_eq!(res, Ok(Duration::new(0, 999_999_999)));
let res = Duration::try_from_secs_f64(0.999_999_999_501);
assert_eq!(res, Ok(Duration::new(1, 0)));
let res = Duration::try_from_secs_f64(42.999_999_999_499);
assert_eq!(res, Ok(Duration::new(42, 999_999_999)));
let res = Duration::try_from_secs_f64(42.999_999_999_501);
assert_eq!(res, Ok(Duration::new(43, 0)));

// this float represents exactly 976562.5e-9
let val = f64::from_bits(0x3F50_0000_0000_0000);
let res = Duration::try_from_secs_f64(val);
assert_eq!(res, Ok(Duration::new(0, 976_562)));

// this float represents exactly 2929687.5e-9
let val = f64::from_bits(0x3F68_0000_0000_0000);
let res = Duration::try_from_secs_f64(val);
assert_eq!(res, Ok(Duration::new(0, 2_929_688)));

// this float represents exactly 1.000_976_562_5
let val = f64::from_bits(0x3FF0_0400_0000_0000);
let res = Duration::try_from_secs_f64(val);
assert_eq!(res, Ok(Duration::new(1, 976_562)));

// this float represents exactly 1.002_929_687_5
let val = f64::from_bits(0x3_FF00_C000_0000_000);
let res = Duration::try_from_secs_f64(val);
assert_eq!(res, Ok(Duration::new(1, 2_929_688)));
```
