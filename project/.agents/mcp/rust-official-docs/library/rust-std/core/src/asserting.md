---
title: "core::asserting"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/asserting.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::asserting

## TryCaptureGeneric::try_capture

```rust
fn try_capture(&self, to: &mut Capture<E, M>)
```

Similar to [TryCapturePrintable] but generic to any `E`.

## TryCapturePrintable::try_capture

```rust
fn try_capture(&self, to: &mut Capture<E, M>)
```

Similar as [TryCaptureGeneric] but specialized to any `E: Printable`.
