---
title: "ch19-03-pattern-syntax (part 4 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch19-03-pattern-syntax.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch19-03-pattern-syntax (part 4 of 4)

### Using `@` Bindings

The _at_ operator `@` lets us create a variable that holds a value at the same
time we’re testing that value for a pattern match. In Listing 19-29, we want to
test that a `Message::Hello` `id` field is within the range `3..=7`. We also
want to bind the value to the variable `id` so that we can use it in the code
associated with the arm.

**Listing 19-29: Using `@` to bind to a value in a pattern while also testing it**

```rust
enum Message {
    Hello { id: i32 },
}

let msg = Message::Hello { id: 5 };

match msg {
    Message::Hello { id: id @ 3..=7 } => {
        println!("Found an id in range: {id}")
    }
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    }
    Message::Hello { id } => println!("Found some other id: {id}"),
}
```

This example will print `Found an id in range: 5`. By specifying `id @` before
the range `3..=7`, we’re capturing whatever value matched the range in a
variable named `id` while also testing that the value matched the range pattern.

In the second arm, where we only have a range specified in the pattern, the code
associated with the arm doesn’t have a variable that contains the actual value
of the `id` field. The `id` field’s value could have been 10, 11, or 12, but
the code that goes with that pattern doesn’t know which it is. The pattern code
isn’t able to use the value from the `id` field because we haven’t saved the
`id` value in a variable.

In the last arm, where we’ve specified a variable without a range, we do have
the value available to use in the arm’s code in a variable named `id`. The
reason is that we’ve used the struct field shorthand syntax. But we haven’t
applied any test to the value in the `id` field in this arm, as we did with the
first two arms: Any value would match this pattern.

Using `@` lets us test a value and save it in a variable within one pattern.

## Summary

Rust’s patterns are very useful in distinguishing between different kinds of
data. When used in `match` expressions, Rust ensures that your patterns cover
every possible value, or your program won’t compile. Patterns in `let`
statements and function parameters make those constructs more useful, enabling
the destructuring of values into smaller parts and assigning those parts to
variables. We can create simple or complex patterns to suit our needs.

Next, for the penultimate chapter of the book, we’ll look at some advanced
aspects of a variety of Rust’s features.
