---
title: "std::sys::platform_version::darwin::public_extern"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/platform_version/darwin/public_extern.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::platform_version::darwin::public_extern

#### Runtime version checking ABI for other compilers.

The symbols in this file are useful for us to expose to allow linking code written in the
following languages when using their version checking functionality:
- Clang's `__builtin_available` macro.
- Objective-C's `@available`.
- Swift's `#available`,

Without Rust exposing these symbols, the user would encounter a linker error when linking to
C/Objective-C/Swift libraries using these features.

The presence of these symbols is mostly considered a quality-of-implementation detail, and
should not be relied upon to be available. The intended effect is that linking with code built
with Clang's `__builtin_available` (or similar) will continue to work. For example, we may
decide to remove `__isOSVersionAtLeast` if support for Clang 11 (Xcode 11) is dropped.

#### Background

The original discussion of this feature can be found at:
- <https://lists.llvm.org/pipermail/cfe-dev/2016-July/049851.html>
- <https://reviews.llvm.org/D27827>
- <https://reviews.llvm.org/D30136>

And the upstream implementation of these can be found in `compiler-rt`:
<https://github.com/llvm/llvm-project/blob/llvmorg-20.1.0/compiler-rt/lib/builtins/os_version_check.c>

Ideally, these symbols should probably have been a part of Apple's `libSystem.dylib`, both
because their implementation is quite complex, using allocation, environment variables, file
access and dynamic library loading (and emitting all of this into every binary).

The reason why Apple chose to not do that originally is lost to the sands of time, but a good
reason would be that implementing it as part of `compiler-rt` allowed them to back-deploy this
to older OSes immediately.

In Rust's case, while we may provide a feature similar to `@available` in the future, we will
probably do so as a macro exposed by `std` (and not as a compiler builtin). So implementing this
in `std` makes sense, since then we can implement it using `std` utilities, and we can avoid
having `compiler-builtins` depend on `libSystem.dylib`.

This does mean that users that attempt to link C/Objective-C/Swift code _and_ use `#![no_std]`
in all their crates may get a linker error because these symbols are missing. Using `no_std` is
quite uncommon on Apple systems though, so it's probably fine to not support this use-case.

The workaround would be to link `libclang_rt.osx.a` or otherwise use Clang's `compiler-rt`.

See also discussion in <https://github.com/rust-lang/compiler-builtins/pull/794>.

#### Implementation details

NOTE: Since macOS 10.15, `libSystem.dylib` _has_ actually provided the undocumented
`_availability_version_check` via `libxpc` for doing the version lookup (zippered, which is why
it requires a platform parameter to differentiate between macOS and Mac Catalyst), though its
usage may be a bit dangerous, see:
- <https://reviews.llvm.org/D150397>
- <https://github.com/llvm/llvm-project/issues/64227>

Besides, we'd need to implement the version lookup via PList to support older versions anyhow,
so we might as well use that everywhere (since it can also be optimized more after inlining).
