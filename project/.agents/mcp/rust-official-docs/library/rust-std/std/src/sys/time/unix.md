# std::sys::time::unix

## Instant::into_mach_absolute_time_ceil

```rust
pub fn into_mach_absolute_time_ceil(self) -> Option<u128>
```

Returns `self` converted into units of `mach_absolute_time`, or `None`
if `self` is before the system boot time. If the conversion cannot be
performed precisely, this ceils the result up to the nearest
representable value.