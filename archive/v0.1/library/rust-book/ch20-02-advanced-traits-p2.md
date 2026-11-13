---
title: "ch20-02-advanced-traits (part 2 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch20-02-advanced-traits.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch20-02-advanced-traits (part 2 of 4)

## Advanced Traits

We first covered traits in the “Defining Shared Behavior with
Traits” section in Chapter 10, but we didn’t discuss
the more advanced details. Now that you know more about Rust, we can get into
the nitty-gritty.

### Defining Traits with Associated Types

_Associated types_ connect a type placeholder with a trait such that the trait
method definitions can use these placeholder types in their signatures. The
implementor of a trait will specify the concrete type to be used instead of the
placeholder type for the particular implementation. That way, we can define a
trait that uses some types without needing to know exactly what those types are
until the trait is implemented.

We’ve described most of the advanced features in this chapter as being rarely
needed. Associated types are somewhere in the middle: They’re used more rarely
than features explained in the rest of the book but more commonly than many of
the other features discussed in this chapter.

One example of a trait with an associated type is the `Iterator` trait that the
standard library provides. The associated type is named `Item` and stands in
for the type of the values the type implementing the `Iterator` trait is
iterating over. The definition of the `Iterator` trait is as shown in Listing
20-13.

**Listing 20-13: The definition of the `Iterator` trait that has an associated type `Item`**

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}
```

The type `Item` is a placeholder, and the `next` method’s definition shows that
it will return values of type `Option<Self::Item>`. Implementors of the
`Iterator` trait will specify the concrete type for `Item`, and the `next`
method will return an `Option` containing a value of that concrete type.

Associated types might seem like a similar concept to generics, in that the
latter allow us to define a function without specifying what types it can
handle. To examine the difference between the two concepts, we’ll look at an
implementation of the `Iterator` trait on a type named `Counter` that specifies
the `Item` type is `u32`:

**Listing** (src/lib.rs)

```rust
impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        // --snip--
```

This syntax seems comparable to that of generics. So, why not just define the
`Iterator` trait with generics, as shown in Listing 20-14?

**Listing 20-14: A hypothetical definition of the `Iterator` trait using generics**

```rust
pub trait Iterator<T> {
    fn next(&mut self) -> Option<T>;
}
```

The difference is that when using generics, as in Listing 20-14, we must
annotate the types in each implementation; because we can also implement
`Iterator<String> for Counter` or any other type, we could have multiple
implementations of `Iterator` for `Counter`. In other words, when a trait has a
generic parameter, it can be implemented for a type multiple times, changing
the concrete types of the generic type parameters each time. When we use the
`next` method on `Counter`, we would have to provide type annotations to
indicate which implementation of `Iterator` we want to use.

With associated types, we don’t need to annotate types, because we can’t
implement a trait on a type multiple times. In Listing 20-13 with the
definition that uses associated types, we can choose what the type of `Item`
will be only once because there can be only one `impl Iterator for Counter`. We
don’t have to specify that we want an iterator of `u32` values everywhere we
call `next` on `Counter`.

Associated types also become part of the trait’s contract: Implementors of the
trait must provide a type to stand in for the associated type placeholder.
Associated types often have a name that describes how the type will be used,
and documenting the associated type in the API documentation is a good practice.

### Using Default Generic Parameters and Operator Overloading

When we use generic type parameters, we can specify a default concrete type for
the generic type. This eliminates the need for implementors of the trait to
specify a concrete type if the default type works. You specify a default type
when declaring a generic type with the `<PlaceholderType=ConcreteType>` syntax.

A great example of a situation where this technique is useful is with _operator
overloading_, in which you customize the behavior of an operator (such as `+`)
in particular situations.

Rust doesn’t allow you to create your own operators or overload arbitrary
operators. But you can overload the operations and corresponding traits listed
in `std::ops` by implementing the traits associated with the operator. For
example, in Listing 20-15, we overload the `+` operator to add two `Point`
instances together. We do this by implementing the `Add` trait on a `Point`
struct.

**Listing 20-15: Implementing the `Add` trait to overload the `+` operator for `Point` instances** (src/main.rs)

```rust
use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    assert_eq!(
        Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
        Point { x: 3, y: 3 }
    );
}
```

The `add` method adds the `x` values of two `Point` instances and the `y`
values of two `Point` instances to create a new `Point`. The `Add` trait has an
associated type named `Output` that determines the type returned from the `add`
method.

The default generic type in this code is within the `Add` trait. Here is its
definition:

```rust
trait Add<Rhs=Self> {
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}
```

This code should look generally familiar: a trait with one method and an
associated type. The new part is `Rhs=Self`: This syntax is called _default
type parameters_. The `Rhs` generic type parameter (short for “right-hand
side”) defines the type of the `rhs` parameter in the `add` method. If we don’t
specify a concrete type for `Rhs` when we implement the `Add` trait, the type
of `Rhs` will default to `Self`, which will be the type we’re implementing
`Add` on.

When we implemented `Add` for `Point`, we used the default for `Rhs` because we
wanted to add two `Point` instances. Let’s look at an example of implementing
the `Add` trait where we want to customize the `Rhs` type rather than using the
default.

We have two structs, `Millimeters` and `Meters`, holding values in different
units. This thin wrapping of an existing type in another struct is known as the
_newtype pattern_, which we describe in more detail in the “Implementing
External Traits with the Newtype Pattern” section. We
want to add values in millimeters to values in meters and have the
implementation of `Add` do the conversion correctly. We can implement `Add` for
`Millimeters` with `Meters` as the `Rhs`, as shown in Listing 20-16.

**Listing 20-16: Implementing the `Add` trait on `Millimeters` to add `Millimeters` and `Meters`** (src/lib.rs)

```rust
use std::ops::Add;

struct Millimeters(u32);
struct Meters(u32);

impl Add<Meters> for Millimeters {
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

To add `Millimeters` and `Meters`, we specify `impl Add<Meters>` to set the
value of the `Rhs` type parameter instead of using the default of `Self`.

You’ll use default type parameters in two main ways:

1. To extend a type without breaking existing code
2. To allow customization in specific cases most users won’t need

The standard library’s `Add` trait is an example of the second purpose:
Usually, you’ll add two like types, but the `Add` trait provides the ability to
customize beyond that. Using a default type parameter in the `Add` trait
definition means you don’t have to specify the extra parameter most of the
time. In other words, a bit of implementation boilerplate isn’t needed, making
it easier to use the trait.

The first purpose is similar to the second but in reverse: If you want to add a
type parameter to an existing trait, you can give it a default to allow
extension of the functionality of the trait without breaking the existing
implementation code.
