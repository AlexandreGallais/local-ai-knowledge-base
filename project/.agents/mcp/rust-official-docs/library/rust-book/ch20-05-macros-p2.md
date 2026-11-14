---
title: "ch20-05-macros (part 2 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch20-05-macros.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch20-05-macros (part 2 of 4)

## Macros

We’ve used macros like `println!` throughout this book, but we haven’t fully
explored what a macro is and how it works. The term _macro_ refers to a family
of features in Rust—declarative macros with `macro_rules!` and three kinds of
procedural macros:

- Custom `#[derive]` macros that specify code added with the `derive` attribute
  used on structs and enums
- Attribute-like macros that define custom attributes usable on any item
- Function-like macros that look like function calls but operate on the tokens
  specified as their argument

We’ll talk about each of these in turn, but first, let’s look at why we even
need macros when we already have functions.

### The Difference Between Macros and Functions

Fundamentally, macros are a way of writing code that writes other code, which
is known as _metaprogramming_. In Appendix C, we discuss the `derive`
attribute, which generates an implementation of various traits for you. We’ve
also used the `println!` and `vec!` macros throughout the book. All of these
macros _expand_ to produce more code than the code you’ve written manually.

Metaprogramming is useful for reducing the amount of code you have to write and
maintain, which is also one of the roles of functions. However, macros have
some additional powers that functions don’t have.

A function signature must declare the number and type of parameters the
function has. Macros, on the other hand, can take a variable number of
parameters: We can call `println!("hello")` with one argument or
`println!("hello {}", name)` with two arguments. Also, macros are expanded
before the compiler interprets the meaning of the code, so a macro can, for
example, implement a trait on a given type. A function can’t, because it gets
called at runtime and a trait needs to be implemented at compile time.

The downside to implementing a macro instead of a function is that macro
definitions are more complex than function definitions because you’re writing
Rust code that writes Rust code. Due to this indirection, macro definitions are
generally more difficult to read, understand, and maintain than function
definitions.

Another important difference between macros and functions is that you must
define macros or bring them into scope _before_ you call them in a file, as
opposed to functions you can define anywhere and call anywhere.

### Declarative Macros for General Metaprogramming

The most widely used form of macros in Rust is the _declarative macro_. These
are also sometimes referred to as “macros by example,” “`macro_rules!` macros,”
or just plain “macros.” At their core, declarative macros allow you to write
something similar to a Rust `match` expression. As discussed in Chapter 6,
`match` expressions are control structures that take an expression, compare the
resultant value of the expression to patterns, and then run the code associated
with the matching pattern. Macros also compare a value to patterns that are
associated with particular code: In this situation, the value is the literal
Rust source code passed to the macro; the patterns are compared with the
structure of that source code; and the code associated with each pattern, when
matched, replaces the code passed to the macro. This all happens during
compilation.

To define a macro, you use the `macro_rules!` construct. Let’s explore how to
use `macro_rules!` by looking at how the `vec!` macro is defined. Chapter 8
covered how we can use the `vec!` macro to create a new vector with particular
values. For example, the following macro creates a new vector containing three
integers:

```rust
let v: Vec<u32> = vec![1, 2, 3];
```

We could also use the `vec!` macro to make a vector of two integers or a vector
of five string slices. We wouldn’t be able to use a function to do the same
because we wouldn’t know the number or type of values up front.

Listing 20-35 shows a slightly simplified definition of the `vec!` macro.

**Listing 20-35: A simplified version of the `vec!` macro definition** (src/lib.rs)

```rust
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

> Note: The actual definition of the `vec!` macro in the standard library
> includes code to pre-allocate the correct amount of memory up front. That code
> is an optimization that we don’t include here, to make the example simpler.

The `#[macro_export]` annotation indicates that this macro should be made
available whenever the crate in which the macro is defined is brought into
scope. Without this annotation, the macro can’t be brought into scope.

We then start the macro definition with `macro_rules!` and the name of the
macro we’re defining _without_ the exclamation mark. The name, in this case
`vec`, is followed by curly brackets denoting the body of the macro definition.

The structure in the `vec!` body is similar to the structure of a `match`
expression. Here we have one arm with the pattern `( $( $x:expr ),* )`,
followed by `=>` and the block of code associated with this pattern. If the
pattern matches, the associated block of code will be emitted. Given that this
is the only pattern in this macro, there is only one valid way to match; any
other pattern will result in an error. More complex macros will have more than
one arm.

Valid pattern syntax in macro definitions is different from the pattern syntax
covered in Chapter 19 because macro patterns are matched against Rust code
structure rather than values. Let’s walk through what the pattern pieces in
Listing 20-29 mean; for the full macro pattern syntax, see the Rust
Reference.

First, we use a set of parentheses to encompass the whole pattern. We use a
dollar sign (`$`) to declare a variable in the macro system that will contain
the Rust code matching the pattern. The dollar sign makes it clear this is a
macro variable as opposed to a regular Rust variable. Next comes a set of
parentheses that captures values that match the pattern within the parentheses
for use in the replacement code. Within `$()` is `$x:expr`, which matches any
Rust expression and gives the expression the name `$x`.

The comma following `$()` indicates that a literal comma separator character
must appear between each instance of the code that matches the code in `$()`.
The `*` specifies that the pattern matches zero or more of whatever precedes
the `*`.

When we call this macro with `vec![1, 2, 3];`, the `$x` pattern matches three
times with the three expressions `1`, `2`, and `3`.

Now let’s look at the pattern in the body of the code associated with this arm:
`temp_vec.push()` within `$()*` is generated for each part that matches `$()`
in the pattern zero or more times depending on how many times the pattern
matches. The `$x` is replaced with each expression matched. When we call this
macro with `vec![1, 2, 3];`, the code generated that replaces this macro call
will be the following:

```rust
{
    let mut temp_vec = Vec::new();
    temp_vec.push(1);
    temp_vec.push(2);
    temp_vec.push(3);
    temp_vec
}
```

We’ve defined a macro that can take any number of arguments of any type and can
generate code to create a vector containing the specified elements.

To learn more about how to write macros, consult the online documentation or
other resources, such as “The Little Book of Rust Macros” started by
Daniel Keep and continued by Lukas Wirth.

### Procedural Macros for Generating Code from Attributes

The second form of macros is the procedural macro, which acts more like a
function (and is a type of procedure). _Procedural macros_ accept some code as
an input, operate on that code, and produce some code as an output rather than
matching against patterns and replacing the code with other code as declarative
macros do. The three kinds of procedural macros are custom `derive`,
attribute-like, and function-like, and all work in a similar fashion.

When creating procedural macros, the definitions must reside in their own crate
with a special crate type. This is for complex technical reasons that we hope
to eliminate in the future. In Listing 20-36, we show how to define a
procedural macro, where `some_attribute` is a placeholder for using a specific
macro variety.

**Listing 20-36: An example of defining a procedural macro** (src/lib.rs)

```rust
use proc_macro::TokenStream;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
}
```

The function that defines a procedural macro takes a `TokenStream` as an input
and produces a `TokenStream` as an output. The `TokenStream` type is defined by
the `proc_macro` crate that is included with Rust and represents a sequence of
tokens. This is the core of the macro: The source code that the macro is
operating on makes up the input `TokenStream`, and the code the macro produces
is the output `TokenStream`. The function also has an attribute attached to it
that specifies which kind of procedural macro we’re creating. We can have
multiple kinds of procedural macros in the same crate.

Let’s look at the different kinds of procedural macros. We’ll start with a
custom `derive` macro and then explain the small dissimilarities that make the
other forms different.
