---
title: "core::mem::type_info"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/mem/type_info.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::mem::type_info

MVP for exposing compile-time information about types in a
runtime or const-eval processable way.

## TraitImpl::get_vtable

```rust
pub const fn get_vtable(&self) -> DynMetadata<T>
```

Gets the raw vtable for type reflection mapping

## struct FnPtr

```rust
pub struct FnPtr
```

Function pointer, e.g. fn(u8),

## FnPtr::splatted

```rust
pub const fn splatted(&self) -> Option<u8>
```

Returns the splatted function argument index, or `None` if no argument is splatted.

e.g. in `fn overload(a: u8, #[rustc_splat] b: (f32, usize))` the index is 1,
and it can be called as `overload(a, 1.0, 2)`.

## FnPtr::is_variadic

```rust
pub const fn is_variadic(&self) -> bool
```

Whether this function is variadic, e.g. extern "C" fn add(n: usize, mut args: ...);

## FnPtr::is_unsafe

```rust
pub const fn is_unsafe(&self) -> bool
```

whether this refers to an unsafe function.

## FnPtr::abi

```rust
pub const fn abi(&self) -> Abi
```

Returns the application binary interface. For example extern "C".

## FnPtr::inputs

```rust
pub const fn inputs(&self) -> &'static [TypeId]
```

The types of the functions parameters

## FnPtr::output

```rust
pub const fn output(&self) -> TypeId
```

List of the types returned by the function. For a function with no output
specified this returns `TypeId::of<()>`.

## enum Abi

```rust
pub enum Abi
```

Abi of [FnPtr]
