---
title: "std::sys::pal::sgx::abi::usercalls"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/sgx/abi/usercalls/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::sgx::abi::usercalls

## FromSgxResult::Return

```rust
type Return
```

Return type

## FromSgxResult::from_sgx_result

```rust
fn from_sgx_result(self) -> io::Result<Self::Return>
```

Translate the raw result of an SGX usercall.
