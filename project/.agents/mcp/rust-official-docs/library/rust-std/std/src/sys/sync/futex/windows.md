# std::sys::sync::futex::windows

## type Futex

```rust
pub type Futex = Atomic<Primitive>
```

An atomic for use as a futex that is at least 32-bits but may be larger

## type Primitive

```rust
pub type Primitive = u32
```

Must be the underlying type of Futex

## type SmallFutex

```rust
pub type SmallFutex = Atomic<SmallPrimitive>
```

An atomic for use as a futex that is at least 8-bits but may be larger.

## type SmallPrimitive

```rust
pub type SmallPrimitive = u8
```

Must be the underlying type of SmallFutex