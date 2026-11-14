# std::os::unix::process

Unix-specific extensions to primitives in the [`std::process`] module.

[`std::process`]: crate::process

## fn parent_id

```rust
pub fn parent_id() -> u32
```

Returns the OS-assigned process identifier associated with this process's parent.