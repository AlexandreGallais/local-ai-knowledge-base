# std::sys::net::connection::socket

## fn setsockopt

```rust
pub unsafe fn setsockopt<T>( sock: &Socket, level: c_int, option_name: c_int, option_value: T, ) -> io::Result<()>
```

Sets the value of a socket option.

# Safety
`T` must be the type associated with the given socket option.

## fn getsockopt

```rust
pub unsafe fn getsockopt<T: Copy>( sock: &Socket, level: c_int, option_name: c_int, ) -> io::Result<T>
```

Gets the value of a socket option.

# Safety
`T` must be the type associated with the given socket option.