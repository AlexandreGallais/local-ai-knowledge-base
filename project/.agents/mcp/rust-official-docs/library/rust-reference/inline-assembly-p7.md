---
title: "Inline assembly (part 7 of 7)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/inline-assembly.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Inline assembly (part 7 of 7)

## Rules for naked inline assembly

r[asm.naked-rules.intro]
To avoid undefined behavior, these rules must be followed when using function-scope inline assembly in naked functions (`naked_asm!`):

r[asm.naked-rules.reg-not-input]
- Any registers not used for function inputs according to the calling convention and function signature will contain an undefined value on entry to the `naked_asm!` block.
  - An "undefined value" in the context of inline assembly means that the register can (non-deterministically) have any one of the possible values allowed by the architecture. Notably it is not the same as an LLVM `undef` which can have a different value every time you read it (since such a concept does not exist in assembly code).

r[asm.naked-rules.callee-saved-registers]
- All callee-saved registers must have the same value upon return as they had on entry.

r[asm.naked-rules.caller-saved-registers]
- Caller-saved registers may be used freely.

r[asm.naked-rules.noreturn]
- Behavior is undefined if execution falls through past the end of the assembly code.
  - Every path through the assembly code is expected to terminate with a return instruction or to diverge.

r[asm.naked-rules.mem-same-as-ffi]
- The set of memory locations that assembly code is allowed to read and write are the same as those allowed for an FFI function.

r[asm.naked-rules.black-box]
- The compiler cannot assume that the instructions in the `naked_asm!` block are the ones that will actually be executed.
  - This effectively means that the compiler must treat the `naked_asm!` as a black box and only take the interface specification into account, not the instructions themselves.
  - Runtime code patching is allowed, via target-specific mechanisms.

r[asm.naked-rules.unwind]
- Unwinding out of a `naked_asm!` block is allowed.
  - For correct behavior, the appropriate assembler directives that emit unwinding metadata must be used.

```rust
# #[cfg(target_arch = "x86_64")] {
#[unsafe(naked)]
extern "sysv64-unwind" fn unwinding_naked() {
    core::arch::naked_asm!(
        // "CFI" here stands for "call frame information".
        ".cfi_startproc",
        // The CFA (canonical frame address) is the value of `rsp`
        // before the `call`, i.e. before the return address, `rip`,
        // was pushed to `rsp`, so it's eight bytes higher in memory
        // than `rsp` upon function entry (after `rip` has been
        // pushed).
        //
        // This is the default, so we don't have to write it.
        //".cfi_def_cfa rsp, 8",
        //
        // The traditional thing to do is to preserve the base
        // pointer, so we'll do that.
        "push rbp",
        // Since we've now extended the stack downward by 8 bytes in
        // memory, we need to adjust the offset to the CFA from `rsp`
        // by another 8 bytes.
        ".cfi_adjust_cfa_offset 8",
        // We also then annotate where we've stored the caller's value
        // of `rbp`, relative to the CFA, so that when unwinding into
        // the caller we can find it, in case we need it to calculate
        // the caller's CFA relative to it.
        //
        // Here, we've stored the caller's `rbp` starting 16 bytes
        // below the CFA.  I.e., starting from the CFA, there's first
        // the `rip` (which starts 8 bytes below the CFA and continues
        // up to it), then there's the caller's `rbp` that we just
        // pushed.
        ".cfi_offset rbp, -16",
        // As is traditional, we set the base pointer to the value of
        // the stack pointer.  This way, the base pointer stays the
        // same throughout the function body.
        "mov rbp, rsp",
        // We can now track the offset to the CFA from the base
        // pointer.  This means we don't need to make any further
        // adjustments until the end, as we don't change `rbp`.
        ".cfi_def_cfa_register rbp",
        // We can now call a function that may panic.
        "call {f}",
        // Upon return, we restore `rbp` in preparation for returning
        // ourselves.
        "pop rbp",
        // Now that we've restored `rbp`, we must specify the offset
        // to the CFA again in terms of `rsp`.
        ".cfi_def_cfa rsp, 8",
        // Now we can return.
        "ret",
        ".cfi_endproc",
        f = sym may_panic,
    )
}

extern "sysv64-unwind" fn may_panic() {
    panic!("unwind");
}
# }
```

> **Note:**
>
> For more information on the `cfi` assembler directives above, see these resources:
>
> - Using `as` - CFI directives
> - DWARF Debugging Information Format Version 5
> - ImperialViolet - CFI directives in assembly files

r[asm.validity]
### Correctness and validity

r[asm.validity.necessary-but-not-sufficient]
In addition to all of the previous rules, the string argument to `asm!` must ultimately become---after all other arguments are evaluated, formatting is performed, and operands are translated---assembly that is both syntactically correct and semantically valid for the target architecture. The formatting rules allow the compiler to generate assembly with correct syntax. Rules concerning operands permit valid translation of Rust operands into and out of the assembly code. Adherence to these rules is necessary, but not sufficient, for the final expanded assembly to be both correct and valid. For instance:

- arguments may be placed in positions which are syntactically incorrect after formatting
- an instruction may be correctly written, but given architecturally invalid operands
- an architecturally unspecified instruction may be assembled into unspecified code
- a set of instructions, each correct and valid, may cause undefined behavior if placed in immediate succession

r[asm.validity.non-exhaustive]
As a result, these rules are _non-exhaustive_. The compiler is not required to check the correctness and validity of the initial string nor the final assembly that is generated. The assembler may check for correctness and validity but is not required to do so. When using `asm!`, a typographical error may be sufficient to make a program unsound, and the rules for assembly may include thousands of pages of architectural reference manuals. Programmers should exercise appropriate care, as invoking this `unsafe` capability comes with assuming the responsibility of not violating rules of both the compiler or the architecture.

r[asm.directives]
### Directives support

r[asm.directives.subset-supported]
Inline assembly supports a subset of the directives supported by both GNU AS and LLVM's internal assembler, given as follows. The result of using other directives is assembler-specific (and may cause an error, or may be accepted as-is).

r[asm.directives.stateful]
If inline assembly includes any "stateful" directive that modifies how subsequent assembly is processed, the assembly code must undo the effects of any such directives before the inline assembly ends.

r[asm.directives.supported-directives]
The following directives are guaranteed to be supported by the assembler:

- `.2byte`
- `.4byte`
- `.8byte`
- `.align`
- `.alt_entry`
- `.ascii`
- `.asciz`
- `.balign`
- `.balignl`
- `.balignw`
- `.bss`
- `.byte`
- `.comm`
- `.data`
- `.def`
- `.double`
- `.endef`
- `.equ`
- `.equiv`
- `.eqv`
- `.fill`
- `.float`
- `.global`
- `.globl`
- `.inst`
- `.insn`
- `.lcomm`
- `.long`
- `.octa`
- `.option`
- `.p2align`
- `.popsection`
- `.private_extern`
- `.pushsection`
- `.quad`
- `.scl`
- `.section`
- `.set`
- `.short`
- `.size`
- `.skip`
- `.sleb128`
- `.space`
- `.string`
- `.text`
- `.type`
- `.uleb128`
- `.word`

```rust
# #[cfg(target_arch = "x86_64")] {
let bytes: *const u8;
let len: usize;
unsafe {
    core::arch::asm!(
        "jmp 3f", "2: .ascii \"Hello World!\"",
        "3: lea {bytes}, [2b+rip]",
        "mov {len}, 12",
        bytes = out(reg) bytes,
        len = out(reg) len
    );
}

let s = unsafe { core::str::from_utf8_unchecked(core::slice::from_raw_parts(bytes, len)) };

assert_eq!(s, "Hello World!");
# }
```

r[asm.target-specific-directives]
#### Target specific directive support

r[asm.target-specific-directives.dwarf-unwinding]
##### Dwarf unwinding

The following directives are supported on ELF targets that support DWARF unwind info:

- `.cfi_adjust_cfa_offset`
- `.cfi_def_cfa`
- `.cfi_def_cfa_offset`
- `.cfi_def_cfa_register`
- `.cfi_endproc`
- `.cfi_escape`
- `.cfi_lsda`
- `.cfi_offset`
- `.cfi_personality`
- `.cfi_register`
- `.cfi_rel_offset`
- `.cfi_remember_state`
- `.cfi_restore`
- `.cfi_restore_state`
- `.cfi_return_column`
- `.cfi_same_value`
- `.cfi_sections`
- `.cfi_signal_frame`
- `.cfi_startproc`
- `.cfi_undefined`
- `.cfi_window_save`

r[asm.target-specific-directives.structured-exception-handling]
##### Structured exception handling

On targets with structured exception Handling, the following additional directives are guaranteed to be supported:

- `.seh_endproc`
- `.seh_endprologue`
- `.seh_proc`
- `.seh_pushreg`
- `.seh_savereg`
- `.seh_setframe`
- `.seh_stackalloc`

r[asm.target-specific-directives.x86]
##### x86 (32-bit and 64-bit)

On x86 targets, both 32-bit and 64-bit, the following additional directives are guaranteed to be supported:
- `.nops`
- `.code16`
- `.code32`
- `.code64`

Use of `.code16`, `.code32`, and `.code64` directives are only supported if the state is reset to the default before exiting the assembly code. 32-bit x86 uses `.code32` by default, and x86_64 uses `.code64` by default.

r[asm.target-specific-directives.arm-32-bit]
##### ARM (32-bit)

On ARM, the following additional directives are guaranteed to be supported:

- `.even`
- `.fnstart`
- `.fnend`
- `.save`
- `.movsp`
- `.code`
- `.thumb`
- `.thumb_func`
