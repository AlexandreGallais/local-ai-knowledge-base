---
title: "alloc::boxed::thin"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/boxed/thin.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::boxed::thin

Based on
<https://github.com/matthieu-m/rfc2580/blob/b58d1d3cba0d4b5e859d3617ea2d0943aaa31329/examples/thin.rs>
by matthieu-m

## ThinBox::new

```rust
pub fn new(value: T) -> Self
```

Moves a type to the heap with its `Metadata` stored in the heap allocation instead of on
the stack.

# Examples

```rust
#![feature(thin_box)]
use std::boxed::ThinBox;

let five = ThinBox::new(5);
```

## ThinBox::try_new

```rust
pub fn try_new(value: T) -> Result<Self, core::alloc::AllocError>
```

Moves a type to the heap with its `Metadata` stored in the heap allocation instead of on
the stack. Returns an error if allocation fails, instead of aborting.

# Examples

```rust
#![feature(thin_box)]
use std::boxed::ThinBox;

let five = ThinBox::try_new(5)?;
```

## ThinBox::new_unsize

```rust
pub fn new_unsize<T>(value: T) -> Self where T: Unsize<Dyn>,
```

Moves a type to the heap with its `Metadata` stored in the heap allocation instead of on
the stack.

# Examples

```rust
#![feature(thin_box)]
use std::boxed::ThinBox;

let thin_slice = ThinBox::<[i32]>::new_unsize([1, 2, 3, 4]);
```
