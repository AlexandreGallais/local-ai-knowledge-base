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