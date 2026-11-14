---
title: "Inline assembly (part 4 of 7)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/inline-assembly.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Inline assembly (part 4 of 7)

## Register names

r[asm.register-names.supported-register-aliases]
Some registers have multiple names. These are all treated by the compiler as identical to the base register name. Here is the list of all supported register aliases:

| Architecture | Base register | Aliases |
| ------------ | ------------- | ------- |
| x86 | `ax` | `eax`, `rax` |
| x86 | `bx` | `ebx`, `rbx` |
| x86 | `cx` | `ecx`, `rcx` |
| x86 | `dx` | `edx`, `rdx` |
| x86 | `si` | `esi`, `rsi` |
| x86 | `di` | `edi`, `rdi` |
| x86 | `bp` | `bpl`, `ebp`, `rbp` |
| x86 | `sp` | `spl`, `esp`, `rsp` |
| x86 | `ip` | `eip`, `rip` |
| x86 | `st(0)` | `st` |
| x86 | `r[8-15]` | `r[8-15]b`, `r[8-15]w`, `r[8-15]d` |
| x86 | `xmm[0-31]` | `ymm[0-31]`, `zmm[0-31]` |
| AArch64 | `x[0-30]` | `w[0-30]` |
| AArch64 | `x29` | `fp` |
| AArch64 | `x30` | `lr` |
| AArch64 | `sp` | `wsp` |
| AArch64 | `xzr` | `wzr` |
| AArch64 | `v[0-31]` | `b[0-31]`, `h[0-31]`, `s[0-31]`, `d[0-31]`, `q[0-31]` |
| Arm64EC | `x[0-30]` | `w[0-30]` |
| Arm64EC | `x29` | `fp` |
| Arm64EC | `x30` | `lr` |
| Arm64EC | `sp` | `wsp` |
| Arm64EC | `xzr` | `wzr` |
| Arm64EC | `v[0-15]` | `b[0-15]`, `h[0-15]`, `s[0-15]`, `d[0-15]`, `q[0-15]` |
| ARM | `r[0-3]` | `a[1-4]` |
| ARM | `r[4-9]` | `v[1-6]` |
| ARM | `r9` | `rfp` |
| ARM | `r10` | `sl` |
| ARM | `r11` | `fp` |
| ARM | `r12` | `ip` |
| ARM | `r13` | `sp` |
| ARM | `r14` | `lr` |
| ARM | `r15` | `pc` |
| RISC-V | `x0` | `zero` |
| RISC-V | `x1` | `ra` |
| RISC-V | `x2` | `sp` |
| RISC-V | `x3` | `gp` |
| RISC-V | `x4` | `tp` |
| RISC-V | `x[5-7]` | `t[0-2]` |
| RISC-V | `x8` | `fp`, `s0` |
| RISC-V | `x9` | `s1` |
| RISC-V | `x[10-17]` | `a[0-7]` |
| RISC-V | `x[18-27]` | `s[2-11]` |
| RISC-V | `x[28-31]` | `t[3-6]` |
| RISC-V | `f[0-7]` | `ft[0-7]` |
| RISC-V | `f[8-9]` | `fs[0-1]` |
| RISC-V | `f[10-17]` | `fa[0-7]` |
| RISC-V | `f[18-27]` | `fs[2-11]` |
| RISC-V | `f[28-31]` | `ft[8-11]` |
| LoongArch | `$r0` | `$zero` |
| LoongArch | `$r1` | `$ra` |
| LoongArch | `$r2` | `$tp` |
| LoongArch | `$r3` | `$sp` |
| LoongArch | `$r[4-11]` | `$a[0-7]` |
| LoongArch | `$r[12-20]` | `$t[0-8]` |
| LoongArch | `$r21` | |
| LoongArch | `$r22` | `$fp`, `$s9` |
| LoongArch | `$r[23-31]` | `$s[0-8]` |
| LoongArch | `$f[0-7]` | `$fa[0-7]` |
| LoongArch | `$f[8-23]` | `$ft[0-15]` |
| LoongArch | `$f[24-31]` | `$fs[0-7]` |
| PowerPC/PowerPC64 | `r1` | `sp` |
| PowerPC/PowerPC64 | `r31` | `fp` |
| PowerPC/PowerPC64 | `r[0-31]` | `[0-31]` |
| PowerPC/PowerPC64 | `f[0-31]` | `fr[0-31]`|

```rust
# #[cfg(target_arch = "x86_64")] {
let z = 0i64;
// rax is an alias for eax and ax
unsafe { core::arch::asm!("", in("rax") z); }
# }
```

r[asm.register-names.not-for-io]
Some registers cannot be used for input or output operands:

| Architecture | Unsupported register | Reason |
| ------------ | -------------------- | ------ |
| All | `sp`, `r15` (s390x), `r1` (PowerPC and PowerPC64) | The stack pointer must be restored to its original value at the end of the assembly code or before jumping to a `label` block. |
| All | `bp` (x86), `x29` (AArch64 and Arm64EC), `x8` (RISC-V), `$fp` (LoongArch), `r11` (s390x), `fp` (PowerPC and PowerPC64) | The frame pointer cannot be used as an input or output. |
| ARM | `r7` or `r11` | On ARM the frame pointer can be either `r7` or `r11` depending on the target. The frame pointer cannot be used as an input or output. |
| All | `si` (x86-32), `bx` (x86-64), `r6` (ARM), `x19` (AArch64 and Arm64EC), `x9` (RISC-V), `$s8` (LoongArch), `r29` and `r30` (PowerPC), `r30` (PowerPC64) | This is used internally by LLVM as a "base pointer" for functions with complex stack frames. |
| x86 | `ip` | This is the program counter, not a real register. |
| AArch64 | `xzr` | This is a constant zero register which can't be modified. |
| AArch64 | `x18` | This is an OS-reserved register on some AArch64 targets. |
| Arm64EC | `xzr` | This is a constant zero register which can't be modified. |
| Arm64EC | `x18` | This is an OS-reserved register. |
| Arm64EC | `x13`, `x14`, `x23`, `x24`, `x28`, `v[16-31]`, `p[0-15]`, `ffr` | These are AArch64 registers that are not supported for Arm64EC. |
| ARM | `pc` | This is the program counter, not a real register. |
| ARM | `r9` | This is an OS-reserved register on some ARM targets. |
| RISC-V | `x0` | This is a constant zero register which can't be modified. |
| RISC-V | `gp`, `tp` | These registers are reserved and cannot be used as inputs or outputs. |
| LoongArch | `$r0` or `$zero` | This is a constant zero register which can't be modified. |
| LoongArch | `$r2` or `$tp` | This is reserved for TLS. |
| LoongArch | `$r21` | This is reserved by the ABI. |
| s390x | `c[0-15]` | Reserved by the kernel. |
| s390x | `a[0-1]` | Reserved for system use. |
| PowerPC/PowerPC64 | `r2`, `r13` | These are system reserved registers. |
| PowerPC/PowerPC64 | `vrsave` | The vrsave register cannot be used as an input or output. |

```rust
# #[cfg(target_arch = "x86_64")] {
// bp is reserved
unsafe { core::arch::asm!("", in("bp") 5i32); }
// ERROR: invalid register `bp`: the frame pointer cannot be used as an operand for inline asm
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.register-names.fp-bp-reserved]
The frame pointer and base pointer registers are reserved for internal use by LLVM. While `asm!` statements cannot explicitly specify the use of reserved registers, in some cases LLVM will allocate one of these reserved registers for `reg` operands. Assembly code making use of reserved registers should be careful since `reg` operands may use the same registers.

r[asm.template-modifiers]
## Template modifiers

r[asm.template-modifiers.intro]
The placeholders can be augmented by modifiers which are specified after the `:` in the curly braces. These modifiers do not affect register allocation, but change the way operands are formatted when inserted into the template string.

r[asm.template-modifiers.only-one]
Only one modifier is allowed per template placeholder.

```rust
# #[cfg(target_arch = "x86_64")] {
// We can't specify both `r` and `e` at the same time.
unsafe { core::arch::asm!("/* {:er}", in(reg) 5i32); }
// ERROR: asm template modifier must be a single character
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.template-modifiers.supported-modifiers]
The supported modifiers are a subset of LLVM's (and GCC's) asm template argument modifiers, but do not use the same letter codes.

| Architecture | Register class | Modifier | Example output | LLVM modifier |
| ------------ | -------------- | -------- | -------------- | ------------- |
| x86-32 | `reg` | None | `eax` | `k` |
| x86-64 | `reg` | None | `rax` | `q` |
| x86-32 | `reg_abcd` | `l` | `al` | `b` |
| x86-64 | `reg` | `l` | `al` | `b` |
| x86 | `reg_abcd` | `h` | `ah` | `h` |
| x86 | `reg` | `x` | `ax` | `w` |
| x86 | `reg` | `e` | `eax` | `k` |
| x86-64 | `reg` | `r` | `rax` | `q` |
| x86 | `reg_byte` | None | `al` / `ah` | None |
| x86 | `xmm_reg` | None | `xmm0` | `x` |
| x86 | `ymm_reg` | None | `ymm0` | `t` |
| x86 | `zmm_reg` | None | `zmm0` | `g` |
| x86 | `*mm_reg` | `x` | `xmm0` | `x` |
| x86 | `*mm_reg` | `y` | `ymm0` | `t` |
| x86 | `*mm_reg` | `z` | `zmm0` | `g` |
| x86 | `kreg` | None | `k1` | None |
| AArch64/Arm64EC | `reg` | None | `x0` | `x` |
| AArch64/Arm64EC | `reg` | `w` | `w0` | `w` |
| AArch64/Arm64EC | `reg` | `x` | `x0` | `x` |
| AArch64/Arm64EC | `vreg` | None | `v0` | None |
| AArch64/Arm64EC | `vreg` | `v` | `v0` | None |
| AArch64/Arm64EC | `vreg` | `b` | `b0` | `b` |
| AArch64/Arm64EC | `vreg` | `h` | `h0` | `h` |
| AArch64/Arm64EC | `vreg` | `s` | `s0` | `s` |
| AArch64/Arm64EC | `vreg` | `d` | `d0` | `d` |
| AArch64/Arm64EC | `vreg` | `q` | `q0` | `q` |
| ARM | `reg` | None | `r0` | None |
| ARM | `sreg` | None | `s0` | None |
| ARM | `dreg` | None | `d0` | `P` |
| ARM | `qreg` | None | `q0` | `q` |
| ARM | `qreg` | `e` / `f` | `d0` / `d1` | `e` / `f` |
| RISC-V | `reg` | None | `x1` | None |
| RISC-V | `freg` | None | `f0` | None |
| LoongArch | `reg` | None | `$r1` | None |
| LoongArch | `freg` | None | `$f0` | None |
| s390x | `reg` | None | `%r0` | None |
| s390x | `reg_addr` | None | `%r1` | None |
| s390x | `freg` | None | `%f0` | None |
| s390x | `vreg` | None | `%v0` | None |
| PowerPC/PowerPC64 | `reg` | None | `0` | None |
| PowerPC/PowerPC64 | `reg_nonzero` | None | `3` | None |
| PowerPC/PowerPC64 | `freg` | None | `0` | None |
| PowerPC/PowerPC64 | `vreg` | None | `0` | None |
| PowerPC/PowerPC64 | `vsreg` | None | `0` | None |

> **Note:**
> - on ARM `e` / `f`: this prints the low or high doubleword register name of a NEON quad (128-bit) register.
> - on x86: our behavior for `reg` with no modifiers differs from what GCC does. GCC will infer the modifier based on the operand value type, while we default to the full register size.
> - on x86 `xmm_reg`: the `x`, `t` and `g` LLVM modifiers are not yet implemented in LLVM (they are supported by GCC only), but this should be a simple change.

```rust
# #[cfg(target_arch = "x86_64")] {
let mut x = 0x10u16;

// u16::swap_bytes using `xchg`
// low half of `{x}` is referred to by `{x:l}`, and the high half by `{x:h}`
unsafe { core::arch::asm!("xchg {x:l}, {x:h}", x = inout(reg_abcd) x); }
assert_eq!(x, 0x1000u16);
# }
```

r[asm.template-modifiers.smaller-value]
As stated in the previous section, passing an input value smaller than the register width will result in the upper bits of the register containing undefined values. This is not a problem if the inline asm only accesses the lower bits of the register, which can be done by using a template modifier to use a subregister name in the assembly code (e.g. `ax` instead of `rax`). Since this an easy pitfall, the compiler will suggest a template modifier to use where appropriate given the input type. If all references to an operand already have modifiers then the warning is suppressed for that operand.

r[asm.abi-clobbers]
## ABI clobbers

r[asm.abi-clobbers.intro]
The `clobber_abi` keyword can be used to apply a default set of clobbers to the assembly code. This will automatically insert the necessary clobber constraints as needed for calling a function with a particular calling convention: if the calling convention does not fully preserve the value of a register across a call then `lateout("...") _` is implicitly added to the operands list (where the `...` is replaced by the register's name).

```rust
# #[cfg(target_arch = "x86_64")] {
extern "C" fn foo() -> i32 { 0 }

let z: i32;
// To call a function, we have to inform the compiler that we're clobbering
// callee saved registers
unsafe { core::arch::asm!("call {}", sym foo, out("rax") z, clobber_abi("C")); }
assert_eq!(z, 0);
# }
```

r[asm.abi-clobbers.many]
`clobber_abi` may be specified any number of times. It will insert a clobber for all unique registers in the union of all specified calling conventions.

```rust
# #[cfg(target_arch = "x86_64")] {
extern "sysv64" fn foo() -> i32 { 0 }
extern "win64" fn bar(x: i32) -> i32 { x + 1 }

let z: i32;
// We can even call multiple functions with different conventions and
// different saved registers
unsafe {
    core::arch::asm!(
        "call {}",
        "mov ecx, eax",
        "call {}",
        sym foo,
        sym bar,
        out("rax") z,
        clobber_abi("sysv64"),
        clobber_abi("win64"),
    );
}
assert_eq!(z, 1);
# }
```

r[asm.abi-clobbers.must-specify]
Generic register class outputs are disallowed by the compiler when `clobber_abi` is used: all outputs must specify an explicit register.

```rust
# #[cfg(target_arch = "x86_64")] {
extern "C" fn foo(x: i32) -> i32 { 0 }

let z: i32;
// explicit registers must be used to not accidentally overlap.
unsafe {
    core::arch::asm!(
        "mov eax, {:e}",
        "call {}",
        out(reg) z,
        sym foo,
        clobber_abi("C")
    );
    // ERROR: asm with `clobber_abi` must specify explicit registers for outputs
}
assert_eq!(z, 0);
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.abi-clobbers.explicit-have-precedence]
Explicit register outputs have precedence over the implicit clobbers inserted by `clobber_abi`: a clobber will only be inserted for a register if that register is not used as an output.

r[asm.abi-clobbers.supported-abis]
The following ABIs can be used with `clobber_abi`:

| Architecture | ABI name | Clobbered registers |
| ------------ | -------- | ------------------- |
| x86-32 | `"C"`, `"system"`, `"efiapi"`, `"cdecl"`, `"stdcall"`, `"fastcall"` | `ax`, `cx`, `dx`, `xmm[0-7]`, `mm[0-7]`, `k[0-7]`, `st([0-7])` |
| x86-64 | `"C"`, `"system"` (on Windows), `"efiapi"`, `"win64"` | `ax`, `cx`, `dx`, `r[8-11]`, `xmm[0-31]`, `mm[0-7]`, `k[0-7]`, `st([0-7])`, `tmm[0-7]` |
| x86-64 | `"C"`, `"system"` (on non-Windows), `"sysv64"` | `ax`, `cx`, `dx`, `si`, `di`, `r[8-11]`, `xmm[0-31]`, `mm[0-7]`, `k[0-7]`, `st([0-7])`, `tmm[0-7]` |
| AArch64 | `"C"`, `"system"`, `"efiapi"` | `x[0-17]`, `x18`\*, `x30`, `v[0-31]`, `p[0-15]`, `ffr` |
| Arm64EC | `"C"`, `"system"` | `x[0-12]`, `x[15-17]`, `x30`, `v[0-15]` |
| ARM | `"C"`, `"system"`, `"efiapi"`, `"aapcs"` | `r[0-3]`, `r12`, `r14`, `s[0-15]`, `d[0-7]`, `d[16-31]` |
| RISC-V | `"C"`, `"system"`, `"efiapi"` | `x1`, `x[5-7]`, `x[10-17]`\*, `x[28-31]`\*, `f[0-7]`, `f[10-17]`, `f[28-31]`, `v[0-31]` |
| LoongArch | `"C"`, `"system"` | `$r1`, `$r[4-20]`, `$f[0-23]` |
| s390x | `"C"`, `"system"` | `r[0-5]`, `r14`, `f[0-7]`, `v[0-31]`, `a[2-15]` |

> **Note:**
> - On AArch64 `x18` only included in the clobber list if it is not considered as a reserved register on the target.
> - On RISC-V `x[16-17]` and `x[28-31]` only included in the clobber list if they are not considered as reserved registers on the target.

The list of clobbered registers for each ABI is updated in rustc as architectures gain new registers: this ensures that `asm!` clobbers will continue to be correct when LLVM starts using these new registers in its generated code.

r[asm.options]
