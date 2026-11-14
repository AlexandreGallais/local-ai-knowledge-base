---
title: "core::pin (part 5 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/pin.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::pin (part 5 of 5)

## Shared access to the pointer

If this pointer type uses `&P` references as evidence that this value is not
pinned, then it must not treat the `&self` argument passed to `Clone` or
the formatting traits (`fmt::Debug`, `fmt::Display`, `fmt::Pointer`)
as such evidence.

As an example, given a `Pin<Arc<T>>` there is no way to obtain an `&Arc<T>`
(note that `Deref` just gives a `&T`). Because of this, the `Arc` type can
assume that an `&Arc<T>` value can only exist if the `T` is not pinned,
which justifies the soundness of the `Arc::get_mut` method.

## Cloning pinned pointers

When a `Pin` is cloned, the `P` pointer value returned by `clone` is
passed to `Pin::new_unchecked`. The implementation of `Clone` must
return a value such that this is sound.

For example, when a `Pin<&T>` is cloned, the resulting `&T` points at the
same value. The value is known to be pinned since a `Pin<&T>` to it exists,
so it is safe to wrap the `&T` returned by `clone` in `Pin`.
