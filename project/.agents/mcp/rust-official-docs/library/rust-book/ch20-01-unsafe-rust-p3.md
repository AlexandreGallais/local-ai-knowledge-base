---
title: "ch20-01-unsafe-rust (part 3 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch20-01-unsafe-rust.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch20-01-unsafe-rust (part 3 of 4)

### Calling an Unsafe Function or Method

The second type of operation you can perform in an unsafe block is calling
unsafe functions. Unsafe functions and methods look exactly like regular
functions and methods, but they have an extra `unsafe` before the rest of the
definition. The `unsafe` keyword in this context indicates the function has
requirements we need to uphold when we call this function, because Rust can’t
guarantee we’ve met these requirements. By calling an unsafe function within an
`unsafe` block, we’re saying that we’ve read this function’s documentation and
we take responsibility for upholding the function’s contracts.

Here is an unsafe function named `dangerous` that doesn’t do anything in its
body:

```rust
unsafe fn dangerous() {}

unsafe {
    dangerous();
}
```

We must call the `dangerous` function within a separate `unsafe` block. If we
try to call `dangerous` without the `unsafe` block, we’ll get an error:

```console
$ cargo run
   Compiling unsafe-example v0.1.0 (file:///projects/unsafe-example)
error[E0133]: call to unsafe function `dangerous` is unsafe and requires unsafe block
 --> src/main.rs:4:5
  |
4 |     dangerous();
  |     ^^^^^^^^^^^ call to unsafe function
  |
  = note: consult the function's documentation for information on how to avoid undefined behavior

For more information about this error, try `rustc --explain E0133`.
error: could not compile `unsafe-example` (bin "unsafe-example") due to 1 previous error
```

With the `unsafe` block, we’re asserting to Rust that we’ve read the function’s
documentation, we understand how to use it properly, and we’ve verified that
we’re fulfilling the contract of the function.

To perform unsafe operations in the body of an `unsafe` function, you still
need to use an `unsafe` block, just as within a regular function, and the
compiler will warn you if you forget. This helps us keep `unsafe` blocks as
small as possible, as unsafe operations may not be needed across the whole
function body.

#### Creating a Safe Abstraction over Unsafe Code

Just because a function contains unsafe code doesn’t mean we need to mark the
entire function as unsafe. In fact, wrapping unsafe code in a safe function is
a common abstraction. As an example, let’s study the `split_at_mut` function
from the standard library, which requires some unsafe code. We’ll explore how
we might implement it. This safe method is defined on mutable slices: It takes
one slice and makes it two by splitting the slice at the index given as an
argument. Listing 20-4 shows how to use `split_at_mut`.

**Listing 20-4: Using the safe `split_at_mut` function**

```rust
let mut v = vec![1, 2, 3, 4, 5, 6];

let r = &mut v[..];

let (a, b) = r.split_at_mut(3);

assert_eq!(a, &mut [1, 2, 3]);
assert_eq!(b, &mut [4, 5, 6]);
```

We can’t implement this function using only safe Rust. An attempt might look
something like Listing 20-5, which won’t compile. For simplicity, we’ll
implement `split_at_mut` as a function rather than a method and only for slices
of `i32` values rather than for a generic type `T`.

**Listing 20-5: An attempted implementation of `split_at_mut` using only safe Rust**

```rust
fn split_at_mut(values: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = values.len();

    assert!(mid <= len);

    (&mut values[..mid], &mut values[mid..])
}
```

This function first gets the total length of the slice. Then, it asserts that
the index given as a parameter is within the slice by checking whether it’s
less than or equal to the length. The assertion means that if we pass an index
that is greater than the length to split the slice at, the function will panic
before it attempts to use that index.

Then, we return two mutable slices in a tuple: one from the start of the
original slice to the `mid` index and another from `mid` to the end of the
slice.

When we try to compile the code in Listing 20-5, we’ll get an error:

```console
$ cargo run
   Compiling unsafe-example v0.1.0 (file:///projects/unsafe-example)
error[E0499]: cannot borrow `*values` as mutable more than once at a time
 --> src/main.rs:6:31
  |
1 | fn split_at_mut(values: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
  |                         - let's call the lifetime of this reference `'1`
...
6 |     (&mut values[..mid], &mut values[mid..])
  |     --------------------------^^^^^^--------
  |     |     |                   |
  |     |     |                   second mutable borrow occurs here
  |     |     first mutable borrow occurs here
  |     returning this value requires that `*values` is borrowed for `'1`
  |
  = help: use `.split_at_mut(position)` to obtain two mutable non-overlapping sub-slices

For more information about this error, try `rustc --explain E0499`.
error: could not compile `unsafe-example` (bin "unsafe-example") due to 1 previous error
```

Rust’s borrow checker can’t understand that we’re borrowing different parts of
the slice; it only knows that we’re borrowing from the same slice twice.
Borrowing different parts of a slice is fundamentally okay because the two
slices aren’t overlapping, but Rust isn’t smart enough to know this. When we
know code is okay, but Rust doesn’t, it’s time to reach for unsafe code.

Listing 20-6 shows how to use an `unsafe` block, a raw pointer, and some calls
to unsafe functions to make the implementation of `split_at_mut` work.

**Listing 20-6: Using unsafe code in the implementation of the `split_at_mut` function**

```rust
use std::slice;

fn split_at_mut(values: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = values.len();
    let ptr = values.as_mut_ptr();

    assert!(mid <= len);

    unsafe {
        (
            slice::from_raw_parts_mut(ptr, mid),
            slice::from_raw_parts_mut(ptr.add(mid), len - mid),
        )
    }
}
```

Recall from “The Slice Type” section in
Chapter 4 that a slice is a pointer to some data and the length of the slice.
We use the `len` method to get the length of a slice and the `as_mut_ptr`
method to access the raw pointer of a slice. In this case, because we have a
mutable slice to `i32` values, `as_mut_ptr` returns a raw pointer with the type
`*mut i32`, which we’ve stored in the variable `ptr`.

We keep the assertion that the `mid` index is within the slice. Then, we get to
the unsafe code: The `slice::from_raw_parts_mut` function takes a raw pointer
and a length, and it creates a slice. We use this function to create a slice
that starts from `ptr` and is `mid` items long. Then, we call the `add` method
on `ptr` with `mid` as an argument to get a raw pointer that starts at `mid`,
and we create a slice using that pointer and the remaining number of items
after `mid` as the length.

The function `slice::from_raw_parts_mut` is unsafe because it takes a raw
pointer and must trust that this pointer is valid. The `add` method on raw
pointers is also unsafe because it must trust that the offset location is also
a valid pointer. Therefore, we had to put an `unsafe` block around our calls to
`slice::from_raw_parts_mut` and `add` so that we could call them. By looking at
the code and by adding the assertion that `mid` must be less than or equal to
`len`, we can tell that all the raw pointers used within the `unsafe` block
will be valid pointers to data within the slice. This is an acceptable and
appropriate use of `unsafe`.

Note that we don’t need to mark the resultant `split_at_mut` function as
`unsafe`, and we can call this function from safe Rust. We’ve created a safe
abstraction to the unsafe code with an implementation of the function that uses
`unsafe` code in a safe way, because it creates only valid pointers from the
data this function has access to.

In contrast, the use of `slice::from_raw_parts_mut` in Listing 20-7 would
likely crash when the slice is used. This code takes an arbitrary memory
location and creates a slice 10,000 items long.

**Listing 20-7: Creating a slice from an arbitrary memory location**

```rust
use std::slice;

let address = 0x01234usize;
let r = address as *mut i32;

let values: &[i32] = unsafe { slice::from_raw_parts_mut(r, 10000) };
```

We don’t own the memory at this arbitrary location, and there is no guarantee
that the slice this code creates contains valid `i32` values. Attempting to use
`values` as though it’s a valid slice results in undefined behavior.

#### Using `extern` Functions to Call External Code

Sometimes your Rust code might need to interact with code written in another
language. For this, Rust has the keyword `extern` that facilitates the creation
and use of a _Foreign Function Interface (FFI)_, which is a way for a
programming language to define functions and enable a different (foreign)
programming language to call those functions.

Listing 20-8 demonstrates how to set up an integration with the `abs` function
from the C standard library. Functions declared within `extern` blocks are
generally unsafe to call from Rust code, so `extern` blocks must also be marked
`unsafe`. The reason is that other languages don’t enforce Rust’s rules and
guarantees, and Rust can’t check them, so responsibility falls on the
programmer to ensure safety.

**Listing 20-8: Declaring and calling an `extern` function defined in another language** (src/main.rs)

```rust
unsafe extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

Within the `unsafe extern "C"` block, we list the names and signatures of
external functions from another language we want to call. The `"C"` part
defines which _application binary interface (ABI)_ the external function uses:
The ABI defines how to call the function at the assembly level. The `"C"` ABI
is the most common and follows the C programming language’s ABI. Information
about all the ABIs Rust supports is available in the Rust Reference.

Every item declared within an `unsafe extern` block is implicitly unsafe.
However, some FFI functions *are* safe to call. For example, the `abs` function
from C’s standard library does not have any memory safety considerations, and we
know it can be called with any `i32`. In cases like this, we can use the `safe`
keyword to say that this specific function is safe to call even though it is in
an `unsafe extern` block. Once we make that change, calling it no longer
requires an `unsafe` block, as shown in Listing 20-9.

**Listing 20-9: Explicitly marking a function as `safe` within an `unsafe extern` block and calling it safely** (src/main.rs)

```rust
unsafe extern "C" {
    safe fn abs(input: i32) -> i32;
}

fn main() {
    println!("Absolute value of -3 according to C: {}", abs(-3));
}
```

Marking a function as `safe` does not inherently make it safe! Instead, it is
like a promise you are making to Rust that it is safe. It is still your
responsibility to make sure that promise is kept!

#### Calling Rust Functions from Other Languages

We can also use `extern` to create an interface that allows other languages to
call Rust functions. Instead of creating a whole `extern` block, we add the
`extern` keyword and specify the ABI to use just before the `fn` keyword for
the relevant function. We also need to add an `#[unsafe(no_mangle)]` annotation
to tell the Rust compiler not to mangle the name of this function. _Mangling_
is when a compiler changes the name we’ve given a function to a different name
that contains more information for other parts of the compilation process to
consume but is less human readable. Every programming language compiler mangles
names slightly differently, so for a Rust function to be nameable by other
languages, we must disable the Rust compiler’s name mangling. This is unsafe
because there might be name collisions across libraries without the built-in
mangling, so it is our responsibility to make sure the name we choose is safe
to export without mangling.

In the following example, we make the `call_from_c` function accessible from C
code, after it’s compiled to a shared library and linked from C:

```
#[unsafe(no_mangle)]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```

This usage of `extern` requires `unsafe` only in the attribute, not on the
`extern` block.
