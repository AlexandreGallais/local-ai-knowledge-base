---
title: "ch12-03-improving-error-handling-and-modularity (part 4 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch12-03-improving-error-handling-and-modularity.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch12-03-improving-error-handling-and-modularity (part 4 of 4)

### Splitting Code into a Library Crate

Our `minigrep` project is looking good so far! Now we’ll split the
_src/main.rs_ file and put some code into the _src/lib.rs_ file. That way, we
can test the code and have a _src/main.rs_ file with fewer responsibilities.

Let’s define the code responsible for searching text in _src/lib.rs_ rather
than in _src/main.rs_, which will let us (or anyone else using our
`minigrep` library) call the searching function from more contexts than our
`minigrep` binary.

First, let’s define the `search` function signature in _src/lib.rs_ as shown in
Listing 12-13, with a body that calls the `unimplemented!` macro. We’ll explain
the signature in more detail when we fill in the implementation.

**Listing 12-13: Defining the `search` function in *src/lib.rs*** (src/lib.rs)

```rust
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    unimplemented!();
}
```

We’ve used the `pub` keyword on the function definition to designate `search`
as part of our library crate’s public API. We now have a library crate that we
can use from our binary crate and that we can test!

Now we need to bring the code defined in _src/lib.rs_ into the scope of the
binary crate in _src/main.rs_ and call it, as shown in Listing 12-14.

**Listing 12-14: Using the `minigrep` library crate’s `search` function in *src/main.rs*** (src/main.rs)

```rust
// --snip--
use minigrep::search;

fn main() {
    // --snip--
```

We add a `use minigrep::search` line to bring the `search` function from
the library crate into the binary crate’s scope. Then, in the `run` function,
rather than printing out the contents of the file, we call the `search`
function and pass the `config.query` value and `contents` as arguments. Then,
`run` will use a `for` loop to print each line returned from `search` that
matched the query. This is also a good time to remove the `println!` calls in
the `main` function that displayed the query and the file path so that our
program only prints the search results (if no errors occur).

Note that the search function will be collecting all the results into a vector
it returns before any printing happens. This implementation could be slow to
display results when searching large files, because results aren’t printed as
they’re found; we’ll discuss a possible way to fix this using iterators in
Chapter 13.

Whew! That was a lot of work, but we’ve set ourselves up for success in the
future. Now it’s much easier to handle errors, and we’ve made the code more
modular. Almost all of our work will be done in _src/lib.rs_ from here on out.

Let’s take advantage of this newfound modularity by doing something that would
have been difficult with the old code but is easy with the new code: We’ll
write some tests!
