---
title: "ch12-03-improving-error-handling-and-modularity (part 3 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch12-03-improving-error-handling-and-modularity.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch12-03-improving-error-handling-and-modularity (part 3 of 4)

### Fixing the Error Handling

Now we’ll work on fixing our error handling. Recall that attempting to access
the values in the `args` vector at index 1 or index 2 will cause the program to
panic if the vector contains fewer than three items. Try running the program
without any arguments; it will look like this:

```console
$ cargo run
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running `target/debug/minigrep`

thread 'main' (6023615) panicked at src/main.rs:27:21:
index out of bounds: the len is 1 but the index is 1
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

The line `index out of bounds: the len is 1 but the index is 1` is an error
message intended for programmers. It won’t help our end users understand what
they should do instead. Let’s fix that now.

#### Improving the Error Message

In Listing 12-8, we add a check in the `new` function that will verify that the
slice is long enough before accessing index 1 and index 2. If the slice isn’t
long enough, the program panics and displays a better error message.

**Listing 12-8: Adding a check for the number of arguments** (src/main.rs)

```rust
// --snip--
fn new(args: &[String]) -> Config {
    if args.len() < 3 {
        panic!("not enough arguments");
    }
    // --snip--
```

This code is similar to the `Guess::new` function we wrote in Listing
9-13, where we called `panic!` when the
`value` argument was out of the range of valid values. Instead of checking for
a range of values here, we’re checking that the length of `args` is at least
`3` and the rest of the function can operate under the assumption that this
condition has been met. If `args` has fewer than three items, this condition
will be `true`, and we call the `panic!` macro to end the program immediately.

With these extra few lines of code in `new`, let’s run the program without any
arguments again to see what the error looks like now:

```console
$ cargo run
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running `target/debug/minigrep`

thread 'main' (6023776) panicked at src/main.rs:26:13:
not enough arguments
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

This output is better: We now have a reasonable error message. However, we also
have extraneous information we don’t want to give to our users. Perhaps the
technique we used in Listing 9-13 isn’t the best one to use here: A call to
`panic!` is more appropriate for a programming problem than a usage problem,
as discussed in Chapter 9. Instead,
we’ll use the other technique you learned about in Chapter 9—returning a
`Result` that indicates either success or an error.

#### Returning a `Result` Instead of Calling `panic!`

We can instead return a `Result` value that will contain a `Config` instance in
the successful case and will describe the problem in the error case. We’re also
going to change the function name from `new` to `build` because many
programmers expect `new` functions to never fail. When `Config::build` is
communicating to `main`, we can use the `Result` type to signal there was a
problem. Then, we can change `main` to convert an `Err` variant into a more
practical error for our users without the surrounding text about `thread
'main'` and `RUST_BACKTRACE` that a call to `panic!` causes.

Listing 12-9 shows the changes we need to make to the return value of the
function we’re now calling `Config::build` and the body of the function needed
to return a `Result`. Note that this won’t compile until we update `main` as
well, which we’ll do in the next listing.

**Listing 12-9: Returning a `Result` from `Config::build`** (src/main.rs)

```rust
impl Config {
    fn build(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        Ok(Config { query, file_path })
    }
}
```

Our `build` function returns a `Result` with a `Config` instance in the success
case and a string literal in the error case. Our error values will always be
string literals that have the `'static` lifetime.

We’ve made two changes in the body of the function: Instead of calling `panic!`
when the user doesn’t pass enough arguments, we now return an `Err` value, and
we’ve wrapped the `Config` return value in an `Ok`. These changes make the
function conform to its new type signature.

Returning an `Err` value from `Config::build` allows the `main` function to
handle the `Result` value returned from the `build` function and exit the
process more cleanly in the error case.

#### Calling `Config::build` and Handling Errors

To handle the error case and print a user-friendly message, we need to update
`main` to handle the `Result` being returned by `Config::build`, as shown in
Listing 12-10. We’ll also take the responsibility of exiting the command line
tool with a nonzero error code away from `panic!` and instead implement it by
hand. A nonzero exit status is a convention to signal to the process that
called our program that the program exited with an error state.

**Listing 12-10: Exiting with an error code if building a `Config` fails** (src/main.rs)

```rust
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--
```

In this listing, we’ve used a method we haven’t covered in detail yet:
`unwrap_or_else`, which is defined on `Result<T, E>` by the standard library.
Using `unwrap_or_else` allows us to define some custom, non-`panic!` error
handling. If the `Result` is an `Ok` value, this method’s behavior is similar
to `unwrap`: It returns the inner value that `Ok` is wrapping. However, if the
value is an `Err` value, this method calls the code in the closure, which is
an anonymous function we define and pass as an argument to `unwrap_or_else`.
We’ll cover closures in more detail in Chapter 13. For
now, you just need to know that `unwrap_or_else` will pass the inner value of
the `Err`, which in this case is the static string `"not enough arguments"`
that we added in Listing 12-9, to our closure in the argument `err` that
appears between the vertical pipes. The code in the closure can then use the
`err` value when it runs.

We’ve added a new `use` line to bring `process` from the standard library into
scope. The code in the closure that will be run in the error case is only two
lines: We print the `err` value and then call `process::exit`. The
`process::exit` function will stop the program immediately and return the
number that was passed as the exit status code. This is similar to the
`panic!`-based handling we used in Listing 12-8, but we no longer get all the
extra output. Let’s try it:

```console
$ cargo run
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.48s
     Running `target/debug/minigrep`
Problem parsing arguments: not enough arguments
```

Great! This output is much friendlier for our users.

### Extracting Logic from `main`

Now that we’ve finished refactoring the configuration parsing, let’s turn to
the program’s logic. As we stated in “Separating Concerns in Binary
Projects”, we’ll
extract a function named `run` that will hold all the logic currently in the
`main` function that isn’t involved with setting up configuration or handling
errors. When we’re done, the `main` function will be concise and easy to verify
by inspection, and we’ll be able to write tests for all the other logic.

Listing 12-11 shows the small, incremental improvement of extracting a `run`
function.

**Listing 12-11: Extracting a `run` function containing the rest of the program logic** (src/main.rs)

```rust
fn main() {
    // --snip--
```

The `run` function now contains all the remaining logic from `main`, starting
from reading the file. The `run` function takes the `Config` instance as an
argument.

#### Returning Errors from `run`

With the remaining program logic separated into the `run` function, we can
improve the error handling, as we did with `Config::build` in Listing 12-9.
Instead of allowing the program to panic by calling `expect`, the `run`
function will return a `Result<T, E>` when something goes wrong. This will let
us further consolidate the logic around handling errors into `main` in a
user-friendly way. Listing 12-12 shows the changes we need to make to the
signature and body of `run`.

**Listing 12-12: Changing the `run` function to return `Result`** (src/main.rs)

```rust
use std::error::Error;

// --snip--
```

We’ve made three significant changes here. First, we changed the return type of
the `run` function to `Result<(), Box<dyn Error>>`. This function previously
returned the unit type, `()`, and we keep that as the value returned in the
`Ok` case.

For the error type, we used the trait object `Box<dyn Error>` (and we brought
`std::error::Error` into scope with a `use` statement at the top). We’ll cover
trait objects in Chapter 18. For now, just know that
`Box<dyn Error>` means the function will return a type that implements the
`Error` trait, but we don’t have to specify what particular type the return
value will be. This gives us flexibility to return error values that may be of
different types in different error cases. The `dyn` keyword is short for
_dynamic_.

Second, we’ve removed the call to `expect` in favor of the `?` operator, as we
talked about in Chapter 9. Rather than
`panic!` on an error, `?` will return the error value from the current function
for the caller to handle.

Third, the `run` function now returns an `Ok` value in the success case.
We’ve declared the `run` function’s success type as `()` in the signature,
which means we need to wrap the unit type value in the `Ok` value. This
`Ok(())` syntax might look a bit strange at first. But using `()` like this is
the idiomatic way to indicate that we’re calling `run` for its side effects
only; it doesn’t return a value we need.

When you run this code, it will compile but will display a warning:

```console
$ cargo run -- the poem.txt
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
warning: unused `Result` that must be used
  --> src/main.rs:19:5
   |
19 |     run(config);
   |     ^^^^^^^^^^^
   |
   = note: this `Result` may be an `Err` variant, which should be handled
   = note: `#[warn(unused_must_use)]` (part of `#[warn(unused)]`) on by default
help: use `let _ = ...` to ignore the resulting value
   |
19 |     let _ = run(config);
   |     +++++++

warning: `minigrep` (bin "minigrep") generated 1 warning
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.71s
     Running `target/debug/minigrep the poem.txt`
Searching for the
In file poem.txt
With text:
I'm nobody! Who are you?
Are you nobody, too?
Then there's a pair of us - don't tell!
They'd banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!
```

Rust tells us that our code ignored the `Result` value and the `Result` value
might indicate that an error occurred. But we’re not checking to see whether or
not there was an error, and the compiler reminds us that we probably meant to
have some error-handling code here! Let’s rectify that problem now.

#### Handling Errors Returned from `run` in `main`

We’ll check for errors and handle them using a technique similar to one we used
with `Config::build` in Listing 12-10, but with a slight difference:

Filename: src/main.rs

```rust
fn main() {
    // --snip--
```

We use `if let` rather than `unwrap_or_else` to check whether `run` returns an
`Err` value and to call `process::exit(1)` if it does. The `run` function
doesn’t return a value that we want to `unwrap` in the same way that
`Config::build` returns the `Config` instance. Because `run` returns `()` in
the success case, we only care about detecting an error, so we don’t need
`unwrap_or_else` to return the unwrapped value, which would only be `()`.

The bodies of the `if let` and the `unwrap_or_else` functions are the same in
both cases: We print the error and exit.
