---
title: "Inline assembly (part 3 of 7)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/inline-assembly.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Inline assembly (part 3 of 7)

## Register operands

r[asm.register-operands.register-or-class]
Input and output operands can be specified either as an explicit register or as a register class from which the register allocator can select a register. Explicit registers are specified as string literals (e.g. `"eax"`) while register classes are specified as identifiers (e.g. `reg`).

```rust
# #[cfg(target_arch = "x86_64")] {
let mut y: i64;
// We can name both `reg`, or an explicit register like `eax` to get an
// integer register
unsafe { core::arch::asm!("mov eax, {:e}", in(reg) 5, lateout("eax") y); }
assert_eq!(y, 5);
# }
```

r[asm.register-operands.equivalence-to-base-register]
Note that explicit registers treat register aliases (e.g. `r14` vs `lr` on ARM) and smaller views of a register (e.g. `eax` vs `rax`) as equivalent to the base register.

r[asm.register-operands.error-two-operands]
It is a compile-time error to use the same explicit register for two input operands or two output operands.

```rust
# #[cfg(target_arch = "x86_64")] {
// We can't name eax twice
unsafe { core::arch::asm!("", in("eax") 5, in("eax") 4); }
// ERROR: register `eax` conflicts with register `eax`
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```
```rust
# #[cfg(target_arch = "x86_64")] {
// ... even using different aliases
unsafe { core::arch::asm!("", in("ax") 5, in("rax") 4); }
// ERROR: register `rax` conflicts with register `ax`
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.register-operands.error-overlapping]
Additionally, it is also a compile-time error to use overlapping registers (e.g. ARM VFP) in input operands or in output operands.

```rust
# #[cfg(target_arch = "x86_64")] {
// al overlaps with ax, so we can't name both of them.
unsafe { core::arch::asm!("", in("ax") 5, in("al") 4i8); }
// ERROR: register `al` conflicts with register `ax`
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.register-operands.allowed-types]
Only the following types are allowed as operands for inline assembly:
- Integers (signed and unsigned)
- Floating-point numbers
- Pointers (thin only)
- Function pointers
- SIMD vectors (structs defined with `#[repr(simd)]` and which implement `Copy`). This includes architecture-specific vector types defined in `std::arch` such as `__m128` (x86) or `int8x16_t` (ARM).

```rust
# #[cfg(target_arch = "x86_64")] {
extern "C" fn foo() {}

// Integers are allowed...
let y: i64 = 5;
unsafe { core::arch::asm!("/* {} */", in(reg) y); }

// and pointers...
let py = &raw const y;
unsafe { core::arch::asm!("/* {} */", in(reg) py); }

// floats as well...
let f = 1.0f32;
unsafe { core::arch::asm!("/* {} */", in(xmm_reg) f); }

// even function pointers and simd vectors.
let func: extern "C" fn() = foo;
unsafe { core::arch::asm!("/* {} */", in(reg) func); }

let z = unsafe { core::arch::x86_64::_mm_set_epi64x(1, 0) };
unsafe { core::arch::asm!("/* {} */", in(xmm_reg) z); }
# }
```

```rust
# #[cfg(target_arch = "x86_64")] {
struct Foo;
let x: Foo = Foo;
// Complex types like structs are not allowed
unsafe { core::arch::asm!("/* {} */", in(reg) x); }
// ERROR: cannot use value of type `Foo` for inline assembly
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.register-operands.supported-register-classes]
Here is the list of currently supported register classes:

| Architecture | Register class | Registers | LLVM constraint code |
| ------------ | -------------- | --------- | -------------------- |
| x86 | `reg` | `ax`, `bx`, `cx`, `dx`, `si`, `di`, `bp`, `r[8-15]` (x86-64 only) | `r` |
| x86 | `reg_abcd` | `ax`, `bx`, `cx`, `dx` | `Q` |
| x86-32 | `reg_byte` | `al`, `bl`, `cl`, `dl`, `ah`, `bh`, `ch`, `dh` | `q` |
| x86-64 | `reg_byte`\* | `al`, `bl`, `cl`, `dl`, `sil`, `dil`, `bpl`, `r[8-15]b` | `q` |
| x86 | `xmm_reg` | `xmm[0-7]` (x86) `xmm[0-15]` (x86-64) | `x` |
| x86 | `ymm_reg` | `ymm[0-7]` (x86) `ymm[0-15]` (x86-64) | `x` |
| x86 | `zmm_reg` | `zmm[0-7]` (x86) `zmm[0-31]` (x86-64) | `v` |
| x86 | `kreg` | `k[1-7]` | `Yk` |
| x86 | `kreg0` | `k0` | Only clobbers |
| x86 | `x87_reg` | `st([0-7])` | Only clobbers |
| x86 | `mmx_reg` | `mm[0-7]` | Only clobbers |
| x86-64 | `tmm_reg` | `tmm[0-7]` | Only clobbers |
| AArch64 | `reg` | `x[0-30]` | `r` |
| AArch64 | `vreg` | `v[0-31]` | `w` |
| AArch64 | `vreg_low16` | `v[0-15]` | `x` |
| AArch64 | `preg` | `p[0-15]`, `ffr` | Only clobbers |
| Arm64EC | `reg` | `x[0-12]`, `x[15-22]`, `x[25-27]`, `x30` | `r` |
| Arm64EC | `vreg` | `v[0-15]` | `w` |
| Arm64EC | `vreg_low16` | `v[0-15]` | `x` |
| ARM (ARM/Thumb2) | `reg` | `r[0-12]`, `r14` | `r` |
| ARM (Thumb1) | `reg` | `r[0-7]` | `r` |
| ARM | `sreg` | `s[0-31]` | `t` |
| ARM | `sreg_low16` | `s[0-15]` | `x` |
| ARM | `dreg` | `d[0-31]` | `w` |
| ARM | `dreg_low16` | `d[0-15]` | `t` |
| ARM | `dreg_low8` | `d[0-8]` | `x` |
| ARM | `qreg` | `q[0-15]` | `w` |
| ARM | `qreg_low8` | `q[0-7]` | `t` |
| ARM | `qreg_low4` | `q[0-3]` | `x` |
| RISC-V | `reg` | `x1`, `x[5-7]`, `x[9-15]`, `x[16-31]` (non-RV32E) | `r` |
| RISC-V | `freg` | `f[0-31]` | `f` |
| RISC-V | `vreg` | `v[0-31]` | Only clobbers |
| LoongArch | `reg` | `$r1`, `$r[4-20]`, `$r[23,30]` | `r` |
| LoongArch | `freg` | `$f[0-31]` | `f` |
| s390x | `reg` | `r[0-10]`, `r[12-14]` | `r` |
| s390x | `reg_addr` | `r[1-10]`, `r[12-14]` | `a` |
| s390x | `freg` | `f[0-15]` | `f` |
| s390x | `vreg` | `v[0-31]` | `v` |
| s390x | `areg` | `a[2-15]` | Only clobbers |
| PowerPC | `reg` | `r0`, `r[3-12]`, `r[14-28]` | `r` |
| PowerPC | `reg_nonzero` | `r[3-12]`, `r[14-28]` | `b` |
| PowerPC | `spe_acc` | `spe_acc` | Only clobbers |
| PowerPC64 | `reg` | `r0`, `r[3-12]`, `r[14-29]` | `r` |
| PowerPC64 | `reg_nonzero` | `r[3-12]`, `r[14-29]` | `b` |
| PowerPC/PowerPC64 | `freg` | `f[0-31]` | `f` |
| PowerPC/PowerPC64 | `vreg` | `v[0-31]` | `v` |
| PowerPC/PowerPC64 | `vsreg` | `vs[0-63]` | `wa` |
| PowerPC/PowerPC64 | `cr` | `cr[0-7]`, `cr` | Only clobbers |
| PowerPC/PowerPC64 | `ctr` | `ctr` | Only clobbers |
| PowerPC/PowerPC64 | `lr` | `lr` | Only clobbers |
| PowerPC/PowerPC64 | `xer` | `xer` | Only clobbers |

> **Note:**
> - On x86 we treat `reg_byte` differently from `reg` because the compiler can allocate `al` and `ah` separately whereas `reg` reserves the whole register.
> - On x86-64 the high byte registers (e.g. `ah`) are not available in the `reg_byte` register class.
> - Some register classes are marked as "Only clobbers" which means that registers in these classes cannot be used for inputs or outputs, only clobbers of the form `out(<explicit register>) _` or `lateout(<explicit register>) _`.
> - The `spe_acc` register is only available on PowerPC SPE targets.

r[asm.register-operands.value-type-constraints]
Each register class has constraints on which value types they can be used with. This is necessary because the way a value is loaded into a register depends on its type. For example, on big-endian systems, loading a `i32x4` and a `i8x16` into a SIMD register may result in different register contents even if the byte-wise memory representation of both values is identical. The availability of supported types for a particular register class may depend on what target features are currently enabled.

| Architecture | Register class | Target feature | Allowed types |
| ------------ | -------------- | -------------- | ------------- |
| x86-32 | `reg` | None | `i16`, `i32`, `f32` |
| x86-64 | `reg` | None | `i16`, `i32`, `f32`, `i64`, `f64` |
| x86 | `reg_byte` | None | `i8` |
| x86 | `xmm_reg` | `sse` | `i32`, `f32`, `i64`, `f64`, `i128`,  `i8x16`, `i16x8`, `i32x4`, `i64x2`, `f32x4`, `f64x2` |
| x86 | `ymm_reg` | `avx` | `i32`, `f32`, `i64`, `f64`, `i128`,  `i8x16`, `i16x8`, `i32x4`, `i64x2`, `f32x4`, `f64x2`  `i8x32`, `i16x16`, `i32x8`, `i64x4`, `f32x8`, `f64x4` |
| x86 | `zmm_reg` | `avx512f` | `i32`, `f32`, `i64`, `f64`, `i128`,  `i8x16`, `i16x8`, `i32x4`, `i64x2`, `f32x4`, `f64x2`  `i8x32`, `i16x16`, `i32x8`, `i64x4`, `f32x8`, `f64x4`  `i8x64`, `i16x32`, `i32x16`, `i64x8`, `f32x16`, `f64x8` |
| x86 | `kreg` | `avx512f` | `i8`, `i16` |
| x86 | `kreg` | `avx512bw` | `i32`, `i64` |
| x86 | `mmx_reg` | N/A | Only clobbers |
| x86 | `x87_reg` | N/A | Only clobbers |
| x86 | `tmm_reg` | N/A | Only clobbers |
| AArch64 | `reg` | None | `i8`, `i16`, `i32`, `f32`, `i64`, `f64` |
| AArch64 | `vreg` | `neon` | `i8`, `i16`, `i32`, `f32`, `i64`, `f64`,  `i8x8`, `i16x4`, `i32x2`, `i64x1`, `f32x2`, `f64x1`,  `i8x16`, `i16x8`, `i32x4`, `i64x2`, `f32x4`, `f64x2` |
| AArch64 | `preg` | N/A | Only clobbers |
| Arm64EC | `reg` | None | `i8`, `i16`, `i32`, `f32`, `i64`, `f64` |
| Arm64EC | `vreg` | `neon` | `i8`, `i16`, `i32`, `f32`, `i64`, `f64`,  `i8x8`, `i16x4`, `i32x2`, `i64x1`, `f32x2`, `f64x1`,  `i8x16`, `i16x8`, `i32x4`, `i64x2`, `f32x4`, `f64x2` |
| ARM | `reg` | None | `i8`, `i16`, `i32`, `f32` |
| ARM | `sreg` | `vfp2` | `i32`, `f32` |
| ARM | `dreg` | `vfp2` | `i64`, `f64`, `i8x8`, `i16x4`, `i32x2`, `i64x1`, `f32x2` |
| ARM | `qreg` | `neon` | `i8x16`, `i16x8`, `i32x4`, `i64x2`, `f32x4` |
| RISC-V32 | `reg` | None | `i8`, `i16`, `i32`, `f32` |
| RISC-V64 | `reg` | None | `i8`, `i16`, `i32`, `f32`, `i64`, `f64` |
| RISC-V | `freg` | `f` | `f32` |
| RISC-V | `freg` | `d` | `f64` |
| RISC-V | `vreg` | N/A | Only clobbers |
| LoongArch32 | `reg` | None | `i8`, `i16`, `i32`, `f32` |
| LoongArch64 | `reg` | None | `i8`, `i16`, `i32`, `i64`, `f32`, `f64` |
| LoongArch | `freg` | `f` | `f32` |
| LoongArch | `freg` | `d` | `f64` |
| s390x | `reg`, `reg_addr` | None | `i8`, `i16`, `i32`, `i64` |
| s390x | `freg` | None | `f32`, `f64` |
| s390x | `vreg` | `vector` | `i32`, `f32`, `i64`, `f64`, `i128`,  `i8x16`, `i16x8`, `i32x4`, `i64x2`, `f32x4`, `f64x2` |
| s390x | `areg` | N/A | Only clobbers |
| PowerPC | `spe_acc` | None | Only clobbers |
| PowerPC/PowerPC64 | `reg` | None | `i8`, `i16`, `i32`, `i64` (PowerPC64 only) |
| PowerPC/PowerPC64 | `reg_nonzero` | None | `i8`, `i16`, `i32`, `i64` (PowerPC64 only) |
| PowerPC/PowerPC64 | `freg` | None | `f32`, `f64` |
| PowerPC/PowerPC64 | `vreg` | `altivec` | `i8x16`, `i16x8`, `i32x4`, `f32x4` |
| PowerPC/PowerPC64 | `vreg` | `vsx` | `f32`, `f64`, `i64x2`, `f64x2` |
| PowerPC/PowerPC64 | `vsreg` | `vsx` | The union of vsx and altivec vreg types |
| PowerPC/PowerPC64 | `cr` | None | Only clobbers |
| PowerPC/PowerPC64 | `ctr` | None | Only clobbers |
| PowerPC/PowerPC64 | `lr` | None | Only clobbers |
| PowerPC/PowerPC64 | `xer` | None | Only clobbers |

> **Note:**
> For the purposes of the above table pointers, function pointers and `isize`/`usize` are treated as the equivalent integer type (`i16`/`i32`/`i64` depending on the target).

```rust
# #[cfg(target_arch = "x86_64")] {
let x = 5i32;
let y = -1i8;
let z = unsafe { core::arch::x86_64::_mm_set_epi64x(1, 0) };

// reg is valid for `i32`, `reg_byte` is valid for `i8`, and xmm_reg is valid for `__m128i`
// We can't use `tmm0` as an input or output, but we can clobber it.
unsafe { core::arch::asm!("/* {} {} {} */", in(reg) x, in(reg_byte) y, in(xmm_reg) z, out("tmm0") _); }
# }
```

```rust
# #[cfg(target_arch = "x86_64")] {
let z = unsafe { core::arch::x86_64::_mm_set_epi64x(1, 0) };
// We can't pass an `__m128i` to a `reg` input
unsafe { core::arch::asm!("/* {} */", in(reg) z); }
// ERROR: type `__m128i` cannot be used with this register class
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.register-operands.smaller-value]
If a value is of a smaller size than the register it is allocated in then the upper bits of that register will have an undefined value for inputs and will be ignored for outputs. The only exception is the `freg` register class on RISC-V where `f32` values are NaN-boxed in a `f64` as required by the RISC-V architecture.

```rust
# #[cfg(target_arch = "x86_64")] {
let mut x: i64;
// Moving a 32-bit value into a 64-bit value, oops.
#[allow(asm_sub_register)] // rustc warns about this behavior
unsafe { core::arch::asm!("mov {}, {}", lateout(reg) x, in(reg) 4i32); }
// top 32-bits are indeterminate
assert_eq!(x, 4); // This assertion is not guaranteed to succeed
assert_eq!(x & 0xFFFFFFFF, 4); // However, this one will succeed
# }
```

r[asm.register-operands.separate-input-output]
When separate input and output expressions are specified for an `inout` operand, both expressions must have the same type. The only exception is if both operands are pointers or integers, in which case they are only required to have the same size. This restriction exists because the register allocators in LLVM and GCC sometimes cannot handle tied operands with different types.

```rust
# #[cfg(target_arch = "x86_64")] {
// Pointers and integers can mix (as long as they are the same size)
let x: isize = 0;
let y: *mut ();
// Transmute an `isize` to a `*mut ()`, using inline assembly magic
unsafe { core::arch::asm!("/*{}*/", inout(reg) x=>y); }
assert!(y.is_null()); // Extremely roundabout way to make a null pointer
# }
```

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i32 = 0;
let y: f32;
// But we can't reinterpret an `i32` to an `f32` like this
unsafe { core::arch::asm!("/* {} */", inout(reg) x=>y); }
// ERROR: incompatible types for asm inout argument
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.register-names]
