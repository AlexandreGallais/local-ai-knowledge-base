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