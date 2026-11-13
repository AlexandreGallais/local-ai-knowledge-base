---
title: "ch11-01-writing-tests (part 3 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch11-01-writing-tests.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch11-01-writing-tests (part 3 of 4)

### Testing Equality with `assert_eq!` and `assert_ne!`

A common way to verify functionality is to test for equality between the result
of the code under test and the value you expect the code to return. You could
do this by using the `assert!` macro and passing it an expression using the
`==` operator. However, this is such a common test that the standard library
provides a pair of macros—`assert_eq!` and `assert_ne!`—to perform this test
more conveniently. These macros compare two arguments for equality or
inequality, respectively. They’ll also print the two values if the assertion
fails, which makes it easier to see _why_ the test failed; conversely, the
`assert!` macro only indicates that it got a `false` value for the `==`
expression, without printing the values that led to the `false` value.

In Listing 11-7, we write a function named `add_two` that adds `2` to its
parameter, and then we test this function using the `assert_eq!` macro.

**Listing 11-7: Testing the function `add_two` using the `assert_eq!` macro** (src/lib.rs)

```rust
pub fn add_two(a: u64) -> u64 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_adds_two() {
        let result = add_two(2);
        assert_eq!(result, 4);
    }
}
```

Let’s check that it passes!

```console
$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.58s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::it_adds_two ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

We create a variable named `result` that holds the result of calling
`add_two(2)`. Then, we pass `result` and `4` as the arguments to the
`assert_eq!` macro. The output line for this test is `test tests::it_adds_two
... ok`, and the `ok` text indicates that our test passed!

Let’s introduce a bug into our code to see what `assert_eq!` looks like when it
fails. Change the implementation of the `add_two` function to instead add `3`:

```rust
pub fn add_two(a: u64) -> u64 {
    a + 3
}
```

Run the tests again:

```console
$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.61s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::it_adds_two ... FAILED

failures:

---- tests::it_adds_two stdout ----

thread 'tests::it_adds_two' (6020955) panicked at src/lib.rs:12:9:
assertion `left == right` failed
  left: 5
 right: 4
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

failures:
    tests::it_adds_two

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass `--lib`
```

Our test caught the bug! The `tests::it_adds_two` test failed, and the message
tells us that the assertion that failed was `left == right` and what the `left`
and `right` values are. This message helps us start debugging: The `left`
argument, where we had the result of calling `add_two(2)`, was `5`, but the
`right` argument was `4`. You can imagine that this would be especially helpful
when we have a lot of tests going on.

Note that in some languages and test frameworks, the parameters to equality
assertion functions are called `expected` and `actual`, and the order in which
we specify the arguments matters. However, in Rust, they’re called `left` and
`right`, and the order in which we specify the value we expect and the value
the code produces doesn’t matter. We could write the assertion in this test as
`assert_eq!(4, result)`, which would result in the same failure message that
displays `` assertion `left == right` failed ``.

The `assert_ne!` macro will pass if the two values we give it are not equal and
will fail if they are equal. This macro is most useful for cases when we’re not
sure what a value _will_ be, but we know what the value definitely _shouldn’t_
be. For example, if we’re testing a function that is guaranteed to change its
input in some way, but the way in which the input is changed depends on the day
of the week that we run our tests, the best thing to assert might be that the
output of the function is not equal to the input.

Under the surface, the `assert_eq!` and `assert_ne!` macros use the operators
`==` and `!=`, respectively. When the assertions fail, these macros print their
arguments using debug formatting, which means the values being compared must
implement the `PartialEq` and `Debug` traits. All primitive types and most of
the standard library types implement these traits. For structs and enums that
you define yourself, you’ll need to implement `PartialEq` to assert equality of
those types. You’ll also need to implement `Debug` to print the values when the
assertion fails. Because both traits are derivable traits, as mentioned in
Listing 5-12 in Chapter 5, this is usually as straightforward as adding the
`#[derive(PartialEq, Debug)]` annotation to your struct or enum definition. See
Appendix C, “Derivable Traits,” for more
details about these and other derivable traits.

### Adding Custom Failure Messages

You can also add a custom message to be printed with the failure message as
optional arguments to the `assert!`, `assert_eq!`, and `assert_ne!` macros. Any
arguments specified after the required arguments are passed along to the
`format!` macro (discussed in “Concatenating with `+` or
`format!`” in Chapter 8), so you can pass a format string that contains `{}`
placeholders and values to go in those placeholders. Custom messages are useful
for documenting what an assertion means; when a test fails, you’ll have a better
idea of what the problem is with the code.

For example, let’s say we have a function that greets people by name and we
want to test that the name we pass into the function appears in the output:

Filename: src/lib.rs

```rust
pub fn greeting(name: &str) -> String {
    format!("Hello {name}!")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(result.contains("Carol"));
    }
}
```

The requirements for this program haven’t been agreed upon yet, and we’re
pretty sure the `Hello` text at the beginning of the greeting will change. We
decided we don’t want to have to update the test when the requirements change,
so instead of checking for exact equality to the value returned from the
`greeting` function, we’ll just assert that the output contains the text of the
input parameter.

Now let’s introduce a bug into this code by changing `greeting` to exclude
`name` to see what the default test failure looks like:

```rust
pub fn greeting(name: &str) -> String {
    String::from("Hello!")
}
```

Running this test produces the following:

```console
$ cargo test
   Compiling greeter v0.1.0 (file:///projects/greeter)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.91s
     Running unittests src/lib.rs (target/debug/deps/greeter-170b942eb5bf5e3a)

running 1 test
test tests::greeting_contains_name ... FAILED

failures:

---- tests::greeting_contains_name stdout ----

thread 'tests::greeting_contains_name' (6021143) panicked at src/lib.rs:12:9:
assertion failed: result.contains("Carol")
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

failures:
    tests::greeting_contains_name

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass `--lib`
```

This result just indicates that the assertion failed and which line the
assertion is on. A more useful failure message would print the value from the
`greeting` function. Let’s add a custom failure message composed of a format
string with a placeholder filled in with the actual value we got from the
`greeting` function:

```rust
#[test]
fn greeting_contains_name() {
    let result = greeting("Carol");
    assert!(
        result.contains("Carol"),
        "Greeting did not contain name, value was `{result}`"
    );
}
```

Now when we run the test, we’ll get a more informative error message:

```console
$ cargo test
   Compiling greeter v0.1.0 (file:///projects/greeter)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.93s
     Running unittests src/lib.rs (target/debug/deps/greeter-170b942eb5bf5e3a)

running 1 test
test tests::greeting_contains_name ... FAILED

failures:

---- tests::greeting_contains_name stdout ----

thread 'tests::greeting_contains_name' (6021333) panicked at src/lib.rs:12:9:
Greeting did not contain name, value was `Hello!`
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace

failures:
    tests::greeting_contains_name

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass `--lib`
```

We can see the value we actually got in the test output, which would help us
debug what happened instead of what we were expecting to happen.
