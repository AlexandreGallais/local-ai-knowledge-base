---
title: "Patterns (part 1 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/patterns.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[patterns]
# Patterns

r[patterns.syntax]
```grammar
Pattern -> `|`? PatternNoTopAlt  ( `|` PatternNoTopAlt )*

PatternNoTopAlt ->
      PatternWithoutModernRange
    | ModernRangePattern

PatternWithoutModernRange ->
      LiteralPattern
    | IdentifierPattern
    | WildcardPattern
    | RestPattern
    | ReferencePattern
    | StructPattern
    | TupleStructPattern
    | TuplePattern
    | GroupedPattern
    | SlicePattern
    | PathPattern
    | MacroInvocation
    | ObsoleteRangePattern[^obsolete-range-edition]
```

r[patterns.intro]
Patterns are used to match values against structures and to, optionally, bind variables to values inside these structures. They are also used in variable declarations and parameters for functions and closures.

The pattern in the following example does four things:

* Tests if `person` has the `car` field filled with something.
* Tests if the person's `age` field is between 13 and 19, and binds its value to the `person_age` variable.
* Binds a reference to the `name` field to the variable `person_name`.
* Ignores the rest of the fields of `person`. The remaining fields can have any value and are not bound to any variables.

```rust
# struct Car;
# struct Computer;
# struct Person {
#     name: String,
#     car: Option<Car>,
#     computer: Option<Computer>,
#     age: u8,
# }
# let person = Person {
#     name: String::from("John"),
#     car: Some(Car),
#     computer: None,
#     age: 15,
# };
if let
    Person {
        car: Some(_),
        age: person_age @ 13..=19,
        name: ref person_name,
        ..
    } = person
{
    println!("{} has a car and is {} years old.", person_name, person_age);
}
```

r[patterns.use]
Patterns are used in:

r[patterns.let]
* `let` declarations

r[patterns.param]
* Function and closure parameters

r[patterns.match]
* `match` expressions

r[patterns.if-let]
* `if let` expressions

r[patterns.while-let]
* `while let` expressions

r[patterns.for]
* `for` expressions

r[patterns.destructure]
## Destructuring

r[patterns.destructure.intro]
Patterns can be used to *destructure* [structs], [enums], and [tuples]. Destructuring breaks up a value into its component pieces. The syntax used is almost the same as when creating such values.

r[patterns.destructure.wildcard]
In a pattern whose [scrutinee] expression has a `struct`, `enum` or `tuple` type, a wildcard pattern (`_`) stands in for a *single* data field, whereas an et cetera or rest pattern (`..`) stands in for *all* the remaining fields of a particular variant.

r[patterns.destructure.named-field-shorthand]
When destructuring a data structure with named (but not numbered) fields, it is allowed to write `fieldname` as a shorthand for `fieldname: fieldname`.

```rust
# enum Message {
#     Quit,
#     WriteString(String),
#     Move { x: i32, y: i32 },
#     ChangeColor(u8, u8, u8),
# }
# let message = Message::Quit;
match message {
    Message::Quit => println!("Quit"),
    Message::WriteString(write) => println!("{}", &write),
    Message::Move{ x, y: 0 } => println!("move {} horizontally", x),
    Message::Move{ .. } => println!("other move"),
    Message::ChangeColor { 0: red, 1: green, 2: _ } => {
        println!("color change, red: {}, green: {}", red, green);
    }
};
```

r[patterns.refutable]
## Refutability

A pattern is said to be *refutable* when it has the possibility of not being matched by the value it is being matched against. *Irrefutable* patterns, on the other hand, always match the value they are being matched against. Examples:

```rust
let (x, y) = (1, 2);               // "(x, y)" is an irrefutable pattern

if let (a, 3) = (1, 2) {           // "(a, 3)" is refutable, and will not match
    panic!("Shouldn't reach here");
} else if let (a, 4) = (3, 4) {    // "(a, 4)" is refutable, and will match
    println!("Matched ({}, 4)", a);
}
```

r[patterns.literal]
## Literal patterns

r[patterns.literal.syntax]
```grammar
LiteralPattern -> `-`? LiteralExpression
```

r[patterns.literal.intro]
_Literal patterns_ match exactly the same value as what is created by the literal. Since negative numbers are not [literals], literals in patterns may be prefixed by an optional minus sign, which acts like the negation operator.

> **Warning:**
> C string and raw C string literals are accepted in literal patterns, but `&CStr` doesn't implement structural equality (`#[derive(Eq, PartialEq)]`) and therefore any such `match` on a `&CStr` will be rejected with a type error.

r[patterns.literal.refutable]
Literal patterns are always refutable.

Examples:

```rust
for i in -2..5 {
    match i {
        -1 => println!("It's minus one"),
        1 => println!("It's a one"),
        2|4 => println!("It's either a two or a four"),
        _ => println!("Matched none of the arms"),
    }
}
```

r[patterns.ident]
## Identifier patterns

r[patterns.ident.syntax]
```grammar
IdentifierPattern -> `ref`? `mut`? IDENTIFIER ( `@` PatternNoTopAlt )?
```

r[patterns.ident.intro]
Identifier patterns bind the value they match to a variable in the [value namespace].

r[patterns.ident.unique]
The identifier must be unique within the pattern.

r[patterns.ident.scope]
The variable will shadow any variables of the same name in scope. The [scope] of the new binding depends on the context of where the pattern is used (such as a `let` binding or a `match` arm).

r[patterns.ident.bare]
Patterns that consist of only an identifier, possibly with a `mut`, match any value and bind it to that identifier. This is the most commonly used pattern in variable declarations and parameters for functions and closures.

```rust
let mut variable = 10;
fn sum(x: i32, y: i32) -> i32 {
#    x + y
# }
```

r[patterns.ident.scrutinized]
To bind the matched value of a pattern to a variable, use the syntax `variable @ subpattern`. For example, the following binds the value 2 to `e` (not the entire range: the range here is a range subpattern).

```rust
let x = 2;

match x {
    e @ 1 ..= 5 => println!("got a range element {}", e),
    _ => println!("anything"),
}
```

r[patterns.ident.move]
By default, identifier patterns bind a variable to a copy of or move from the matched value depending on whether the matched value implements [`Copy`].

r[patterns.ident.ref]
This can be changed to bind to a reference by using the `ref` keyword, or to a mutable reference using `ref mut`. For example:

```rust
# let a = Some(10);
match a {
    None => (),
    Some(value) => (),
}

match a {
    None => (),
    Some(ref value) => (),
}
```

In the first match expression, the value is copied (or moved). In the second match, a reference to the same memory location is bound to the variable value. This syntax is needed because in destructuring subpatterns the `&` operator can't be applied to the value's fields. For example, the following is not valid:

```rust
# struct Person {
#    name: String,
#    age: u8,
# }
# let value = Person { name: String::from("John"), age: 23 };
if let Person { name: &person_name, age: 18..=150 } = value { }
```

To make it valid, write the following:

```rust
# struct Person {
#    name: String,
#    age: u8,
# }
# let value = Person { name: String::from("John"), age: 23 };
if let Person { name: ref person_name, age: 18..=150 } = value { }
```

r[patterns.ident.ref-ignored]
Thus, `ref` is not something that is being matched against. Its objective is exclusively to make the matched binding a reference, instead of potentially copying or moving what was matched.

r[patterns.ident.precedent]
Path patterns take precedence over identifier patterns.

> **Note:**
> When a pattern is a single-segment identifier, the grammar is ambiguous whether it means an [IdentifierPattern] or a [PathPattern]. This ambiguity can only be resolved after [name resolution].
>
> ```rust
> const EXPECTED_VALUE: u8 = 42;
> //    ^^^^^^^^^^^^^^ That this constant is in scope affects how the
> //                   patterns below are treated.
>
> fn check_value(x: u8) -> Result<u8, u8> {
>     match x {
>         EXPECTED_VALUE => Ok(x),
>     //  ^^^^^^^^^^^^^^ Parsed as a `PathPattern` that resolves to
>     //                 the constant `42`.
>         other_value => Err(x),
>     //  ^^^^^^^^^^^ Parsed as an `IdentifierPattern`.
>     }
> }
>
> // If `EXPECTED_VALUE` were treated as an `IdentifierPattern` above,
> // that pattern would always match, making the function always return
> // `Ok(_) regardless of the input.
> assert_eq!(check_value(42), Ok(42));
> assert_eq!(check_value(43), Err(43));
> ```

r[patterns.ident.constraint]
It is an error if `ref` or `ref mut` is specified and the identifier shadows a constant.

r[patterns.ident.refutable]
Identifier patterns are irrefutable if the `@` subpattern is irrefutable or the subpattern is not specified.

r[patterns.ident.binding]
### Binding modes

r[patterns.ident.binding.intro]
To service better ergonomics, patterns operate in different *binding modes* in order to make it easier to bind references to values. When a reference value is matched by a non-reference pattern, it will be automatically treated as a `ref` or `ref mut` binding. Example:

```rust
let x: &Option<i32> = &Some(3);
if let Some(y) = x {
    // y was converted to `ref y` and its type is &i32
}
```

r[patterns.ident.binding.non-reference]
*Non-reference patterns* include all patterns except bindings, wildcard patterns (`_`), `const` patterns of reference types, and reference patterns.

r[patterns.ident.binding.default-mode]
If a binding pattern does not explicitly have `ref`, `ref mut`, or `mut`, then it uses the *default binding mode* to determine how the variable is bound.

r[patterns.ident.binding.move]
The default binding mode starts in "move" mode which uses move semantics.

r[patterns.ident.binding.top-down]
When matching a pattern, the compiler starts from the outside of the pattern and works inwards.

r[patterns.ident.binding.auto-deref]
Each time a reference is matched using a non-reference pattern, it will automatically dereference the value and update the default binding mode.

r[patterns.ident.binding.ref]
References will set the default binding mode to `ref`.

r[patterns.ident.binding.ref-mut]
Mutable references will set the mode to `ref mut` unless the mode is already `ref` in which case it remains `ref`.

r[patterns.ident.binding.nested-references]
If the automatically dereferenced value is still a reference, it is dereferenced and this process repeats.

r[patterns.ident.binding.mode-limitations-binding]
The binding pattern may only explicitly specify a `ref` or `ref mut` binding mode, or specify mutability with `mut`, when the default binding mode is "move". For example, these are not accepted:

```rust
let [mut x] = &[()]; //~ ERROR
let [ref x] = &[()]; //~ ERROR
let [ref mut x] = &mut [()]; //~ ERROR
```

r[patterns.ident.binding.mode-limitations-binding-edition2024]
> [!EDITION-2024]
> Before the 2024 edition, bindings could explicitly specify a `ref` or `ref mut` binding mode even when the default binding mode was not "move", and they could specify mutability on such bindings with `mut`. In these editions, specifying `mut` on a binding set the binding mode to "move" regardless of the current default binding mode.

r[patterns.ident.binding.mode-limitations-reference]
Similarly, a reference pattern may only appear when the default binding mode is "move". For example, this is not accepted:

```rust
let [&x] = &[&()]; //~ ERROR
```

r[patterns.ident.binding.mode-limitations-reference-edition2024]
> [!EDITION-2024]
> Before the 2024 edition, reference patterns could appear even when the default binding mode was not "move", and had both the effect of matching against the scrutinee and of causing the default binding mode to be reset to "move".

r[patterns.ident.binding.mixed]
Move bindings and reference bindings can be mixed together in the same pattern. Doing so will result in partial move of the object bound to and the object cannot be used afterwards. This applies only if the type cannot be copied.

In the example below, `name` is moved out of `person`. Trying to use `person` as a whole or `person.name` would result in an error because of *partial move*.

Example:

```rust
# struct Person {
#    name: String,
#    age: u8,
# }
# let person = Person{ name: String::from("John"), age: 23 };
// `name` is moved from person and `age` referenced
let Person { name, ref age } = person;
```

r[patterns.wildcard]
## Wildcard pattern

r[patterns.wildcard.syntax]
```grammar
WildcardPattern -> `_`
```

r[patterns.wildcard.intro]
The _wildcard pattern_ (an underscore symbol) matches any value. It is used to ignore values when they don't matter.

r[patterns.wildcard.struct-matcher]
Inside other patterns, it matches a single data field (as opposed to the `..`, which matches the remaining fields).

r[patterns.wildcard.no-binding]
Unlike identifier patterns, it does not copy, move, or borrow the value it matches.

Examples:

```rust
# let x = 20;
let (a, _) = (10, x);   // the x is always matched by _
# assert_eq!(a, 10);

// ignore a function/closure param
let real_part = |a: f64, _: f64| { a };

// ignore a field from a struct
# struct RGBA {
#    r: f32,
#    g: f32,
#    b: f32,
#    a: f32,
# }
# let color = RGBA{r: 0.4, g: 0.1, b: 0.9, a: 0.5};
let RGBA{r: red, g: green, b: blue, a: _} = color;
# assert_eq!(color.r, red);
# assert_eq!(color.g, green);
# assert_eq!(color.b, blue);

// accept any Some, with any value
# let x = Some(10);
if let Some(_) = x {}
```

r[patterns.wildcard.refutable]
The wildcard pattern is always irrefutable.

r[patterns.rest]
