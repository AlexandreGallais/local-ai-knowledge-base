# alloc::boxed::thin

Based on
<https://github.com/matthieu-m/rfc2580/blob/b58d1d3cba0d4b5e859d3617ea2d0943aaa31329/examples/thin.rs>
by matthieu-m

## ThinBox::new

```rust
pub fn new(value: T) -> Self
```

Moves a type to the heap with its [`Metadata`] stored in the heap allocation instead of on
the stack.

# Examples

```
#![feature(thin_box)]
use std::boxed::ThinBox;

let five = ThinBox::new(5);
```

[`Metadata`]: core::ptr::Pointee::Metadata

## ThinBox::try_new

```rust
pub fn try_new(value: T) -> Result<Self, core::alloc::AllocError>
```

Moves a type to the heap with its [`Metadata`] stored in the heap allocation instead of on
the stack. Returns an error if allocation fails, instead of aborting.

# Examples

```
#![feature(thin_box)]
use std::boxed::ThinBox;

let five = ThinBox::try_new(5)?;
# Ok::<(), std::alloc::AllocError>(())
```

[`Metadata`]: core::ptr::Pointee::Metadata

## ThinBox::new_unsize

```rust
pub fn new_unsize<T>(value: T) -> Self where T: Unsize<Dyn>,
```

Moves a type to the heap with its [`Metadata`] stored in the heap allocation instead of on
the stack.

# Examples

```
#![feature(thin_box)]
use std::boxed::ThinBox;

let thin_slice = ThinBox::<[i32]>::new_unsize([1, 2, 3, 4]);
```

[`Metadata`]: core::ptr::Pointee::Metadata