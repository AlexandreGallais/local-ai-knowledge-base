---
title: "std::process (part 4 of 4)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/process.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::process (part 4 of 4)

## fn abort

```rust
pub fn abort() -> !
```

Terminates the process in an abnormal fashion.

The function will never return and will immediately terminate the current
process in a platform specific "abnormal" manner. As a consequence,
no destructors on the current stack or any other thread's stack
will be run, Rust IO buffers (eg, from `BufWriter`) will not be flushed,
and C stdio buffers will (on most platforms) not be flushed.

This is in contrast to the default behavior of `panic!` which unwinds
the current thread's stack and calls all destructors.
When `panic="abort"` is set, either as an argument to `rustc` or in a
crate's Cargo.toml, `panic!` and `abort` are similar. However,
`panic!` will still call the [panic hook] while `abort` will not.

If a clean shutdown is needed it is recommended to only call
this function at a known point where there are no more destructors left
to run.

The process's termination will be similar to that from the C `abort()`
function.  On Unix, the process will terminate with signal `SIGABRT`, which
typically means that the shell prints "Aborted".

# Examples

```rust
use std::process;

fn main() {
    println!("aborting");

    process::abort();

    // execution never gets here
}
```

The `abort` function terminates the process, so the destructor will not
get run on the example below:

```rust
use std::process;

struct HasDrop;

impl Drop for HasDrop {
    fn drop(&mut self) {
        println!("This will never be printed!");
    }
}

fn main() {
    let _x = HasDrop;
    process::abort();
    // the destructor implemented for HasDrop will never get run
}
```

## fn id

```rust
pub fn id() -> u32
```

Returns the OS-assigned process identifier associated with this process.

# Examples

```rust
use std::process;

println!("My pid is {}", process::id());
```

## trait Termination

```rust
pub trait Termination
```

A trait for implementing arbitrary return types in the `main` function.

The C-main function only supports returning integers.
So, every type implementing the `Termination` trait has to be converted
to an integer.

The default implementations are returning `libc::EXIT_SUCCESS` to indicate
a successful execution. In case of a failure, `libc::EXIT_FAILURE` is returned.

Because different runtimes have different specifications on the return value
of the `main` function, this trait is likely to be available only on
standard library's runtime for convenience. Other runtimes are not required
to provide similar functionality.

## Termination::report

```rust
fn report(self) -> ExitCode
```

Is called to get the representation of the value as status code.
This status code is returned to the operating system.
