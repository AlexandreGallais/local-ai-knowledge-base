---
title: "Functions (part 2 of 2)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/items/functions.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Functions (part 2 of 2)

## C-variadic functions

r[items.fn.c-variadic.intro]
A *C-variadic* function accepts a variable argument list `pat: ...` as its final parameter.

```rust
unsafe extern "C" fn f(mut ap: ...) -> f64 {
    unsafe { ap.next_arg::<f64>() }
}
```

```rust
unsafe extern "C" fn f(ap: ..., _: ()) {} // ERROR: `...` must be last.
```

This parameter stands in for an arbitrary number of arguments that may be passed by the caller.

r[items.fn.c-variadic.parameter-type]
The type of `pat` in the function body is [`VaList<'_>`].

```rust
# use core::ffi::VaList;
unsafe extern "C" fn f(ap: ...) {
    let _: VaList<'_> = ap;
}
```

r[items.fn.c-variadic.lifetime]
A C-variadic function definition is implicitly generic over the lifetime of its variadic parameter, as if the parameter had type `VaList<'x>` for a fresh, unnameable lifetime `'x`. Because the function must be valid for any such lifetime, the `VaList` cannot be proved to outlive any caller-provided lifetime (and so cannot escape the call) and no caller-provided lifetime can be proved to outlive it.

```rust
# use core::ffi::VaList;
fn b_outlives_a<'a, 'b: 'a>(_: &mut VaList<'a>, _: &mut &'b mut u8) {}
unsafe extern "C" fn f(mut r: &mut u8, mut ap: ...) {
    b_outlives_a(&mut ap, &mut r); // ERROR: May not live long enough.
}
```

```rust
# use core::ffi::VaList;
fn a_outlives_b<'a: 'b, 'b>(_: &mut VaList<'a>, _: &mut &'b mut u8) {}
unsafe extern "C" fn f(mut r: &mut u8, mut ap: ...) {
    a_outlives_b(&mut ap, &mut r); // ERROR: May not live long enough.
}
```

> **Note:**
> This is different than if the data were a stack variable: any caller-provided lifetime can be proved to outlive a borrow of a callee stack variable.
>
> ```rust
> struct MockVaList<'data>(&'data u8);
> fn b_outlives_a<'a, 'b: 'a>(_: &mut MockVaList<'a>, _: &mut &'b mut u8) {}
> unsafe extern "C" fn f(mut r: &mut u8) {
>     let data = 0;
>     let mut ap = MockVaList(&data);
>     b_outlives_a(&mut ap, &mut r); // OK.
> }
> ```

r[items.fn.c-variadic.desugar-brief]
A C-variadic function definition is roughly equivalent to a function operating on a [`VaList`].

```rust
unsafe extern "C" fn f(mut ap: ...) -> i32 {
    unsafe { ap.next_arg::<i32>() }
}
```

Roughly desugars to:

```rust
# #![ feature(core_intrinsics) ]
# #![allow(internal_features)]
# use core::ffi::VaList;
# use core::mem::MaybeUninit;
use core::intrinsics::{va_arg, va_end};
// `va_start` is magic and has no intrinsic.
fn va_start(ap: *mut VaList<'_>) { /* magic */ }
unsafe extern "C" fn f() -> i32 {
    unsafe {
        let mut ap: MaybeUninit<VaList<'_>> = MaybeUninit::uninit();
        va_start(ap.as_mut_ptr());
        let mut ap = ap.assume_init();
        let x = va_arg::<i32>(&mut ap);
        va_end(&mut ap);
        x
    }
}
```

> **Note:**
> In an actual C-variadic function definition, the lifetime in `VaList<'_>` is different from what this code would suggest. See [items.fn.c-variadic.lifetime].

r[items.fn.c-variadic.next-arg-safety]
Calling `VaList::next_arg` to read an argument of type `T` is only safe if all of the following conditions are satisfied:

- There is another C-variadic argument to read.
- The actual type of the argument `U` is compatible with `T` (as defined below).
- If `U` and `T` are both integer types, then the value passed by the caller must be
representable in both types.

Types `T` and `U` are compatible when one of the following is true:

- `T` and `U` are the same type (up to free lifetimes).
- `T` and `U` are integer types of the same size.
- `T` and `U` are both pointers and their target types are compatible.
- `T` is a pointer to `c_void` and `U` is a pointer to `i8` or `u8`, or vice versa.

Examples of compatible types are:

- `u32` and `i32` --- but UB may still occur if the value is not representable in the target type.
- `u64` and `usize` --- on a 64-bit platform.
- `*const &'a u32` and `*mut &'static u32` --- these types are equal up to free lifetimes.

Examples of incompatible types are:

- `usize` and `*const _` --- pointers and integers are not compatible.
- `*const fn(&'static ())` and `*const for<'a> fn(&'a ())` --- these types are not equal up to free lifetimes.

r[items.fn.c-variadic.abi-compatibility]
[`VaList`] is ABI compatible with the C `va_list` type.

```rust
# use core::ffi::{c_char, c_int, VaList};
unsafe extern "C" {
    // The C `vprintf` function is:
    //
    //     int vprintf(const char *format, va_list ap);
    //
    unsafe fn vprintf(fmt: *const c_char, ap: VaList<'_>) -> c_int;
}

unsafe extern "C" fn print(fmt: *const c_char, ap: ...) -> c_int {
    // The `VaList` is passed directly to the C function.
    unsafe { vprintf(fmt, ap) }
}
```

r[items.fn.c-variadic.abi]
Except on [naked functions], only `extern "C"` and `extern "C-unwind"` function definitions can accept a variable argument list.

```rust
unsafe fn f(ap: ...) {} // ERROR: Not supported.
```

```rust
unsafe extern "sysv64" fn f(ap: ...) {} // ERROR: Not supported.
```

A naked function can accept a variable argument list only if its ABI string is accepted under [items.extern.variadic.conventions].

```rust
# #[cfg(target_arch = "x86_64")] {
/// Computes the dot product of the `n`-dimensional vector `v`, passed
/// as `n` C-variadic `f64` arguments, with the vector `(c, ..., c)`.
/// That is, it computes `c * (v1 + ... + vn)`.
///
/// # Safety
///
/// The caller must pass `n` in the range `1..=7`, followed by exactly
/// `n` values of type `f64`.
// SAFETY: The body respects the "sysv64" calling convention, upholds
// the signature, and does not fall through.
#[unsafe(naked)]
unsafe extern "sysv64" fn dot(n: u64, c: f64, v: ...) -> f64 {
    core::arch::naked_asm!(
        // The "sysv64" calling convention passes `n` in `rdi`, `c` in
        // `xmm0`, and the coordinates in `xmm1` through `xmm7`,
        // in order. (The caller also passes the number of vector
        // registers used in `al`.)
        //
        // The sum takes the last `n - 1` additions of the chain
        // below. Each `addsd` encodes in exactly 4 bytes, so we enter
        // the chain `4 * (n - 1)` bytes before the `mulsd`.
        "neg rdi", // I.e., `rdi = -n`.
        "lea rax, [rip + 2f]", // I.e., `rax` = address of label 2.
        "lea rax, [rax + rdi*4 + 4]", // I.e., `rax -= 4 * (n - 1)`.
        "jmp rax",
        "addsd xmm6, xmm7", // Entered when `n` is 7.
        "addsd xmm5, xmm6", // ... when `n` is at least 6.
        "addsd xmm4, xmm5",
        "addsd xmm3, xmm4",
        "addsd xmm2, xmm3",
        "addsd xmm1, xmm2", // ... when `n` is at least 2.
        "2:",
        "mulsd xmm0, xmm1", // The result is returned in `xmm0`.
        "ret",
    )
}

// SAFETY: `dot` is passed `n` variadic `f64` arguments in each call.
let dot2 = unsafe { dot(2, 10.0, 3.0, 4.0) };
assert_eq!(dot2, 70.0);
let dot7 = unsafe { dot(7, 2.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0) };
assert_eq!(dot7, 56.0);
# }
```

r[items.fn.c-variadic.safety]
When a variable argument list is used in the signature:

- Function definitions must be `unsafe`.
- Function declarations within trait definitions must be `unsafe`.
- Function declarations in `extern` blocks may be `safe`.

```rust
extern "C" fn f(ap: ...) {} // ERROR: Must be `unsafe`.
```

```rust
trait Tr {
    extern "C" fn f(ap: ...); // ERROR: Must be `unsafe`.
}
```

```rust
unsafe extern "C" {
    safe fn f(ap: ...); // OK.
}
```

> **Note:**
> For `safe` function declarations in an `extern` block, see the warning in [items.extern.variadic].

r[items.fn.c-variadic.async]
A C-variadic function cannot be `async`.

```rust
async unsafe extern "C" fn f(ap: ...) {} // ERROR: Cannot be `async`.
```

r[items.fn.c-variadic.const]
A C-variadic function cannot be `const`.

```rust
const unsafe extern "C" fn f(ap: ...) {} // ERROR: Cannot be `const`.
```

r[items.fn.c-variadic.stable-targets]
Support for C-variadic function definitions is stable on the following target architectures:

- x86 and x86-64
- ARM
- AArch64 and Arm64EC
- RISC-V 32-bit and 64-bit (except when using the ilp32e ABI)
- LoongArch 32-bit and 64-bit
- s390x
- PowerPC and PowerPC64
- AMDGPU and NVPTX
- Wasm32 and Wasm64
- C-SKY
- Xtensa
- Hexagon
- SPARC64
- MIPS

> **Note:**
> Some target architectures (e.g., BPF) do not support C-variadic function definitions. The compiler will emit an error if such a definition is used on an unsupported target.

r[items.fn.attributes]
## Attributes on functions

r[items.fn.attributes.intro]
Outer attributes are allowed on functions. Inner attributes are allowed directly after the `{` inside its body [block].

This example shows an inner attribute on a function. The function is documented with just the word "Example".

```rust
fn documented() {
    #![doc = "Example"]
}
```

> **Note:**
> Except for lints, it is idiomatic to only use outer attributes on function items.

r[items.fn.attributes.builtin-attributes]
The attributes that have meaning on a function are:

- [`cfg_attr`]
- [`cfg`]
- [`cold`]
- [`deprecated`]
- [`doc`]
- [`export_name`]
- [`inline`]
- [`link_section`]
- [`must_use`]
- [`no_mangle`]
- [`optimize`]
- [Lint check attributes]
- [Procedural macro attributes]
- [Testing attributes]

r[items.fn.param-attributes]
## Attributes on function parameters

r[items.fn.param-attributes.intro]
Outer attributes are allowed on function parameters and the permitted [built-in attributes] are restricted to `cfg`, `cfg_attr`, `allow`, `warn`, `deny`, and `forbid`.

```rust
fn len(
    #[cfg(windows)] slice: &[u16],
    #[cfg(not(windows))] slice: &[u8],
) -> usize {
    slice.len()
}
```

r[items.fn.param-attributes.parsed-attributes]
Inert helper attributes used by procedural macro attributes applied to items are also allowed but be careful to not include these inert attributes in your final `TokenStream`.

For example, the following code defines an inert `some_inert_attribute` attribute that is not formally defined anywhere and the `some_proc_macro_attribute` procedural macro is responsible for detecting its presence and removing it from the output token stream.

```rust
#[some_proc_macro_attribute]
fn foo_oof(#[some_inert_attribute] arg: u8) {
}
```
