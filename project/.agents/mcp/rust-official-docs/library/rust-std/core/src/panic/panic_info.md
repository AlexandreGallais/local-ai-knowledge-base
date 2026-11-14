# core::panic::panic_info

## struct PanicInfo

```rust
pub struct PanicInfo<'a>
```

A struct providing information about a panic.

A `PanicInfo` structure is passed to the panic handler defined by `#[panic_handler]`.

For the type used by the panic hook mechanism in `std`, see [`std::panic::PanicHookInfo`].

[`std::panic::PanicHookInfo`]: ../../std/panic/struct.PanicHookInfo.html

## struct PanicMessage

```rust
pub struct PanicMessage<'a>
```

A message that was given to the `panic!()` macro.

The [`Display`] implementation of this type will format the message with the arguments
that were given to the `panic!()` macro.

See [`PanicInfo::message`].

## PanicInfo::message

```rust
pub fn message(&self) -> PanicMessage<'_>
```

The message that was given to the `panic!` macro.

# Example

The type returned by this method implements `Display`, so it can
be passed directly to [`write!()`] and similar macros.

[`write!()`]: core::write

```ignore (no_std)
#[panic_handler]
fn panic_handler(panic_info: &PanicInfo<'_>) -> ! {
    write!(DEBUG_OUTPUT, "panicked: {}", panic_info.message());
    loop {}
}
```

## PanicInfo::location

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

## PanicInfo::payload

```rust
pub fn payload(&self) -> &(dyn crate::any::Any + Send)
```

Returns the payload associated with the panic.

On this type, `core::panic::PanicInfo`, this method never returns anything useful.
It only exists because of compatibility with [`std::panic::PanicHookInfo`],
which used to be the same type.

See [`std::panic::PanicHookInfo::payload`].

[`std::panic::PanicHookInfo`]: ../../std/panic/struct.PanicHookInfo.html
[`std::panic::PanicHookInfo::payload`]: ../../std/panic/struct.PanicHookInfo.html#method.payload

## PanicMessage::as_str

```rust
pub const fn as_str(&self) -> Option<&'static str>
```

Gets the formatted message, if it has no arguments to be formatted at runtime.

This can be used to avoid allocations in some cases.

# Guarantees

For `panic!("just a literal")`, this function is guaranteed to
return `Some("just a literal")`.

For most cases with placeholders, this function will return `None`.

See [`fmt::Arguments::as_str`] for details.