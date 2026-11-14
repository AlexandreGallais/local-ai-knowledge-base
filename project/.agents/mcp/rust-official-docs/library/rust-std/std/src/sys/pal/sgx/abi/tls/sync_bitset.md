---
title: "std::sys::pal::sgx::abi::tls::sync_bitset"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/sgx/abi/tls/sync_bitset.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::sgx::abi::tls::sync_bitset

## SyncBitset::iter

```rust
pub fn iter(&self) -> SyncBitsetIter<'_>
```

Not atomic.

## SyncBitset::set

```rust
pub fn set(&self) -> Option<usize>
```

Sets any unset bit. Not atomic. Returns `None` if all bits were
observed to be set.
