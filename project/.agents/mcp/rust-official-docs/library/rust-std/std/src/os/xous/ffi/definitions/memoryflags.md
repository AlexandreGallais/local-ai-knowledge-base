# std::os::xous::ffi::definitions::memoryflags

## struct MemoryFlags

```rust
pub struct MemoryFlags
```

Flags to be passed to the MapMemory struct.
Note that it is an error to have memory be
writable and not readable.

## MemoryFlags::FREE

```rust
pub const FREE: Self = Self
```

Free this memory

## MemoryFlags::RESERVE

```rust
pub const RESERVE: Self = Self
```

Immediately allocate this memory.  Otherwise it will
be demand-paged.  This is implicitly set when `phys`
is not 0.

## MemoryFlags::R

```rust
pub const R: Self = Self
```

Allow the CPU to read from this page.

## MemoryFlags::W

```rust
pub const W: Self = Self
```

Allow the CPU to write to this page.

## MemoryFlags::X

```rust
pub const X: Self = Self
```

Allow the CPU to execute from this page.