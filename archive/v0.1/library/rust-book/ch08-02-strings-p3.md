---
title: "ch08-02-strings (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch08-02-strings.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch08-02-strings (part 3 of 3)

### Slicing Strings

Indexing into a string is often a bad idea because it’s not clear what the
return type of the string-indexing operation should be: a byte value, a
character, a grapheme cluster, or a string slice. If you really need to use
indices to create string slices, therefore, Rust asks you to be more specific.

Rather than indexing using `[]` with a single number, you can use `[]` with a
range to create a string slice containing particular bytes:

```rust
let hello = "Здравствуйте";

let s = &hello[0..4];
```

Here, `s` will be a `&str` that contains the first 4 bytes of the string.
Earlier, we mentioned that each of these characters was 2 bytes, which means
`s` will be `Зд`.

If we were to try to slice only part of a character’s bytes with something like
`&hello[0..1]`, Rust would panic at runtime in the same way as if an invalid
index were accessed in a vector:

```console
$ cargo run
   Compiling collections v0.1.0 (file:///projects/collections)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.43s
     Running `target/debug/collections`

thread 'main' (6017738) panicked at src/main.rs:4:19:
end byte index 1 is not a char boundary; it is inside 'З' (bytes 0..2 of string)
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

You should use caution when creating string slices with ranges, because doing
so can crash your program.

### Iterating Over Strings

The best way to operate on pieces of strings is to be explicit about whether
you want characters or bytes. For individual Unicode scalar values, use the
`chars` method. Calling `chars` on “Зд” separates out and returns two values of
type `char`, and you can iterate over the result to access each element:

```rust
for c in "Зд".chars() {
    println!("{c}");
}
```

This code will print the following:

```text
З
д
```

Alternatively, the `bytes` method returns each raw byte, which might be
appropriate for your domain:

```rust
for b in "Зд".bytes() {
    println!("{b}");
}
```

This code will print the 4 bytes that make up this string:

```text
208
151
208
180
```

But be sure to remember that valid Unicode scalar values may be made up of more
than 1 byte.

Getting grapheme clusters from strings, as with the Devanagari script, is
complex, so this functionality is not provided by the standard library. Crates
are available on crates.io if this is the
functionality you need.

### Handling the Complexities of Strings

To summarize, strings are complicated. Different programming languages make
different choices about how to present this complexity to the programmer. Rust
has chosen to make the correct handling of `String` data the default behavior
for all Rust programs, which means programmers have to put more thought into
handling UTF-8 data up front. This trade-off exposes more of the complexity of
strings than is apparent in other programming languages, but it prevents you
from having to handle errors involving non-ASCII characters later in your
development life cycle.

The good news is that the standard library offers a lot of functionality built
off the `String` and `&str` types to help handle these complex situations
correctly. Be sure to check out the documentation for useful methods like
`contains` for searching in a string and `replace` for substituting parts of a
string with another string.

Let’s switch to something a bit less complex: hash maps!
