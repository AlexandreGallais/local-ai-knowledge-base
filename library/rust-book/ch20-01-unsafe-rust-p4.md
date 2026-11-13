---
title: "ch20-01-unsafe-rust (part 4 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch20-01-unsafe-rust.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch20-01-unsafe-rust (part 4 of 4)

### Accessing or Modifying a Mutable Static Variable

In this book, we’ve not yet talked about global variables, which Rust does
support but which can be problematic with Rust’s ownership rules. If two
threads are accessing the same mutable global variable, it can cause a data
race.

In Rust, global variables are called _static_ variables. Listing 20-10 shows an
example declaration and use of a static variable with a string slice as a
value.

**Listing 20-10: Defining and using an immutable static variable** (src/main.rs)

```rust
static HELLO_WORLD: &str = "Hello, world!";

fn main() {
    println!("value is: {HELLO_WORLD}");
}
```

Static variables are similar to constants, which we discussed in the
“Declaring Constants” section in Chapter 3. The
names of static variables are in `SCREAMING_SNAKE_CASE` by convention. Static
variables can only store references with the `'static` lifetime, which means
the Rust compiler can figure out the lifetime and we aren’t required to
annotate it explicitly. Accessing an immutable static variable is safe.

A subtle difference between constants and immutable static variables is that
values in a static variable have a fixed address in memory. Using the value
will always access the same data. Constants, on the other hand, are allowed to
duplicate their data whenever they’re used. Another difference is that static
variables can be mutable. Accessing and modifying mutable static variables is
_unsafe_. Listing 20-11 shows how to declare, access, and modify a mutable
static variable named `COUNTER`.

**Listing 20-11: Reading from or writing to a mutable static variable is unsafe.** (src/main.rs)

```rust
static mut COUNTER: u32 = 0;

/// SAFETY: Calling this from more than a single thread at a time is undefined
/// behavior, so you *must* guarantee you only call it from a single thread at
/// a time.
unsafe fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    unsafe {
        // SAFETY: This is only called from a single thread in `main`.
        add_to_count(3);
        println!("COUNTER: {}", *(&raw const COUNTER));
    }
}
```

As with regular variables, we specify mutability using the `mut` keyword. Any
code that reads or writes from `COUNTER` must be within an `unsafe` block. The
code in Listing 20-11 compiles and prints `COUNTER: 3` as we would expect
because it’s single threaded. Having multiple threads access `COUNTER` would
likely result in data races, so it is undefined behavior. Therefore, we need to
mark the entire function as `unsafe` and document the safety limitation so that
anyone calling the function knows what they are and are not allowed to do
safely.

Whenever we write an unsafe function, it is idiomatic to write a comment
starting with `SAFETY` and explaining what the caller needs to do to call the
function safely. Likewise, whenever we perform an unsafe operation, it is
idiomatic to write a comment starting with `SAFETY` to explain how the safety
rules are upheld.

Additionally, the compiler will deny by default any attempt to create
references to a mutable static variable through a compiler lint. You must
either explicitly opt out of that lint’s protections by adding an
`#[allow(static_mut_refs)]` annotation or access the mutable static variable
via a raw pointer created with one of the raw borrow operators. That includes
cases where the reference is created invisibly, as when it is used in the
`println!` in this code listing. Requiring references to static mutable
variables to be created via raw pointers helps make the safety requirements for
using them more obvious.

With mutable data that is globally accessible, it’s difficult to ensure that
there are no data races, which is why Rust considers mutable static variables
to be unsafe. Where possible, it’s preferable to use the concurrency techniques
and thread-safe smart pointers we discussed in Chapter 16 so that the compiler
checks that data access from different threads is done safely.

### Implementing an Unsafe Trait

We can use `unsafe` to implement an unsafe trait. A trait is unsafe when at
least one of its methods has some invariant that the compiler can’t verify. We
declare that a trait is `unsafe` by adding the `unsafe` keyword before `trait`
and marking the implementation of the trait as `unsafe` too, as shown in
Listing 20-12.

**Listing 20-12: Defining and implementing an unsafe trait**

```rust
unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}
```

By using `unsafe impl`, we’re promising that we’ll uphold the invariants that
the compiler can’t verify.

As an example, recall the `Send` and `Sync` marker traits we discussed in the
“Extensible Concurrency with `Send` and `Sync`”
section in Chapter 16: The compiler implements these traits automatically if
our types are composed entirely of other types that implement `Send` and
`Sync`. If we implement a type that contains a type that does not implement
`Send` or `Sync`, such as raw pointers, and we want to mark that type as `Send`
or `Sync`, we must use `unsafe`. Rust can’t verify that our type upholds the
guarantees that it can be safely sent across threads or accessed from multiple
threads; therefore, we need to do those checks manually and indicate as such
with `unsafe`.

### Accessing Fields of a Union

The final action that works only with `unsafe` is accessing fields of a union.
A *union* is similar to a `struct`, but only one declared field is used in a
particular instance at one time. Unions are primarily used to interface with
unions in C code. Accessing union fields is unsafe because Rust can’t guarantee
the type of the data currently being stored in the union instance. You can
learn more about unions in the Rust Reference.

### Using Miri to Check Unsafe Code

When writing unsafe code, you might want to check that what you have written
actually is safe and correct. One of the best ways to do that is to use Miri,
an official Rust tool for detecting undefined behavior. Whereas the borrow
checker is a _static_ tool that works at compile time, Miri is a _dynamic_
tool that works at runtime. It checks your code by running your program, or
its test suite, and detecting when you violate the rules it understands about
how Rust should work.

Using Miri requires a nightly build of Rust (which we talk about more in
Appendix G: How Rust is Made and “Nightly Rust”). You
can install both a nightly version of Rust and the Miri tool by typing `rustup
+nightly component add miri`. This does not change what version of Rust your
project uses; it only adds the tool to your system so you can use it when you
want to. You can run Miri on a project by typing `cargo +nightly miri run` or
`cargo +nightly miri test`.

For an example of how helpful this can be, consider what happens when we run it
against Listing 20-7.

```console
$ cargo +nightly miri run
   Compiling unsafe-example v0.1.0 (file:///projects/unsafe-example)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.17s
     Running `file:///home/.rustup/toolchains/nightly/bin/cargo-miri runner target/miri/debug/unsafe-example`
warning: integer-to-pointer cast
 --> src/main.rs:5:13
  |
5 |     let r = address as *mut i32;
  |             ^^^^^^^^^^^^^^^^^^^ integer-to-pointer cast
  |
  = help: this program is using integer-to-pointer casts or (equivalently) `ptr::with_exposed_provenance`, which means that Miri might miss pointer bugs in this program
  = help: see https://doc.rust-lang.org/nightly/std/ptr/fn.with_exposed_provenance.html for more details on that operation
  = help: to ensure that Miri does not miss bugs in your program, use Strict Provenance APIs (https://doc.rust-lang.org/nightly/std/ptr/index.html#strict-provenance, https://crates.io/crates/sptr) instead
  = help: you can then set `MIRIFLAGS=-Zmiri-strict-provenance` to ensure you are not relying on `with_exposed_provenance` semantics
  = help: alternatively, `MIRIFLAGS=-Zmiri-permissive-provenance` disables this warning

error: Undefined Behavior: constructing invalid value of type &mut [i32]: encountered a dangling reference (0x1234[noalloc] has no provenance)
 --> src/main.rs:7:35
  |
7 |     let values: &[i32] = unsafe { slice::from_raw_parts_mut(r, 10000) };
  |                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Undefined Behavior occurred here
  |
  = help: this indicates a bug in the program: it performed an invalid operation, and caused Undefined Behavior
  = help: see https://doc.rust-lang.org/nightly/reference/behavior-considered-undefined.html for further information

note: some details are omitted, run with `MIRIFLAGS=-Zmiri-backtrace=full` for a verbose backtrace

error: aborting due to 1 previous error; 1 warning emitted
```

Miri correctly warns us that we’re casting an integer to a pointer, which might
be a problem, but Miri can’t determine whether a problem exists because it
doesn’t know how the pointer originated. Then, Miri returns an error where
Listing 20-7 has undefined behavior because we have a dangling pointer. Thanks
to Miri, we now know there is a risk of undefined behavior, and we can think
about how to make the code safe. In some cases, Miri can even make
recommendations about how to fix errors.

Miri doesn’t catch everything you might get wrong when writing unsafe code.
Miri is a dynamic analysis tool, so it only catches problems with code that
actually gets run. That means you will need to use it in conjunction with good
testing techniques to increase your confidence about the unsafe code you have
written. Miri also does not cover every possible way your code can be unsound.

Put another way: If Miri _does_ catch a problem, you know there’s a bug, but
just because Miri _doesn’t_ catch a bug doesn’t mean there isn’t a problem. It
can catch a lot, though. Try running it on the other examples of unsafe code in
this chapter and see what it says!

You can learn more about Miri at its GitHub repository.

### Using Unsafe Code Correctly

Using `unsafe` to use one of the five superpowers just discussed isn’t wrong or
even frowned upon, but it is trickier to get `unsafe` code correct because the
compiler can’t help uphold memory safety. When you have a reason to use
`unsafe` code, you can do so, and having the explicit `unsafe` annotation makes
it easier to track down the source of problems when they occur. Whenever you
write unsafe code, you can use Miri to help you be more confident that the code
you have written upholds Rust’s rules.

For a much deeper exploration of how to work effectively with unsafe Rust, read
Rust’s official guide for `unsafe`, The Rustonomicon.
