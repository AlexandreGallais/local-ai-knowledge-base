---
title: "std::sys::pal::itron::error"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/itron/error.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::itron::error

## struct ItronError

```rust
pub struct ItronError
```

Wraps a μITRON error code.

## ItronError::new

```rust
pub fn new(er: abi::ER) -> Option<Self>
```

Constructs `ItronError` from the specified error code. Returns `None` if the
error code does not represent a failure or warning.

## ItronError::err_if_negative

```rust
pub fn err_if_negative(er: abi::ER) -> Result<abi::ER, Self>
```

Returns `Ok(er)` if `er` represents a success or `Err(_)` otherwise.

## ItronError::as_raw

```rust
pub fn as_raw(&self) -> abi::ER
```

Gets the raw error code.

## fn error_name

```rust
pub fn error_name(er: abi::ER) -> Option<&'static str>
```

Describe the specified μITRON error code. Returns `None` if it's an
undefined error code.

## fn expect_success

```rust
pub fn expect_success(er: abi::ER, msg: &&str) -> abi::ER
```

Similar to `ItronError::err_if_negative(er).expect()` except that, while
panicking, it prints the message to `panic_output` and aborts the program
instead. This ensures the error message is not obscured by double
panicking.

This is useful for diagnosing creation failures of synchronization
primitives that are used by `std`'s internal mechanisms. Such failures
are common when the system is mis-configured to provide a too-small pool for
kernel objects.

## fn expect_success_aborting

```rust
pub fn expect_success_aborting(er: abi::ER, msg: &&str) -> abi::ER
```

Similar to `ItronError::err_if_negative(er).expect()` but aborts instead.

Use this where panicking is not allowed or the effect of the failure
would be persistent.
