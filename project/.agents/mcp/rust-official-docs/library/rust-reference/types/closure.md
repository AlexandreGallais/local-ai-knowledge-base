---
title: "Closure types (part 1 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types/closure.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[type.closure]
# Closure types

r[type.closure.intro]
A [closure expression] produces a closure value with a unique, anonymous type that cannot be written out. A closure type is approximately equivalent to a struct which contains the captured values. For instance, the following closure:

```rust
#[derive(Debug)]
struct Point { x: i32, y: i32 }
struct Rectangle { left_top: Point, right_bottom: Point }

fn f<F : FnOnce() -> String> (g: F) {
    println!("{}", g());
}

let mut rect = Rectangle {
    left_top: Point { x: 1, y: 1 },
    right_bottom: Point { x: 0, y: 0 }
};

let c = || {
    rect.left_top.x += 1;
    rect.right_bottom.x += 1;
    format!("{:?}", rect.left_top)
};
f(c); // Prints "Point { x: 2, y: 1 }".
```

generates a closure type roughly like the following:

```rust
// Note: This is not exactly how it is translated, this is only for
// illustration.

struct Closure<'a> {
    left_top : &'a mut Point,
    right_bottom_x : &'a mut i32,
}

impl<'a> FnOnce<()> for Closure<'a> {
    type Output = String;
    extern "rust-call" fn call_once(self, args: ()) -> String {
        self.left_top.x += 1;
        *self.right_bottom_x += 1;
        format!("{:?}", self.left_top)
    }
}
```

so that the call to `f` works as if it were:

```rust
f(Closure{ left_top: &mut rect.left_top, right_bottom_x: &mut rect.right_bottom.x });
```

r[type.closure.capture]
## Capture modes

r[type.closure.capture.intro]
A *capture mode* determines how a [place expression] from the environment is borrowed or moved into the closure. The capture modes are:

1. Immutable borrow (`ImmBorrow`) --- The place expression is captured as a [shared reference].
2. Unique immutable borrow (`UniqueImmBorrow`) --- This is similar to an immutable borrow, but must be unique as described below.
3. Mutable borrow (`MutBorrow`) --- The place expression is captured as a [mutable reference].
4. Move (`ByValue`) --- The place expression is captured by [moving the value] into the closure.

r[type.closure.capture.precedence]
Place expressions from the environment are captured from the first mode that is compatible with how the captured value is used inside the closure body. The mode is not affected by the code surrounding the closure, such as the lifetimes of involved variables or fields, or of the closure itself.

r[type.closure.capture.copy]
### `Copy` values

Values that implement [`Copy`] that are moved into the closure are captured with the `ImmBorrow` mode.

```rust
let x = [0; 1024];
let c = || {
    let y = x; // x captured by ImmBorrow
};
```

r[type.closure.async.input]
### Async input capture

Async closures always capture all input arguments, regardless of whether or not they are used within the body.
