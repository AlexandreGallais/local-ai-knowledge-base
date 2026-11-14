# core::time

Temporal quantification.

# Examples:

There are multiple ways to create a new [`Duration`]:

```
# use std::time::Duration;
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

[`Duration`]s implement many common traits, including [`Add`], [`Sub`], and other
[`ops`] traits. It implements [`Default`] by returning a zero-length `Duration`.

[`ops`]: crate::ops

# Examples

```
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

```
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
two instances of [`Instant`] or two instances of [`SystemTime`].
This constraint gives it a value of about 584,942,417,355 years in practice,
which is currently used on all platforms.

# Examples

```
use std::time::Duration;

assert_eq!(Duration::MAX, Duration::new(u64::MAX, 1_000_000_000 - 1));
```
[`Instant`]: ../../std/time/struct.Instant.html
[`SystemTime`]: ../../std/time/struct.SystemTime.html

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

```
use std::time::Duration;

let five_seconds = Duration::new(5, 0);
```

## Duration::from_secs

```rust
pub const fn from_secs(secs: u64) -> Duration
```

Creates a new `Duration` from the specified number of whole seconds.

# Examples

```
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

```
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

```
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

```
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

Panics if the given number of nanoseconds is greater than [`Duration::MAX`].

# Examples

```
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

```
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

```
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

```
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
duration, which can be obtained using [`subsec_nanos`].

# Examples

```
use std::time::Duration;

let duration = Duration::new(5, 730_023_852);
assert_eq!(duration.as_secs(), 5);
```

To determine the total number of seconds represented by the `Duration`
including the fractional part, use [`as_secs_f64`] or [`as_secs_f32`]

[`as_secs_f64`]: Duration::as_secs_f64
[`as_secs_f32`]: Duration::as_secs_f32
[`subsec_nanos`]: Duration::subsec_nanos

## Duration::subsec_millis

```rust
pub const fn subsec_millis(&self) -> u32
```

Returns the fractional part of this `Duration`, in whole milliseconds.

This method does **not** return the length of the duration when
represented by milliseconds. The returned number always represents a
fractional portion of a second (i.e., it is less than one thousand).

# Examples

```
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

```
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

```
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

```
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

```
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

```
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

```
use std::time::Duration;

assert_eq!(Duration::new(100, 0).abs_diff(Duration::new(80, 0)), Duration::new(20, 0));
assert_eq!(Duration::new(100, 400_000_000).abs_diff(Duration::new(110, 0)), Duration::new(9, 600_000_000));
```

## Duration::checked_add

```rust
pub const fn checked_add(self, rhs: Duration) -> Option<Duration>
```

Checked `Duration` addition. Computes `self + other`, returning [`None`]
if overflow occurred.

# Examples

```
use std::time::Duration;

assert_eq!(Duration::new(0, 0).checked_add(Duration::new(0, 1)), Some(Duration::new(0, 1)));
assert_eq!(Duration::new(1, 0).checked_add(Duration::new(u64::MAX, 0)), None);
```

## Duration::saturating_add

```rust
pub const fn saturating_add(self, rhs: Duration) -> Duration
```

Saturating `Duration` addition. Computes `self + other`, returning [`Duration::MAX`]
if overflow occurred.

# Examples

```
use std::time::Duration;

assert_eq!(Duration::new(0, 0).saturating_add(Duration::new(0, 1)), Duration::new(0, 1));
assert_eq!(Duration::new(1, 0).saturating_add(Duration::new(u64::MAX, 0)), Duration::MAX);
```

## Duration::checked_sub

```rust
pub const fn checked_sub(self, rhs: Duration) -> Option<Duration>
```

Checked `Duration` subtraction. Computes `self - other`, returning [`None`]
if the result would be negative or if overflow occurred.

# Examples

```
use std::time::Duration;

assert_eq!(Duration::new(0, 1).checked_sub(Duration::new(0, 0)), Some(Duration::new(0, 1)));
assert_eq!(Duration::new(0, 0).checked_sub(Duration::new(0, 1)), None);
```

## Duration::saturating_sub

```rust
pub const fn saturating_sub(self, rhs: Duration) -> Duration
```

Saturating `Duration` subtraction. Computes `self - other`, returning [`Duration::ZERO`]
if the result would be negative or if overflow occurred.

# Examples

```
use std::time::Duration;

assert_eq!(Duration::new(0, 1).saturating_sub(Duration::new(0, 0)), Duration::new(0, 1));
assert_eq!(Duration::new(0, 0).saturating_sub(Duration::new(0, 1)), Duration::ZERO);
```

## Duration::checked_mul

```rust
pub const fn checked_mul(self, rhs: u32) -> Option<Duration>
```

Checked `Duration` multiplication. Computes `self * other`, returning
[`None`] if overflow occurred.

# Examples

```
use std::time::Duration;

assert_eq!(Duration::new(0, 500_000_001).checked_mul(2), Some(Duration::new(1, 2)));
assert_eq!(Duration::new(u64::MAX - 1, 0).checked_mul(2), None);
```

## Duration::saturating_mul

```rust
pub const fn saturating_mul(self, rhs: u32) -> Duration
```

Saturating `Duration` multiplication. Computes `self * other`, returning
[`Duration::MAX`] if overflow occurred.

# Examples

```
use std::time::Duration;

assert_eq!(Duration::new(0, 500_000_001).saturating_mul(2), Duration::new(1, 2));
assert_eq!(Duration::new(u64::MAX - 1, 0).saturating_mul(2), Duration::MAX);
```

## Duration::checked_div

```rust
pub const fn checked_div(self, rhs: u32) -> Option<Duration>
```

Checked `Duration` division. Computes `self / other`, returning [`None`]
if `other == 0`.

# Examples

```
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
```
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
```
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
```
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

## Duration::from_secs_f32

```rust
pub fn from_secs_f32(secs: f32) -> Duration
```

Creates a new `Duration` from the specified number of seconds represented
as `f32`.

# Panics
This constructor will panic if `secs` is negative, overflows `Duration` or not finite.

# Examples
```
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

```
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.mul_f64(3.14), Duration::new(8, 478_000_000));
assert_eq!(dur.mul_f64(3.14e5), Duration::new(847_800, 0));
```

Note that `f64` does not have enough bits ([`f64::MANTISSA_DIGITS`]) to represent the full
range of possible `Duration` with nanosecond precision, so rounding may occur even for
trivial operations like multiplying by 1.

```
# #![feature(float_exact_integer_constants)]
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

```should_panic
# use std::time::Duration;
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
to [`mul_f64`][Self::mul_f64] for greater accuracy.

# Panics
This method will panic if result is negative, overflows `Duration` or not finite.

# Examples
```
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

```
use std::time::Duration;

let dur = Duration::new(2, 700_000_000);
assert_eq!(dur.div_f64(3.14), Duration::new(0, 859_872_611));
assert_eq!(dur.div_f64(3.14e5), Duration::new(0, 8_599));
```

Note that `f64` does not have enough bits ([`f64::MANTISSA_DIGITS`]) to represent the full
range of possible `Duration` with nanosecond precision, so rounding may occur even for
trivial operations like dividing by 1.

```
# #![feature(float_exact_integer_constants)]
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

```should_panic
# use std::time::Duration;
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
to [`div_f64`][Self::div_f64] for greater accuracy.

# Panics
This method will panic if result is negative, overflows `Duration` or not finite.

# Examples
```
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
```
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
```
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
into a [`Duration`].

This error is used as the error type for [`Duration::try_from_secs_f32`] and
[`Duration::try_from_secs_f64`].

# Example

```
use std::time::Duration;

if let Err(e) = Duration::try_from_secs_f32(-1.0) {
    println!("Failed conversion to Duration: {e}");
}
```

## Duration::try_from_secs_f32

```rust
pub fn try_from_secs_f32(secs: f32) -> Result<Duration, TryFromFloatSecsError>
```

The checked version of [`from_secs_f32`].

[`from_secs_f32`]: Duration::from_secs_f32

This constructor will return an `Err` if `secs` is negative, overflows `Duration` or not finite.

# Examples
```
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

The checked version of [`from_secs_f64`].

[`from_secs_f64`]: Duration::from_secs_f64

This constructor will return an `Err` if `secs` is negative, overflows `Duration` or not finite.

# Examples
```
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