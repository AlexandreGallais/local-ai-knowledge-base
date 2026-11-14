# std::sys::pal::windows::winsock

## fn startup

```rust
pub fn startup()
```

Checks whether the Windows socket interface has been started already, and
if not, starts it.

## fn last_error

```rust
pub fn last_error() -> io::Error
```

Returns the last error from the Windows socket interface.

## fn cvt

```rust
pub fn cvt<T: IsMinusOne>(t: T) -> io::Result<T>
```

Checks if the signed integer is the Windows constant `SOCKET_ERROR` (-1)
and if so, returns the last error from the Windows socket interface. This
function must be called before another call to the socket API is made.

## fn cvt_gai

```rust
pub fn cvt_gai(err: c_int) -> io::Result<()>
```

A variant of `cvt` for `getaddrinfo` which return 0 for a success.

## fn cvt_r

```rust
pub fn cvt_r<T, F>(mut f: F) -> io::Result<T> where T: IsMinusOne, F: FnMut() -> T,
```

Just to provide the same interface as sys/pal/unix/net.rs