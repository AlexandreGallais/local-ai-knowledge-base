---
title: "External blocks (part 1 of 2)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/items/external-blocks.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[items.extern]
# External blocks

r[items.extern.syntax]
```grammar
ExternBlock ->
    `unsafe`?[^unsafe-2024] `extern` Abi? `{`
        InnerAttribute*
        ExternalItem*
    `}`

ExternalItem ->
    OuterAttribute* (
        MacroInvocationSemi
      | Visibility? StaticItem
      | Visibility? Function
    )
```

r[items.extern.intro]
External blocks provide _declarations_ of items that are not _defined_ in the current crate and are the basis of Rust's foreign function interface. These are akin to unchecked imports.

r[items.extern.allowed-kinds]
Two kinds of item _declarations_ are allowed in external blocks: [functions] and [statics].

r[items.extern.safety]
Calling unsafe functions or accessing unsafe statics that are declared in external blocks is only allowed in an [`unsafe` context].

r[items.extern.namespace]
The external block defines its functions and statics in the [value namespace] of the module or block where it is located.

r[items.extern.unsafe-required]
The `unsafe` keyword is semantically required to appear before the `extern` keyword on external blocks.

r[items.extern.edition2024]
> [!EDITION-2024]
> Prior to the 2024 edition, the `unsafe` keyword is optional. The `safe` and `unsafe` item qualifiers are only allowed if the external block itself is marked as `unsafe`.

r[items.extern.fn]
## Functions

r[items.extern.fn.body]
Functions within external blocks are declared in the same way as other Rust functions, with the exception that they must not have a body and are instead terminated by a semicolon.

r[items.extern.fn.param-patterns]
Patterns are not allowed in parameters, only [IDENTIFIER] or `_` may be used.

r[items.extern.fn.qualifiers]
The `safe` and `unsafe` function qualifiers are allowed, but other function qualifiers (e.g. `const`, `async`, `extern`) are not. The `safe` qualifier is rejected in `extern "custom"` blocks.

r[items.extern.fn.foreign-abi]
Functions within external blocks may be called by Rust code, just like functions defined in Rust. The Rust compiler automatically translates between the Rust ABI and the foreign ABI.

r[items.extern.fn.safety]
A function declared in an extern block is implicitly `unsafe` unless the `safe` function qualifier is present.

r[items.extern.fn.fn-ptr]
When coerced to a function pointer, a function declared in an extern block has type `for<'l1, ..., 'lm> extern "abi" fn(A1, ..., An) -> R`, where `'l1`, ... `'lm` are its lifetime parameters, `A1`, ..., `An` are the declared types of its parameters, and `R` is the declared return type.

r[items.extern.static]
## Statics

r[items.extern.static.intro]
Statics within external blocks are declared in the same way as [statics] outside of external blocks, except that they do not have an expression initializing their value.

r[items.extern.static.safety]
Unless a static item declared in an extern block is qualified as `safe`, it is `unsafe` to access that item, whether or not it's mutable, because there is nothing guaranteeing that the bit pattern at the static's memory is valid for the type it is declared with, since some arbitrary (e.g. C) code is in charge of initializing the static.

r[items.extern.static.mut]
Extern statics can be either immutable or mutable just like [statics] outside of external blocks.

r[items.extern.static.read-only]
An immutable static *must* be initialized before any Rust code is executed. It is not enough for the static to be initialized before Rust code reads from it. Once Rust code runs, mutating an immutable static (from inside or outside Rust) is UB, except if the mutation happens to bytes inside of an `UnsafeCell`.

r[items.extern.abi]
## ABI

r[items.extern.abi.intro]
The `extern` keyword can be followed by an optional [ABI] string. The ABI specifies the calling convention of the functions in the block. The calling convention defines a low-level interface for functions, such as how arguments are placed in registers or on the stack, how return values are passed, and who is responsible for cleaning up the stack.

> [!EXAMPLE]
> ```rust
> // Interface to the Windows API.
> unsafe extern "system" { /* ... */ }
> ```

r[items.extern.abi.default]
If the ABI string is not specified, it defaults to `"C"`.

> **Note:**
> The `extern` syntax without an explicit ABI is being phased out, so it's better to always write the ABI explicitly.
>
> For more details, see Rust issue #134986.

r[items.extern.abi.standard]
The following ABI strings are supported on all platforms:

r[items.extern.abi.rust]
* `unsafe extern "Rust"` --- The native calling convention for Rust functions and closures. This is the default when a function is declared without using [`extern fn`]. The Rust ABI offers no stability guarantees.

r[items.extern.abi.c]
* `unsafe extern "C"` --- The "C" ABI matches the default ABI chosen by the dominant C compiler for the target.

r[items.extern.abi.system]
* `unsafe extern "system"` --- This is equivalent to `extern "C"` except on Windows x86_32 where it is equivalent to `"stdcall"` for non-variadic functions, and equivalent to `"C"` for variadic functions.

  > **Note:**
  > As the correct underlying ABI on Windows is target-specific, it's best to use `extern "system"` when attempting to link Windows API functions that don't use an explicitly defined ABI.

r[items.extern.abi.unwind]
* `extern "C-unwind"` and `extern "system-unwind"` --- Identical to `"C"` and `"system"`, respectively, but with different behavior when the callee unwinds (by panicking or throwing a C++ style exception).

r[items.extern.abi.custom]
* `unsafe extern "custom"` --- A custom ABI that is not known to the compiler.

r[items.extern.abi.platform]
There are also some platform-specific ABI strings:

r[items.extern.abi.cdecl]
* `unsafe extern "cdecl"` --- The calling convention typically used with x86_32 C code.
  * Only available on x86_32 targets.
  * Corresponds to MSVC's `__cdecl` and GCC and clang's `__attribute__((cdecl))`.

  > **Note:**
  > For details, see:
  >
  > - <https://learn.microsoft.com/en-us/cpp/cpp/cdecl>
  > - <https://en.wikipedia.org/wiki/X86_calling_conventions#cdecl>

r[items.extern.abi.stdcall]
* `unsafe extern "stdcall"` --- The calling convention typically used by the [Win32 API] on x86_32.
  * Only available on x86_32 targets.
  * Corresponds to MSVC's `__stdcall` and GCC and clang's `__attribute__((stdcall))`.

  > **Note:**
  > For details, see:
  >
  > - <https://learn.microsoft.com/en-us/cpp/cpp/stdcall>
  > - <https://en.wikipedia.org/wiki/X86_calling_conventions#stdcall>

r[items.extern.abi.win64]
* `unsafe extern "win64"` --- The Windows x64 ABI.
  * Only available on x86_64 targets.
  * "win64" is the same as the "C" ABI on Windows x86_64 targets.
  * Corresponds to GCC and clang's `__attribute__((ms_abi))`.

  > **Note:**
  > For details, see:
  >
  > - <https://learn.microsoft.com/en-us/cpp/build/x64-software-conventions>
  > - <https://en.wikipedia.org/wiki/X86_calling_conventions#Microsoft_x64_calling_convention>

r[items.extern.abi.sysv64]
* `unsafe extern "sysv64"` --- The System V ABI.
  * Only available on x86_64 targets.
  * "sysv64" is the same as the "C" ABI on non-Windows x86_64 targets.
  * Corresponds to GCC and clang's `__attribute__((sysv_abi))`.

  > **Note:**
  > For details, see:
  >
  > - <https://wiki.osdev.org/System_V_ABI>
  > - <https://en.wikipedia.org/wiki/X86_calling_conventions#System_V_AMD64_ABI>

r[items.extern.abi.aapcs]
* `unsafe extern "aapcs"` --- The soft-float ABI for ARM.
  * Only available on ARM32 targets.
  * "aapcs" is the same as the "C" ABI on soft-float ARM32.
  * Corresponds to clang's `__attribute__((pcs("aapcs")))`.

  > **Note:**
  > For details, see:
  >
  > - Arm Procedure Call Standard

r[items.extern.abi.fastcall]
* `unsafe extern "fastcall"` --- A "fast" variant of stdcall that passes some arguments in registers.
  * Only available on x86_32 targets.
  * Corresponds to MSVC's `__fastcall` and GCC and clang's `__attribute__((fastcall))`.

  > **Note:**
  > For details, see:
  >
  > - <https://learn.microsoft.com/en-us/cpp/cpp/fastcall>
  > - <https://en.wikipedia.org/wiki/X86_calling_conventions#Microsoft_fastcall>

r[items.extern.abi.thiscall]
* `unsafe extern "thiscall"` --- The calling convention typically used on C++ class member functions on x86_32 MSVC.
  * Only available on x86_32 targets.
  * Corresponds to MSVC's `__thiscall` and GCC and clang's `__attribute__((thiscall))`.

  > **Note:**
  > For details, see:
  >
  > - <https://en.wikipedia.org/wiki/X86_calling_conventions#thiscall>
  > - <https://learn.microsoft.com/en-us/cpp/cpp/thiscall>

r[items.extern.abi.efiapi]
* `unsafe extern "efiapi"` --- The ABI used for [UEFI] functions.
  * Only available on x86 and ARM targets (32bit and 64bit).

r[items.extern.abi.platform-unwind-variants]
Like `"C"` and `"system"`, most platform-specific ABI strings also have a corresponding `-unwind` variant; specifically, these are:

* `"aapcs-unwind"`
* `"cdecl-unwind"`
* `"fastcall-unwind"`
* `"stdcall-unwind"`
* `"sysv64-unwind"`
* `"thiscall-unwind"`
* `"win64-unwind"`

r[items.extern.variadic]
## Variadic functions

r[items.extern.variadic.syntax]
Functions within external blocks may be made variadic by specifying `...` as the last parameter. The variadic parameter may be specified with a pattern.

```rust
unsafe extern "C" {
    unsafe fn foo(...);
    unsafe fn bar(x: i32, ...);
    unsafe fn with_name(format: *const u8, args: ...);
    // SAFETY: This function guarantees it will not access
    // variadic arguments.
    safe fn ignores_variadic_arguments(x: i32, ...);
}
```

> **Warning:**
> The `safe` qualifier should not be used on a function in an `extern` block unless that function guarantees that it will not access the variadic arguments at all. Passing an unexpected number of arguments or arguments of unexpected type to a variadic function may lead to undefined behavior.

r[items.extern.variadic.conventions]
Variadic parameters can only be specified within `extern` blocks with the following ABI strings or their corresponding `-unwind` variants:

- `"aapcs"`
- `"C"`
- `"cdecl"`
- `"efiapi"`
- `"system"`
- `"sysv64"`
- `"win64"`

r[items.extern.attributes]
