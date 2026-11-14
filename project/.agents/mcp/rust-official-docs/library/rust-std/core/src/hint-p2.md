---
title: "core::hint (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/hint.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::hint (part 2 of 2)

## fn select_unpredictable

```rust
pub const fn select_unpredictable<T>(condition: bool, true_val: T, false_val: T) -> T where T: [const] Destruct,
```

Returns either `true_val` or `false_val` depending on the value of
`condition`, with a hint to the compiler that `condition` is unlikely to be
correctly predicted by a CPU’s branch predictor.

This method is functionally equivalent to
```
fn select_unpredictable<T>(b: bool, true_val: T, false_val: T) -> T {
    if b { true_val } else { false_val }
}
```rust
but might generate different assembly. In particular, on platforms with
a conditional move or select instruction (like `cmov` on x86 or `csel`
on ARM) the optimizer might use these instructions to avoid branches,
which can benefit performance if the branch predictor is struggling
with predicting `condition`, such as in an implementation of binary
search.

Note however that this lowering is not guaranteed (on any platform) and
should not be relied upon when trying to write cryptographic constant-time
code. Also be aware that this lowering might *decrease* performance if
`condition` is well-predictable. It is advisable to perform benchmarks to
tell if this function is useful.

Distribute values evenly between two buckets:
```
use std::hash::BuildHasher;
use std::hint;

fn append<H: BuildHasher>(hasher: &H, v: i32, bucket_one: &mut Vec<i32>, bucket_two: &mut Vec<i32>) {
    let hash = hasher.hash_one(&v);
    let bucket = hint::select_unpredictable(hash % 2 == 0, bucket_one, bucket_two);
    bucket.push(v);
}
# let hasher = std::collections::hash_map::RandomState::new();
# let mut bucket_one = Vec::new();
# let mut bucket_two = Vec::new();
# append(&hasher, 42, &mut bucket_one, &mut bucket_two);
# assert_eq!(bucket_one.len() + bucket_two.len(), 1);
```rust
