# core::task::poll

## enum Poll

```rust
pub enum Poll<T>
```

Indicates whether a value is available or if the current task has been
scheduled to receive a wakeup instead.

This is returned by [`Future::poll`](core::future::Future::poll).

## Poll::map

```rust
pub fn map<U, F>(self, f: F) -> Poll<U> where F: FnOnce(T) -> U,
```

Maps a `Poll<T>` to `Poll<U>` by applying a function to a contained value.

# Examples

Converts a <code>Poll<[String]></code> into a <code>Poll<[usize]></code>, consuming
the original:

[String]: ../../std/string/struct.String.html "String"
```
# use core::task::Poll;
let poll_some_string = Poll::Ready(String::from("Hello, World!"));
// `Poll::map` takes self *by value*, consuming `poll_some_string`
let poll_some_len = poll_some_string.map(|s| s.len());

assert_eq!(poll_some_len, Poll::Ready(13));
```

## Poll::is_ready

```rust
pub const fn is_ready(&self) -> bool
```

Returns `true` if the poll is a [`Poll::Ready`] value.

# Examples

```
# use core::task::Poll;
let x: Poll<u32> = Poll::Ready(2);
assert_eq!(x.is_ready(), true);

let x: Poll<u32> = Poll::Pending;
assert_eq!(x.is_ready(), false);
```

## Poll::is_pending

```rust
pub const fn is_pending(&self) -> bool
```

Returns `true` if the poll is a [`Pending`] value.

[`Pending`]: Poll::Pending

# Examples

```
# use core::task::Poll;
let x: Poll<u32> = Poll::Ready(2);
assert_eq!(x.is_pending(), false);

let x: Poll<u32> = Poll::Pending;
assert_eq!(x.is_pending(), true);
```

## Poll::map_ok

```rust
pub fn map_ok<U, F>(self, f: F) -> Poll<Result<U, E>> where F: FnOnce(T) -> U,
```

Maps a `Poll<Result<T, E>>` to `Poll<Result<U, E>>` by applying a
function to a contained `Poll::Ready(Ok)` value, leaving all other
variants untouched.

This function can be used to compose the results of two functions.

# Examples

```
# use core::task::Poll;
let res: Poll<Result<u8, _>> = Poll::Ready("12".parse());
let squared = res.map_ok(|n| n * n);
assert_eq!(squared, Poll::Ready(Ok(144)));
```

## Poll::map_err

```rust
pub fn map_err<U, F>(self, f: F) -> Poll<Result<T, U>> where F: FnOnce(E) -> U,
```

Maps a `Poll::Ready<Result<T, E>>` to `Poll::Ready<Result<T, U>>` by
applying a function to a contained `Poll::Ready(Err)` value, leaving all other
variants untouched.

This function can be used to pass through a successful result while handling
an error.

# Examples

```
# use core::task::Poll;
let res: Poll<Result<u8, _>> = Poll::Ready("oops".parse());
let res = res.map_err(|_| 0_u8);
assert_eq!(res, Poll::Ready(Err(0)));
```

## Poll::map_ok

```rust
pub fn map_ok<U, F>(self, f: F) -> Poll<Option<Result<U, E>>> where F: FnOnce(T) -> U,
```

Maps a `Poll<Option<Result<T, E>>>` to `Poll<Option<Result<U, E>>>` by
applying a function to a contained `Poll::Ready(Some(Ok))` value,
leaving all other variants untouched.

This function can be used to compose the results of two functions.

# Examples

```
# use core::task::Poll;
let res: Poll<Option<Result<u8, _>>> = Poll::Ready(Some("12".parse()));
let squared = res.map_ok(|n| n * n);
assert_eq!(squared, Poll::Ready(Some(Ok(144))));
```

## Poll::map_err

```rust
pub fn map_err<U, F>(self, f: F) -> Poll<Option<Result<T, U>>> where F: FnOnce(E) -> U,
```

Maps a `Poll::Ready<Option<Result<T, E>>>` to
`Poll::Ready<Option<Result<T, F>>>` by applying a function to a
contained `Poll::Ready(Some(Err))` value, leaving all other variants
untouched.

This function can be used to pass through a successful result while handling
an error.

# Examples

```
# use core::task::Poll;
let res: Poll<Option<Result<u8, _>>> = Poll::Ready(Some("oops".parse()));
let res = res.map_err(|_| 0_u8);
assert_eq!(res, Poll::Ready(Some(Err(0))));
```