---
title: "Inline assembly (part 5 of 7)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/inline-assembly.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Inline assembly (part 5 of 7)

## Options

r[asm.options.supported-options]
Flags are used to further influence the behavior of the inline assembly code. Currently the following options are defined:

r[asm.options.supported-options-pure]
- `pure`: The assembly code has no side effects, must eventually return, and its outputs depend only on its direct inputs (i.e. the values themselves, not what they point to) or values read from memory (unless the `nomem` options is also set). This allows the compiler to execute the assembly code fewer times than specified in the program (e.g. by hoisting it out of a loop) or even eliminate it entirely if the outputs are not used. The `pure` option must be combined with either the `nomem` or `readonly` options, otherwise a compile-time error is emitted.

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i32 = 0;
let z: i32;
// pure can be used to optimize by assuming the assembly has no side effects
unsafe { core::arch::asm!("inc {}", inout(reg) x => z, options(pure, nomem)); }
assert_eq!(z, 1);
# }
```

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i32 = 0;
let z: i32;
// Either nomem or readonly must be satisfied, to indicate whether or not
// memory is allowed to be read
unsafe { core::arch::asm!("inc {}", inout(reg) x => z, options(pure)); }
// ERROR: the `pure` option must be combined with either `nomem` or `readonly`
assert_eq!(z, 0);
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.options.supported-options-nomem]
- `nomem`: The assembly code does not read from or write to any memory accessible outside of the assembly code. This allows the compiler to cache the values of modified global variables in registers across execution of the assembly code since it knows that they are not read from or written to by it. The compiler also assumes that the assembly code does not perform any kind of synchronization with other threads, e.g. via fences.

```rust
# #[cfg(target_arch = "x86_64")] {
let mut x = 0i32;
let z: i32;
// Accessing outside memory from assembly when `nomem` is
// specified is disallowed
unsafe {
    core::arch::asm!("mov {val:e}, dword ptr [{ptr}]",
        ptr = in(reg) &mut x,
        val = lateout(reg) z,
        options(nomem)
    )
}

// Writing to outside memory from assembly when `nomem` is
// specified is also undefined behaviour
unsafe {
    core::arch::asm!("mov  dword ptr [{ptr}], {val:e}",
        ptr = in(reg) &mut x,
        val = in(reg) z,
        options(nomem)
    )
}
# }
```

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i32 = 0;
let z: i32;
// If we allocate our own memory, such as via `push`, however.
// we can still use it
unsafe {
    core::arch::asm!("push {x}", "add qword ptr [rsp], 1", "pop {x}",
        x = inout(reg) x => z,
        options(nomem)
    );
}
assert_eq!(z, 1);
# }
```

r[asm.options.supported-options-readonly]
- `readonly`: The assembly code does not write to any memory accessible outside of the assembly code. This allows the compiler to cache the values of unmodified global variables in registers across execution of the assembly code since it knows that they are not written to by it. The compiler also assumes that this assembly code does not perform any kind of synchronization with other threads, e.g. via fences.

```rust
# #[cfg(target_arch = "x86_64")] {
let mut x = 0;
// We cannot modify outside memory when `readonly` is specified
unsafe {
    core::arch::asm!("mov dword ptr[{}], 1", in(reg) &mut x, options(readonly))
}
# }
```

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i64 = 0;
let z: i64;
// We can still read from it, though
unsafe {
    core::arch::asm!("mov {x}, qword ptr [{x}]",
        x = inout(reg) &x => z,
        options(readonly)
    );
}
assert_eq!(z, 0);
# }
```

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i64 = 0;
let z: i64;
// Same exception applies as with nomem.
unsafe {
    core::arch::asm!("push {x}", "add qword ptr [rsp], 1", "pop {x}",
        x = inout(reg) x => z,
        options(readonly)
    );
}
assert_eq!(z, 1);
# }
```

r[asm.options.supported-options-preserves_flags]
- `preserves_flags`: The assembly code does not modify the flags register (defined in the rules below). This allows the compiler to avoid recomputing the condition flags after execution of the assembly code.

r[asm.options.supported-options-noreturn]
- `noreturn`: The assembly code does not fall through; behavior is undefined if it does. It may still jump to `label` blocks. If any `label` blocks return unit, the `asm!` block will return unit. Otherwise it will return `!` (never). As with a call to a function that does not return, local variables in scope are not dropped before execution of the assembly code.

```rust
fn main() -> ! {
# #[cfg(target_arch = "x86_64")] {
    // We can use an instruction to trap execution inside of a noreturn block
    unsafe { core::arch::asm!("ud2", options(noreturn)); }
# }
# #[cfg(not(target_arch = "x86_64"))] panic!("no return");
}
```

```rust
# #[cfg(target_arch = "x86_64")] {
// You are responsible for not falling past the end of a noreturn asm block
unsafe { core::arch::asm!("", options(noreturn)); }
# }
```

```rust
# #[cfg(target_arch = "x86_64")]
let _: () = unsafe {
    // You may still jump to a `label` block
    core::arch::asm!("jmp {}", label {
        println!();
    }, options(noreturn));
};
```

r[asm.options.supported-options-nostack]
- `nostack`: The assembly code does not push data to the stack, or write to the stack red-zone (if supported by the target). If this option is *not* used then the stack pointer is guaranteed by the compiler at the start of the assembly code to be suitably aligned (according to the target ABI) for a function call.

```rust
# #[cfg(target_arch = "x86_64")] {
// `push` and `pop` are UB when used with nostack
unsafe { core::arch::asm!("push rax", "pop rax", options(nostack)); }
# }
```

r[asm.options.supported-options-att_syntax]
- `att_syntax`: This option is only valid on x86, and causes the assembler to use the `.att_syntax prefix` mode of the GNU assembler. Register operands are substituted in with a leading `%`.

```rust
# #[cfg(target_arch = "x86_64")] {
let x: i32;
let y = 1i32;
// We need to use AT&T Syntax here. src, dest order for operands
unsafe {
    core::arch::asm!("mov {y:e}, {x:e}",
        x = lateout(reg) x,
        y = in(reg) y,
        options(att_syntax)
    );
}
assert_eq!(x, y);
# }
```

r[asm.options.supported-options-raw]
- `raw`: This causes the template string to be parsed as a raw assembly string, with no special handling for `{` and `}`. This is primarily useful when including raw assembly code from an external file using `include_str!`.

r[asm.options.checks]
The compiler performs some additional checks on options:

r[asm.options.checks-mutually-exclusive]
- The `nomem` and `readonly` options are mutually exclusive: it is a compile-time error to specify both.

```rust
# #[cfg(target_arch = "x86_64")] {
// nomem is strictly stronger than readonly, they can't be specified together
unsafe { core::arch::asm!("", options(nomem, readonly)); }
// ERROR: the `nomem` and `readonly` options are mutually exclusive
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.options.checks-pure]
- It is a compile-time error to specify `pure` on an asm block with no outputs or only discarded outputs (`_`).

```rust
# #[cfg(target_arch = "x86_64")] {
// pure blocks need at least one output
unsafe { core::arch::asm!("", options(pure)); }
// ERROR: asm with the `pure` option must have at least one output
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.options.checks-noreturn]
- It is a compile-time error to specify `noreturn` on an asm block with outputs and without labels.

```rust
# #[cfg(target_arch = "x86_64")] {
let z: i32;
// noreturn can't have outputs
unsafe { core::arch::asm!("mov {:e}, 1", out(reg) z, options(noreturn)); }
// ERROR: asm outputs are not allowed with the `noreturn` option
# }
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.options.checks-label-with-outputs]
- It is a compile-time error to have any `label` blocks in an asm block with outputs.

r[asm.options.naked_asm-restriction]
`naked_asm!` only supports the `att_syntax` and `raw` options. The remaining options are not meaningful because the inline assembly defines the whole function body.

r[asm.options.global_asm-restriction]
`global_asm!` only supports the `att_syntax` and `raw` options. The remaining options are not meaningful for global-scope inline assembly.

```rust
# fn main() {}
# #[cfg(target_arch = "x86_64")]
core::arch::global_asm!("", options(nomem));
// ERROR: The `nomem` option cannot be used with `global_asm!`.
# #[cfg(not(target_arch = "x86_64"))] core::compile_error!("Test not supported on this arch");
```

r[asm.rules]
