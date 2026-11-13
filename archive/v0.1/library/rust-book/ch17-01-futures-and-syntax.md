---
title: "extern crate trpl; // required for mdbook test (part 1 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch17-01-futures-and-syntax.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

## Futures and the Async Syntax

The key <example-value> of asynchronous programming in Rust are _futures_ and Rust’s
`async` and `await` keywords.

A _future_ is a value that may not be ready now but will become ready at some
point in the future. (This same concept shows up in many languages, sometimes
under other names such as _task_ or _promise_.) Rust provides a `Future` trait
as a building block so that different async operations can be implemented with
different data structures but with a common interface. In Rust, futures are
types that implement the `Future` trait. Each future holds its own information
about the progress that has been made and what “ready” means.

You can apply the `async` keyword to blocks and functions to specify that they
can be interrupted and resumed. Within an async block or async function, you
can use the `await` keyword to _await a future_ (that is, wait for it to become
ready). Any point where you await a future within an async block or function is
a potential spot for that block or function to pause and resume. The process of
checking with a future to see if its value is available yet is called _polling_.

Some other languages, such as C# and JavaScript, also use `async` and `await`
keywords for async programming. If you’re familiar with those languages, you
may notice some significant differences in how Rust handles the syntax. That’s
for good reason, as we’ll see!

When writing async Rust, we use the `async` and `await` keywords most of the
time. Rust compiles them into equivalent code using the `Future` trait, much as
it compiles `for` loops into equivalent code using the `Iterator` trait.
Because Rust provides the `Future` trait, though, you can also implement it for
your own data types when you need to. Many of the functions we’ll see
throughout this chapter return types with their own implementations of
`Future`. We’ll return to the definition of the trait at the end of the chapter
and dig into more of how it works, but this is enough detail to keep us moving
forward.

This may all feel a bit abstract, so let’s write our first async program: a
little web scraper. We’ll pass in two URLs from the command line, fetch both of
them concurrently, and return the result of whichever one finishes first. This
example will have a fair bit of new syntax, but don’t worry—we’ll explain
everything you need to know as we go.
