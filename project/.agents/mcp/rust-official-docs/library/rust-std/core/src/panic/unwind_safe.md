# core::panic::unwind_safe

## RefUnwindSafe::AssertUnwindSafe

```rust
pub struct AssertUnwindSafe<T>(#[stable(feature = "catch_unwind", since = "1.9.0")] pub T)
```

A simple wrapper around a type to assert that it is unwind safe.

When using [`catch_unwind`] it may be the case that some of the closed over
variables are not unwind safe. For example if `&mut T` is captured the
compiler will generate a warning indicating that it is not unwind safe. It
might not be the case, however, that this is actually a problem due to the
specific usage of [`catch_unwind`] if unwind safety is specifically taken into
account. This wrapper struct is useful for a quick and lightweight
annotation that a variable is indeed unwind safe.

[`catch_unwind`]: ../../std/panic/fn.catch_unwind.html

# Examples

One way to use `AssertUnwindSafe` is to assert that the entire closure
itself is unwind safe, bypassing all checks for all variables:

```
use std::panic::{self, AssertUnwindSafe};

let mut variable = 4;

// This code will not compile because the closure captures `&mut variable`
// which is not considered unwind safe by default.

// panic::catch_unwind(|| {
//     variable += 3;
// });

// This, however, will compile due to the `AssertUnwindSafe` wrapper
let result = panic::catch_unwind(AssertUnwindSafe(|| {
    variable += 3;
}));
// ...
```

Wrapping the entire closure amounts to a blanket assertion that all captured
variables are unwind safe. This has the downside that if new captures are
added in the future, they will also be considered unwind safe. Therefore,
you may prefer to just wrap individual captures, as shown below. This is
more annotation, but it ensures that if a new capture is added which is not
unwind safe, you will get a compilation error at that time, which will
allow you to consider whether that new capture in fact represent a bug or
not.

```
use std::panic::{self, AssertUnwindSafe};

let mut variable = 4;
let other_capture = 3;

let result = {
    let mut wrapper = AssertUnwindSafe(&mut variable);
    panic::catch_unwind(move || {
        **wrapper += other_capture;
    })
};
// ...
```