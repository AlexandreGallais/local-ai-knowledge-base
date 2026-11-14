# core::panicking

Panic support for core

In core, panicking is always done with a message, resulting in a `core::panic::PanicInfo`
containing a `fmt::Arguments`. In std, however, panicking can be done with panic_any, which
throws a `Box<dyn Any>` containing any type of value. Because of this,
`std::panic::PanicHookInfo` is a different type, which contains a `&dyn Any` instead of a
`fmt::Arguments`. std's panic handler will convert the `fmt::Arguments` to a `&dyn Any`
containing either a `&'static str` or `String` containing the formatted message.

The core library cannot define any panic handler, but it can invoke it.
This means that the functions inside of core are allowed to panic, but to be
useful an upstream crate must define panicking for core to use. The current
interface for panicking is:

```
fn panic_impl(pi: &core::panic::PanicInfo<'_>) -> !
# { loop {} }
```

This module contains a few other panicking functions, but these are just the
necessary lang items for the compiler. All panics are funneled through this
one function. The actual symbol is declared through the `#[panic_handler]` attribute.

## fn panic_nounwind

```rust
pub const fn panic_nounwind(expr: &'static str) -> !
```

Like `panic`, but without unwinding and track_caller to reduce the impact on codesize on the caller.
If you want `#[track_caller]` for nicer errors, call `panic_nounwind_fmt` directly.

## fn panic_nounwind_nobacktrace

```rust
pub fn panic_nounwind_nobacktrace(expr: &'static str) -> !
```

Like `panic_nounwind`, but also inhibits showing a backtrace.

## fn panic_str_2015

```rust
pub const fn panic_str_2015(expr: &str) -> !
```

This exists solely for the 2015 edition `panic!` macro to trigger
a lint on `panic!(my_str_variable);`.

## fn const_panic_fmt

```rust
pub const fn const_panic_fmt(fmt: fmt::Arguments<'_>) -> !
```

This function is used instead of panic_fmt in const eval.