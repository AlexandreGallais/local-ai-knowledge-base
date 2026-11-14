# core::future::pending

## struct Pending

```rust
pub struct Pending<T>
```

Creates a future which never resolves, representing a computation that never
finishes.

This `struct` is created by [`pending()`]. See its
documentation for more.

## fn pending

```rust
pub fn pending<T>() -> Pending<T>
```

Creates a future which never resolves, representing a computation that never
finishes.

# Examples

```no_run
use std::future;

# async fn run() {
let future = future::pending();
let () = future.await;
unreachable!();
# }
```