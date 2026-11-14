---
title: "Inline assembly (part 6 of 7)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/inline-assembly.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Inline assembly (part 6 of 7)

## Rules for inline assembly

r[asm.rules.intro]
To avoid undefined behavior, these rules must be followed when using function-scope inline assembly (`asm!`):

r[asm.rules.reg-not-input]
- Any registers not specified as inputs will contain an undefined value on entry to the assembly code.
  - An "undefined value" in the context of inline assembly means that the register can (non-deterministically) have any one of the possible values allowed by the architecture. Notably it is not the same as an LLVM `undef` which can have a different value every time you read it (since such a concept does not exist in assembly code).

r[asm.rules.reg-not-output]
- Any registers not specified as outputs must have the same value upon exiting the assembly code as they had on entry, otherwise behavior is undefined.
  - This only applies to registers which can be specified as an input or output. Other registers follow target-specific rules.
  - Note that a `lateout` may be allocated to the same register as an `in`, in which case this rule does not apply. Code should not rely on this however since it depends on the results of register allocation.

r[asm.rules.unwind]
- Behavior is undefined if execution unwinds out of the assembly code.
  - This also applies if the assembly code calls a function which then unwinds.

r[asm.rules.mem-same-as-ffi]
- The set of memory locations that assembly code is allowed to read and write are the same as those allowed for an FFI function.
  - If the `readonly` option is set, then only memory reads are allowed.
  - If the `nomem` option is set then no reads or writes to memory are allowed.
  - These rules do not apply to memory which is private to the assembly code, such as stack space allocated within it.

r[asm.rules.black-box]
- The compiler cannot assume that the instructions in the assembly code are the ones that will actually end up executed.
  - This effectively means that the compiler must treat the assembly code as a black box and only take the interface specification into account, not the instructions themselves.
  - Runtime code patching is allowed, via target-specific mechanisms.
  - However there is no guarantee that each block of assembly code in the source directly corresponds to a single instance of instructions in the object file; the compiler is free to duplicate or deduplicate the assembly code in `asm!` blocks.

r[asm.rules.stack-below-sp]
- Unless the `nostack` option is set, assembly code is allowed to use stack space below the stack pointer.
  - On entry to the assembly code the stack pointer is guaranteed to be suitably aligned (according to the target ABI) for a function call.
  - You are responsible for making sure you don't overflow the stack (e.g. use stack probing to ensure you hit a guard page).
  - You should adjust the stack pointer when allocating stack memory as required by the target ABI.
  - The stack pointer must be restored to its original value before leaving the assembly code.

r[asm.rules.stack-above-sp]
- Unless the `nostack` option is set, assembly code is allowed to modify the caller's stack frame when the target ABI requires storing certain values in the caller's frame (e.g., when saving the `lr` on PowerPC64).

r[asm.rules.noreturn]
- If the `noreturn` option is set then behavior is undefined if execution falls through the end of the assembly code.

r[asm.rules.pure]
- If the `pure` option is set then behavior is undefined if the `asm!` has side-effects other than its direct outputs. Behavior is also undefined if two executions of the `asm!` code with the same inputs result in different outputs.
  - When used with the `nomem` option, "inputs" are just the direct inputs of the `asm!`.
  - When used with the `readonly` option, "inputs" comprise the direct inputs of the assembly code and any memory that it is allowed to read.

r[asm.rules.preserved-registers]
- These flags registers must be restored upon exiting the assembly code if the `preserves_flags` option is set:
  - x86
    - Status flags in `EFLAGS` (CF, PF, AF, ZF, SF, OF).
    - Floating-point status word (all).
    - Floating-point exception flags in `MXCSR` (PE, UE, OE, ZE, DE, IE).
  - ARM
    - Condition flags in `CPSR` (N, Z, C, V)
    - Saturation flag in `CPSR` (Q)
    - Greater than or equal flags in `CPSR` (GE).
    - Condition flags in `FPSCR` (N, Z, C, V)
    - Saturation flag in `FPSCR` (QC)
    - Floating-point exception flags in `FPSCR` (IDC, IXC, UFC, OFC, DZC, IOC).
  - AArch64 and Arm64EC
    - Condition flags (`NZCV` register).
    - Floating-point status (`FPSR` register).
  - RISC-V
    - Floating-point exception flags in `fcsr` (`fflags`).
    - Vector extension state (`vtype`, `vl`, `vxsat`, and `vxrm`).
  - LoongArch
    - Floating-point condition flags in `$fcc[0-7]`.
  - PowerPC/PowerPC64
    - Floating-point status and sticky bits in the `fpscr` (any field other than DRN, VE, OE, UE, ZE, XE, NI, or RN).
    - Vector status and sticky bits in the `vscr` (any field other than NJ).
  - PowerPC SPE
    - The sticky and status bits of the `spefscr` (any field other than FINXE, FINVE, FDBZE, FUNFE, FOVFE, or FRMC).
  - s390x
    - The condition code register `cc`.

r[asm.rules.x86-df]
- On x86, the direction flag (DF in `EFLAGS`) is clear on entry to the assembly code and must be clear on exit.
  - Behavior is undefined if the direction flag is set on exiting the assembly code.

r[asm.rules.x86-x87]
- On x86, the x87 floating-point register stack must remain unchanged unless all of the `st([0-7])` registers have been marked as clobbered with `out("st(0)") _, out("st(1)") _, ...`.
  - If all x87 registers are clobbered then the x87 register stack is guaranteed to be empty upon entering the assembly code. Assembly code must ensure that the x87 register stack is also empty when exiting the assembly code.

```rust
# #[cfg(target_arch = "x86_64")]
pub fn fadd(x: f64, y: f64) -> f64 {
  let mut out = 0f64;
  let mut top = 0u16;
  // we can do complex stuff with x87 if we clobber the entire x87 stack
  unsafe { core::arch::asm!(
    "fld qword ptr [{x}]",
    "fld qword ptr [{y}])",
    "faddp",
    "fstp qword ptr [{out}]",
    "xor eax, eax",
    "fstsw ax",
    "shl eax, 11",
    x = in(reg) &x,
    y = in(reg) &y,
    out = in(reg) &mut out,
    out("st(0)") _, out("st(1)") _, out("st(2)") _, out("st(3)") _,
    out("st(4)") _, out("st(5)") _, out("st(6)") _, out("st(7)") _,
    out("eax") top
  );}

  assert_eq!(top & 0x7, 0);
  out
}

pub fn main() {
# #[cfg(target_arch = "x86_64")]{
  assert_eq!(fadd(1.0, 1.0), 2.0);
# }
}
```

r[asm.rules.arm64ec]
- On arm64ec, call checkers with appropriate thunks are mandatory when calling functions.

r[asm.rules.only-on-exit]
- The requirement of restoring the stack pointer and non-output registers to their original value only applies when exiting the assembly code.
  - This means that assembly code that does not fall through and does not jump to any `label` blocks, even if not marked `noreturn`, doesn't need to preserve these registers.
  - When returning to the assembly code of a different `asm!` block than you entered (e.g. for context switching), these registers must contain the value they had upon entering the `asm!` block that you are *exiting*.
    - You cannot exit the assembly code of an `asm!` block that has not been entered. Neither can you exit the assembly code of an `asm!` block whose assembly code has already been exited (without first entering it again).
    - You are responsible for switching any target-specific state (e.g. thread-local storage, stack bounds).
    - You cannot jump from an address in one `asm!` block to an address in another, even within the same function or block, without treating their contexts as potentially different and requiring context switching. You cannot assume that any particular value in those contexts (e.g. current stack pointer or temporary values below the stack pointer) will remain unchanged between the two `asm!` blocks.
    - The set of memory locations that you may access is the intersection of those allowed by the `asm!` blocks you entered and exited.

r[asm.rules.not-successive]
- You cannot assume that two `asm!` blocks adjacent in source code, even without any other code between them, will end up in successive addresses in the binary without any other instructions between them.

r[asm.rules.not-exactly-once]
- You cannot assume that an `asm!` block will appear exactly once in the output binary. The compiler is allowed to instantiate multiple copies of the `asm!` block, for example when the function containing it is inlined in multiple places.

r[asm.rules.x86-prefix-restriction]
- On x86, inline assembly must not end with an instruction prefix (such as `LOCK`) that would apply to instructions generated by the compiler.
  - The compiler is currently unable to detect this due to the way inline assembly is compiled, but may catch and reject this in the future.

r[asm.rules.preserves_flags]
> **Note:**
> As a general rule, the flags covered by `preserves_flags` are those which are *not* preserved when performing a function call.

r[asm.naked-rules]
