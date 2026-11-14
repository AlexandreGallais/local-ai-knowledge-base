# core::ops::async_function

## trait AsyncFn

```rust
pub trait AsyncFn<Args: Tuple>: AsyncFnMut<Args>
```

An async-aware version of the [`Fn`](crate::ops::Fn) trait.

All `async fn` and functions returning futures implement this trait.

## trait AsyncFnMut

```rust
pub trait AsyncFnMut<Args: Tuple>: AsyncFnOnce<Args>
```

An async-aware version of the [`FnMut`](crate::ops::FnMut) trait.

All `async fn` and functions returning futures implement this trait.

## trait AsyncFnOnce

```rust
pub trait AsyncFnOnce<Args: Tuple>
```

An async-aware version of the [`FnOnce`](crate::ops::FnOnce) trait.

All `async fn` and functions returning futures implement this trait.