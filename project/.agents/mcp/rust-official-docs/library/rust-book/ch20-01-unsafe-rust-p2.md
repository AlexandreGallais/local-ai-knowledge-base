---
title: "ch20-01-unsafe-rust (part 2 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch20-01-unsafe-rust.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch20-01-unsafe-rust (part 2 of 4)

## Unsafe Rust

All the code we’ve discussed so far has had Rust’s memory safety guarantees
enforced at compile time. However, Rust has a second language hidden inside it
that doesn’t enforce these memory safety guarantees: It’s called _unsafe Rust_
and works just like regular Rust but gives us extra superpowers.

Unsafe Rust exists because, by nature, static analysis is conservative. When
the compiler tries to determine whether or not code upholds the guarantees,
it’s better for it to reject some valid programs than to accept some invalid
programs. Although the code _might_ be okay, if the Rust compiler doesn’t have
enough information to be confident, it will reject the code. In these cases,
you can use unsafe code to tell the compiler, “Trust me, I know what I’m
doing.” Be warned, however, that you use unsafe Rust at your own risk: If you
use unsafe code incorrectly, problems can occur due to memory unsafety, such as
null pointer dereferencing.

Another reason Rust has an unsafe alter ego is that the underlying computer
hardware is inherently unsafe. If Rust didn’t let you do unsafe operations, you
couldn’t do certain tasks. Rust needs to allow you to do low-level systems
programming, such as directly interacting with the operating system or even
writing your own operating system. Working with low-level systems programming
is one of the goals of the language. Let’s explore what we can do with unsafe
Rust and how to do it.

### Performing Unsafe Superpowers

To switch to unsafe Rust, use the `unsafe` keyword and then start a new block
that holds the unsafe code. You can take five actions in unsafe Rust that you
can’t in safe Rust, which we call _unsafe superpowers_. Those superpowers
include the ability to:

1. Dereference a raw pointer.
1. Call an unsafe function or method.
1. Access or modify a mutable static variable.
1. Implement an unsafe trait.
1. Access fields of `union`s.

It’s important to understand that `unsafe` doesn’t turn off the borrow checker
or disable any of Rust’s other safety checks: If you use a reference in unsafe
code, it will still be checked. The `unsafe` keyword only gives you access to
these five features that are then not checked by the compiler for memory
safety. You’ll still get some degree of safety inside an unsafe block.

In addition, `unsafe` does not mean the code inside the block is necessarily
dangerous or that it will definitely have memory safety problems: The intent is
that as the programmer, you’ll ensure that the code inside an `unsafe` block
will access memory in a valid way.

People are fallible and mistakes will happen, but by requiring these five
unsafe operations to be inside blocks annotated with `unsafe`, you’ll know that
any errors related to memory safety must be within an `unsafe` block. Keep
`unsafe` blocks small; you’ll be thankful later when you investigate memory
bugs.

To isolate unsafe code as much as possible, it’s best to enclose such code
within a safe abstraction and provide a safe API, which we’ll discuss later in
the chapter when we examine unsafe functions and methods. Parts of the standard
library are implemented as safe abstractions over unsafe code that has been
audited. Wrapping unsafe code in a safe abstraction prevents uses of `unsafe`
from leaking out into all the places that you or your users might want to use
the functionality implemented with `unsafe` code, because using a safe
abstraction is safe.

Let’s look at each of the five unsafe superpowers in turn. We’ll also look at
some abstractions that provide a safe interface to unsafe code.

### Dereferencing a Raw Pointer

In Chapter 4, in the “Dangling References” section, we mentioned that the compiler ensures that references are always
valid. Unsafe Rust has two new types called _raw pointers_ that are similar to
references. As with references, raw pointers can be immutable or mutable and
are written as `*const T` and `*mut T`, respectively. The asterisk isn’t the
dereference operator; it’s part of the type name. In the context of raw
pointers, _immutable_ means that the pointer can’t be directly assigned to
after being dereferenced.

Different from references and smart pointers, raw pointers:

- Are allowed to ignore the borrowing rules by having both immutable and
  mutable pointers or multiple mutable pointers to the same location
- Aren’t guaranteed to point to valid memory
- Are allowed to be null
- Don’t implement any automatic cleanup

By opting out of having Rust enforce these guarantees, you can give up
guaranteed safety in exchange for greater performance or the ability to
interface with another language or hardware where Rust’s guarantees don’t apply.

Listing 20-1 shows how to create an immutable and a mutable raw pointer.

**Listing 20-1: Creating raw pointers with the raw borrow operators**

```rust
let mut num = 5;

let r1 = &raw const num;
let r2 = &raw mut num;
```

Notice that we don’t include the `unsafe` keyword in this code. We can create
raw pointers in safe code; we just can’t dereference raw pointers outside an
unsafe block, as you’ll see in a bit.

We’ve created raw pointers by using the raw borrow operators: `&raw const num`
creates a `*const i32` immutable raw pointer, and `&raw mut num` creates a `*mut
i32` mutable raw pointer. Because we created them directly from a local
variable, we know these particular raw pointers are valid, but we can’t make
that assumption about just any raw pointer.

To demonstrate this, next we’ll create a raw pointer whose validity we can’t be
so certain of, using the keyword `as` to cast a value instead of using the raw
borrow operator. Listing 20-2 shows how to create a raw pointer to an arbitrary
location in memory. Trying to use arbitrary memory is undefined: There might be
data at that address or there might not, the compiler might optimize the code
so that there is no memory access, or the program might terminate with a
segmentation fault. Usually, there is no good reason to write code like this,
especially in cases where you can use a raw borrow operator instead, but it is
possible.

**Listing 20-2: Creating a raw pointer to an arbitrary memory address**

```rust
let address = 0x012345usize;
let r = address as *const i32;
```

Recall that we can create raw pointers in safe code, but we can’t dereference
raw pointers and read the data being pointed to. In Listing 20-3, we use the
dereference operator `*` on a raw pointer that requires an `unsafe` block.

**Listing 20-3: Dereferencing raw pointers within an `unsafe` block**

```rust
let mut num = 5;

let r1 = &raw const num;
let r2 = &raw mut num;

unsafe {
    println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}
```

Creating a pointer does no harm; it’s only when we try to access the value that
it points at that we might end up dealing with an invalid value.

Note also that in Listings 20-1 and 20-3, we created `*const i32` and `*mut
i32` raw pointers that both pointed to the same memory location, where `num` is
stored. If we instead tried to create an immutable and a mutable reference to
`num`, the code would not have compiled because Rust’s ownership rules don’t
allow a mutable reference at the same time as any immutable references. With
raw pointers, we can create a mutable pointer and an immutable pointer to the
same location and change data through the mutable pointer, potentially creating
a data race. Be careful!

With all of these dangers, why would you ever use raw pointers? One major use
case is when interfacing with C code, as you’ll see in the next section.
Another case is when building up safe abstractions that the borrow checker
doesn’t understand. We’ll introduce unsafe functions and then look at an
example of a safe abstraction that uses unsafe code.
