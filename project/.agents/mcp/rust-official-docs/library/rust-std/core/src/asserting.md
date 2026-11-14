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