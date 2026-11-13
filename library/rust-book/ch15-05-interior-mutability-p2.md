---
title: "ch15-05-interior-mutability (part 2 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch15-05-interior-mutability.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch15-05-interior-mutability (part 2 of 4)

## `RefCell<T>` and the Interior Mutability Pattern

_Interior mutability_ is a design pattern in Rust that allows you to mutate
data even when there are immutable references to that data; normally, this
action is disallowed by the borrowing rules. To mutate data, the pattern uses
`unsafe` code inside a data structure to bend Rust’s usual rules that govern
mutation and borrowing. Unsafe code indicates to the compiler that we’re
checking the rules manually instead of relying on the compiler to check them
for us; we will discuss unsafe code more in Chapter 20.

We can use types that use the interior mutability pattern only when we can
ensure that the borrowing rules will be followed at runtime, even though the
compiler can’t guarantee that. The `unsafe` code involved is then wrapped in a
safe API, and the outer type is still immutable.

Let’s explore this concept by looking at the `RefCell<T>` type that follows the
interior mutability pattern.

### Enforcing Borrowing Rules at Runtime

Unlike `Rc<T>`, the `RefCell<T>` type represents single ownership over the data
it holds. So, what makes `RefCell<T>` different from a type like `Box<T>`?
Recall the borrowing rules you learned in Chapter 4:

- At any given time, you can have _either_ one mutable reference or any number
  of immutable references (but not both).
- References must always be valid.

With references and `Box<T>`, the borrowing rules’ invariants are enforced at
compile time. With `RefCell<T>`, these invariants are enforced _at runtime_.
With references, if you break these rules, you’ll get a compiler error. With
`RefCell<T>`, if you break these rules, your program will panic and exit.

The advantages of checking the borrowing rules at compile time are that errors
will be caught sooner in the development process, and there is no impact on
runtime performance because all the analysis is completed beforehand. For those
reasons, checking the borrowing rules at compile time is the best choice in the
majority of cases, which is why this is Rust’s default.

The advantage of checking the borrowing rules at runtime instead is that
certain memory-safe scenarios are then allowed, where they would’ve been
disallowed by the compile-time checks. Static analysis, like the Rust compiler,
is inherently conservative. Some properties of code are impossible to detect by
analyzing the code: The most famous example is the Halting Problem, which is
beyond the scope of this book but is an interesting topic to research.

Because some analysis is impossible, if the Rust compiler can’t be sure the
code complies with the ownership rules, it might reject a correct program; in
this way, it’s conservative. If Rust accepted an incorrect program, users
wouldn’t be able to trust the guarantees Rust makes. However, if Rust rejects a
correct program, the programmer will be inconvenienced, but nothing
catastrophic can occur. The `RefCell<T>` type is useful when you’re sure your
code follows the borrowing rules but the compiler is unable to understand and
guarantee that.

Similar to `Rc<T>`, `RefCell<T>` is only for use in single-threaded scenarios
and will give you a compile-time error if you try using it in a multithreaded
context. We’ll talk about how to get the functionality of `RefCell<T>` in a
multithreaded program in Chapter 16.

Here is a recap of the reasons to choose `Box<T>`, `Rc<T>`, or `RefCell<T>`:

- `Rc<T>` enables multiple owners of the same data; `Box<T>` and `RefCell<T>`
  have single owners.
- `Box<T>` allows immutable or mutable borrows checked at compile time; `Rc<T>`
  allows only immutable borrows checked at compile time; `RefCell<T>` allows
  immutable or mutable borrows checked at runtime.
- Because `RefCell<T>` allows mutable borrows checked at runtime, you can
  mutate the value inside the `RefCell<T>` even when the `RefCell<T>` is
  immutable.

Mutating the value inside an immutable value is the interior mutability
pattern. Let’s look at a situation in which interior mutability is useful and
examine how it’s possible.
