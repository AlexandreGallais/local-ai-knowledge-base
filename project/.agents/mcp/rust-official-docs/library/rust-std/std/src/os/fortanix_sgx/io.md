# std::os::fortanix_sgx::io

SGX-specific extensions to general I/O primitives

SGX file descriptors behave differently from Unix file descriptors. See the
description of [`TryIntoRawFd`] for more details.

## FromRawFd::Metadata

```rust
type Metadata: Default
```

An associated type that contains relevant metadata for `Self`.