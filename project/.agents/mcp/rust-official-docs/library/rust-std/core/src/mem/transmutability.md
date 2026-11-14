# core::mem::transmutability

## TransmuteFrom::transmute

```rust
unsafe fn transmute(src: Src) -> Self where Src: Sized, Self: Sized,
```

Transmutes a `Src` value into a `Self`.

# Safety

The safety obligations of the caller depend on the value of `ASSUME`:
- If [`ASSUME.alignment`](Assume::alignment), the caller must guarantee
  that the addresses of references in the returned `Self` satisfy the
  alignment requirements of their referent types.
- If [`ASSUME.lifetimes`](Assume::lifetimes), the caller must guarantee
  that references in the returned `Self` will not outlive their
  referents.
- If [`ASSUME.safety`](Assume::safety), the returned value might not
  satisfy the library safety invariants of `Self`, and the caller must
  guarantee that undefined behavior does not arise from uses of the
  returned value.
- If [`ASSUME.validity`](Assume::validity), the caller must guarantee
  that `src` is a bit-valid instance of `Self`.

When satisfying the above obligations (if any), the caller must *not*
assume that this trait provides any inherent guarantee of layout
[portability](#portability) or [stability](#stability).