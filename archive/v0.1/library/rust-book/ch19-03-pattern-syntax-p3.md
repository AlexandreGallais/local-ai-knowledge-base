---
title: "ch19-03-pattern-syntax (part 3 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch19-03-pattern-syntax.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch19-03-pattern-syntax (part 3 of 4)

### Ignoring Values in a Pattern

You’ve seen that it’s sometimes useful to ignore values in a pattern, such as
in the last arm of a `match`, to get a catch-all that doesn’t actually do
anything but does account for all remaining possible values. There are a few
ways to ignore entire values or parts of values in a pattern: using the `_`
pattern (which you’ve seen), using the `_` pattern within another pattern,
using a name that starts with an underscore, or using `..` to ignore remaining
parts of a value. Let’s explore how and why to use each of these patterns.

#### An Entire Value with `_`

We’ve used the underscore as a wildcard pattern that will match any value but
not bind to the value. This is especially useful as the last arm in a `match`
expression, but we can also use it in any pattern, including function
parameters, as shown in Listing 19-17.

**Listing 19-17: Using `_` in a function signature** (src/main.rs)

```rust
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {y}");
}

fn main() {
    foo(3, 4);
}
```

This code will completely ignore the value `3` passed as the first argument,
and will print `This code only uses the y parameter: 4`.

In most cases when you no longer need a particular function parameter, you
would change the signature so that it doesn’t include the unused parameter.
Ignoring a function parameter can be especially useful in cases when, for
example, you’re implementing a trait when you need a certain type signature but
the function body in your implementation doesn’t need one of the parameters.
You then avoid getting a compiler warning about unused function parameters, as
you would if you used a name instead.

#### Parts of a Value with a Nested `_`

We can also use `_` inside another pattern to ignore just part of a value, for
example, when we want to test for only part of a value but have no use for the
other parts in the corresponding code we want to run. Listing 19-18 shows code
responsible for managing a setting’s value. The business requirements are that
the user should not be allowed to overwrite an existing customization of a
setting but can unset the setting and give it a value if it is currently unset.

**Listing 19-18: Using an underscore within patterns that match `Some` variants when we don’t need to use the value inside the `Some`**

```rust
let mut setting_value = Some(5);
let new_setting_value = Some(10);

match (setting_value, new_setting_value) {
    (Some(_), Some(_)) => {
        println!("Can't overwrite an existing customized value");
    }
    _ => {
        setting_value = new_setting_value;
    }
}

println!("setting is {setting_value:?}");
```

This code will print `Can't overwrite an existing customized value` and then
`setting is Some(5)`. In the first match arm, we don’t need to match on or use
the values inside either `Some` variant, but we do need to test for the case
when `setting_value` and `new_setting_value` are the `Some` variant. In that
case, we print the reason for not changing `setting_value`, and it doesn’t get
changed.

In all other cases (if either `setting_value` or `new_setting_value` is `None`)
expressed by the `_` pattern in the second arm, we want to allow
`new_setting_value` to become `setting_value`.

We can also use underscores in multiple places within one pattern to ignore
particular values. Listing 19-19 shows an example of ignoring the second and
fourth values in a tuple of five items.

**Listing 19-19: Ignoring multiple parts of a tuple**

```rust
let numbers = (2, 4, 8, 16, 32);

match numbers {
    (first, _, third, _, fifth) => {
        println!("Some numbers: {first}, {third}, {fifth}");
    }
}
```

This code will print `Some numbers: 2, 8, 32`, and the values `4` and `16` will
be ignored.

#### An Unused Variable by Starting Its Name with `_`

If you create a variable but don’t use it anywhere, Rust will usually issue a
warning because an unused variable could be a bug. However, sometimes it’s
useful to be able to create a variable you won’t use yet, such as when you’re
prototyping or just starting a project. In this situation, you can tell Rust
not to warn you about the unused variable by starting the name of the variable
with an underscore. In Listing 19-20, we create two unused variables, but when
we compile this code, we should only get a warning about one of them.

**Listing 19-20: Starting a variable name with an underscore to avoid getting unused variable warnings** (src/main.rs)

```rust
fn main() {
    let _x = 5;
    let y = 10;
}
```

Here, we get a warning about not using the variable `y`, but we don’t get a
warning about not using `_x`.

Note that there is a subtle difference between using only `_` and using a name
that starts with an underscore. The syntax `_x` still binds the value to the
variable, whereas `_` doesn’t bind at all. To show a case where this
distinction matters, Listing 19-21 will provide us with an error.

**Listing 19-21: An unused variable starting with an underscore still binds the value, which might take ownership of the value.**

```rust
let s = Some(String::from("Hello!"));

if let Some(_s) = s {
    println!("found a string");
}

println!("{s:?}");
```

We’ll receive an error because the `s` value will still be moved into `_s`,
which prevents us from using `s` again. However, using the underscore by itself
doesn’t ever bind to the value. Listing 19-22 will compile without any errors
because `s` doesn’t get moved into `_`.

**Listing 19-22: Using an underscore does not bind the value.**

```rust
let s = Some(String::from("Hello!"));

if let Some(_) = s {
    println!("found a string");
}

println!("{s:?}");
```

This code works just fine because we never bind `s` to anything; it isn’t moved.

#### Remaining Parts of a Value with `..`

With values that have many parts, we can use the `..` syntax to use specific
parts and ignore the rest, avoiding the need to list underscores for each
ignored value. The `..` pattern ignores any parts of a value that we haven’t
explicitly matched in the rest of the pattern. In Listing 19-23, we have a
`Point` struct that holds a coordinate in three-dimensional space. In the
`match` expression, we want to operate only on the `x` coordinate and ignore
the values in the `y` and `z` fields.

**Listing 19-23: Ignoring all fields of a `Point` except for `x` by using `..`**

```rust
struct Point {
    x: i32,
    y: i32,
    z: i32,
}

let origin = Point { x: 0, y: 0, z: 0 };

match origin {
    Point { x, .. } => println!("x is {x}"),
}
```

We list the `x` value and then just include the `..` pattern. This is quicker
than having to list `y: _` and `z: _`, particularly when we’re working with
structs that have lots of fields in situations where only one or two fields are
relevant.

The syntax `..` will expand to as many values as it needs to be. Listing 19-24
shows how to use `..` with a tuple.

**Listing 19-24: Matching only the first and last values in a tuple and ignoring all other values** (src/main.rs)

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, .., last) => {
            println!("Some numbers: {first}, {last}");
        }
    }
}
```

In this code, the first and last values are matched with `first` and `last`.
The `..` will match and ignore everything in the middle.

However, using `..` must be unambiguous. If it is unclear which values are
intended for matching and which should be ignored, Rust will give us an error.
Listing 19-25 shows an example of using `..` ambiguously, so it will not
compile.

**Listing 19-25: An attempt to use `..` in an ambiguous way** (src/main.rs)

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (.., second, ..) => {
            println!("Some numbers: {second}")
        },
    }
}
```

When we compile this example, we get this error:

```console
$ cargo run
   Compiling patterns v0.1.0 (file:///projects/patterns)
error: `..` can only be used once per tuple pattern
 --> src/main.rs:5:22
  |
5 |         (.., second, ..) => {
  |          --          ^^ can only be used once per tuple pattern
  |          |
  |          previously used here

error: could not compile `patterns` (bin "patterns") due to 1 previous error
```

It’s impossible for Rust to determine how many values in the tuple to ignore
before matching a value with `second` and then how many further values to
ignore thereafter. This code could mean that we want to ignore `2`, bind
`second` to `4`, and then ignore `8`, `16`, and `32`; or that we want to ignore
`2` and `4`, bind `second` to `8`, and then ignore `16` and `32`; and so forth.
The variable name `second` doesn’t mean anything special to Rust, so we get a
compiler error because using `..` in two places like this is ambiguous.

### Adding Conditionals with Match Guards

A _match guard_ is an additional `if` condition, specified after the pattern in
a `match` arm, that must also match for that arm to be chosen. Match guards are
useful for expressing more complex ideas than a pattern alone allows. Note,
however, that they are only available in `match` expressions, not `if let` or
`while let` expressions.

The condition can use variables created in the pattern. Listing 19-26 shows a
`match` where the first arm has the pattern `Some(x)` and also has a match
guard of `if x % 2 == 0` (which will be `true` if the number is even).

**Listing 19-26: Adding a match guard to a pattern**

```rust
let num = Some(4);

match num {
    Some(x) if x % 2 == 0 => println!("The number {x} is even"),
    Some(x) => println!("The number {x} is odd"),
    None => (),
}
```

This example will print `The number 4 is even`. When `num` is compared to the
pattern in the first arm, it matches because `Some(4)` matches `Some(x)`. Then,
the match guard checks whether the remainder of dividing `x` by 2 is equal to
0, and because it is, the first arm is selected.

If `num` had been `Some(5)` instead, the match guard in the first arm would
have been `false` because the remainder of 5 divided by 2 is 1, which is not
equal to 0. Rust would then go to the second arm, which would match because the
second arm doesn’t have a match guard and therefore matches any `Some` variant.

There is no way to express the `if x % 2 == 0` condition within a pattern, so
the match guard gives us the ability to express this logic. The downside of
this additional expressiveness is that the compiler doesn’t try to check for
exhaustiveness when match guard expressions are involved.

When discussing Listing 19-11, we mentioned that we could use match guards to
solve our pattern-shadowing problem. Recall that we created a new variable
inside the pattern in the `match` expression instead of using the variable
outside the `match`. That new variable meant we couldn’t test against the value
of the outer variable. Listing 19-27 shows how we can use a match guard to fix
this problem.

**Listing 19-27: Using a match guard to test for equality with an outer variable** (src/main.rs)

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(n) if n == y => println!("Matched, n = {n}"),
        _ => println!("Default case, x = {x:?}"),
    }

    println!("at the end: x = {x:?}, y = {y}");
}
```

This code will now print `Default case, x = Some(5)`. The pattern in the second
match arm doesn’t introduce a new variable `y` that would shadow the outer `y`,
meaning we can use the outer `y` in the match guard. Instead of specifying the
pattern as `Some(y)`, which would have shadowed the outer `y`, we specify
`Some(n)`. This creates a new variable `n` that doesn’t shadow anything because
there is no `n` variable outside the `match`.

The match guard `if n == y` is not a pattern and therefore doesn’t introduce new
variables. This `y` _is_ the outer `y` rather than a new `y` shadowing it, and
we can look for a value that has the same value as the outer `y` by comparing
`n` to `y`.

You can also use the _or_ operator `|` in a match guard to specify multiple
patterns; the match guard condition will apply to all the patterns. Listing
19-28 shows the precedence when combining a pattern that uses `|` with a match
guard. The important part of this example is that the `if y` match guard
applies to `4`, `5`, _and_ `6`, even though it might look like `if y` only
applies to `6`.

**Listing 19-28: Combining multiple patterns with a match guard**

```rust
let x = 4;
let y = false;

match x {
    4 | 5 | 6 if y => println!("yes"),
    _ => println!("no"),
}
```

The match condition states that the arm only matches if the value of `x` is
equal to `4`, `5`, or `6` _and_ if `y` is `true`. When this code runs, the
pattern of the first arm matches because `x` is `4`, but the match guard `if y`
is `false`, so the first arm is not chosen. The code moves on to the second
arm, which does match, and this program prints `no`. The reason is that the
`if` condition applies to the whole pattern `4 | 5 | 6`, not just to the last
value `6`. In other words, the precedence of a match guard in relation to a
pattern behaves like this:

```text
(4 | 5 | 6) if y => ...
```

rather than this:

```text
4 | 5 | (6 if y) => ...
```

After running the code, the precedence behavior is evident: If the match guard
were applied only to the final value in the list of values specified using the
`|` operator, the arm would have matched, and the program would have printed
`yes`.
