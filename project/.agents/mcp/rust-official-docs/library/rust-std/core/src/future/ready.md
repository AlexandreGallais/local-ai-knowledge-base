# core::future::ready

## struct Ready

```rust
pub struct Ready<T>(Option<T>)
```

A future that is immediately ready with a value.

This `struct` is created by [`ready()`]. See its
documentation for more.

## Ready::into_inner

```rust
pub fn into_inner(self) -> T
```

Consumes the `Ready`, returning the wrapped value.

# Panics

Will panic if this [`Ready`] was already polled to completion.

# Examples

```
use std::future;

let a = future::ready(1);
assert_eq!(a.into_inner(), 1);
```

## fn ready

```rust
pub fn ready<T>(t: T) -> Ready<T>
```

Creates a future that is immediately ready with a value.

Futures created through this function are functionally similar to those
created through `async {}`. The main difference is that futures created
through this function are named and implement `Unpin`.

# Examples

```
use std::future;

# async fn run() {
let a = future::ready(1);
assert_eq!(a.await, 1);
# }
```