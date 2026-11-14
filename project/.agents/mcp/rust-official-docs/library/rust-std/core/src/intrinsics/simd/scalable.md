# core::intrinsics::simd::scalable

Scalable vector compiler intrinsics.

In this module, a "vector" is any `#[rustc_scalable_vector]`-annotated type.

## fn sve_tuple_create2

```rust
pub unsafe fn sve_tuple_create2<SVec, SVecTup>(x0: SVec, x1: SVec) -> SVecTup
```

Create a tuple of two vectors.

`SVecTup` must be a scalable vector tuple (`#[rustc_scalable_vector]`) and `SVec` must be a
scalable vector (`#[rustc_scalable_vector(N)]`). `SVecTup` must be a tuple of vectors of
type `SVec`.

Corresponds to Clang's `__builtin_sve_svcreate2*` builtins.

## fn sve_tuple_create3

```rust
pub unsafe fn sve_tuple_create3<SVec, SVecTup>(x0: SVec, x1: SVec, x2: SVec) -> SVecTup
```

Create a tuple of three vectors.

`SVecTup` must be a scalable vector tuple (`#[rustc_scalable_vector]`) and `SVec` must be a
scalable vector (`#[rustc_scalable_vector(N)]`). `SVecTup` must be a tuple of vectors of
type `SVec`.

Corresponds to Clang's `__builtin_sve_svcreate3*` builtins.

## fn sve_tuple_create4

```rust
pub unsafe fn sve_tuple_create4<SVec, SVecTup>(x0: SVec, x1: SVec, x2: SVec, x3: SVec) -> SVecTup
```

Create a tuple of four vectors.

`SVecTup` must be a scalable vector tuple (`#[rustc_scalable_vector]`) and `SVec` must be a
scalable vector (`#[rustc_scalable_vector(N)]`). `SVecTup` must be a tuple of vectors of
type `SVec`.

Corresponds to Clang's `__builtin_sve_svcreate4*` builtins.

## fn sve_tuple_get

```rust
pub unsafe fn sve_tuple_get<SVecTup, SVec, const IDX: i32>(tuple: SVecTup) -> SVec
```

Get one vector from a tuple of vectors.

`SVecTup` must be a scalable vector tuple (`#[rustc_scalable_vector]`) and `SVec` must be a
scalable vector (`#[rustc_scalable_vector(N)]`). `SVecTup` must be a tuple of vectors of
type `SVec`.

Corresponds to Clang's `__builtin_sve_svget*` builtins.

# Safety

`IDX` must be in-bounds of the tuple.

## fn sve_tuple_set

```rust
pub unsafe fn sve_tuple_set<SVecTup, SVec, const IDX: i32>(tuple: SVecTup, x: SVec) -> SVecTup
```

Change one vector in a tuple of vectors.

`SVecTup` must be a scalable vector tuple (`#[rustc_scalable_vector]`) and `SVec` must be a
scalable vector (`#[rustc_scalable_vector(N)]`). `SVecTup` must be a tuple of vectors of
type `SVec`.

Corresponds to Clang's `__builtin_sve_svset*` builtins.

# Safety

`IDX` must be in-bounds of the tuple.