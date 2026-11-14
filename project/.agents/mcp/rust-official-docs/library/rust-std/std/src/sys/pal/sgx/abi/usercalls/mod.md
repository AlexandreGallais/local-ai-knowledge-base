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