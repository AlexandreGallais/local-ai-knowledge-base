---
title: "ch19-03-pattern-syntax (part 2 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch19-03-pattern-syntax.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch19-03-pattern-syntax (part 2 of 4)

## Pattern Syntax

In this section, we gather all the syntax that is valid in patterns and discuss
why and when you might want to use each one.

### Matching Literals

As you saw in Chapter 6, you can match patterns against literals directly. The
following code gives some examples:

```rust
let x = 1;

match x {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```

This code prints `one` because the value in `x` is `1`. This syntax is useful
when you want your code to take an action if it gets a particular concrete
value.

### Matching Named Variables

Named variables are irrefutable patterns that match any value, and we’ve used
them many times in this book. However, there is a complication when you use
named variables in `match`, `if let`, or `while let` expressions. Because each
of these kinds of expressions starts a new scope, variables declared as part of
a pattern inside these expressions will shadow those with the same name outside
the constructs, as is the case with all variables. In Listing 19-11, we declare
a variable named `x` with the value `Some(5)` and a variable `y` with the value
`10`. We then create a `match` expression on the value `x`. Look at the
patterns in the match arms and `println!` at the end, and try to figure out
what the code will print before running this code or reading further.

**Listing 19-11: A `match` expression with an arm that introduces a new variable which shadows an existing variable `y`** (src/main.rs)

```rust
let x = Some(5);
let y = 10;

match x {
    Some(50) => println!("Got 50"),
    Some(y) => println!("Matched, y = {y}"),
    _ => println!("Default case, x = {x:?}"),
}

println!("at the end: x = {x:?}, y = {y}");
```

Let’s walk through what happens when the `match` expression runs. The pattern
in the first match arm doesn’t match the defined value of `x`, so the code
continues.

The pattern in the second match arm introduces a new variable named `y` that
will match any value inside a `Some` value. Because we’re in a new scope inside
the `match` expression, this is a new `y` variable, not the `y` we declared at
the beginning with the value `10`. This new `y` binding will match any value
inside a `Some`, which is what we have in `x`. Therefore, this new `y` binds to
the inner value of the `Some` in `x`. That value is `5`, so the expression for
that arm executes and prints `Matched, y = 5`.

If `x` had been a `None` value instead of `Some(5)`, the patterns in the first
two arms wouldn’t have matched, so the value would have matched to the
underscore. We didn’t introduce the `x` variable in the pattern of the
underscore arm, so the `x` in the expression is still the outer `x` that hasn’t
been shadowed. In this hypothetical case, the `match` would print `Default case,
x = None`.

When the `match` expression is done, its scope ends, and so does the scope of
the inner `y`. The last `println!` produces `at the end: x = Some(5), y = 10`.

To create a `match` expression that compares the values of the outer `x` and
`y`, rather than introducing a new variable that shadows the existing `y`
variable, we would need to use a match guard conditional instead. We’ll talk
about match guards later in the “Adding Conditionals with Match
Guards” section.

### Matching Multiple Patterns

In `match` expressions, you can match multiple patterns using the `|` syntax,
which is the pattern _or_ operator. For example, in the following code, we match
the value of `x` against the match arms, the first of which has an _or_ option,
meaning if the value of `x` matches either of the values in that arm, that
arm’s code will run:

```rust
let x = 1;

match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```

This code prints `one or two`.

### Matching Ranges of Values with `..=`

The `..=` syntax allows us to match to an inclusive range of values. In the
following code, when a pattern matches any of the values within the given
range, that arm will execute:

```rust
let x = 5;

match x {
    1..=5 => println!("one through five"),
    _ => println!("something else"),
}
```

If `x` is `1`, `2`, `3`, `4`, or `5`, the first arm will match. This syntax is
more convenient for multiple match values than using the `|` operator to
express the same idea; if we were to use `|`, we would have to specify `1 | 2 |
3 | 4 | 5`. Specifying a range is much shorter, especially if we want to match,
say, any number between 1 and 1,000!

The compiler checks that the range isn’t empty at compile time, and because the
only types for which Rust can tell if a range is empty or not are `char` and
numeric values, ranges are only allowed with numeric or `char` values.

Here is an example using ranges of `char` values:

```rust
let x = 'c';

match x {
    'a'..='j' => println!("early ASCII letter"),
    'k'..='z' => println!("late ASCII letter"),
    _ => println!("something else"),
}
```

Rust can tell that `'c'` is within the first pattern’s range and prints `early
ASCII letter`.

### Destructuring to Break Apart Values

We can also use patterns to destructure structs, enums, and tuples to use
different parts of these values. Let’s walk through each value.

#### Structs

Listing 19-12 shows a `Point` struct with two fields, `x` and `y`, that we can
break apart using a pattern with a `let` statement.

**Listing 19-12: Destructuring a struct’s fields into separate variables** (src/main.rs)

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p;
    assert_eq!(0, a);
    assert_eq!(7, b);
}
```

This code creates the variables `a` and `b` that match the values of the `x`
and `y` fields of the `p` struct. This example shows that the names of the
variables in the pattern don’t have to match the field names of the struct.
However, it’s common to match the variable names to the field names to make it
easier to remember which variables came from which fields. Because of this
common usage, and because writing `let Point { x: x, y: y } = p;` contains a
lot of duplication, Rust has a shorthand for patterns that match struct fields:
You only need to list the name of the struct field, and the variables created
from the pattern will have the same names. Listing 19-13 behaves in the same
way as the code in Listing 19-12, but the variables created in the `let`
pattern are `x` and `y` instead of `a` and `b`.

**Listing 19-13: Destructuring struct fields using struct field shorthand** (src/main.rs)

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x, y } = p;
    assert_eq!(0, x);
    assert_eq!(7, y);
}
```

This code creates the variables `x` and `y` that match the `x` and `y` fields
of the `p` variable. The outcome is that the variables `x` and `y` contain the
values from the `p` struct.

We can also destructure with literal values as part of the struct pattern
rather than creating variables for all the fields. Doing so allows us to test
some of the fields for particular values while creating variables to
destructure the other fields.

In Listing 19-14, we have a `match` expression that separates `Point` values
into three cases: points that lie directly on the `x` axis (which is true when
`y = 0`), on the `y` axis (`x = 0`), or on neither axis.

**Listing 19-14: Destructuring and matching literal values in one pattern** (src/main.rs)

```rust
fn main() {
    let p = Point { x: 0, y: 7 };

    match p {
        Point { x, y: 0 } => println!("On the x axis at {x}"),
        Point { x: 0, y } => println!("On the y axis at {y}"),
        Point { x, y } => {
            println!("On neither axis: ({x}, {y})");
        }
    }
}
```

The first arm will match any point that lies on the `x` axis by specifying that
the `y` field matches if its value matches the literal `0`. The pattern still
creates an `x` variable that we can use in the code for this arm.

Similarly, the second arm matches any point on the `y` axis by specifying that
the `x` field matches if its value is `0` and creates a variable `y` for the
value of the `y` field. The third arm doesn’t specify any literals, so it
matches any other `Point` and creates variables for both the `x` and `y` fields.

In this example, the value `p` matches the second arm by virtue of `x`
containing a `0`, so this code will print `On the y axis at 7`.

Remember that a `match` expression stops checking arms once it has found the
first matching pattern, so even though `Point { x: 0, y: 0 }` is on the `x` axis
and the `y` axis, this code would only print `On the x axis at 0`.

#### Enums

We’ve destructured enums in this book (for example, Listing 6-5 in Chapter 6),
but we haven’t yet explicitly discussed that the pattern to destructure an enum
corresponds to the way the data stored within the enum is defined. As an
example, in Listing 19-15, we use the `Message` enum from Listing 6-2 and write
a `match` with patterns that will destructure each inner value.

**Listing 19-15: Destructuring enum variants that hold different kinds of values** (src/main.rs)

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::ChangeColor(0, 160, 255);

    match msg {
        Message::Quit => {
            println!("The Quit variant has no data to destructure.");
        }
        Message::Move { x, y } => {
            println!("Move in the x direction {x} and in the y direction {y}");
        }
        Message::Write(text) => {
            println!("Text message: {text}");
        }
        Message::ChangeColor(r, g, b) => {
            println!("Change color to red {r}, green {g}, and blue {b}");
        }
    }
}
```

This code will print `Change color to red 0, green 160, and blue 255`. Try
changing the value of `msg` to see the code from the other arms run.

For enum variants without any data, like `Message::Quit`, we can’t destructure
the value any further. We can only match on the literal `Message::Quit` value,
and no variables are in that pattern.

For struct-like enum variants, such as `Message::Move`, we can use a pattern
similar to the pattern we specify to match structs. After the variant name, we
place curly brackets and then list the fields with variables so that we break
apart the pieces to use in the code for this arm. Here we use the shorthand
form as we did in Listing 19-13.

For tuple-like enum variants, like `Message::Write` that holds a tuple with one
element and `Message::ChangeColor` that holds a tuple with three elements, the
pattern is similar to the pattern we specify to match tuples. The number of
variables in the pattern must match the number of elements in the variant we’re
matching.

#### Nested Structs and Enums

So far, our examples have all been matching structs or enums one level deep,
but matching can work on nested items too! For example, we can refactor the
code in Listing 19-15 to support RGB and HSV colors in the `ChangeColor`
message, as shown in Listing 19-16.

**Listing 19-16: Matching on nested enums**

```rust
enum Color {
    Rgb(i32, i32, i32),
    Hsv(i32, i32, i32),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}

fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

    match msg {
        Message::ChangeColor(Color::Rgb(r, g, b)) => {
            println!("Change color to red {r}, green {g}, and blue {b}");
        }
        Message::ChangeColor(Color::Hsv(h, s, v)) => {
            println!("Change color to hue {h}, saturation {s}, value {v}");
        }
        _ => (),
    }
}
```

The pattern of the first arm in the `match` expression matches a
`Message::ChangeColor` enum variant that contains a `Color::Rgb` variant; then,
the pattern binds to the three inner `i32` values. The pattern of the second
arm also matches a `Message::ChangeColor` enum variant, but the inner enum
matches `Color::Hsv` instead. We can specify these complex conditions in one
`match` expression, even though two enums are involved.

#### Structs and Tuples

We can mix, match, and nest destructuring patterns in even more complex ways.
The following example shows a complicated destructure where we nest structs and
tuples inside a tuple and destructure all the primitive values out:

```rust
let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: -10 });
```

This code lets us break complex types into their component parts so that we can
use the values we’re interested in separately.

Destructuring with patterns is a convenient way to use pieces of values, such
as the value from each field in a struct, separately from each other.
