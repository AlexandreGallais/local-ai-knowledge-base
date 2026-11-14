---
title: "std::panicking"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/panicking.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::panicking

Implementation of various bits and pieces of the `panic!` macro and
associated runtime pieces.

Specifically, this module contains the implementation of:

* Panic hooks
* Executing a panic up to doing the actual implementation
* Shims around "try"

## fn set_hook

```rust
pub fn set_hook(hook: Box<dyn Fn(&PanicHookInfo<'_>) + 'static + Sync + Send>)
```

Registers a custom panic hook, replacing the previously registered hook.

The panic hook is invoked when a thread panics, but before the panic runtime
is invoked. As such, the hook will run with both the aborting and unwinding
runtimes.

The default hook, which is registered at startup, prints a message to standard error and
generates a backtrace if requested. This behavior can be customized using the `set_hook` function.
The current hook can be retrieved while reinstating the default hook with the `take_hook`
function.

The hook is provided with a `PanicHookInfo` struct which contains information
about the origin of the panic, including the payload passed to `panic!` and
the source code location from which the panic originated.

The panic hook is a global resource.

# Panics

Panics if called from a panicking thread.

# Examples

The following will print "Custom panic hook":

```rust
use std::panic;

panic::set_hook(Box::new(|_| {
    println!("Custom panic hook");
}));

panic!("Normal panic");
```

## fn take_hook

```rust
pub fn take_hook() -> Box<dyn Fn(&PanicHookInfo<'_>) + 'static + Sync + Send>
```

Unregisters the current panic hook and returns it, registering the default hook
in its place.

*See also the function `set_hook`.*

If the default hook is registered it will be returned, but remain registered.

# Panics

Panics if called from a panicking thread.

# Examples

The following will print "Normal panic":

```rust
use std::panic;

panic::set_hook(Box::new(|_| {
    println!("Custom panic hook");
}));

let _ = panic::take_hook();

panic!("Normal panic");
```

## enum MustAbort

```rust
pub enum MustAbort
```

A reason for forcing an immediate abort on panic.

## enum MustAbort

```rust
pub enum MustAbort
```

A reason for forcing an immediate abort on panic.

## fn catch_unwind

```rust
pub unsafe fn catch_unwind<R, F: FnOnce() -> R>(f: F) -> Result<R, Box<dyn Any + Send>>
```

Invoke a closure, capturing the cause of an unwinding panic if one occurs.
