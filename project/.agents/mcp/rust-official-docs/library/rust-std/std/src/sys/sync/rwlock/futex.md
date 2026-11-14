# std::sys::sync::rwlock::futex

## RwLock::read_unlock

```rust
pub unsafe fn read_unlock(&self)
```

# Safety

The `RwLock` must be read-locked (N readers) in order to call this.

## RwLock::write_unlock

```rust
pub unsafe fn write_unlock(&self)
```

# Safety

The `RwLock` must be write-locked (single writer) in order to call this.

## RwLock::downgrade

```rust
pub unsafe fn downgrade(&self)
```

# Safety

The `RwLock` must be write-locked (single writer) in order to call this.