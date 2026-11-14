# std::os::freebsd::fs

## trait MetadataExt

```rust
pub trait MetadataExt
```

OS-specific extensions to [`fs::Metadata`].

[`fs::Metadata`]: crate::fs::Metadata

## MetadataExt::as_raw_stat

```rust
fn as_raw_stat(&self) -> &raw::stat
```

Gain a reference to the underlying `stat` structure which contains
the raw information returned by the OS.

The contents of the returned `stat` are **not** consistent across
Unix platforms. The `os::unix::fs::MetadataExt` trait contains the
cross-Unix abstractions contained within the raw stat.