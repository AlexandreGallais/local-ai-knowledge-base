---
title: "ch10-02-traits (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch10-02-traits.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch10-02-traits (part 3 of 3)

### Returning Types That Implement Traits

We can also use the `impl Trait` syntax in the return position to return a
value of some type that implements a trait, as shown here:

```rust
fn returns_summarizable() -> impl Summary {
    SocialPost {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        repost: false,
    }
}
```

By using `impl Summary` for the return type, we specify that the
`returns_summarizable` function returns some type that implements the `Summary`
trait without naming the concrete type. In this case, `returns_summarizable`
returns a `SocialPost`, but the code calling this function doesn’t need to know
that.

The ability to specify a return type only by the trait it implements is
especially useful in the context of closures and iterators, which we cover in
Chapter 13. Closures and iterators create types that only the compiler knows or
types that are very long to specify. The `impl Trait` syntax lets you concisely
specify that a function returns some type that implements the `Iterator` trait
without needing to write out a very long type.

However, you can only use `impl Trait` if you’re returning a single type. For
example, this code that returns either a `NewsArticle` or a `SocialPost` with
the return type specified as `impl Summary` wouldn’t work:

```rust
fn returns_summarizable(switch: bool) -> impl Summary {
    if switch {
        NewsArticle {
            headline: String::from(
                "Penguins win the Stanley Cup Championship!",
            ),
            location: String::from("Pittsburgh, PA, USA"),
            author: String::from("Iceburgh"),
            content: String::from(
                "The Pittsburgh Penguins once again are the best \
                 hockey team in the NHL.",
            ),
        }
    } else {
        SocialPost {
            username: String::from("horse_ebooks"),
            content: String::from(
                "of course, as you probably already know, people",
            ),
            reply: false,
            repost: false,
        }
    }
}
```

Returning either a `NewsArticle` or a `SocialPost` isn’t allowed due to
restrictions around how the `impl Trait` syntax is implemented in the compiler.
We’ll cover how to write a function with this behavior in the “Using Trait
Objects to Abstract over Shared Behavior”
section of Chapter 18.

### Using Trait Bounds to Conditionally Implement Methods

By using a trait bound with an `impl` block that uses generic type parameters,
we can implement methods conditionally for types that implement the specified
traits. For example, the type `Pair<T>` in Listing 10-15 always implements the
`new` function to return a new instance of `Pair<T>` (recall from the “Method
Syntax” section of Chapter 5 that `Self` is a type
alias for the type of the `impl` block, which in this case is `Pair<T>`). But
in the next `impl` block, `Pair<T>` only implements the `cmp_display` method if
its inner type `T` implements the `PartialOrd` trait that enables comparison
_and_ the `Display` trait that enables printing.

**Listing 10-15: Conditionally implementing methods on a generic type depending on trait bounds** (src/lib.rs)

```rust
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
```

We can also conditionally implement a trait for any type that implements
another trait. Implementations of a trait on any type that satisfies the trait
bounds are called _blanket implementations_ and are used extensively in the
Rust standard library. For example, the standard library implements the
`ToString` trait on any type that implements the `Display` trait. The `impl`
block in the standard library looks similar to this code:

```rust
impl<T: Display> ToString for T {
    // --snip--
}
```

Because the standard library has this blanket implementation, we can call the
`to_string` method defined by the `ToString` trait on any type that implements
the `Display` trait. For example, we can turn integers into their corresponding
`String` values like this because integers implement `Display`:

```rust
let s = 3.to_string();
```

Blanket implementations appear in the documentation for the trait in the
“Implementors” section.

Traits and trait bounds let us write code that uses generic type parameters to
reduce duplication but also specify to the compiler that we want the generic
type to have particular behavior. The compiler can then use the trait bound
information to check that all the concrete types used with our code provide the
correct behavior. In dynamically typed languages, we would get an error at
runtime if we called a method on a type that didn’t define the method. But Rust
moves these errors to compile time so that we’re forced to fix the problems
before our code is even able to run. Additionally, we don’t have to write code
that checks for behavior at runtime, because we’ve already checked at compile
time. Doing so improves performance without having to give up the flexibility
of generics.
