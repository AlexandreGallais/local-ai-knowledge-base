---
title: "ch09-02-recoverable-errors-with-result (part 3 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch09-02-recoverable-errors-with-result.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch09-02-recoverable-errors-with-result (part 3 of 4)

### Propagating Errors

When a function’s implementation calls something that might fail, instead of
handling the error within the function itself, you can return the error to the
calling code so that it can decide what to do. This is known as _propagating_
the error and gives more control to the calling code, where there might be more
information or logic that dictates how the error should be handled than what
you have available in the context of your code.

For example, Listing 9-6 shows a function that reads a username from a file. If
the file doesn’t exist or can’t be read, this function will return those errors
to the code that called the function.

**Listing 9-6: A function that returns errors to the calling code using `match`** (src/main.rs)

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
```

This function can be written in a much shorter way, but we’re going to start by
doing a lot of it manually in order to explore error handling; at the end,
we’ll show the shorter way. Let’s look at the return type of the function
first: `Result<String, io::Error>`. This means the function is returning a
value of the type `Result<T, E>`, where the generic parameter `T` has been
filled in with the concrete type `String` and the generic type `E` has been
filled in with the concrete type `io::Error`.

If this function succeeds without any problems, the code that calls this
function will receive an `Ok` value that holds a `String`—the `username` that
this function read from the file. If this function encounters any problems, the
calling code will receive an `Err` value that holds an instance of `io::Error`
that contains more information about what the problems were. We chose
`io::Error` as the return type of this function because that happens to be the
type of the error value returned from both of the operations we’re calling in
this function’s body that might fail: the `File::open` function and the
`read_to_string` method.

The body of the function starts by calling the `File::open` function. Then, we
handle the `Result` value with a `match` similar to the `match` in Listing 9-4.
If `File::open` succeeds, the file handle in the pattern variable `file`
becomes the value in the mutable variable `username_file` and the function
continues. In the `Err` case, instead of calling `panic!`, we use the `return`
keyword to return early out of the function entirely and pass the error value
from `File::open`, now in the pattern variable `e`, back to the calling code as
this function’s error value.

So, if we have a file handle in `username_file`, the function then creates a
new `String` in variable `username` and calls the `read_to_string` method on
the file handle in `username_file` to read the contents of the file into
`username`. The `read_to_string` method also returns a `Result` because it
might fail, even though `File::open` succeeded. So, we need another `match` to
handle that `Result`: If `read_to_string` succeeds, then our function has
succeeded, and we return the username from the file that’s now in `username`
wrapped in an `Ok`. If `read_to_string` fails, we return the error value in the
same way that we returned the error value in the `match` that handled the
return value of `File::open`. However, we don’t need to explicitly say
`return`, because this is the last expression in the function.

The code that calls this code will then handle getting either an `Ok` value
that contains a username or an `Err` value that contains an `io::Error`. It’s
up to the calling code to decide what to do with those values. If the calling
code gets an `Err` value, it could call `panic!` and crash the program, use a
default username, or look up the username from somewhere other than a file, for
example. We don’t have enough information on what the calling code is actually
trying to do, so we propagate all the success or error information upward for
it to handle appropriately.

This pattern of propagating errors is so common in Rust that Rust provides the
question mark operator `?` to make this easier.

#### The `?` Operator Shortcut

Listing 9-7 shows an implementation of `read_username_from_file` that has the
same functionality as in Listing 9-6, but this implementation uses the `?`
operator.

**Listing 9-7: A function that returns errors to the calling code using the `?` operator** (src/main.rs)

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```

The `?` placed after a `Result` value is defined to work in almost the same way
as the `match` expressions that we defined to handle the `Result` values in
Listing 9-6. If the value of the `Result` is an `Ok`, the value inside the `Ok`
will get returned from this expression, and the program will continue. If the
value is an `Err`, the `Err` will be returned from the whole function as if we
had used the `return` keyword so that the error value gets propagated to the
calling code.

There is a difference between what the `match` expression from Listing 9-6 does
and what the `?` operator does: Error values that have the `?` operator called
on them go through the `from` function, defined in the `From` trait in the
standard library, which is used to convert values from one type into another.
When the `?` operator calls the `from` function, the error type received is
converted into the error type defined in the return type of the current
function. This is useful when a function returns one error type to represent
all the ways a function might fail, even if parts might fail for many different
reasons.

For example, we could change the `read_username_from_file` function in Listing
9-7 to return a custom error type named `OurError` that we define. If we also
define `impl From<io::Error> for OurError` to construct an instance of
`OurError` from an `io::Error`, then the `?` operator calls in the body of
`read_username_from_file` will call `from` and convert the error types without
needing to add any more code to the function.

In the context of Listing 9-7, the `?` at the end of the `File::open` call will
return the value inside an `Ok` to the variable `username_file`. If an error
occurs, the `?` operator will return early out of the whole function and give
any `Err` value to the calling code. The same thing applies to the `?` at the
end of the `read_to_string` call.

The `?` operator eliminates a lot of boilerplate and makes this function’s
implementation simpler. We could even shorten this code further by chaining
method calls immediately after the `?`, as shown in Listing 9-8.

**Listing 9-8: Chaining method calls after the `?` operator** (src/main.rs)

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();

    File::open("hello.txt")?.read_to_string(&mut username)?;

    Ok(username)
}
```

We’ve moved the creation of the new `String` in `username` to the beginning of
the function; that part hasn’t changed. Instead of creating a variable
`username_file`, we’ve chained the call to `read_to_string` directly onto the
result of `File::open("hello.txt")?`. We still have a `?` at the end of the
`read_to_string` call, and we still return an `Ok` value containing `username`
when both `File::open` and `read_to_string` succeed rather than returning
errors. The functionality is again the same as in Listing 9-6 and Listing 9-7;
this is just a different, more ergonomic way to write it.

Listing 9-9 shows a way to make this even shorter using `fs::read_to_string`.

**Listing 9-9: Using `fs::read_to_string` instead of opening and then reading the file** (src/main.rs)

```rust
use std::fs;
use std::io;

fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}
```

Reading a file into a string is a fairly common operation, so the standard
library provides the convenient `fs::read_to_string` function that opens the
file, creates a new `String`, reads the contents of the file, puts the contents
into that `String`, and returns it. Of course, using `fs::read_to_string`
doesn’t give us the opportunity to explain all the error handling, so we did it
the longer way first.

#### Where to Use the `?` Operator

The `?` operator can only be used in functions whose return type is compatible
with the value the `?` is used on. This is because the `?` operator is defined
to perform an early return of a value out of the function, in the same manner
as the `match` expression we defined in Listing 9-6. In Listing 9-6, the
`match` was using a `Result` value, and the early return arm returned an
`Err(e)` value. The return type of the function has to be a `Result` so that
it’s compatible with this `return`.

In Listing 9-10, let’s look at the error we’ll get if we use the `?` operator
in a `main` function with a return type that is incompatible with the type of
the value we use `?` on.

**Listing 9-10: Attempting to use the `?` in the `main` function that returns `()` won’t compile.** (src/main.rs)

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt")?;
}
```

This code opens a file, which might fail. The `?` operator follows the `Result`
value returned by `File::open`, but this `main` function has the return type of
`()`, not `Result`. When we compile this code, we get the following error
message:

```console
$ cargo run
   Compiling error-handling v0.1.0 (file:///projects/error-handling)
error[E0277]: the `?` operator can only be used in a function that returns `Result` or `Option` (or another type that implements `FromResidual`)
 --> src/main.rs:4:48
  |
3 | fn main() {
  | --------- this function should return `Result` or `Option` to accept `?`
4 |     let greeting_file = File::open("hello.txt")?;
  |                                                ^ cannot use the `?` operator in a function that returns `()`
  |
help: consider adding return type
  |
3 ~ fn main() -> Result<(), Box<dyn std::error::Error>> {
4 |     let greeting_file = File::open("hello.txt")?;
5 +     Ok(())
  |

For more information about this error, try `rustc --explain E0277`.
error: could not compile `error-handling` (bin "error-handling") due to 1 previous error
```

This error points out that we’re only allowed to use the `?` operator in a
function that returns `Result`, `Option`, or another type that implements
`FromResidual`.

To fix the error, you have two choices. One choice is to change the return type
of your function to be compatible with the value you’re using the `?` operator
on as long as you have no restrictions preventing that. The other choice is to
use a `match` or one of the `Result<T, E>` methods to handle the `Result<T, E>`
in whatever way is appropriate.

The error message also mentioned that `?` can be used with `Option<T>` values
as well. As with using `?` on `Result`, you can only use `?` on `Option` in a
function that returns an `Option`. The behavior of the `?` operator when called
on an `Option<T>` is similar to its behavior when called on a `Result<T, E>`:
If the value is `None`, the `None` will be returned early from the function at
that point. If the value is `Some`, the value inside the `Some` is the
resultant value of the expression, and the function continues. Listing 9-11 has
an example of a function that finds the last character of the first line in the
given text.

**Listing 9-11**` value">

```rust
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last()
}
```

This function returns `Option<char>` because it’s possible that there is a
character there, but it’s also possible that there isn’t. This code takes the
`text` string slice argument and calls the `lines` method on it, which returns
an iterator over the lines in the string. Because this function wants to
examine the first line, it calls `next` on the iterator to get the first value
from the iterator. If `text` is the empty string, this call to `next` will
return `None`, in which case we use `?` to stop and return `None` from
`last_char_of_first_line`. If `text` is not the empty string, `next` will
return a `Some` value containing a string slice of the first line in `text`.

The `?` extracts the string slice, and we can call `chars` on that string slice
to get an iterator of its characters. We’re interested in the last character in
this first line, so we call `last` to return the last item in the iterator.
This is an `Option` because it’s possible that the first line is the empty
string; for example, if `text` starts with a blank line but has characters on
other lines, as in `"\nhi"`. However, if there is a last character on the first
line, it will be returned in the `Some` variant. The `?` operator in the middle
gives us a concise way to express this logic, allowing us to implement the
function in one line. If we couldn’t use the `?` operator on `Option`, we’d
have to implement this logic using more method calls or a `match` expression.

Note that you can use the `?` operator on a `Result` in a function that returns
`Result`, and you can use the `?` operator on an `Option` in a function that
returns `Option`, but you can’t mix and match. The `?` operator won’t
automatically convert a `Result` to an `Option` or vice versa; in those cases,
you can use methods like the `ok` method on `Result` or the `ok_or` method on
`Option` to do the conversion explicitly.

So far, all the `main` functions we’ve used return `()`. The `main` function is
special because it’s the entry point and exit point of an executable program,
and there are restrictions on what its return type can be for the program to
behave as expected.

Luckily, `main` can also return a `Result<(), E>`. Listing 9-12 has the code
from Listing 9-10, but we’ve changed the return type of `main` to be
`Result<(), Box<dyn Error>>` and added a return value `Ok(())` to the end. This
code will now compile.

**Listing 9-12** (src/main.rs)` allows the use of the `?` operator on `Result` values.">

```rust
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let greeting_file = File::open("hello.txt")?;

    Ok(())
}
```
