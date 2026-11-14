# std::panic

Panic support in the standard library.

## type PanicInfo

```rust
pub type PanicInfo<'a> = PanicHookInfo<'a>
```

A struct providing information about a panic.

`PanicInfo` has been renamed to [`PanicHookInfo`] to avoid confusion with
[`core::panic::PanicInfo`].

## struct PanicHookInfo

```rust
pub struct PanicHookInfo<'a>
```

A struct providing information about a panic.

`PanicHookInfo` structure is passed to a panic hook set by the [`set_hook`] function.

# Examples

```should_panic
use std::panic;

panic::set_hook(Box::new(|panic_info| {
    println!("panic occurred: {panic_info}");
}));

panic!("critical system failure");
```

[`set_hook`]: ../../std/panic/fn.set_hook.html

## PanicHookInfo::payload

```rust
pub fn payload(&self) -> &(dyn Any + Send)
```

Returns the payload associated with the panic.

This will commonly, but not always, be a `&'static str` or [`String`].
If you only care about such payloads, use [`payload_as_str`] instead.

A invocation of the `panic!()` macro in Rust 2021 or later will always result in a
panic payload of type `&'static str` or `String`.

Only an invocation of [`panic_any`]
(or, in Rust 2018 and earlier, `panic!(x)` where `x` is something other than a string)
can result in a panic payload other than a `&'static str` or `String`.

[`String`]: ../../std/string/struct.String.html
[`payload_as_str`]: PanicHookInfo::payload_as_str

# Examples

```should_panic
use std::panic;

panic::set_hook(Box::new(|panic_info| {
    if let Some(s) = panic_info.payload().downcast_ref::<&str>() {
        println!("panic occurred: {s:?}");
    } else if let Some(s) = panic_info.payload().downcast_ref::<String>() {
        println!("panic occurred: {s:?}");
    } else {
        println!("panic occurred");
    }
}));

panic!("Normal panic");
```

## PanicHookInfo::payload_as_str

```rust
pub fn payload_as_str(&self) -> Option<&str>
```

Returns the payload associated with the panic, if it is a string.

This returns the payload if it is of type `&'static str` or `String`.

A invocation of the `panic!()` macro in Rust 2021 or later will always result in a
panic payload where `payload_as_str` returns `Some`.

Only an invocation of [`panic_any`]
(or, in Rust 2018 and earlier, `panic!(x)` where `x` is something other than a string)
can result in a panic payload where `payload_as_str` returns `None`.

# Example

```should_panic
std::panic::set_hook(Box::new(|panic_info| {
    if let Some(s) = panic_info.payload_as_str() {
        println!("panic occurred: {s:?}");
    } else {
        println!("panic occurred");
    }
}));

panic!("Normal panic");
```

## PanicHookInfo::location

```rust
pub fn location(&self) -> Option<&'static Location<'static>>
```

Returns information about the location from which the panic originated,
if available.

This method will currently always return [`Some`], but this may change
in future versions.

# Examples

```should_panic
use std::panic;

panic::set_hook(Box::new(|panic_info| {
    if let Some(location) = panic_info.location() {
        println!("panic occurred in file '{}' at line {}",
            location.file(),
            location.line(),
        );
    } else {
        println!("panic occurred but can't get location information...");
    }
}));

panic!("Normal panic");
```

## fn panic_any

```rust
pub fn panic_any<M: 'static + Any + Send>(msg: M) -> !
```

Panics the current thread with the given message as the panic payload.

The message can be of any (`Any + Send`) type, not just strings.

The message is wrapped in a `Box<'static + Any + Send>`, which can be
accessed later using [`PanicHookInfo::payload`].

See the [`panic!`] macro for more information about panicking.

## fn catch_unwind

```rust
pub fn catch_unwind<F: FnOnce() -> R + UnwindSafe, R>(f: F) -> Result<R>
```

Invokes a closure, capturing the cause of an unwinding panic if one occurs.

This function will return `Ok` with the closure's result if the closure does
not panic, and will return `Err(cause)` if the closure panics. The `cause`
returned is the object with which panic was originally invoked.

Rust functions that are expected to be called from foreign code that does
not support unwinding (such as C compiled with `-fno-exceptions`) should be
defined using `extern "C"`, which ensures that if the Rust code panics, it
is automatically caught and the process is aborted. If this is the desired
behavior, it is not necessary to use `catch_unwind` explicitly. This
function should instead be used when more graceful error-handling is needed.

It is **not** recommended to use this function for a general try/catch
mechanism. The [`Result`] type is more appropriate to use for functions that
can fail on a regular basis. Additionally, this function is not guaranteed
to catch all panics, see the "Notes" section below.

The closure provided is required to adhere to the [`UnwindSafe`] trait to
ensure that all captured variables are safe to cross this boundary. The
purpose of this bound is to encode the concept of [exception safety][rfc] in
the type system. Most usage of this function should not need to worry about
this bound as programs are naturally unwind safe without `unsafe` code. If
it becomes a problem the [`AssertUnwindSafe`] wrapper struct can be used to
quickly assert that the usage here is indeed unwind safe.

[rfc]: https://rust-lang.github.io/rfcs/1236-stabilize-catch-panic.html

# Notes

This function **might not catch all Rust panics**. A Rust panic is not
always implemented via unwinding, but can be implemented by aborting the
process as well. This function *only* catches unwinding panics, not those
that abort the process.

If a custom panic hook has been set, it will be invoked before the panic is
caught, before unwinding.

Although unwinding into Rust code with a foreign exception (e.g. an
exception thrown from C++ code, or a `panic!` in Rust code compiled or
linked with a different runtime) via an appropriate ABI (e.g. `"C-unwind"`)
is permitted, catching such an exception using this function will have one
of two behaviors, and it is unspecified which will occur:

* The process aborts, after executing all destructors of `f` and the
  functions it called.
* The function returns a `Result::Err` containing an opaque type.

Finally, be **careful in how you drop the result of this function**. If it
is `Err`, it contains the panic payload, and dropping that may in turn
panic!

# Examples

```
use std::panic;

let result = panic::catch_unwind(|| {
    println!("hello!");
});
assert!(result.is_ok());

let result = panic::catch_unwind(|| {
    panic!("oh no!");
});
assert!(result.is_err());
```

## fn resume_unwind

```rust
pub fn resume_unwind(payload: Box<dyn Any + Send>) -> !
```

Triggers a panic without invoking the panic hook.

This is designed to be used in conjunction with [`catch_unwind`] to, for
example, carry a panic across a layer of C code.

# Notes

Note that panics in Rust are not always implemented via unwinding, but they
may be implemented by aborting the process. If this function is called when
panics are implemented this way then this function will abort the process,
not trigger an unwind.

# Examples

```should_panic
use std::panic;

let result = panic::catch_unwind(|| {
    if 1 != 2 {
        panic!("oh no!");
    }
});

if let Err(err) = result {
    panic::resume_unwind(err);
}
```