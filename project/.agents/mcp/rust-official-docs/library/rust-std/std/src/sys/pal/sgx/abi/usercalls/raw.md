---
title: "std::sys::pal::sgx::abi::usercalls::raw"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/sgx/abi/usercalls/raw.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::sgx::abi::usercalls::raw

## RegisterArgument::from_register

```rust
fn from_register(_: Register) -> Self
```

Translate a Register to Self.

## RegisterArgument::into_register

```rust
fn into_register(self) -> Register
```

Translate self to a Register.

## ReturnValue::from_registers

```rust
fn from_registers(call: &'static str, regs: (Register, Register)) -> Self
```

Translate a pair of Registers to the raw usercall return value.
