---
title: "Inline assembly (part 2 of 7)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/inline-assembly.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Inline assembly (part 2 of 7)

## Operand type

r[asm.operand-type.supported-operands]
Several types of operands are supported:

r[asm.operand-type.supported-operands-in]
* `in(<reg>) <expr>`
  - `<reg>` can refer to a register class or an explicit register. The allocated register name is substituted into the asm template string.
  - The allocated register will contain the value of `<expr>` at the start of the assembly code.
  - The allocated register must contain the same value at the end of the assembly code (except if a `lateout` is allocated to the same register).

```rust
# #[cfg(target_arch = "x86_64")] {
// ``in` can be used to pass <example-value> into inline assembly...
unsafe { core::arch::asm!("/* {} */", in(reg) 5); }
# }
```

> **Note:**
> If the value's type is smaller than the register, the value of the upper bits is platform-specific. Some targets zero out the upper bits, while others leave them untouched.

r[asm.operand-type.supported-operands-out]
* `out(<reg>) <expr>`
  - `<reg>` can refer to a register class or an explicit register. The allocated register name is substituted into the asm template string.
  - The allocated register will contain an undefined value at the start of the assembly code.
  - `<expr>` must be a (possibly uninitialized) place expression, to which the contents of the allocated register are written at the end of the assembly code.
  - An underscore (`_`) may be specified instead of an expression, which will cause the contents of the register to be discarded at the end of the assembly code (effectively acting as a clobber).

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i64;
// and `out` can be used to pass <example-value> back to rust.
unsafe { core::arch::asm!("/* {} */", out(reg) x); }
# }
```

r[asm.operand-type.supported-operands-lateout]
* `lateout(<reg>) <expr>`
  - Identical to `out` except that the register allocator can reuse a register allocated to an `in`.
  - You should only write to the register after all inputs are read, otherwise you may clobber an input.

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i64;
// `lateout` is the same as `out`
// but the compiler knows we don't care about the value of any inputs by the
// time we overwrite it.
unsafe { core::arch::asm!("mov {}, 5", lateout(reg) x); }
assert_eq!(x, 5)
# }
```

r[asm.operand-type.supported-operands-inout]
* `inout(<reg>) <expr>`
  - `<reg>` can refer to a register class or an explicit register. The allocated register name is substituted into the asm template string.
  - The allocated register will contain the value of `<expr>` at the start of the assembly code.
  - `<expr>` must be a mutable initialized place expression, to which the contents of the allocated register are written at the end of the assembly code.

```rust
# #[cfg(target_arch = "x86_64")] {
let mut x: i64 = 4;
// `inout` can be used to modify values in-register
unsafe { core::arch::asm!("inc {}", inout(reg) x); }
assert_eq!(x, 5);
# }
```

r[asm.operand-type.supported-operands-inout-arrow]
* `inout(<reg>) <in expr> => <out expr>`
  - Same as `inout` except that the initial value of the register is taken from the value of `<in expr>`.
  - `<out expr>` must be a (possibly uninitialized) place expression, to which the contents of the allocated register are written at the end of the assembly code.
  - An underscore (`_`) may be specified instead of an expression for `<out expr>`, which will cause the contents of the register to be discarded at the end of the assembly code (effectively acting as a clobber).
  - `<in expr>` and `<out expr>` may have different types.

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i64;
// `inout` can also move values to different places
unsafe { core::arch::asm!("inc {}", inout(reg) 4u64=>x); }
assert_eq!(x, 5);
# }
```

r[asm.operand-type.supported-operands-inlateout]
* `inlateout(<reg>) <expr>` / `inlateout(<reg>) <in expr> => <out expr>`
  - Identical to `inout` except that the register allocator can reuse a register allocated to an `in` (this can happen if the compiler knows the `in` has the same initial value as the `inlateout`).
  - You should only write to the register after all inputs are read, otherwise you may clobber an input.

```rust
# #[cfg(target_arch = "x86_64")] {
let mut x: i64 = 4;
// `inlateout` is `inout` using `lateout`
unsafe { core::arch::asm!("inc {}", inlateout(reg) x); }
assert_eq!(x, 5);
# }
```

r[asm.operand-type.supported-operands-sym]
* `sym `
  - `` must refer to a `fn` or `static`.
  - A mangled symbol name referring to the item is substituted into the asm template string.
  - The substituted string does not include any modifiers (e.g. GOT, PLT, relocations, etc).
  - `` is allowed to point to a `#[thread_local]` static, in which case the assembly code can combine the symbol with relocations (e.g. `@plt`, `@TPOFF`) to read from thread-local data.

```rust
# #[cfg(target_arch = "x86_64")] {
extern "C" fn foo() {
    println!("Hello from inline assembly")
}
// `sym` can be used to refer to a function (even if it doesn't have an
// external name we can directly write)
unsafe { core::arch::asm!("call {}", sym foo, clobber_abi("C")); }
# }
```

r[asm.operand-type.supported-operands-const]
* `const <expr>`
  - `<expr>` must be an integer constant expression. This expression follows the same rules as inline `const` blocks.
  - The type of the expression may be any integer type, but defaults to `i32` just like integer literals.
  - The value of the expression is formatted as a string and substituted directly into the asm template string.

```rust
# #[cfg(target_arch = "x86_64")] {
// swizzle [0, 1, 2, 3] => [3, 2, 0, 1]
const SHUFFLE: u8 = 0b01_00_10_11;
let x: core::arch::x86_64::__m128 = unsafe { core::mem::transmute([0u32, 1u32, 2u32, 3u32]) };
let y: core::arch::x86_64::__m128;
// Pass a constant value into an instruction that expects an immediate like `pshufd`
unsafe {
    core::arch::asm!("pshufd {xmm}, {xmm}, {shuffle}",
        xmm = inlateout(xmm_reg) x=>y,
        shuffle = const SHUFFLE
    );
}
let y: [u32; 4] = unsafe { core::mem::transmute(y) };
assert_eq!(y, [3, 2, 0, 1]);
# }
```

r[asm.operand-type.supported-operands-label]
* `label <block>`
  - The address of the block is substituted into the asm template string. The assembly code may jump to the substituted address.
  - For targets that distinguish between direct jumps and indirect jumps (e.g. x86-64 with `cf-protection` enabled), the assembly code must not jump to the substituted address indirectly.
  - After execution of the block, the `asm!` expression returns.
  - The type of the block must be unit or `!` (never).
  - The block starts a new safety context; unsafe operations within the `label` block must be wrapped in an inner `unsafe` block, even though the entire `asm!` expression is already wrapped in `unsafe`.

```rust
# #[cfg(target_arch = "x86_64")]
unsafe {
    core::arch::asm!("jmp {}", label {
        println!("Hello from inline assembly label");
    });
}
```

r[asm.operand-type.left-to-right]
Operand expressions are evaluated from left to right, just like function call arguments. After the `asm!` has executed, outputs are written to in left to right order. This is significant if two outputs point to the same place: that place will contain the value of the rightmost output.

```rust
# #[cfg(target_arch = "x86_64")] {
let mut y: i64;
// y gets its value from the second output, rather than the first
unsafe { core::arch::asm!("mov {}, 0", "mov {}, 1", out(reg) y, out(reg) y); }
assert_eq!(y, 1);
# }
```

r[asm.operand-type.naked_asm-restriction]
Because `naked_asm!` defines a whole function body and the compiler cannot emit any additional code to handle operands, it can only use `sym` and `const` operands.

r[asm.operand-type.global_asm-restriction]
Because `global_asm!` exists outside a function, it can only use `sym` and `const` operands.

```rust
# fn main() {}
// register operands aren't allowed, since we aren't in a function
# #[cfg(target_arch = "x86_64")]
core::arch::global_asm!("", in(reg) 5);
// ERROR: the `in` operand cannot be used with `global_asm!`
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

```rust
# fn main() {}
fn foo() {}

# #[cfg(target_arch = "x86_64")]
// `const` and `sym` are both allowed, however
core::arch::global_asm!("/* {} {} */", const 0, sym foo);
```

r[asm.register-operands]
