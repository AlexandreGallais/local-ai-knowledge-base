---
title: "ch09-02-recoverable-errors-with-result (part 4 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch09-02-recoverable-errors-with-result.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch09-02-recoverable-errors-with-result (part 4 of 4)

The `Box<dyn Error>` type is a trait object, which we’ll talk about in “Using
Trait Objects to Abstract over Shared Behavior”
in Chapter 18. For now, you can read `Box<dyn Error>` to mean “any kind of
error.” Using `?` on a `Result` value in a `main` function with the error type
`Box<dyn Error>` is allowed because it allows any `Err` value to be returned
early. Even though the body of this `main` function will only ever return
errors of type `std::io::Error`, by specifying `Box<dyn Error>`, this signature
will continue to be correct even if more code that returns other errors is
added to the body of `main`.

When a `main` function returns a `Result<(), E>`, the executable will exit with
a value of `0` if `main` returns `Ok(())` and will exit with a nonzero value if
`main` returns an `Err` value. Executables written in C return integers when
they exit: Programs that exit successfully return the integer `0`, and programs
that error return some integer other than `0`. Rust also returns integers from
executables to be compatible with this convention.

The `main` function may return any types that implement the
`std::process::Termination` trait, which contains
a function `report` that returns an `ExitCode`. Consult the standard library
documentation for more information on implementing the `Termination` trait for
your own types.

Now that we’ve discussed the details of calling `panic!` or returning `Result`,
let’s return to the topic of how to decide which is appropriate to use in which
cases.
