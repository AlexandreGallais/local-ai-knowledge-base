# std::sys::fd::sgx

## FileDesc::into_raw

```rust
pub fn into_raw(self) -> Fd
```

Extracts the actual file descriptor without closing it.